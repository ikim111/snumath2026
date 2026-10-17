// 개인 코딩: 자기 것만 읽고 씀. 세 명 모두 '완료'하거나 비교를 연 뒤에만 전체 공개.
import { authed, deny, json, readJSON, writeJSON, readBody } from './_lib.js';

const okId = (s) => s && /^[\w\-가-힣]+$/.test(s);

async function coders() {
  const { data } = await readJSON('config/app.json');
  return (data && data.coders) || [];
}

export async function GET(req) {
  if (!authed(req)) return deny();
  const q = new URL(req.url).searchParams;
  const book = q.get('book');
  if (!okId(book)) return json({ error: 'book 필요' }, 400);
  const list = await coders();

  if (q.get('all')) {
    const files = await Promise.all(list.map((c) => readJSON(`codings/${book}/${c}.json`)));
    const status = Object.fromEntries(list.map((c, i) => [c, !!(files[i].data && files[i].data.done)]));
    const fin = await readJSON(`final/${book}.json`);
    const opened = Object.values(status).every(Boolean) || !!(fin.data && fin.data.opened);
    if (!opened) return json({ opened: false, status });
    const data = Object.fromEntries(list.map((c, i) => [c, files[i].data || { items: {} }]));
    return json({ opened: true, status, data });
  }

  const coder = q.get('coder');
  if (!okId(coder) || !list.includes(coder)) return json({ error: '코더 이름 확인' }, 400);
  return json(await readJSON(`codings/${book}/${coder}.json`));
}

export async function PUT(req) {
  if (!authed(req)) return deny();
  const q = new URL(req.url).searchParams;
  const book = q.get('book'), coder = q.get('coder');
  if (!okId(book) || !okId(coder)) return json({ error: '잘못된 요청' }, 400);
  if (!(await coders()).includes(coder)) return json({ error: '코더 이름 확인' }, 400);
  const body = await readBody(req);
  if (!body || !body.data) return json({ error: '내용 없음' }, 400);
  const r = await writeJSON(`codings/${book}/${coder}.json`, body.data, body.etag || null);
  return json(r, r.ok ? 200 : 409);
}
