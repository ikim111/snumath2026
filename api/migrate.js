// 한 번만 쓰는 이전 도구: Vercel Blob → Firestore 복사·비교 (키 필요). 이전이 끝나면 지움
import { list, get as vget } from '@vercel/blob';
import { authed, deny, json, fsGet, fsPut } from './_lib.js';
import { createHash } from 'node:crypto';

const md5 = (buf) => '"' + createHash('md5').update(buf).digest('hex') + '"';

async function blobBuf(pathname) {
  const r = await vget(pathname, { access: 'private', useCache: false });
  if (!r || r.statusCode !== 200) return null;
  return { buf: Buffer.from(await new Response(r.stream).arrayBuffer()), ct: r.blob.contentType };
}

export async function GET(req) {
  if (!authed(req)) return deny();
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) return json({ error: 'FIREBASE_SERVICE_ACCOUNT 없음' }, 500);
  const q = new URL(req.url).searchParams;
  const prefix = q.get('prefix') || '';
  const mode = q.get('mode') || 'list'; // list | copy | verify
  const cursor = q.get('cursor') || undefined;
  const r = await list({ prefix, cursor, limit: mode === 'list' ? 1000 : 60 });
  const files = r.blobs.map((b) => ({ p: b.pathname, size: b.size }));
  if (mode === 'list') return json({ files: files.length, bytes: files.reduce((s, f) => s + f.size, 0), cursor: r.cursor, hasMore: r.hasMore, sample: files.slice(0, 5) });

  const out = { ok: 0, bad: [], bytes: 0 };
  const queue = [...files];
  const work = async () => {
    while (queue.length) {
      const f = queue.shift();
      try {
        const b = await blobBuf(f.p);
        if (!b) { out.bad.push(f.p + ' (Blob 읽기 실패)'); continue; }
        if (mode === 'copy') { await fsPut(f.p, b.buf, { contentType: b.ct, allowOverwrite: true }); out.ok++; out.bytes += b.buf.length; }
        else {
          const g = await fsGet(f.p);
          if (g && g.buf.length === b.buf.length && md5(g.buf) === md5(b.buf)) out.ok++;
          else out.bad.push(f.p + (g ? ' (내용 다름)' : ' (Firestore에 없음)'));
        }
      } catch (e) { out.bad.push(f.p + ' (' + String(e.message || e).slice(0, 80) + ')'); }
    }
  };
  await Promise.all(Array.from({ length: 6 }, work));
  return json({ ...out, files: files.length, cursor: r.cursor, hasMore: r.hasMore });
}
