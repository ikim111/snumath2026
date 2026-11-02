// 전체 백업용(읽기 전용, 키 필요): 저장된 파일 목록과 파일 하나씩 내려받기. Firestore·Blob 둘 다
// ?src=firestore|blob&list=1[&cursor=] → { files:[{p,size,md5?}], cursor }
// ?src=firestore|blob&p=경로 → 파일 그대로
import { list, get as vget } from '@vercel/blob';
import { authed, deny, json, safePath, fsGet, fsDb } from './_lib.js';

async function listFs(cursor) {
  const d = await fsDb();
  // 내용(b)은 빼고 정보만 읽음. 조각 문서(경로#n)는 원래 파일에 합쳐지므로 목록에서 뺌
  let q = d.collection('files').select('path', 'size', 'etag').orderBy('__name__').limit(500);
  if (cursor) q = q.startAfter(cursor);
  const snap = await q.get();
  const files = snap.docs.filter((x) => !x.id.includes('#')).map((x) => ({ p: x.get('path') || x.id.replace(/\|/g, '/'), size: x.get('size') || 0, md5: (x.get('etag') || '').replace(/"/g, '') }));
  return { files, cursor: snap.size === 500 ? snap.docs[snap.size - 1].id : null };
}

async function listBlob(cursor) {
  const r = await list({ cursor, limit: 1000 });
  return { files: r.blobs.map((b) => ({ p: b.pathname, size: b.size, t: b.uploadedAt })), cursor: r.hasMore ? r.cursor : null };
}

export async function GET(req) {
  if (!authed(req)) return deny();
  const q = new URL(req.url).searchParams;
  const src = q.get('src');
  if (src !== 'firestore' && src !== 'blob') return json({ error: 'src=firestore|blob' }, 400);
  if (q.get('list')) return json(src === 'firestore' ? await listFs(q.get('cursor')) : await listBlob(q.get('cursor') || undefined));

  const p = safePath(q.get('p'));
  if (!p) return json({ error: '경로' }, 400);
  let buf, ct;
  if (src === 'firestore') {
    const r = await fsGet(p);
    if (!r) return json({ error: '없음' }, 404);
    buf = r.buf; ct = r.contentType;
  } else {
    const r = await vget(p, { access: 'private', useCache: false });
    if (!r || r.statusCode !== 200) return json({ error: '없음' }, 404);
    buf = Buffer.from(await new Response(r.stream).arrayBuffer()); ct = r.blob.contentType;
  }
  return new Response(buf, { headers: { 'content-type': ct || 'application/octet-stream', 'cache-control': 'no-store' } });
}
