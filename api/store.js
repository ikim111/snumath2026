// 일반 JSON 저장소 (설정, 교과서 정보, 박스, 최종 코드, 교육과정)
// 개인 코딩(codings/)은 여기서 읽을 수 없음 → 비교 전 서로의 코드가 보이지 않게
import { authed, deny, json, safePath, readJSON, writeJSON, readBody } from './_lib.js';

const ALLOWED = [/^config\/[\w\-가-힣]+\.json$/, /^books\/[\w\-]+\/(meta|units)\.json$/, /^final\/[\w\-]+\.json$/, /^curriculum\/[\w\-가-힣]+\.json$/, /^backup\/[\w\-]+\.json$/]; // backup/: 전체 백업(기능 바꾸기 전)
const ok = (p) => p && ALLOWED.some((re) => re.test(p));

export async function GET(req) {
  if (!authed(req)) return deny();
  const p = safePath(new URL(req.url).searchParams.get('f'));
  if (!ok(p)) return json({ error: '허용되지 않은 경로' }, 400);
  return json(await readJSON(p));
}

export async function PUT(req) {
  if (!authed(req)) return deny();
  const p = safePath(new URL(req.url).searchParams.get('f'));
  if (!ok(p)) return json({ error: '허용되지 않은 경로' }, 400);
  const body = await readBody(req);
  if (!body || body.data === undefined) return json({ error: '내용 없음' }, 400);
  const r = await writeJSON(p, body.data, body.etag || null);
  return json(r, r.ok ? 200 : 409);
}
