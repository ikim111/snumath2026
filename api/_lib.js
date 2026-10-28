// 공통: 비밀 키 확인 + 비공개 저장소(Blob 또는 Firestore) 읽기/쓰기
import { get as vget, put as vput } from '@vercel/blob';
import { timingSafeEqual, createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import nodePath from 'node:path';

// 저장소 선택: STORE=firestore면 Firebase Firestore, 아니면 Vercel Blob
// LOCAL_BLOB_DIR가 있으면 로컬 폴더를 저장소처럼 사용 (개발·시험용)
const LOCAL = process.env.LOCAL_BLOB_DIR;
const FS_MODE = process.env.STORE === 'firestore';
const etagOf = (buf) => '"' + createHash('md5').update(buf).digest('hex') + '"';
const typeOf = (path) => (path.endsWith('.json') ? 'application/json' : path.endsWith('.webp') ? 'image/webp' : path.endsWith('.png') ? 'image/png' : 'image/jpeg');

// ── Firestore: 파일 하나 = 문서 하나(files/경로). 900KB 넘으면 조각 문서로 나눔 ──
let _db = null;
async function db() {
  if (_db) return _db;
  const { initializeApp, getApps, cert } = await import('firebase-admin/app');
  const { getFirestore } = await import('firebase-admin/firestore');
  // 키는 JSON 전체(FIREBASE_SERVICE_ACCOUNT) 또는 세 칸(PROJECT_ID·CLIENT_EMAIL·PRIVATE_KEY)으로 받음
  let sa = {};
  try { sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}'); } catch {}
  if (!sa.private_key && process.env.FIREBASE_PRIVATE_KEY) sa = { project_id: process.env.FIREBASE_PROJECT_ID, client_email: process.env.FIREBASE_CLIENT_EMAIL, private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/^"|"$/g, '') };
  if (sa.private_key) sa.private_key = sa.private_key.replace(/\\n/g, '\n');
  const app = getApps()[0] || initializeApp({ credential: cert(sa) });
  _db = getFirestore(app);
  return _db;
}
const docId = (path) => path.replace(/\//g, '|');
const CHUNK = 900000;
export async function fsGet(path) {
  const d = await db();
  const snap = await d.collection('files').doc(docId(path)).get();
  if (!snap.exists) return null;
  const m = snap.data();
  let buf;
  if (m.parts) {
    const ps = await Promise.all(Array.from({ length: m.parts }, (_, i) => d.collection('files').doc(docId(path) + '#' + (i + 1)).get()));
    buf = Buffer.concat(ps.map((p) => Buffer.from(p.data().b)));
  } else buf = Buffer.from(m.b);
  return { buf, etag: m.etag, contentType: m.ct || typeOf(path) };
}
export async function fsPut(path, body, opts = {}) {
  const d = await db();
  const buf = Buffer.from(body);
  const etag = etagOf(buf);
  const ref = d.collection('files').doc(docId(path));
  const parts = buf.length > CHUNK ? Math.ceil(buf.length / CHUNK) : 0;
  await d.runTransaction(async (tx) => {
    const cur = await tx.get(ref);
    if (cur.exists && opts.allowOverwrite === false) throw new Error('exists');
    if (opts.ifMatch && (!cur.exists || cur.data().etag !== opts.ifMatch)) throw new Error('precondition failed');
    const meta = { etag, ct: opts.contentType || typeOf(path), size: buf.length, t: Date.now(), path };
    if (parts) {
      for (let i = 0; i < parts; i++) tx.set(d.collection('files').doc(docId(path) + '#' + (i + 1)), { b: buf.subarray(i * CHUNK, (i + 1) * CHUNK) });
      tx.set(ref, { ...meta, parts });
    } else tx.set(ref, { ...meta, b: buf });
  });
  return { pathname: path, etag };
}

export async function blobGet(path, opts = {}) {
  if (FS_MODE) { const r = await fsGet(path); return r ? { statusCode: 200, stream: new Blob([r.buf]).stream(), blob: { etag: r.etag, contentType: r.contentType, size: r.buf.length } } : null; }
  if (!LOCAL) return vget(path, { access: 'private', ...opts });
  try {
    const buf = await fs.readFile(nodePath.join(LOCAL, path));
    const type = path.endsWith('.json') ? 'application/json' : path.endsWith('.webp') ? 'image/webp' : 'image/jpeg';
    return { statusCode: 200, stream: new Blob([buf]).stream(), blob: { etag: etagOf(buf), contentType: type, size: buf.length } };
  } catch { return null; }
}
export async function blobPut(path, body, opts = {}) {
  if (FS_MODE) return fsPut(path, body, opts);
  if (!LOCAL) return vput(path, body, { access: 'private', addRandomSuffix: false, ...opts });
  const file = nodePath.join(LOCAL, path);
  let cur = null; try { cur = await fs.readFile(file); } catch {}
  if (cur && opts.allowOverwrite === false) throw new Error('exists');
  if (opts.ifMatch && (!cur || etagOf(cur) !== opts.ifMatch)) throw new Error('precondition failed');
  const buf = Buffer.from(body);
  await fs.mkdir(nodePath.dirname(file), { recursive: true });
  await fs.writeFile(file, buf);
  return { pathname: path, etag: etagOf(buf) };
}

export function authed(req) {
  const url = new URL(req.url);
  const given = req.headers.get('x-app-key') || url.searchParams.get('k') || '';
  const key = process.env.APP_KEY || '';
  if (!key || given.length !== key.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(key));
}

export const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export const deny = () => json({ error: '접근 키가 올바르지 않습니다' }, 401);

// 경로 검사: 영문·숫자·한글·-_./ 만, '..' 금지
export function safePath(p) {
  if (!p || p.includes('..') || p.startsWith('/') || !/^[\w\-./가-힣]+$/.test(p)) return null;
  return p;
}

// 서버 메모리 캐시: 잘 안 바뀌는 파일(설정·교과서 정보·교육과정)만 5분 기억 → Blob 읽기 줄이기
// 박스(units)·최종 코드(final)·개인 코딩(codings)은 여러 명이 고치고 etag로 충돌을 막으므로 절대 캐시하지 않음
const MEM = new Map();
const CACHEABLE = (p) => /^config\/[^/]+\.json$/.test(p) || /^books\/[^/]+\/meta\.json$/.test(p) || /^curriculum\/[^/]+\.json$/.test(p);
const TTL = 300e3;
export const forget = (p) => MEM.delete(p);
const clone = (x) => (x == null ? x : JSON.parse(JSON.stringify(x)));
export async function readJSON(path, { fresh = false } = {}) {
  const hit = MEM.get(path);
  if (!fresh && hit && Date.now() - hit.t < TTL) return { data: clone(hit.data), etag: hit.etag };
  const r = await blobGet(path, { useCache: false });
  let out = { data: null, etag: null };
  if (r && r.statusCode === 200) {
    const text = await new Response(r.stream).text();
    // 읽을 때 압축 때문에 약한 ETag(W/"…")가 올 수 있어 쓰기 조건과 맞도록 접두어 제거
    out = { data: JSON.parse(text), etag: (r.blob.etag || '').replace(/^W\//, '') };
  }
  if (CACHEABLE(path)) MEM.set(path, { data: clone(out.data), etag: out.etag, t: Date.now() });
  return out;
}

// etag가 있으면 그 버전일 때만 덮어씀, 없으면 새 파일일 때만 씀 → 동시 수정 충돌 방지
export async function writeJSON(path, data, etag) {
  const opts = {
    contentType: 'application/json',
    addRandomSuffix: false,
    cacheControlMaxAge: 60,
  };
  if (etag) { opts.allowOverwrite = true; opts.ifMatch = etag; }
  else opts.allowOverwrite = false;
  try {
    const res = await blobPut(path, JSON.stringify(data), opts);
    const et = (res.etag || '').replace(/^W\//, '');
    if (CACHEABLE(path)) MEM.set(path, { data: clone(data), etag: et, t: Date.now() });
    return { ok: true, etag: et };
  } catch (e) {
    const cur = await readJSON(path, { fresh: true });
    return { ok: false, conflict: true, current: cur, error: String(e.message || e) };
  }
}

export async function readBody(req) {
  try { return await req.json(); } catch { return null; }
}
