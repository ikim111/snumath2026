// 공통: 비밀 키 확인 + 비공개 Blob 읽기/쓰기
import { get as vget, put as vput } from '@vercel/blob';
import { timingSafeEqual, createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import nodePath from 'node:path';

// LOCAL_BLOB_DIR가 있으면 로컬 폴더를 저장소처럼 사용 (개발·시험용)
const LOCAL = process.env.LOCAL_BLOB_DIR;
const etagOf = (buf) => '"' + createHash('md5').update(buf).digest('hex') + '"';
export async function blobGet(path, opts = {}) {
  if (!LOCAL) return vget(path, { access: 'private', ...opts });
  try {
    const buf = await fs.readFile(nodePath.join(LOCAL, path));
    const type = path.endsWith('.json') ? 'application/json' : path.endsWith('.webp') ? 'image/webp' : 'image/jpeg';
    return { statusCode: 200, stream: new Blob([buf]).stream(), blob: { etag: etagOf(buf), contentType: type, size: buf.length } };
  } catch { return null; }
}
export async function blobPut(path, body, opts = {}) {
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

export async function readJSON(path) {
  const r = await blobGet(path, { useCache: false });
  if (!r || r.statusCode !== 200) return { data: null, etag: null };
  const text = await new Response(r.stream).text();
  // 읽을 때 압축 때문에 약한 ETag(W/"…")가 올 수 있어 쓰기 조건과 맞도록 접두어 제거
  return { data: JSON.parse(text), etag: (r.blob.etag || '').replace(/^W\//, '') };
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
    return { ok: true, etag: res.etag };
  } catch (e) {
    const cur = await readJSON(path);
    return { ok: false, conflict: true, current: cur, error: String(e.message || e) };
  }
}

export async function readBody(req) {
  try { return await req.json(); } catch { return null; }
}
