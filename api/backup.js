// 전체 백업용(읽기 전용, 키 필요): Firestore에 저장된 파일 목록과 파일 하나씩 내려받기
// ?src=firestore&list=1[&cursor=] → { files:[{p,size,md5}], cursor }
// ?src=firestore&p=경로 → 파일 그대로
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

export async function GET(req) {
  if (!authed(req)) return deny();
  const q = new URL(req.url).searchParams;
  const src = q.get('src');
  if (src !== 'firestore') return json({ error: 'src=firestore' }, 400);
  if (q.get('list')) return json(await listFs(q.get('cursor')));

  const p = safePath(q.get('p'));
  if (!p) return json({ error: '경로' }, 400);
  const r = await fsGet(p);
  if (!r) return json({ error: '없음' }, 404);
  return new Response(r.buf, { headers: { 'content-type': r.contentType || 'application/octet-stream', 'cache-control': 'no-store' } });
}
