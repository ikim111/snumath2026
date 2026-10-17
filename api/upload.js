// 관리용 업로드: 쪽 이미지·초기 박스 등을 올릴 때 사용 (키 필요)
import { authed, deny, json, safePath, blobPut } from './_lib.js';

export async function PUT(req) {
  if (!authed(req)) return deny();
  const p = safePath(new URL(req.url).searchParams.get('p'));
  if (!p || !/^(books|config|curriculum|final)\//.test(p)) return json({ error: '경로' }, 400);
  const type = req.headers.get('content-type') || 'application/octet-stream';
  const buf = Buffer.from(await req.arrayBuffer());
  const r = await blobPut(p, buf, { contentType: type, allowOverwrite: true, cacheControlMaxAge: 60 });
  return json({ ok: true, pathname: r.pathname, etag: r.etag });
}
