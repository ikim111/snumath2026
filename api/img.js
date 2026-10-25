// 교과서 쪽 이미지 (비공개 Blob에서 키 확인 후 전달)
import { authed, deny, json, safePath, blobGet } from './_lib.js';

export async function GET(req) {
  if (!authed(req)) return deny();
  const p = safePath(new URL(req.url).searchParams.get('p'));
  if (!p || !/^books\/[\w\-]+\/pages\/[\w\-.]+\.(webp|jpg|png)$/.test(p)) return json({ error: '경로' }, 400);
  const r = await blobGet(p);
  if (!r || r.statusCode !== 200) return json({ error: '없음' }, 404);
  return new Response(r.stream, {
    headers: { 'content-type': r.blob.contentType, 'cache-control': 'private, max-age=31536000, immutable' },
  });
}
