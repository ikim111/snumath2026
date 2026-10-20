/* 통계 단원 코딩 도구 — 김형준·조상연·이성식 조 */
'use strict';

// ───────── 기본값 ─────────
const KINDS = { main: '본 과제', intro: '도입 질문', example: '예제', review: '이전 학년 복습' };
const FRAMEWORK_CSV = `후보,단계,코드,이름,학생이 하는 일
우리초안,P 문제,P1,문제 파악,맥락에서 무엇이 궁금한지 생각하기(질문은 만들지 않음)
우리초안,P 문제,P2,문제 설정,자료로 답할 수 있는 통계적 질문을 직접 만들기
우리초안,C 수집,C1,수집 계획,조사 대상·방법·변수·인원 정하기
우리초안,C 수집,C2,수집 실행,"실제로 조사·측정·검색, 자료 입력"
우리초안,C 수집,C3,자료 검토,자료의 수집 방법·대표성·적절성 따지기
우리초안,A 분석,A1a,읽기,한 칸의 값을 그대로 읽거나 세기
우리초안,A 분석,A1b,비교·관계,"둘 이상 비교, 여러 칸 합치기, 분포 모양·경향 기술"
우리초안,A 분석,A2a,계산,평균·상대도수 등 공식 계산
우리초안,A 분석,A2b,개념·용어,정의·성질·용어 쓰거나 고르기
우리초안,A 분석,A3,나타내기,표·그래프 그리거나 완성하기
우리초안,A 분석,A4,선택과 근거,적절한 대푯값·표·그래프 고르고 근거 대기
우리초안,I 해석,I1,결론·의사결정,맥락 속 질문에 분석 결과로 답하기
우리초안,I 해석,I2,일반화·예측,조사하지 않은 집단이나 미래로 확장
우리초안,I 해석,I3,확인·평가,주어진 표현·주장·결론의 적절성 평가
우리초안,I 해석,I4,새 질문,결과를 보고 새 질문 만들기
우리초안,X 기타,X,해당 없음,본 과제이지만 어느 단계에도 해당하지 않음
전혜원·김래영2019,F 문제설정,F1,문제의 파악,"자료를 수집하기 전에 자료를 수집하는 이유를 파악하며, 자료 수집과 자료 분석, 결과 해석의 동기를 유발할 수 있도록 문제를 파악한다."
전혜원·김래영2019,F 문제설정,F2,문제의 설정,조사하고자 하는 주제에 맞는 문제를 설정한다.
전혜원·김래영2019,P 자료 계획 및 수집,P1,자료 수집 계획,적합한 자료를 수집하기 위해 계획을 설계한다.
전혜원·김래영2019,P 자료 계획 및 수집,P2,자료 수집 계획 이행,"자료를 수집하기 위해 설계한 계획대로 관찰, 측정, 설문 등을 통해 자료를 얻는 활동을 진행한다."
전혜원·김래영2019,R 자료 표현 및 분석,R1,표현 도구 선정하기,"(R1.1) 표현 도구들을 이해하고 유용성을 인식한 후에 자료에 적합한 표현 도구를 선정한다. (R1.2) 선정한 표현 도구를 어떻게 표현해야 자료 집단의 특성을 효과적으로 드러낼 수 있는지 고려한다."
전혜원·김래영2019,R 자료 표현 및 분석,R2,변환하기,자료를 선정한 표현 도구를 이용하여 변환한다.
전혜원·김래영2019,R 자료 표현 및 분석,R3,분석,"(R3.1) 표현도구들에서 제목이나 축의 이름, 주어진 자료 이름 등과 같이 그래프에서 확실히 시각화된 자료를 명확히 관찰하는 것으로 한 눈에 바로 읽을 수 있는 정보를 읽을 수 있다. (R3.2) 국소적인 시각으로 표현된 자료들의 관계를 비교한다. 이 때 문맥에서 요소의 의미를 고려하지 않고 시각적인 것으로 해석한다. (R3.3) 표현된 값의 대부분 또는 전부를 종합하거나 통합해서 하나의 진술이나 관계로 분석한다."
전혜원·김래영2019,I 결과 해석,I1,해석·추론,"자료 분석을 바탕으로 초기에 설정한 문제와 연관 지어서 해석한다. 자료에 내재되어 있는 의미로부터 추론하고 예측하여 자료 이면에 있는 정보를 추론한다."
전혜원·김래영2019,I 결과 해석,I2,확인·평가,해석한 것을 확인하고 평가한다.
배혜진·이동환2016,F 문제 설정,F1,교사의 문제 제기,
배혜진·이동환2016,F 문제 설정,F2,문제화,
배혜진·이동환2016,C 자료 수집,C1,조사의 절차,
배혜진·이동환2016,C 자료 수집,C2,자료 수집 계획,
배혜진·이동환2016,C 자료 수집,C3,자료 수집 실행,
배혜진·이동환2016,A 자료 분석,A1,표현 방법의 선정 및 유용성 인식,
배혜진·이동환2016,A 자료 분석,A2,자료의 변환,
배혜진·이동환2016,A 자료 분석,A3,자료 읽기(그래프 이해 1수준),
배혜진·이동환2016,A 자료 분석,A4,관계 비교(그래프 이해 2수준),
배혜진·이동환2016,I 결과 해석,I1,"자료로부터의 추론, 추이 예측",
배혜진·이동환2016,I 결과 해석,I2,조사 집단의 성질 파악,
배혜진·이동환2016,I 결과 해석,I3,다른 집단이나 상황의 적용,
배혜진·이동환2016,I 결과 해석,I4,확인 및 평가,
배혜진·이동환2016,I 결과 해석,I5,결과의 유용성 인식 및 새로운 문제 제기,`;

// 코드에 마우스를 올리면 보이는 구분 규칙 (우리초안 기준, 설계근거 문서 6·7절)
const CODE_TIPS = {
  P1: '질문을 직접 만들면 P2',
  P2: '탐구 시작의 질문 만들기는 P2, 결과를 본 뒤 새 질문은 I4',
  C1: '계획 세우기·수정하기',
  C2: '실제로 조사·측정·검색하거나 자료를 입력',
  C3: '자료 자체(수집 방법·대표성)는 C3, 결과를 어디까지 일반화할지는 I2, 이미 있는 결론 평가는 I3',
  A1a: '한 칸을 그대로 읽으면 A1a, 둘 이상 비교·여러 칸 합치면 A1b',
  A1b: '더하기만 하면 A1b, 공식(평균·상대도수·백분율)을 쓰면 A2a · 답이 맥락 속 판단(\'~라고 할 수 있다\')이면 I1',
  A2a: '공식(평균·상대도수·백분율)을 쓰면 A2a, 더하기만 하면 A1b',
  A2b: '정의·성질·용어를 쓰거나 고르기',
  A3: '표·그래프를 그리거나 완성하기 · "알맞은 것을 골라 나타내시오"는 A4 + A3 두 행',
  A4: '표현을 고르면 A4, 이미 있는 표현을 평가하면 I3 · 대푯값·표현 선택 이유 설명도 A4 (결론의 근거면 I1)',
  I1: '답이 자료에 대한 말(값·계급)이면 A1, 맥락 속 대상에 대한 판단이면 I1 · 결론의 근거 설명도 I1',
  I2: '조사하지 않은 집단이나 미래로 확장 · 자료 자체의 대표성 따지기는 C3',
  I3: '이미 있는 표현·주장·결론을 평가하면 I3, 표현을 고르면 A4',
  I4: '결과를 본 뒤 새 질문은 I4, 탐구 시작의 질문은 P2',
  X: '학생 과제이지만 어느 단계에도 해당하지 않음 (본문 설명·조작 안내는 처음부터 박스 안 침)',
};
// 교육과정 동사 대응 (기본 코드)
const VERB_TIPS = {
  P: '탐구 문제 관련이지만 하위 활동이 드러나지 않음', P2: '(탐구 문제를) 설정하다',
  C: '자료 수집 관련이지만 하위 활동이 드러나지 않음', C1: '계획을 세우다·수정하다', C2: '수집하다·조사하다', C3: '(자료가) 적절한지 판단하다',
  A: '분석하다 (하위 활동 없음)', A1: '읽다, 비교하다, (분포·관계를) 설명하다 · 표·그래프 자체 해석', A2: '구하다 / 뜻을 알다·이해하다(개념)', A3: '나타내다·정리하다(표·그래프)', A4: '(적절한 것을) 선택하다, 목적에 맞게 나타내다',
  I: '해석 관련이지만 하위 활동이 드러나지 않음', I1: '해석하다(탐구 문제·맥락과 연결), 의사결정하다·토론하다', I2: '예상하다·일반화하다', I3: '오류를 찾다, 비판적으로 판단하다',
  X: '인식하다, 태도를 갖다 (가치·태도)',
};
function codeHelp(code) {
  const c = codeList().find((x) => x.code === code);
  if (!c) return '';
  const ours = S.cfg.activeFramework === '우리초안';
  const tip = ours ? (isCur() ? VERB_TIPS[code] : CODE_TIPS[code]) : '';
  return `<b>${esc(c.code)} ${esc(c.name)}</b>${c.desc ? ' — ' + esc(c.desc) : ''}${tip ? `<div class="tip">${isCur() ? '동사' : '구분'}: ${esc(tip)}</div>` : ''}`;
}
const DEFAULT_CFG = () => ({
  coders: ['조상연', '이성식', '김형준'],
  activeFramework: '전혜원·김래영2019',
  frameworks: parseFrameworks(FRAMEWORK_CSV),
  contentElements: ['대푯값', '줄기와 잎 그림', '도수분포표', '히스토그램', '도수분포다각형', '상대도수', '통계적 탐구', '산포도', '상자그림', '산점도·상관관계', '기타'],
  positions: ['도입', '문제', '활동', '넓히기', '연습', '탐구', '평가', '기타'],
  stdList: ['9수04-01', '9수04-02', '9수04-03', '9수04-04', '9수04-07', '9수04-08', '9수04-09', '기타'],
  defaultKinds: ['main', 'intro', 'example'],
  litList: ['통계·수학적 지식의 절차적 활용', '비판적 평가', '의사소통', '해당 없음'],
  books: [],
  v2: true,
});

// ───────── 상태 ─────────
const S = {
  key: '', cfg: null, cfgEtag: null,
  metas: {}, book: null, units: [], unitsEtag: null, dirty: new Set(), deleted: new Set(),
  mine: { done: false, items: {} }, mineEtag: null,
  coder: '', page: 0, sel: null, multi: new Set(), edit: false, draw: false, zoom: 1,
  imgCache: new Map(),
};
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ls = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch {} } };

function toast(msg, ms = 2200) {
  const t = $('#toast'); t.textContent = msg; t.classList.remove('hidden');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.add('hidden'), ms);
}
function saveState(msg, err) { const e = $('#saveState'); e.textContent = msg; e.classList.toggle('err', !!err); }

// ───────── CSV ─────────
function parseCSV(text) {
  const rows = []; let row = [], f = '', q = false;
  text = text.replace(/^﻿/, '');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(f); rows.push(row); row = []; f = ''; }
    else f += c;
  }
  if (f !== '' || row.length) { row.push(f); rows.push(row); }
  return rows.filter((r) => r.some((x) => x.trim() !== ''));
}
const csvCell = (v) => { v = String(v ?? ''); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
const toCSV = (rows) => '﻿' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n');
function download(name, text) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
  a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function parseFrameworks(text) {
  const out = {};
  parseCSV(text).slice(1).forEach(([fw, stage, code, name, desc]) => {
    if (!fw || !code) return;
    (out[fw.trim()] ||= []).push({ stage: stage.trim(), code: code.trim(), name: (name || '').trim(), desc: (desc || '').trim() });
  });
  return out;
}
function frameworksToCSV(fws) {
  const rows = [['후보', '단계', '코드', '이름', '학생이 하는 일']];
  for (const [fw, list] of Object.entries(fws)) list.forEach((c) => rows.push([fw, c.stage, c.code, c.name, c.desc]));
  return rows.map((r) => r.map(csvCell).join(',')).join('\n');
}

// ───────── API ─────────
async function api(path, opts = {}) {
  const res = await fetch(path, { ...opts, headers: { 'x-app-key': S.key, 'content-type': 'application/json', ...(opts.headers || {}) } });
  if (res.status === 401) { showGate(); throw new Error('키 오류'); }
  const body = await res.json().catch(() => ({}));
  if (!res.ok && res.status !== 409) throw new Error(body.error || res.statusText);
  return { status: res.status, ...body };
}
const getStore = (f) => api('/api/store?f=' + encodeURIComponent(f));
const putStore = (f, data, etag) => api('/api/store?f=' + encodeURIComponent(f), { method: 'PUT', body: JSON.stringify({ data, etag }) });

async function pageImage(bookId, file) {
  const p = `books/${bookId}/pages/${file}`;
  if (S.imgCache.has(p)) return S.imgCache.get(p);
  const prom = fetch('/api/img?p=' + encodeURIComponent(p), { headers: { 'x-app-key': S.key } })
    .then((r) => { if (!r.ok) throw new Error('이미지 없음'); return r.blob(); })
    .then((b) => URL.createObjectURL(b));
  S.imgCache.set(p, prom);
  prom.catch(() => S.imgCache.delete(p));
  return prom;
}

// ───────── 분석틀 도우미 ─────────
const fw = () => S.cfg.frameworks[S.cfg.activeFramework] || [];
const codeInfo = (code) => fw().find((c) => c.code === code);
const stageKey = (code) => {
  const c = codeInfo(code); if (c) return c.stage;
  if (/^[A-Z]$/.test(code || '')) { const s = fw().find((x) => x.code[0] === code); if (s) return s.stage; } // 단계만 고른 코드
  return code ? '?' : '';
};
// 교육과정용: 기본 코드 목록 (+ 단계만)
function basicCodes() {
  const out = [];
  fw().forEach((c) => {
    const b = basicCode(c.code);
    let o = out.find((x) => x.code === b);
    if (!o) out.push(o = { stage: c.stage, code: b, names: [], descs: [] });
    o.names.push(c.name); if (c.desc) o.descs.push(c.desc);
  });
  return out.map((o) => ({ stage: o.stage, code: o.code, name: o.names.join('/'), desc: o.descs.join(' / ') }));
}
function codeList() {
  return fw(); // 10/20 결정: 교육과정도 교과서와 같은 2차 코드까지
}
function codeListBasicLegacy() {
  const list = basicCodes(), stages = [];
  list.forEach((c) => { if (!stages.includes(c.stage)) stages.push(c.stage); });
  const extra = stages.filter((st) => /^[PCAIF]/.test(st) && st[0] !== 'X').map((st) => ({ stage: st, code: st[0], name: '단계만', desc: '하위 활동 없이 단계만 언급 (예: 분석하다)' }));
  return stages.flatMap((st) => [...extra.filter((e) => e.stage === st), ...list.filter((c) => c.stage === st)]);
}
const basicCode = (code) => (code || '').replace(/[a-z]+$/, '');
function levelOf(code, level) {
  if (!code) return '';
  if (level === 'stage') return stageKey(code);
  if (level === 'basic') return basicCode(code);
  return code;
}
function categories(level) {
  const seen = [];
  fw().forEach((c) => { const k = levelOf(c.code, level); if (!seen.includes(k)) seen.push(k); });
  return seen;
}
const stageColor = (code) => {
  const st = stageKey(code);
  if (!st || st[0] === 'X' || st === '?') return 'var(--X)';
  const order = [...new Set(fw().map((c) => c.stage))].filter((x) => x[0] !== 'X');
  return ['var(--P)', 'var(--C)', 'var(--A)', 'var(--I)', 'var(--X)'][order.indexOf(st)] || 'var(--X)';
};
const litList = () => S.cfg.litList || DEFAULT_CFG().litList;
const isCur = (id = S.book) => (S.metas[id] || {}).type === 'curriculum';
function where(bookId, u) {
  const m = S.metas[bookId];
  if (!m) return '';
  if (m.type === 'curriculum') return `${u.std || ''} ${u.task || ''}`.trim();
  return m.pages[u.page] ? m.pages[u.page].label + '쪽' : '';
}
const isRequired = (u) => (S.cfg.defaultKinds || ['main', 'intro']).includes(u.kind || 'main');

// ───────── 시작 ─────────
function showGate() { $('#gate').classList.remove('hidden'); }
$('#gateGo').onclick = () => { const k = $('#gateKey').value.trim(); if (k) location.href = '/' + k; };
$('#gateKey').onkeydown = (e) => { if (e.key === 'Enter') $('#gateGo').click(); };

async function init() {
  // 주소 뒤 단어(snumath2026.vercel.app/analysis)가 곧 접근 키
  const pm = location.pathname.match(/^\/([\w-]+)\/?$/);
  const m = location.hash.match(/^#(?:k=)?([\w-]+)/);
  S.key = (pm && pm[1]) || (m && m[1]) || ls.get('appkey') || '';
  if (!S.key) return showGate();
  ls.set('appkey', S.key);

  saveState('불러오는 중…');
  const c = await getStore('config/app.json');
  let needV2 = false;
  if (c.data) {
    needV2 = !c.data.v2;
    S.cfg = { ...DEFAULT_CFG(), ...c.data }; S.cfgEtag = c.etag;
    if (needV2) S.cfg.v2 = false;
    // 빠진 항목이 있으면 기본값으로 채워 저장 (서버도 조원 목록을 알아야 함)
    if (Object.keys(DEFAULT_CFG()).some((k) => !(k in c.data))) {
      const r = await putStore('config/app.json', S.cfg, S.cfgEtag);
      if (r.ok) S.cfgEtag = r.etag;
    }
  }
  else {
    S.cfg = DEFAULT_CFG();
    const r = await putStore('config/app.json', S.cfg, null);
    S.cfgEtag = r.etag || null;
  }
  if (needV2) {
    const fresh = DEFAULT_CFG();
    const next = { ...S.cfg, v2: true, activeFramework: '전혜원·김래영2019', defaultKinds: ['main', 'intro', 'example'], litList: fresh.litList,
      frameworks: { ...S.cfg.frameworks, '전혜원·김래영2019': fresh.frameworks['전혜원·김래영2019'] } };
    const r = await putStore('config/app.json', next, S.cfgEtag);
    if (r.ok) { S.cfg = next; S.cfgEtag = r.etag; }
  }
  await loadMetas();
  await seedCurriculum();
  fillHeader();
  bindTabs();
  bindCoding();
  const b = ls.get('book');
  await selectBook(S.cfg.books.includes(b) ? b : S.cfg.books[0]);
  saveState('');
}

// 교육과정(공개 문서) 의미 단위를 처음 한 번 등록
async function seedCurriculum() {
  for (const period of ['2009', '2015', '2022']) {
    const id = 'C' + period;
    if (S.cfg.books.includes(id)) continue;
    try {
      const { meta, units } = await (await fetch(`/curriculum_${period}.json`)).json();
      const cur = await getStore(`books/${id}/meta.json`);
      if (!cur.data) {
        await putStore(`books/${id}/meta.json`, meta, null);
        await putStore(`books/${id}/units.json`, { units }, null);
      }
      const next = { ...S.cfg, books: [...S.cfg.books, id] };
      const r = await putStore('config/app.json', next, S.cfgEtag);
      if (r.ok) { S.cfg = next; S.cfgEtag = r.etag; S.metas[id] = cur.data || meta; }
    } catch (e) { console.warn(id + ' 등록 실패', e); }
  }
}
async function loadMetas() {
  const rs = await Promise.all(S.cfg.books.map((id) => getStore(`books/${id}/meta.json`)));
  S.cfg.books.forEach((id, i) => { if (rs[i].data) S.metas[id] = rs[i].data; });
}
const bookName = (id) => { const m = S.metas[id]; if (!m) return id; if (m.type === 'curriculum') return `${m.period || ''} 교육과정`.trim(); return `${m.period || ''} ${m.publisher || ''} ${m.title || id}`.trim(); };

function fillHeader() {
  $('#bookSel').innerHTML = S.cfg.books.map((id) => `<option value="${esc(id)}">${esc(isCur(id) ? bookName(id) : id + ' · ' + bookName(id))}</option>`).join('') || '<option value="">(교과서 없음)</option>';
  $('#bookSel').onchange = (e) => selectBook(e.target.value);
  const saved = ls.get('coder');
  $('#coderSel').innerHTML = '<option value="">선택하세요</option>' + S.cfg.coders.map((c) => `<option ${c === saved ? 'selected' : ''}>${esc(c)}</option>`).join('');
  S.coder = S.cfg.coders.includes(saved) ? saved : '';
  $('#coderSel').onchange = (e) => setCoder(e.target.value);
  if (!S.coder) showWho();
}

async function setCoder(name) {
  S.coder = name; ls.set('coder', name); $('#coderSel').value = name;
  $('#who').classList.add('hidden');
  await loadMine(); renderAll();
}
function showWho() {
  $('#whoList').innerHTML = S.cfg.coders.map((c) => `<button data-who="${esc(c)}">${esc(c)}</button>`).join('');
  $('#whoList').onclick = (e) => { const b = e.target.closest('[data-who]'); if (b) setCoder(b.dataset.who); };
  $('#who').classList.remove('hidden');
}
function bindTabs() {
  $('#tabs').onclick = (e) => {
    const t = e.target.dataset.tab; if (!t) return;
    document.querySelectorAll('#tabs button').forEach((b) => b.classList.toggle('on', b.dataset.tab === t));
    document.querySelectorAll('.tab').forEach((s) => s.classList.toggle('on', s.id === 'tab-' + t));
    if (t === 'compare') renderCompare();
    if (t === 'stats') renderStats();
    if (t === 'settings') renderSettings();
    if (t === 'code') renderAll();
  };
}

async function selectBook(id) {
  S.book = id || null; S.sel = null; S.page = 0;
  if (id) ls.set('book', id);
  $('#bookSel').value = id || '';
  S.units = []; S.unitsEtag = null; S.dirty.clear(); S.deleted.clear();
  if (id) {
    const u = await getStore(`books/${id}/units.json`);
    S.units = (u.data && u.data.units) || []; S.unitsEtag = u.etag;
    sortUnits();
  }
  await loadMine();
  const p = Number(ls.get('page:' + id)); if (p && S.metas[id] && p < S.metas[id].pages.length) S.page = p;
  renderAll();
}

async function loadMine() {
  S.mine = { done: false, items: {} }; S.mineEtag = null;
  if (!S.book || !S.coder) return;
  const r = await api(`/api/codings?book=${encodeURIComponent(S.book)}&coder=${encodeURIComponent(S.coder)}`);
  if (r.data) { S.mine = { done: false, items: {}, ...r.data }; S.mineEtag = r.etag; }
}

function sortUnits() {
  if (isCur()) return;
  S.units.sort((a, b) => a.page - b.page || Math.round(a.r[1] * 200) - Math.round(b.r[1] * 200) || a.r[0] - b.r[0] || (a.t || 0) - (b.t || 0));
}
const unitNo = (u) => S.units.indexOf(u) + 1;
const unitById = (id) => S.units.find((u) => u.id === id);

// ───────── 코딩 화면 ─────────
function renderAll() {
  const cur = isCur();
  document.querySelector('.code-layout').classList.toggle('cur', cur);
  renderPages(); renderPage(); renderCur(); renderPanel(); renderList(); renderDone();
}
function renderCur() {
  const V = $('#curView');
  if (!isCur()) { V.classList.add('hidden'); return; }
  V.classList.remove('hidden');
  const groups = [];
  S.units.forEach((u) => { let g = groups.find((x) => x.std === u.std); if (!g) groups.push(g = { std: u.std, list: [] }); g.list.push(u); });
  V.innerHTML = `<div class="cur-head"><b>${esc(bookName(S.book))}</b> <span class="hint">문장을 눌러 코딩 · Shift+클릭으로 여러 개 골라 합치기 · 오른쪽에서 문장 수정·나누기·추가</span></div>` +
    groups.map((g) => `<div class="cgroup"><div class="cstd">${esc(g.std || '(성취기준 없음)')}</div>${g.list.map((u) => {
      const it = S.mine.items[u.id] || {};
      return `<div class="crow ${u.id === S.sel || S.multi.has(u.id) ? 'sel' : ''}" data-id="${u.id}"><span class="cno">#${unitNo(u)}</span><span class="kind">${esc(u.task || '')}</span><span class="ctext">${esc(u.summary)}</span><span class="ccode" style="color:${it.code ? stageColor(it.code) : 'var(--muted)'}">${esc(it.code || '·')}</span></div>`;
    }).join('')}</div>`).join('');
  V.onclick = (e) => { const r = e.target.closest('.crow'); if (r) pick(r.dataset.id, e.shiftKey); };
}

function renderPages() {
  const m = S.metas[S.book];
  if (!m || !m.pages) { $('#pageList').innerHTML = ''; return; }
  $('#pageList').innerHTML = m.pages.map((p, i) => {
    const us = S.units.filter((u) => u.page === i);
    const todo = us.filter((u) => isRequired(u) && !(S.mine.items[u.id] || {}).code).length;
    return `<button data-i="${i}" class="${i === S.page ? 'on' : ''}">${esc(p.label)}<span class="cnt">${us.length}개${todo ? ' · 남음 ' + todo : us.length ? ' ✓' : ''}</span></button>`;
  }).join('');
  $('#pageList').onclick = (e) => { const b = e.target.closest('button'); if (b) goPage(+b.dataset.i); };
}

function goPage(i) {
  const m = S.metas[S.book]; if (!m || !m.pages || !m.pages.length) return;
  S.page = Math.max(0, Math.min(m.pages.length - 1, i));
  ls.set('page:' + S.book, S.page);
  renderPages(); renderPage();
}

async function renderPage() {
  const m = S.metas[S.book];
  const has = m && m.pages && m.pages.length;
  $('.vtool').classList.toggle('hidden', isCur());
  $('#stageWrap').classList.toggle('hidden', isCur());
  $('#noPage').classList.toggle('hidden', !!has || isCur());
  $('#stage').classList.toggle('hidden', !has);
  if (!has) { $('#pageLabel').textContent = ''; return; }
  const p = m.pages[S.page];
  $('#pageLabel').textContent = `${p.label}쪽 (${S.page + 1}/${m.pages.length})`;
  const wrapW = $('#stageWrap').clientWidth - 28;
  $('#stage').style.width = Math.round(Math.min(wrapW, 1000) * S.zoom) + 'px';
  $('#stage').classList.toggle('editing', S.edit || S.draw);
  $('#addBox').classList.toggle('primary', S.draw);
  $('#zoomLabel').textContent = Math.round(S.zoom * 100) + '%';
  renderBoxes();
  const want = S.page, wantBook = S.book;
  try {
    const url = await pageImage(S.book, p.file);
    if (want === S.page && wantBook === S.book) $('#pageImg').src = url;
  } catch { $('#pageImg').removeAttribute('src'); toast('쪽 이미지를 불러오지 못했습니다'); }
  // 다음 쪽 미리 받기
  if (m.pages[S.page + 1]) pageImage(S.book, m.pages[S.page + 1].file).catch(() => {});
}

function boxLabel(u) {
  const it = S.mine.items[u.id] || {};
  const k = u.kind || 'main';
  return `#${unitNo(u)}${k !== 'main' ? ' ' + KINDS[k] : ''}${it.code ? ' · ' + it.code : ''}`;
}

function renderBoxes() {
  if (isCur()) { $('#boxes').innerHTML = ''; return; }
  const onPage = S.units.filter((u) => u.page === S.page);
  const html = onPage.map((u, i) => {
    const it = S.mine.items[u.id] || {};
    // 행 나누기로 겹친 박스는 번호표를 옆으로 비켜 표시
    const shift = onPage.slice(0, i).filter((v) => Math.abs(v.r[1] - u.r[1]) < 0.012 && Math.abs(v.r[0] + v.r[2] - u.r[0] - u.r[2]) < 0.012).length;
    const cls = ['box', it.code ? 'coded' : '', !isRequired(u) ? 'optional' : '', u.id === S.sel || S.multi.has(u.id) ? 'sel' : ''].join(' ');
    const [x, y, w, h] = u.r;
    return `<div class="${cls}" data-id="${u.id}" style="left:${x * 100}%;top:${y * 100}%;width:${w * 100}%;height:${h * 100}%"><span class="tag" style="right:${shift * 46}px">${esc(boxLabel(u))}</span><span class="handle"></span></div>`;
  }).join('');
  $('#boxes').innerHTML = html;
}

function pick(id, shift) {
  if (shift && S.sel) {
    if (S.multi.size === 0) S.multi.add(S.sel);
    S.multi.has(id) ? S.multi.delete(id) : S.multi.add(id);
    if (!S.multi.size) S.multi.add(id);
    S.sel = S.multi.has(id) ? id : [...S.multi][0];
    renderBoxes(); renderPanel(); renderList(); renderCur();
    return;
  }
  select(id);
}
function select(id, scroll = true) {
  S.sel = id; S.multi = new Set(id ? [id] : []);
  const u = unitById(id);
  if (u && u.page !== S.page) { S.page = u.page; ls.set('page:' + S.book, S.page); renderPages(); renderPage(); }
  else renderBoxes();
  renderPanel(); renderList(); renderCur();
  if (scroll && u) {
    const el = $(`.box[data-id="${id}"]`);
    if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    const row = $(`.unit-list .row[data-id="${id}"]`);
    if (row) row.scrollIntoView({ block: 'nearest' });
    const cr = $(`#curView .crow[data-id="${id}"]`);
    if (cr) cr.scrollIntoView({ block: 'nearest' });
  }
}
function step(d) {
  const list = visibleUnits(); if (!list.length) return;
  let i = list.findIndex((u) => u.id === S.sel);
  i = i < 0 ? 0 : Math.max(0, Math.min(list.length - 1, i + d));
  select(list[i].id);
}
const visibleUnits = () => $('#onlyTodo').checked ? S.units.filter((u) => u.id === S.sel || (isRequired(u) && !(S.mine.items[u.id] || {}).code)) : S.units;

function renderPanel() {
  $('#tip').classList.add('hidden');
  const u = unitById(S.sel);
  const P = $('#unitPanel');
  if (!S.book) { P.innerHTML = '<p class="hint">설정 탭에서 교과서를 먼저 등록하세요.</p>'; return; }
  if (!u) {
    P.innerHTML = `<p class="hint">왼쪽 쪽 이미지에서 박스를 누르거나, 아래 목록에서 분석 단위를 고르세요.<br><br>
      <b>단축키</b> ↓ 또는 J: 다음 단위 · ↑ 또는 K: 이전 단위${S.edit ? ' · Delete: 박스 삭제' : ''}</p>`;
    return;
  }
  if (S.multi.size > 1) {
    const sel = S.units.filter((x) => S.multi.has(x.id));
    P.innerHTML = `<div class="u-head"><span class="num">${sel.length}개 선택</span><span class="nav"><button id="mClear">선택 해제</button></span></div>
      <p class="hint">순차적인 하위 문항처럼 하나의 과제로 셀 것들을 합칩니다. 첫 번째(#${unitNo(sel[0])})가 남고 나머지는 지워지며, 지워지는 단위에 입력된 코드도 함께 사라집니다.</p>
      <ul class="msel">${sel.map((x) => `<li>#${unitNo(x)} ${esc(where(S.book, x))} · ${esc(x.summary || x.task)}</li>`).join('')}</ul>
      <div class="unit-tools"><button id="mMerge" class="primary">하나로 합치기</button><button id="mDel" class="danger">모두 삭제</button></div>`;
    $('#mClear').onclick = () => { S.multi = new Set([S.sel]); renderAll(); };
    $('#mMerge').onclick = () => mergeUnits(sel);
    $('#mDel').onclick = () => deleteUnits(sel);
    return;
  }
  const it = S.mine.items[u.id] || {};
  const m = S.metas[S.book];
  if (P.dataset.uid !== u.id) { P.scrollTop = 0; P.dataset.uid = u.id; }
  const stages = [];
  codeList().forEach((c) => { let s = stages.find((x) => x.stage === c.stage); if (!s) stages.push(s = { stage: c.stage, codes: [] }); s.codes.push(c); });
  const opt = (list, v) => ['', ...list].map((x) => `<option ${x === (v || '') ? 'selected' : ''} value="${esc(x)}">${esc(x || '—')}</option>`).join('');
  const canCode = !!S.coder;

  P.innerHTML = `
    <div class="u-head">
      <span class="num">#${unitNo(u)}</span>
      <span class="kind ${u.kind === 'main' || !u.kind ? 'main' : ''}">${KINDS[u.kind || 'main']}</span>
      <span class="hint">${esc(where(S.book, u))}${u.src && u.src !== 'claude' ? ' · ' + esc(u.src) + ' 추가' : ''}</span>
      <span class="nav"><button id="uPrev" title="이전 (↑)">↑</button><button id="uNext" title="다음 (↓)">↓</button></span>
    </div>
    ${isCur() ? `<div class="meta-grid">
      <label>성취기준</label><select data-f="std">${opt([...S.cfg.stdList.filter((x) => x !== '기타'), '공통'], u.std)}</select>
      <label>출처</label><select data-f="task">${opt(['성취기준', '해설', '고려 사항'], u.task)}</select>
      <label>의미 단위</label><textarea data-f="summary" rows="2">${esc(u.summary)}</textarea>
    </div>
    ${u.orig ? `<div class="meta-ro">원문: ${esc(u.orig)}</div>` : ''}` : `<div class="meta-grid">
      <label>유형</label><select data-f="kind">${Object.entries(KINDS).map(([k, v]) => `<option value="${k}" ${k === (u.kind || 'main') ? 'selected' : ''}>${v}</option>`).join('')}</select>
      <label>발문 요약</label><input data-f="summary" value="${esc(u.summary)}">
      <label>과제 번호</label><input data-f="task" value="${esc(u.task)}">
      <label>위치</label><select data-f="pos">${opt(S.cfg.positions, u.pos)}</select>
      <label>성취기준</label><select data-f="std">${opt(S.cfg.stdList, u.std)}</select>
    </div>`}
    <div class="unit-tools">
      <button id="uSplit" title="한 발문에 행동이 여럿일 때 같은 자리에 행을 하나 더 만듭니다">행 나누기</button>
      ${isCur() ? '<button id="uAdd">아래에 문장 추가</button>' : ''}
      <button id="uDel" class="danger">${isCur() ? '문장' : '박스'} 삭제</button>
      <span class="hint">Shift+클릭으로 여러 개 골라 합치기</span>
    </div>
    ${!canCode ? '<p class="hint" style="color:var(--bad)">위에서 내 이름을 먼저 고르세요.</p>' : `
    ${!isRequired(u) ? '<p class="hint">이 유형은 코드 입력이 선택 사항입니다.</p>' : ''}
    ${stages.map((s) => `<div class="stage-row"><div class="st" style="color:${stageColor(s.codes[0].code)}">${esc(s.stage)}</div>
      <div class="codes">${s.codes.map((c) => `<button data-code="${esc(c.code)}" class="${it.code === c.code ? 'on' : ''}" style="${it.code === c.code ? `background:${stageColor(c.code)};border-color:${stageColor(c.code)}` : ''}" title="${esc(c.desc)}"><b>${esc(c.code)}</b>${esc(c.name)}</button>`).join('')}</div></div>`).join('')}
    ${it.code ? `<div class="code-desc">${codeHelp(it.code)}</div>` : '<div class="hint" style="margin:4px 0 10px">코드에 마우스를 올리면 바로 밑에 설명이 나옵니다.</div>'}
    <div class="sub">내용 요소</div>
    <div class="chips">${S.cfg.contentElements.map((c) => `<button data-ce="${esc(c)}" class="${(it.ce || []).includes(c) ? 'on' : ''}">${esc(c)}</button>`).join('')}</div>
    <div class="sub">통계적 소양 <span class="hint">(하나만)</span></div>
    <div class="chips lit">${litList().map((c) => `<button data-lit="${esc(c)}" class="${it.lit === c ? 'on' : ''}">${esc(c)}</button>`).join('')}</div>
    <textarea id="cMemo" rows="2" placeholder="메모 (판단 근거, 헷갈린 점)">${esc(it.memo)}</textarea>`}
  `;
  $('#uPrev').onclick = () => step(-1);
  $('#uNext').onclick = () => step(1);
  P.querySelectorAll('[data-f]').forEach((el) => el.onchange = () => {
    if (isCur() && el.dataset.f === 'summary') { u.summary = el.value; markDirty(u); renderCur(); renderList(); return; }
    u[el.dataset.f] = el.value; markDirty(u);
    if (el.dataset.f === 'kind') { renderBoxes(); renderPanel(); }
    renderList();
  });
  $('#uSplit').onclick = () => splitUnit(u); $('#uDel').onclick = () => deleteUnit(u);
  if ($('#uAdd')) $('#uAdd').onclick = () => addCurUnit(u);
  if (!canCode) return;
  P.querySelectorAll('[data-code]').forEach((b) => {
    b.onclick = () => setItem(u.id, { code: it.code === b.dataset.code ? '' : b.dataset.code });
    // 마우스를 올리면 버튼 바로 밑에 설명
    b.onmouseenter = () => {
      const t = $('#tip'), r = b.getBoundingClientRect();
      t.innerHTML = codeHelp(b.dataset.code); t.classList.remove('hidden');
      const w = t.offsetWidth;
      t.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left)) + 'px';
      t.style.top = (r.bottom + 6) + 'px';
    };
    b.onmouseleave = () => $('#tip').classList.add('hidden');
  });
  P.querySelectorAll('[data-ce]').forEach((b) => b.onclick = () => {
    const ce = new Set(it.ce || []); ce.has(b.dataset.ce) ? ce.delete(b.dataset.ce) : ce.add(b.dataset.ce);
    setItem(u.id, { ce: [...ce] });
  });
  P.querySelectorAll('[data-lit]').forEach((b) => b.onclick = () => setItem(u.id, { lit: it.lit === b.dataset.lit ? '' : b.dataset.lit }));
  $('#cMemo').oninput = (e) => setItem(u.id, { memo: e.target.value }, false);
}

function renderList() {
  const list = visibleUnits();
  const m = S.metas[S.book];
  const req = S.units.filter(isRequired);
  const done = req.filter((u) => (S.mine.items[u.id] || {}).code).length;
  $('#progress').textContent = S.units.length ? `코딩 ${done}/${req.length}` : '';
  $('#unitList').innerHTML = list.map((u) => {
    const it = S.mine.items[u.id] || {};
    return `<div class="row ${u.id === S.sel || S.multi.has(u.id) ? 'sel' : ''} ${isRequired(u) ? '' : 'opt'}" data-id="${u.id}">
      <span>#${unitNo(u)}</span><span>${esc(isCur() ? (u.std || '').replace('9수', '') : (m && m.pages[u.page] ? m.pages[u.page].label + '쪽' : ''))}</span>
      <span class="s">${u.kind && u.kind !== 'main' ? `[${KINDS[u.kind]}] ` : ''}${esc(u.summary || u.task || '(요약 없음)')}</span>
      <span class="c" style="color:${it.code ? stageColor(it.code) : 'var(--muted)'}">${esc(it.code || (isRequired(u) ? '·' : ''))}</span></div>`;
  }).join('') || '<p class="hint" style="padding:8px">분석 단위가 없습니다.</p>';
  $('#unitList').onclick = (e) => { const r = e.target.closest('.row'); if (r) pick(r.dataset.id, e.shiftKey); };
}

function renderDone() {
  const b = $('#doneBtn');
  b.disabled = !S.coder || !S.book;
  b.textContent = S.mine.done ? '✓ 코딩 완료 (누르면 취소)' : '이 교과서 코딩 완료';
  b.classList.toggle('done', !!S.mine.done);
}

// ───────── 내 코딩 저장 ─────────
let mineTimer = null;
function setItem(id, patch, rerender = true) {
  const cur = S.mine.items[id] || {};
  S.mine.items[id] = { ...cur, ...patch, t: Date.now() };
  scheduleMine();
  if (rerender) { renderPanel(); renderBoxes(); renderList(); renderPages(); }
}
function scheduleMine() { saveState('저장 대기…'); clearTimeout(mineTimer); mineTimer = setTimeout(saveMine, 700); }
async function saveMine(retry = true) {
  if (!S.coder || !S.book) return;
  const data = { ...S.mine, framework: S.cfg.activeFramework, coder: S.coder, updated: Date.now() };
  try {
    const r = await api(`/api/codings?book=${encodeURIComponent(S.book)}&coder=${encodeURIComponent(S.coder)}`, { method: 'PUT', body: JSON.stringify({ data, etag: S.mineEtag }) });
    if (r.ok) { S.mineEtag = r.etag; saveState('저장됨 ' + new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })); return; }
    // 다른 탭에서 저장한 경우: 항목별로 최근 것 우선 병합
    if (retry && r.current) {
      const other = (r.current.data && r.current.data.items) || {};
      for (const [k, v] of Object.entries(other)) if (!S.mine.items[k] || (v.t || 0) > (S.mine.items[k].t || 0)) S.mine.items[k] = v;
      S.mineEtag = r.current.etag; return saveMine(false);
    }
    saveState('저장 실패 — 새로고침하세요', true);
  } catch (e) { saveState('저장 실패: ' + e.message, true); }
}

// ───────── 박스 저장 (여러 명 수정 병합) ─────────
let unitTimer = null;
function markDirty(u) { u.t2 = Date.now(); S.dirty.add(u.id); saveState('박스 저장 대기…'); clearTimeout(unitTimer); unitTimer = setTimeout(saveUnits, 900); }
async function saveUnits(retry = true) {
  const f = `books/${S.book}/units.json`;
  try {
    const r = await putStore(f, { units: S.units }, S.unitsEtag);
    if (r.ok) { S.unitsEtag = r.etag; S.dirty.clear(); S.deleted.clear(); saveState('박스 저장됨'); return; }
    if (retry && r.current) {
      const server = (r.current.data && r.current.data.units) || [];
      const mineChanged = S.units.filter((u) => S.dirty.has(u.id));
      const merged = server.filter((u) => !S.deleted.has(u.id) && !S.dirty.has(u.id)).concat(mineChanged);
      S.units = merged; sortUnits(); S.unitsEtag = r.current.etag;
      renderAll(); return saveUnits(false);
    }
    saveState('박스 저장 실패 — 새로고침하세요', true);
  } catch (e) { saveState('박스 저장 실패: ' + e.message, true); }
}
const newId = () => 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
function splitUnit(u) {
  const n = { ...u, id: newId(), r: u.r ? [u.r[0] + 0.012, u.r[1], u.r[2], u.r[3]] : null, src: S.coder || '?', t: Date.now(), task: isCur() ? u.task : (u.task ? u.task + '-2' : ''), summary: u.summary };
  if (isCur()) S.units.splice(S.units.indexOf(u) + 1, 0, n); else { S.units.push(n); sortUnits(); }
  markDirty(n); select(n.id);
  toast('같은 자리에 행을 하나 더 만들었습니다. 발문 요약을 행동별로 고쳐 주세요.');
}
function mergeUnits(sel) {
  if (sel.length < 2) return;
  if (!confirm(`${sel.length}개를 #${unitNo(sel[0])} 하나로 합칠까요?\n나머지 단위에 입력된 코드는 사라집니다.`)) return;
  const [keep, ...rest] = sel;
  const samePage = rest.filter((x) => x.page === keep.page && x.r && keep.r);
  if (keep.r && samePage.length) {
    const all = [keep, ...samePage];
    const l = Math.min(...all.map((x) => x.r[0])), t = Math.min(...all.map((x) => x.r[1]));
    const r = Math.max(...all.map((x) => x.r[0] + x.r[2])), b = Math.max(...all.map((x) => x.r[1] + x.r[3]));
    keep.r = [l, t, r - l, b - t];
  }
  const uniq = (arr) => arr.filter((v, i) => v && arr.indexOf(v) === i);
  if (!isCur()) keep.task = uniq(sel.map((x) => x.task)).join(' + ');
  keep.summary = uniq(sel.map((x) => x.summary)).join(isCur() ? ' ' : ' → ');
  if (isCur()) keep.orig = uniq(sel.map((x) => x.orig)).join(' ');
  rest.forEach((x) => { S.deleted.add(x.id); S.dirty.delete(x.id); });
  S.units = S.units.filter((x) => !rest.includes(x));
  markDirty(keep); select(keep.id); renderPages();
  toast(`#${unitNo(keep)} 하나로 합쳤습니다${rest.some((x) => x.page !== keep.page) ? ' (다른 쪽 박스는 첫 박스로 대표)' : ''}.`);
}
function deleteUnits(sel) {
  if (!confirm(`${sel.length}개를 삭제할까요? 모든 조원의 코딩에서 빠집니다.`)) return;
  sel.forEach((x) => { S.deleted.add(x.id); S.dirty.delete(x.id); });
  S.units = S.units.filter((x) => !sel.includes(x)); S.sel = null; S.multi = new Set();
  saveState('박스 저장 대기…'); clearTimeout(unitTimer); unitTimer = setTimeout(saveUnits, 300);
  renderAll();
}
function addCurUnit(after) {
  const n = { id: newId(), page: 0, r: null, kind: 'main', std: after.std, task: after.task, summary: '', orig: '', src: S.coder || '?', t: (after.t || 0) + 1, pos: '' };
  S.units.splice(S.units.indexOf(after) + 1, 0, n); markDirty(n); select(n.id);
  setTimeout(() => { const i = $('#unitPanel [data-f="summary"]'); if (i) i.focus(); }, 0);
}
function deleteUnit(u) {
  if (!confirm(`#${unitNo(u)} ${isCur() ? '문장' : '박스'}을(를) 삭제할까요? 모든 조원의 코딩에서 이 단위가 빠집니다.`)) return;
  S.units = S.units.filter((x) => x !== u); S.deleted.add(u.id); S.dirty.delete(u.id); S.sel = null; S.multi = new Set();
  saveState('박스 저장 대기…'); clearTimeout(unitTimer); unitTimer = setTimeout(saveUnits, 300);
  renderAll();
}

// ───────── 박스 그리기·이동 ─────────
function bindCoding() {
  $('#prevPage').onclick = () => goPage(S.page - 1);
  $('#nextPage').onclick = () => goPage(S.page + 1);
  $('#zoomIn').onclick = () => { S.zoom = Math.min(2.5, S.zoom + 0.15); renderPage(); };
  $('#zoomOut').onclick = () => { S.zoom = Math.max(0.5, S.zoom - 0.15); renderPage(); };
  $('#editMode').onchange = (e) => { S.edit = e.target.checked; S.draw = false; $('#editHelp').classList.toggle('hidden', !S.edit); renderPage(); renderPanel(); };
  $('#addBox').onclick = () => { S.draw = !S.draw; renderPage(); if (S.draw) toast('쪽 이미지에서 끌어서 새 박스를 그리세요'); };
  $('#onlyTodo').onchange = renderList;
  $('#doneBtn').onclick = async () => {
    if (!S.mine.done) {
      const left = S.units.filter((u) => isRequired(u) && !(S.mine.items[u.id] || {}).code).length;
      if (left && !confirm(`아직 코드가 없는 단위가 ${left}개 있습니다. 그래도 완료로 표시할까요?`)) return;
    }
    S.mine.done = !S.mine.done; renderDone(); await saveMine();
    toast(S.mine.done ? '완료로 표시했습니다. 세 명 모두 완료하면 비교 화면이 열립니다.' : '완료 표시를 취소했습니다.');
  };
  $('#exportMine').onclick = () => exportCSV(S.book, S.coder, S.mine.items, `${S.book}_${S.coder}_코딩.csv`);
  window.addEventListener('resize', () => renderPage());

  document.addEventListener('keydown', (e) => {
    if (!$('#tab-code').classList.contains('on')) return;
    if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowUp' || e.key === 'k') { e.preventDefault(); step(-1); }
    else if (e.key === 'ArrowRight') goPage(S.page + 1);
    else if (e.key === 'ArrowLeft') goPage(S.page - 1);
    else if (e.key === 'Escape') { S.draw = false; S.multi = new Set(S.sel ? [S.sel] : []); renderAll(); }
    else if ((e.key === 'Delete' || e.key === 'Backspace') && S.sel) {
      e.preventDefault();
      if (S.multi.size > 1) deleteUnits(S.units.filter((x) => S.multi.has(x.id))); else deleteUnit(unitById(S.sel));
    }
  });

  const stage = $('#stage');
  let drag = null;
  const rel = (e) => { const b = stage.getBoundingClientRect(); return [(e.clientX - b.left) / b.width, (e.clientY - b.top) / b.height]; };
  const clamp = (v) => Math.max(0, Math.min(1, v));

  stage.addEventListener('mousedown', (e) => {
    const boxEl = e.target.closest('.box:not(.drawing)');
    e.preventDefault();
    if (!S.edit && !S.draw) {
      // 끌면 화면 이동, 그냥 누르면 박스 선택
      const w = $('#stageWrap');
      drag = { mode: 'pan', cx: e.clientX, cy: e.clientY, sl: w.scrollLeft, st: w.scrollTop, moved: false, boxId: boxEl && boxEl.dataset.id, shift: e.shiftKey };
      stage.classList.add('panning');
      return;
    }
    const [x, y] = rel(e);
    if (boxEl && !S.draw) {
      const u = unitById(boxEl.dataset.id);
      if (S.sel !== u.id) select(u.id, false);
      drag = { mode: e.target.classList.contains('handle') ? 'resize' : 'move', u, x0: x, y0: y, r0: [...u.r], moved: false };
    } else {
      drag = { mode: 'draw', x0: x, y0: y };
      const d = $('#drawBox'); d.classList.remove('hidden');
      Object.assign(d.style, { left: x * 100 + '%', top: y * 100 + '%', width: 0, height: 0 });
    }
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    if (drag.mode === 'pan') {
      const dx = e.clientX - drag.cx, dy = e.clientY - drag.cy;
      if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
      const w = $('#stageWrap'); w.scrollLeft = drag.sl - dx; w.scrollTop = drag.st - dy;
      return;
    }
    const [x, y] = rel(e);
    if (drag.mode === 'draw') {
      const l = clamp(Math.min(x, drag.x0)), t = clamp(Math.min(y, drag.y0));
      Object.assign($('#drawBox').style, { left: l * 100 + '%', top: t * 100 + '%', width: (clamp(Math.max(x, drag.x0)) - l) * 100 + '%', height: (clamp(Math.max(y, drag.y0)) - t) * 100 + '%' });
      return;
    }
    const dx = x - drag.x0, dy = y - drag.y0, r = drag.r0, u = drag.u;
    if (Math.abs(dx) + Math.abs(dy) > 0.002) drag.moved = true;
    if (drag.mode === 'move') u.r = [clamp(r[0] + dx), clamp(r[1] + dy), r[2], r[3]];
    else u.r = [r[0], r[1], Math.max(0.01, Math.min(1 - r[0], r[2] + dx)), Math.max(0.01, Math.min(1 - r[1], r[3] + dy))];
    const el = $(`.box[data-id="${u.id}"]`);
    if (el) Object.assign(el.style, { left: u.r[0] * 100 + '%', top: u.r[1] * 100 + '%', width: u.r[2] * 100 + '%', height: u.r[3] * 100 + '%' });
  });
  window.addEventListener('mouseup', (e) => {
    if (!drag) return;
    const d = drag; drag = null;
    if (d.mode === 'pan') { stage.classList.remove('panning'); if (!d.moved && d.boxId) pick(d.boxId, d.shift); return; }
    if (d.mode === 'draw') {
      S.draw = false; $('#stage').classList.toggle('editing', S.edit); $('#addBox').classList.remove('primary');
      $('#drawBox').classList.add('hidden');
      const [x, y] = rel(e);
      const l = clamp(Math.min(x, d.x0)), t = clamp(Math.min(y, d.y0)), w = clamp(Math.max(x, d.x0)) - l, h = clamp(Math.max(y, d.y0)) - t;
      if (w < 0.015 || h < 0.008) return;
      const u = { id: newId(), page: S.page, r: [l, t, w, h], kind: 'main', task: '', pos: '', std: '', summary: '', src: S.coder || '?', t: Date.now() };
      S.units.push(u); sortUnits(); markDirty(u); select(u.id, false); renderPages();
      setTimeout(() => { const i = $('#unitPanel [data-f="summary"]'); if (i) i.focus(); }, 0);
    } else if (d.moved) { sortUnits(); markDirty(d.u); renderBoxes(); renderList(); }
  });
}

// ───────── CSV 내보내기 ─────────
function exportCSV(bookId, coderLabel, items, filename, kinds = null) {
  const m = S.metas[bookId];
  const units = bookId === S.book ? S.units : (exportCSV.cache[bookId] || []);
  const head = ['교과서ID', '쪽', '성취기준', '위치', '과제번호', '발문요약', '코드', '내용요소', '소양', '코더', '메모', '유형', '단위ID'];
  const rows = [head];
  units.forEach((u) => {
    if (kinds && !kinds.includes(u.kind || 'main')) return;
    const it = items[u.id] || {};
    rows.push([bookId, where(bookId, u), u.std, u.pos, u.task, u.summary, it.code, (it.ce || []).join(';'), it.lit || '', coderLabel, it.memo, KINDS[u.kind || 'main'], u.id]);
  });
  download(filename, toCSV(rows));
}
exportCSV.cache = {};

// ───────── 일치율 ─────────
function cohen(a, b) {
  const n = a.length; if (!n) return { n: 0, po: NaN, k: NaN };
  let agree = 0; const ca = {}, cb = {};
  for (let i = 0; i < n; i++) { if (a[i] === b[i]) agree++; ca[a[i]] = (ca[a[i]] || 0) + 1; cb[b[i]] = (cb[b[i]] || 0) + 1; }
  const po = agree / n;
  let pe = 0; for (const k of Object.keys(ca)) pe += (ca[k] / n) * ((cb[k] || 0) / n);
  const k = pe === 1 ? (po === 1 ? 1 : NaN) : (po - pe) / (1 - pe);
  return { n, po, k };
}
function fleiss(rows) { // rows: [[r1,r2,r3], ...] 모두 값 있음
  const N = rows.length; if (!N) return { n: 0, po: NaN, k: NaN };
  const m = rows[0].length, tot = {}; let Pbar = 0, all = 0;
  rows.forEach((r) => {
    const c = {}; r.forEach((v) => { c[v] = (c[v] || 0) + 1; tot[v] = (tot[v] || 0) + 1; });
    Pbar += (Object.values(c).reduce((s, x) => s + x * x, 0) - m) / (m * (m - 1));
    if (Object.keys(c).length === 1) all++;
  });
  Pbar /= N;
  const Pe = Object.values(tot).reduce((s, x) => s + (x / (N * m)) ** 2, 0);
  return { n: N, po: all / N, k: Pe === 1 ? (Pbar === 1 ? 1 : NaN) : (Pbar - Pe) / (1 - Pe) };
}
const litShort = (c) => ({ '통계·수학적 지식의 절차적 활용': '절차적 활용' })[c] || c;
const pct = (v) => (isNaN(v) ? '—' : (v * 100).toFixed(1) + '%');
const kfmt = (v) => (isNaN(v) ? '—' : v.toFixed(3));
function kappaWord(k) { if (isNaN(k)) return ''; return k > 0.8 ? '거의 완벽' : k > 0.6 ? '상당한 일치' : k > 0.4 ? '보통' : k > 0.2 ? '약간' : '낮음'; }

function majority(vals) {
  const c = {}; vals.filter(Boolean).forEach((v) => { c[v] = (c[v] || 0) + 1; });
  const best = Object.entries(c).sort((a, b) => b[1] - a[1])[0];
  return best && best[1] >= 2 ? best[0] : '';
}

// ───────── 비교 화면 ─────────
const CMP = { level: 'fine', onlyDis: true, kinds: null };
let finalState = { data: null, etag: null }, finalTimer = null;

async function renderCompare() {
  const B = $('#compareBody');
  if (!S.book) { B.innerHTML = '<p class="hint">교과서를 고르세요.</p>'; return; }
  B.innerHTML = '<p class="hint">불러오는 중…</p>';
  CMP.kinds ||= [...(S.cfg.defaultKinds || ['main', 'intro'])];
  const [r, finRes] = await Promise.all([api(`/api/codings?book=${encodeURIComponent(S.book)}&all=1`), getStore(`final/${S.book}.json`)]);
  finalState = { data: finRes.data || { opened: false, items: {} }, etag: finRes.etag };
  const coders = S.cfg.coders;
  const statusHtml = coders.map((c) => `<span class="kind ${r.status[c] ? 'main' : ''}">${esc(c)} ${r.status[c] ? '완료' : '진행 중'}</span>`).join(' ');

  if (!r.opened) {
    B.innerHTML = `<h2>${esc(bookName(S.book))} — 비교·일치율</h2>
      <p>${statusHtml}</p>
      <p class="note">세 명 모두 '코딩 완료'를 누르면 이 화면이 열립니다. 그 전에는 서로의 코드를 볼 수 없습니다.</p>
      <button id="forceOpen">지금 비교 열기</button> <span class="hint">완료하지 않은 사람이 있어도 엽니다. 연 뒤에는 되돌릴 수 없습니다.</span>`;
    $('#forceOpen').onclick = async () => {
      if (!confirm('비교를 열면 세 명 모두 서로의 코드를 보게 됩니다. 열까요?')) return;
      finalState.data.opened = true;
      const w = await putStore(`final/${S.book}.json`, finalState.data, finalState.etag);
      if (!w.ok) return toast('저장 충돌 — 다시 시도하세요');
      renderCompare();
    };
    return;
  }

  const units = S.units.filter((u) => CMP.kinds.includes(u.kind || 'main'));
  const items = (c) => (r.data[c] && r.data[c].items) || {};
  const lv = (code) => levelOf(code, CMP.level);

  // 쌍별
  const pairs = [];
  for (let i = 0; i < coders.length; i++) for (let j = i + 1; j < coders.length; j++) {
    const a = [], b = [], ca = [], cb = [], ma = [], mb = [];
    units.forEach((u) => {
      const x = items(coders[i])[u.id] || {}, y = items(coders[j])[u.id] || {};
      if (x.code && y.code) { a.push(lv(x.code)); b.push(lv(y.code)); }
      if (x.lit && y.lit) { ca.push(x.lit); cb.push(y.lit); }
    });
    pairs.push({ name: `${coders[i]} – ${coders[j]}`, code: cohen(a, b), lit: cohen(ca, cb) });
  }
  const triple = [], tLit = [];
  units.forEach((u) => {
    const its = coders.map((c) => items(c)[u.id] || {});
    if (its.every((x) => x.code)) triple.push(its.map((x) => lv(x.code)));
    if (its.every((x) => x.lit)) tLit.push(its.map((x) => x.lit));
  });
  const fl = fleiss(triple), flLit = fleiss(tLit);

  const kindBoxes = Object.entries(KINDS).map(([k, v]) => `<label><input type="checkbox" data-kind="${k}" ${CMP.kinds.includes(k) ? 'checked' : ''}> ${v}</label>`).join(' ');
  const levelRadios = [['fine', '세부 코드'], ['basic', '기본 코드'], ['stage', '단계']].map(([k, v]) => `<label><input type="radio" name="lv" value="${k}" ${CMP.level === k ? 'checked' : ''}> ${v}</label>`).join(' ');

  const disRows = units.map((u) => {
    const codes = coders.map((c) => (items(c)[u.id] || {}).code || '');
    const dis = new Set(codes.filter(Boolean).map(lv)).size > 1 || codes.some((c) => !c);
    return { u, codes, dis };
  });
  const shown = CMP.onlyDis ? disRows.filter((x) => x.dis) : disRows;
  const fin = finalState.data.items || {};
  const codeOpts = (v) => ['', ...codeList().map((c) => c.code)].map((c) => `<option ${c === v ? 'selected' : ''} value="${esc(c)}">${esc(c || '—')}</option>`).join('');
  const m = S.metas[S.book];
  const finDone = units.filter((u) => (fin[u.id] || {}).code).length;

  B.innerHTML = `<h2>${esc(bookName(S.book))} — 비교·일치율</h2>
    <p>${statusHtml}</p>
    <div class="bar"><div class="grp"><span>포함할 유형</span>${kindBoxes}</div><div class="grp"><span>비교 수준</span>${levelRadios}</div></div>
    <div class="cards">
      <div class="card"><div class="k">세 명 모두 일치</div><div class="v">${pct(fl.po)}</div><div class="hint">세 명 모두 코딩한 ${fl.n}개 기준</div></div>
      <div class="card"><div class="k">Fleiss' κ (세 명)</div><div class="v">${kfmt(fl.k)}</div><div class="hint">${kappaWord(fl.k)}</div></div>
      <div class="card"><div class="k">최종 코드 확정</div><div class="v">${finDone}/${units.length}</div></div>
    </div>
    <table class="t"><tr><th class="l">쌍</th><th>단위 수</th><th>코드 일치율</th><th>Cohen's κ</th><th>소양 일치율</th><th>소양 κ</th></tr>
      ${pairs.map((p) => `<tr><td class="l">${esc(p.name)}</td><td>${p.code.n}</td><td>${pct(p.code.po)}</td><td>${kfmt(p.code.k)} <span class="hint">${kappaWord(p.code.k)}</span></td><td>${pct(p.lit.po)}</td><td>${kfmt(p.lit.k)} <span class="hint">${kappaWord(p.lit.k)}</span></td></tr>`).join('')}
      <tr><td class="l"><b>세 명 (Fleiss)</b></td><td>${fl.n}</td><td>${pct(fl.po)}</td><td>${kfmt(fl.k)}</td><td>${pct(flLit.po)}</td><td>${kfmt(flLit.k)}</td></tr>
    </table>
    <p class="note">일치율은 두 사람이 모두 입력한 단위만 셉니다(코드와 소양 각각). κ 해석 기준: Landis & Koch(1977). '단계' 수준은 현재 분석틀(${esc(S.cfg.activeFramework)})의 단계로 묶어 비교합니다.</p>

    <h3>단위별 비교와 최종 코드</h3>
    <div class="bar">
      <label><input type="checkbox" id="onlyDis" ${CMP.onlyDis ? 'checked' : ''}> 불일치·미입력만 보기 (${disRows.filter((x) => x.dis).length}개)</label>
      <button id="fillMaj">다수결로 빈 최종 코드 채우기</button>
      <button id="exportFinal">최종 코드 CSV</button>
      <button id="exportAll">세 명 코딩 CSV</button>
    </div>
    <table class="t" id="cmpTable"><tr><th>#</th><th>위치</th><th class="l">발문 요약</th>${coders.map((c) => `<th>${esc(c)}</th>`).join('')}<th>최종 코드</th><th>최종 소양</th><th class="l">메모</th></tr>
      ${shown.map(({ u, codes, dis }) => {
        const f = fin[u.id] || {};
        const memos = coders.map((c) => (items(c)[u.id] || {}).memo).filter(Boolean).map((x, i) => esc(x)).join(' / ');
        const cc = coders.map((c) => { const it = items(c)[u.id] || {}; return `<td><b style="color:${it.code ? stageColor(it.code) : 'var(--muted)'}">${esc(it.code || '—')}</b>${it.lit ? ` <span class="hint">${esc(litShort(it.lit))}</span>` : ''}</td>`; }).join('');
        return `<tr class="${dis ? 'dis' : ''}" data-id="${u.id}"><td><a href="#" data-go="${u.id}">${unitNo(u)}</a></td><td>${esc(where(S.book, u))}</td><td class="l">${esc(u.summary || u.task)}</td>${cc}
          <td class="fin"><select data-fin="${u.id}">${codeOpts(f.code || '')}</select>${!f.code && majority(codes) ? ` <span class="hint">다수 ${esc(majority(codes))}</span>` : ''}</td>
          <td class="fin"><select data-flit="${u.id}">${['', ...litList()].map((c) => `<option value="${esc(c)}" ${c === (f.lit || '') ? 'selected' : ''}>${esc(c ? litShort(c) : '—')}</option>`).join('')}</select></td>
          <td class="l hint">${memos}</td></tr>`;
      }).join('')}
    </table>`;

  B.querySelectorAll('[data-kind]').forEach((el) => el.onchange = () => { CMP.kinds = [...B.querySelectorAll('[data-kind]:checked')].map((x) => x.dataset.kind); renderCompare(); });
  B.querySelectorAll('[name=lv]').forEach((el) => el.onchange = () => { CMP.level = el.value; renderCompare(); });
  $('#onlyDis').onchange = (e) => { CMP.onlyDis = e.target.checked; renderCompare(); };
  B.querySelectorAll('[data-go]').forEach((a) => a.onclick = (e) => { e.preventDefault(); $('#tabs [data-tab=code]').click(); select(a.dataset.go); });
  const setFin = (id, patch) => { finalState.data.items ||= {}; finalState.data.items[id] = { ...(finalState.data.items[id] || {}), ...patch }; scheduleFinal(); };
  B.querySelectorAll('[data-fin]').forEach((el) => el.onchange = () => {
    const id = el.dataset.fin, its = coders.map((c) => items(c)[id] || {});
    const f = finalState.data.items[id] || {};
    // 처음 정할 때 내용요소·비판·소통은 다수결로 함께 채움
    const patch = { code: el.value };
    if (!f.ce) patch.ce = S.cfg.contentElements.filter((ce) => its.filter((x) => (x.ce || []).includes(ce)).length >= 2);
    if (f.lit === undefined) patch.lit = majority(its.map((x) => x.lit));
    setFin(id, patch);
  });
  B.querySelectorAll('[data-flit]').forEach((el) => el.onchange = () => setFin(el.dataset.flit, { lit: el.value }));
  $('#fillMaj').onclick = () => {
    let n = 0;
    units.forEach((u) => {
      if ((fin[u.id] || {}).code) return;
      const its = coders.map((c) => items(c)[u.id] || {});
      const mj = majority(its.map((x) => x.code));
      if (!mj) return;
      finalState.data.items[u.id] = {
        ...(finalState.data.items[u.id] || {}), code: mj,
        ce: S.cfg.contentElements.filter((ce) => its.filter((x) => (x.ce || []).includes(ce)).length >= 2),
        lit: majority(its.map((x) => x.lit)),
      };
      n++;
    });
    toast(`${n}개를 다수결로 채웠습니다. 세 명이 모두 다른 단위는 직접 정해 주세요.`);
    saveFinal().then(renderCompare);
  };
  $('#exportFinal').onclick = () => exportCSV(S.book, '최종', fin, `${S.book}_최종코드.csv`);
  $('#exportAll').onclick = () => {
    const head = ['교과서ID', '쪽', '성취기준', '위치', '과제번호', '발문요약', '코드', '내용요소', '소양', '코더', '메모', '유형', '단위ID'];
    const rows = [head];
    [...coders, '최종'].forEach((c) => {
      const its = c === '최종' ? fin : items(c);
      S.units.forEach((u) => { const it = its[u.id] || {}; rows.push([S.book, where(S.book, u), u.std, u.pos, u.task, u.summary, it.code, (it.ce || []).join(';'), it.lit || '', c, it.memo, KINDS[u.kind || 'main'], u.id]); });
    });
    download(`${S.book}_세명코딩.csv`, toCSV(rows));
  };
}
function scheduleFinal() { saveState('최종 코드 저장 대기…'); clearTimeout(finalTimer); finalTimer = setTimeout(saveFinal, 700); }
async function saveFinal(retry = true) {
  const r = await putStore(`final/${S.book}.json`, finalState.data, finalState.etag);
  if (r.ok) { finalState.etag = r.etag; saveState('최종 코드 저장됨'); return; }
  if (retry && r.current && r.current.data) {
    finalState.data.items = { ...(r.current.data.items || {}), ...(finalState.data.items || {}) };
    finalState.etag = r.current.etag; return saveFinal(false);
  }
  saveState('최종 코드 저장 실패', true);
}

// ───────── 통계 화면 ─────────
const ST = { source: 'final', level: 'stage', group: 'book', kinds: null, books: null };
async function renderStats() {
  const B = $('#statsBody');
  ST.kinds ||= [...(S.cfg.defaultKinds || ['main', 'intro'])];
  ST.books ||= [...S.cfg.books];
  B.innerHTML = '<p class="hint">불러오는 중…</p>';

  // 자료 모으기
  const recs = [];
  for (const id of ST.books) {
    const m = S.metas[id]; if (!m) continue;
    const units = id === S.book ? S.units : ((await getStore(`books/${id}/units.json`)).data || {}).units || [];
    exportCSV.cache[id] = units;
    let items = {};
    if (ST.source === 'final') items = ((await getStore(`final/${id}.json`)).data || {}).items || {};
    else if (S.coder) items = id === S.book ? S.mine.items : ((await api(`/api/codings?book=${encodeURIComponent(id)}&coder=${encodeURIComponent(S.coder)}`)).data || {}).items || {};
    units.forEach((u) => {
      if (!ST.kinds.includes(u.kind || 'main')) return;
      const it = items[u.id]; if (!it || !it.code) return;
      recs.push({ book: id, period: m.period || '?', publisher: m.publisher || '?', u, it });
    });
  }
  const gname = (r) => ST.group === 'book' ? `${r.book} ${r.publisher}` : ST.group === 'period' ? `${r.period} 개정` : r.publisher;
  const groups = [...new Set(recs.map(gname))];
  const cats = categories(ST.level);
  recs.forEach((r) => { const k = levelOf(r.it.code, ST.level); if (k && !cats.includes(k)) cats.push(k); });
  const count = (g, c) => recs.filter((r) => gname(r) === g && levelOf(r.it.code, ST.level) === c).length;
  const gTotal = (g) => recs.filter((r) => gname(r) === g).length;

  const palette = ['#2456a6', '#c0662b', '#2f7d4f', '#8a4fb3', '#a38a16', '#3b8a9e', '#b3261e', '#555'];
  const chart = barChart(cats, groups, (g, c) => (gTotal(g) ? count(g, c) / gTotal(g) : 0), palette);

  const tableA = [['구분', ...cats.map((c) => c), '합계']];
  groups.forEach((g) => tableA.push([g, ...cats.map((c) => count(g, c)), gTotal(g)]));
  const allRow = ['전체', ...cats.map((c) => recs.filter((r) => levelOf(r.it.code, ST.level) === c).length), recs.length];

  const stageCats = categories('stage');
  const ces = S.cfg.contentElements;
  const ceCount = (ce, c) => recs.filter((r) => (r.it.ce || []).includes(ce) && levelOf(r.it.code, 'stage') === c).length;

  const opt = (o, v) => o.map(([k, t]) => `<option value="${k}" ${k === v ? 'selected' : ''}>${t}</option>`).join('');
  B.innerHTML = `<h2>통계표</h2>
    <div class="bar">
      <div class="grp"><span>자료</span><select id="stSrc">${opt([['final', '최종 코드'], ['mine', `내 코딩 (${esc(S.coder || '이름 미선택')})`]], ST.source)}</select></div>
      <div class="grp"><span>수준</span><select id="stLv">${opt([['stage', '단계'], ['basic', '기본 코드'], ['fine', '세부 코드']], ST.level)}</select></div>
      <div class="grp"><span>묶기</span><select id="stGrp">${opt([['book', '교과서별'], ['period', '시기별'], ['publisher', '출판사별']], ST.group)}</select></div>
    </div>
    <div class="bar">
      <div class="grp"><span>교과서</span>${S.cfg.books.map((id) => `<label><input type="checkbox" data-book="${esc(id)}" ${ST.books.includes(id) ? 'checked' : ''}> ${esc(id)} ${esc((S.metas[id] || {}).publisher || '')}</label>`).join(' ')}</div>
      <div class="grp"><span>포함할 유형</span>${Object.entries(KINDS).map(([k, v]) => `<label><input type="checkbox" data-kind="${k}" ${ST.kinds.includes(k) ? 'checked' : ''}> ${v}</label>`).join(' ')}</div>
    </div>
    ${!recs.length ? `<p class="note">집계할 코드가 없습니다. ${ST.source === 'final' ? '최종 코드는 비교·일치율 화면에서 정합니다. 위에서 자료를 \'내 코딩\'으로 바꾸면 내 코드로 미리 볼 수 있습니다.' : ''}</p>` : `
    <h3>단계별 비율 (${ST.level === 'stage' ? '단계' : ST.level === 'basic' ? '기본 코드' : '세부 코드'})</h3>
    <div class="chart">${chart}</div>
    <h3>빈도표 — 개수 (비율)</h3>
    <table class="t"><tr>${tableA[0].map((h, i) => `<th class="${i ? '' : 'l'}">${esc(h)}</th>`).join('')}</tr>
      ${tableA.slice(1).map((r) => `<tr><td class="l">${esc(r[0])}</td>${r.slice(1, -1).map((v) => `<td>${v} <span class="hint">(${pct(v / r[r.length - 1])})</span></td>`).join('')}<td><b>${r[r.length - 1]}</b></td></tr>`).join('')}
      <tr><td class="l"><b>전체</b></td>${allRow.slice(1, -1).map((v) => `<td><b>${v}</b> <span class="hint">(${pct(v / recs.length)})</span></td>`).join('')}<td><b>${recs.length}</b></td></tr>
    </table>
    <h3>내용 요소 × 단계</h3>
    <table class="t"><tr><th class="l">내용 요소</th>${stageCats.map((c) => `<th>${esc(c)}</th>`).join('')}<th>합계</th></tr>
      ${ces.map((ce) => { const row = stageCats.map((c) => ceCount(ce, c)); const s = row.reduce((a, b) => a + b, 0); return s ? `<tr><td class="l">${esc(ce)}</td>${row.map((v) => `<td>${v || ''}</td>`).join('')}<td><b>${s}</b></td></tr>` : ''; }).join('')}
      <tr><td class="l hint">내용 요소 없음</td>${stageCats.map((c) => `<td>${recs.filter((r) => !(r.it.ce || []).length && levelOf(r.it.code, 'stage') === c).length || ''}</td>`).join('')}<td>${recs.filter((r) => !(r.it.ce || []).length).length}</td></tr>
    </table>
    <p class="note">한 단위에 내용 요소를 여러 개 고른 경우 각 요소에 한 번씩 셉니다.</p>
    <h3>통계적 소양</h3>
    <table class="t"><tr><th class="l">구분</th><th>단위 수</th>${litList().map((l) => `<th>${esc(litShort(l))}</th>`).join('')}<th>미입력</th></tr>
      ${groups.map((g) => { const rs = recs.filter((r) => gname(r) === g); return `<tr><td class="l">${esc(g)}</td><td>${rs.length}</td>${litList().map((l) => { const c = rs.filter((r) => r.it.lit === l).length; return `<td>${c} <span class="hint">(${pct(c / rs.length)})</span></td>`; }).join('')}<td>${rs.filter((r) => !r.it.lit).length}</td></tr>`; }).join('')}
    </table>
    <h3>통계적 문제해결 × 통계적 소양 (${ST.level === 'stage' ? '단계' : ST.level === 'basic' ? '기본 코드' : '세부 코드'})</h3>
    <table class="t"><tr><th class="l">문제해결 \ 소양</th>${litList().map((l) => `<th>${esc(litShort(l))}</th>`).join('')}<th>미입력</th><th>합계</th></tr>
      ${cats.map((c) => { const rs = recs.filter((r) => levelOf(r.it.code, ST.level) === c); if (!rs.length) return ''; return `<tr><td class="l">${esc(c)}</td>${litList().map((l) => { const n = rs.filter((r) => r.it.lit === l).length; return `<td>${n || ''}</td>`; }).join('')}<td>${rs.filter((r) => !r.it.lit).length || ''}</td><td><b>${rs.length}</b></td></tr>`; }).join('')}
      <tr><td class="l"><b>합계</b></td>${litList().map((l) => `<td><b>${recs.filter((r) => r.it.lit === l).length}</b></td>`).join('')}<td><b>${recs.filter((r) => !r.it.lit).length}</b></td><td><b>${recs.length}</b></td></tr>
    </table>
    <p class="note">위 '수준'과 '포함할 유형' 설정을 따릅니다. 교과서·시기를 나눠 보려면 위에서 교과서를 골라 보세요.</p>
    ${porterHtml(recs)}
    <div class="bar" style="margin-top:16px"><button id="stCsvA">빈도표 CSV</button><button id="stCsvRec">코딩 기록 CSV (선택한 교과서 전체)</button></div>`}
  `;
  $('#stSrc').onchange = (e) => { ST.source = e.target.value; renderStats(); };
  $('#stLv').onchange = (e) => { ST.level = e.target.value; renderStats(); };
  $('#stGrp').onchange = (e) => { ST.group = e.target.value; renderStats(); };
  B.querySelectorAll('[data-book]').forEach((el) => el.onchange = () => { ST.books = [...B.querySelectorAll('[data-book]:checked')].map((x) => x.dataset.book); renderStats(); });
  B.querySelectorAll('[data-kind]').forEach((el) => el.onchange = () => { ST.kinds = [...B.querySelectorAll('[data-kind]:checked')].map((x) => x.dataset.kind); renderStats(); });
  if (!recs.length) return;
  $('#stCsvA').onclick = () => download('빈도표.csv', toCSV([...tableA, allRow]));
  $('#stCsvRec').onclick = () => {
    const rows = [['교과서ID', '쪽', '성취기준', '위치', '과제번호', '발문요약', '코드', '내용요소', '소양', '코더', '메모', '유형', '단위ID', '시기', '출판사']];
    recs.forEach(({ book, period, publisher, u, it }) => rows.push([book, where(book, u), u.std, u.pos, u.task, u.summary, it.code, (it.ce || []).join(';'), it.lit || '', ST.source === 'final' ? '최종' : S.coder, it.memo, KINDS[u.kind || 'main'], u.id, period, publisher]));
    download('코딩기록.csv', toCSV(rows));
  };
}

// Porter 정합성 지수: 같은 시기 교육과정 분포(x)와 교과서 분포(y), 1 - Σ|x−y|/2
function porterHtml(recs) {
  const lv = ST.level; // 10/20 결정: 교육과정·교과서 모두 2차 코드까지
  const curBooks = [...new Set(recs.filter((r) => isCur(r.book)).map((r) => r.book))];
  if (!curBooks.length) return '';
  const rows = [];
  curBooks.forEach((cb) => {
    const period = S.metas[cb].period;
    const texts = [...new Set(recs.filter((r) => !isCur(r.book) && S.metas[r.book].period === period).map((r) => r.book))];
    const dist = (book) => { const rs = recs.filter((r) => r.book === book), d = {}; rs.forEach((r) => { const k = levelOf(r.it.code, lv); d[k] = (d[k] || 0) + 1 / rs.length; }); return d; };
    const x = dist(cb);
    texts.forEach((tb) => {
      const y = dist(tb), keys = new Set([...Object.keys(x), ...Object.keys(y)]);
      let sum = 0; keys.forEach((k) => { sum += Math.abs((x[k] || 0) - (y[k] || 0)); });
      rows.push([period, `${tb} ${S.metas[tb].publisher || ''}`, (1 - sum / 2).toFixed(3)]);
    });
  });
  if (!rows.length) return `<h3>Porter 정합성 지수</h3><p class="note">같은 시기의 교과서도 함께 골라야 계산됩니다.</p>`;
  return `<h3>Porter 정합성 지수 (${lv === 'stage' ? '단계' : '코드'} 수준)</h3>
    <table class="t"><tr><th>시기</th><th class="l">교과서</th><th>정합성 지수</th></tr>${rows.map((r) => `<tr><td>${esc(r[0])}</td><td class="l">${esc(r[1])}</td><td><b>${r[2]}</b></td></tr>`).join('')}</table>
    <p class="note">1 − Σ|x−y|/2 (Porter, 2002). x는 교육과정, y는 교과서의 범주별 비율이며 1에 가까울수록 정합적입니다. 위 '수준'에서 단계 또는 코드 수준을 고를 수 있습니다.</p>`;
}
function barChart(cats, groups, val, palette) {
  const W = Math.max(520, cats.length * (groups.length * 18 + 26) + 60), H = 260, L = 44, T = 14, Bm = 40;
  const ih = H - T - Bm, cw = (W - L - 10) / cats.length, bw = Math.min(26, (cw - 12) / Math.max(1, groups.length));
  const max = Math.max(0.05, ...cats.flatMap((c) => groups.map((g) => val(g, c))));
  const top = Math.ceil(max * 10) / 10;
  let s = `<svg width="${W}" height="${H}" font-size="11" font-family="inherit">`;
  for (let t = 0; t <= top + 1e-9; t += top / 4) {
    const y = T + ih - (t / top) * ih;
    s += `<line x1="${L}" x2="${W - 10}" y1="${y}" y2="${y}" stroke="#e7e4dc"/><text x="${L - 6}" y="${y + 4}" text-anchor="end" fill="#6b6a64">${Math.round(t * 100)}%</text>`;
  }
  cats.forEach((c, i) => {
    const x0 = L + i * cw + (cw - bw * groups.length) / 2;
    groups.forEach((g, j) => {
      const v = val(g, c), h = (v / top) * ih;
      s += `<rect x="${x0 + j * bw}" y="${T + ih - h}" width="${bw - 2}" height="${h}" fill="${palette[j % palette.length]}" rx="2"><title>${esc(g)} · ${esc(c)}: ${(v * 100).toFixed(1)}%</title></rect>`;
    });
    s += `<text x="${L + i * cw + cw / 2}" y="${H - Bm + 16}" text-anchor="middle" fill="#1d1d1b">${esc(c)}</text>`;
  });
  s += `<line x1="${L}" x2="${W - 10}" y1="${T + ih}" y2="${T + ih}" stroke="#9a978d"/></svg>`;
  s += `<div class="legend">${groups.map((g, j) => `<span><i style="background:${palette[j % palette.length]}"></i>${esc(g)}</span>`).join('')}</div>`;
  return s;
}

// ───────── 설정 화면 ─────────
function renderSettings() {
  const B = $('#settingsBody');
  const c = S.cfg;
  const link = `${location.host}/${S.key}`;
  B.innerHTML = `<h2>설정</h2>
    <h3>조원에게 보낼 링크</h3>
    <div class="bar"><input id="shareLink" value="${esc(link)}" readonly style="flex:1;min-width:320px"><button id="copyLink">복사</button></div>
    <p class="note">이 링크를 아는 사람만 들어올 수 있습니다. 교과서 저작권 때문에 조원 3명에게만 보내 주세요.</p>

    <h3>조원 (코더)</h3>
    <input id="sCoders" value="${esc(c.coders.join(', '))}" style="width:360px"> <span class="hint">쉼표로 구분. 이름을 바꾸면 기존 코딩과 연결이 끊어지니 주의하세요.</span>

    <h3>분석틀</h3>
    <div class="bar"><div class="grp"><span>지금 쓰는 분석틀</span><select id="sFw">${Object.keys(c.frameworks).map((k) => `<option ${k === c.activeFramework ? 'selected' : ''}>${esc(k)}</option>`).join('')}</select></div></div>
    <p class="note">코드 목록을 고치려면 아래 표를 CSV 형식(후보,단계,코드,이름,학생이 하는 일) 그대로 수정하세요. 새 후보 이름을 쓰면 분석틀이 하나 더 생깁니다.
    '단계'는 집계에서 단계별로 묶는 기준입니다. 세부 코드 끝의 소문자(A1a의 a)를 떼면 기본 코드가 됩니다.</p>
    <textarea id="sFwCsv" rows="14" style="font-family:ui-monospace,monospace;font-size:12px">${esc(frameworksToCSV(c.frameworks))}</textarea>

    <h3>입력 목록</h3>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
      <div><div class="sub">내용 요소 (한 줄에 하나)</div><textarea id="sCe" rows="10">${esc(c.contentElements.join('\n'))}</textarea></div>
      <div><div class="sub">위치 (한 줄에 하나)</div><textarea id="sPos" rows="10">${esc(c.positions.join('\n'))}</textarea></div>
      <div><div class="sub">성취기준 (한 줄에 하나)</div><textarea id="sStd" rows="10">${esc(c.stdList.join('\n'))}</textarea></div>
      <div><div class="sub">통계적 소양 (한 줄에 하나)</div><textarea id="sLit" rows="6">${esc(litList().join('\n'))}</textarea></div>
    </div>

    <h3>기본으로 포함할 유형</h3>
    <div class="bar">${Object.entries(KINDS).map(([k, v]) => `<label><input type="checkbox" data-dk="${k}" ${c.defaultKinds.includes(k) ? 'checked' : ''}> ${v}</label>`).join(' ')}</div>
    <p class="note">여기서 고른 유형은 코드 입력이 필수이고(진행률에 포함), 비교·통계 화면에서 처음부터 체크되어 있습니다. 나머지 유형도 박스는 남고 코드 입력은 선택입니다.<br>
    현재 기본값(10/20 조 회의): 본 과제 + 도입 질문 + 예제 포함, 이전 학년 복습 제외.</p>

    <div class="bar"><button id="sSave" class="primary">설정 저장</button></div>

    <h3>교과서</h3>
    <table class="t"><tr><th>ID</th><th>시기</th><th>출판사</th><th>제목</th><th>쪽 수</th><th>분석 단위</th><th></th></tr>
      ${c.books.map((id) => { const m = S.metas[id] || {}; return `<tr><td>${esc(id)}</td><td><input data-bm="${esc(id)}" data-k="period" value="${esc(m.period)}" size="6"></td><td><input data-bm="${esc(id)}" data-k="publisher" value="${esc(m.publisher)}" size="10"></td><td><input data-bm="${esc(id)}" data-k="title" value="${esc(m.title)}" size="24"></td><td>${(m.pages || []).length}</td><td>${id === S.book ? S.units.length : ''}</td><td><button data-bsave="${esc(id)}">저장</button></td></tr>`; }).join('')}
    </table>
    <h3>교과서 묶음 올리기</h3>
    <p class="note">Claude가 만들어 준 교과서 묶음(.zip: 쪽 이미지 + 1차 박스)을 올립니다. 쪽 이미지는 저장소(GitHub)가 아닌 비공개 저장공간에만 보관됩니다.</p>
    <div id="dropZone" class="dropzone">zip 파일을 여기에 끌어다 놓으세요</div>
    <div class="bar"><input type="file" id="pkgFile" accept=".zip"><button id="pkgGo" class="primary">올리기</button><span id="pkgMsg" class="hint"></span></div>`;
  $('#pkgGo').onclick = () => uploadPackage($('#pkgFile').files[0]);
  const dz = $('#dropZone');
  ['dragenter', 'dragover'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove('over'); }));
  dz.addEventListener('drop', (e) => { const f = e.dataTransfer.files[0]; if (f) uploadPackage(f); });

  $('#copyLink').onclick = () => { navigator.clipboard.writeText(link).then(() => toast('복사했습니다')); };
  $('#sSave').onclick = async () => {
    const next = { ...S.cfg };
    next.coders = $('#sCoders').value.split(',').map((x) => x.trim()).filter(Boolean);
    const fws = parseFrameworks($('#sFwCsv').value);
    if (!Object.keys(fws).length) return toast('분석틀 CSV를 읽지 못했습니다');
    next.frameworks = fws;
    next.activeFramework = fws[$('#sFw').value] ? $('#sFw').value : Object.keys(fws)[0];
    next.contentElements = $('#sCe').value.split('\n').map((x) => x.trim()).filter(Boolean);
    next.positions = $('#sPos').value.split('\n').map((x) => x.trim()).filter(Boolean);
    next.stdList = $('#sStd').value.split('\n').map((x) => x.trim()).filter(Boolean);
    next.litList = $('#sLit').value.split('\n').map((x) => x.trim()).filter(Boolean);
    next.defaultKinds = [...B.querySelectorAll('[data-dk]:checked')].map((x) => x.dataset.dk);
    const r = await putStore('config/app.json', next, S.cfgEtag);
    if (!r.ok) { toast('다른 사람이 먼저 설정을 바꿨습니다. 새로고침 후 다시 저장하세요.', 4000); return; }
    S.cfg = next; S.cfgEtag = r.etag; CMP.kinds = null; ST.kinds = null;
    fillHeader(); toast('설정을 저장했습니다'); renderSettings();
  };
  B.querySelectorAll('[data-bsave]').forEach((b) => b.onclick = async () => {
    const id = b.dataset.bsave;
    const cur = await getStore(`books/${id}/meta.json`);
    const m = { ...(cur.data || {}) };
    B.querySelectorAll(`[data-bm="${id}"]`).forEach((el) => { m[el.dataset.k] = el.value.trim(); });
    const r = await putStore(`books/${id}/meta.json`, m, cur.etag);
    if (r.ok) { S.metas[id] = m; fillHeader(); $('#bookSel').value = S.book; toast('저장했습니다'); } else toast('저장 실패');
  });
}

// ───────── 교과서 묶음(.zip) 올리기 ─────────
function loadScript(src) {
  return new Promise((ok, bad) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = bad; document.head.appendChild(s); });
}
async function uploadPackage(file) {
  const msg = (t) => { $('#pkgMsg').textContent = t; };
  if (!file) return toast('zip 파일을 고르세요');
  if (!window.JSZip) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
  const zip = await JSZip.loadAsync(file);
  const bookFile = zip.file('book.json');
  if (!bookFile) return toast('book.json이 없는 묶음입니다');
  const { meta, units } = JSON.parse(await bookFile.async('string'));
  const id = meta.id;
  if (!/^[\w-]+$/.test(id || '')) return toast('교과서 ID가 올바르지 않습니다');
  const cur = await getStore(`books/${id}/units.json`);
  let writeUnits = true;
  if (cur.data && (cur.data.units || []).length) {
    writeUnits = confirm(`${id}에는 이미 박스 ${cur.data.units.length}개가 있습니다.\n[확인] 묶음의 박스로 바꾸기 (조원이 추가한 박스·수정은 사라짐)\n[취소] 기존 박스 유지, 쪽 이미지와 정보만 올리기`);
  }
  const pages = meta.pages || [];
  const up = async (path, body, type) => {
    const res = await fetch('/api/upload?p=' + encodeURIComponent(path), { method: 'PUT', headers: { 'x-app-key': S.key, 'content-type': type }, body });
    if (!res.ok) throw new Error(path + ' 업로드 실패');
  };
  try {
    for (let i = 0; i < pages.length; i++) {
      msg(`쪽 이미지 ${i + 1}/${pages.length} 올리는 중…`);
      const f = zip.file('pages/' + pages[i].file);
      if (!f) throw new Error(pages[i].file + ' 없음');
      await up(`books/${id}/pages/${pages[i].file}`, await f.async('blob'), 'image/webp');
    }
    await up(`books/${id}/meta.json`, JSON.stringify(meta), 'application/json');
    if (writeUnits) await up(`books/${id}/units.json`, JSON.stringify({ units }), 'application/json');
    if (!S.cfg.books.includes(id)) {
      const next = { ...S.cfg, books: [...S.cfg.books, id] };
      const r = await putStore('config/app.json', next, S.cfgEtag);
      if (r.ok) { S.cfg = next; S.cfgEtag = r.etag; }
    }
    S.metas[id] = meta;
    msg(`완료: ${id} (${pages.length}쪽${writeUnits ? `, 박스 ${units.length}개` : ''})`);
    fillHeader(); await selectBook(id); renderSettings();
    toast(`${id}을(를) 올렸습니다`);
  } catch (e) { msg('실패: ' + e.message); }
}

init().catch((e) => { console.error(e); saveState('오류: ' + e.message, true); });
