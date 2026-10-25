// 개인 코딩: 자기 것만 읽고 씀. 세 명 모두 '완료'하거나 비교를 연 뒤에만 전체 공개.
import { authed, deny, json, readJSON, writeJSON, readBody } from './_lib.js';

// 진행률 응답만 1분 기억(읽기 전용, etag 저장에는 쓰지 않음). 내가 저장하면 그 목록은 지움
const PROG = new Map();
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

  // 진행률만: 코드 내용 없이 '다 한 단위 id'와 완료 여부만 (블라인드 유지)
  if (q.get('progress')) {
    const hit = PROG.get(book);
    if (hit && Date.now() - hit.t < 60e3) return json(hit.out);
    const files = await Promise.all(list.map((c) => readJSON(`codings/${book}/${c}.json`)));
    const out = {};
    list.forEach((c, i) => {
      const d = files[i].data || {}, items = d.items || {};
      out[c] = { done: !!d.done, ids: Object.keys(items).filter((k) => { const it = items[k] || {}; return ((it.codes && it.codes.length) || it.code) && it.lit; }) };
    });
    PROG.set(book, { out, t: Date.now() });
    return json(out);
  }

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
  return json(await readJSON(`codings/${book}/${coder}.json`, { fresh: true })); // 내 것은 항상 최신
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
  PROG.delete(book);
  return json(r, r.ok ? 200 : 409);
}
