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
전혜원·김래영2019,F 문제설정,F1,문제의 파악,문제 상황을 이해하고 무엇을 왜 알아볼지 파악,"자료를 수집하기 전에 자료를 수집하는 이유를 파악하며, 자료 수집과 자료 분석, 결과 해석의 동기를 유발할 수 있도록 문제를 파악한다."
전혜원·김래영2019,F 문제설정,F2,문제의 설정,자료로 답할 수 있는 질문을 직접 정함,조사하고자 하는 주제에 맞는 문제를 설정한다.
전혜원·김래영2019,P 자료 계획 및 수집,P1,자료 수집 계획,대상·인원·방법을 계획,적합한 자료를 수집하기 위해 계획을 설계한다.
전혜원·김래영2019,P 자료 계획 및 수집,P2,자료 수집 계획 이행,계획대로 실제로 설문·측정·관찰,"자료를 수집하기 위해 설계한 계획대로 관찰, 측정, 설문 등을 통해 자료를 얻는 활동을 진행한다."
전혜원·김래영2019,R 자료 표현 및 분석,R1,표현 도구 선정하기,알맞은 표·그래프를 고름,"(R1.1) 표현 도구들을 이해하고 유용성을 인식한 후에 자료에 적합한 표현 도구를 선정한다. (R1.2) 선정한 표현 도구를 어떻게 표현해야 자료 집단의 특성을 효과적으로 드러낼 수 있는지 고려한다."
전혜원·김래영2019,R 자료 표현 및 분석,R2,변환하기,"표·그래프로 나타내기, 평균 등 값 구하기(계산 포함)",자료를 선정한 표현 도구를 이용하여 변환한다.
전혜원·김래영2019,R 자료 표현 및 분석,R3,분석,"표현된 자료를 있는 그대로 읽기(값 읽기, 비교, 분포 특징)","(R3.1) 표현도구들에서 제목이나 축의 이름, 주어진 자료 이름 등과 같이 그래프에서 확실히 시각화된 자료를 명확히 관찰하는 것으로 한 눈에 바로 읽을 수 있는 정보를 읽을 수 있다. (R3.2) 국소적인 시각으로 표현된 자료들의 관계를 비교한다. 이 때 문맥에서 요소의 의미를 고려하지 않고 시각적인 것으로 해석한다. (R3.3) 표현된 값의 대부분 또는 전부를 종합하거나 통합해서 하나의 진술이나 관계로 분석한다."
전혜원·김래영2019,I 결과 해석,I1,해석,"분석 결과를 원래 문제 상황과 연결해 결론 내리기, 추론·예측 포함","자료 분석을 바탕으로 초기에 설정한 문제와 연관 지어서 해석한다. 자료에 내재되어 있는 의미로부터 추론하고 예측하여 자료 이면에 있는 정보를 추론한다."
전혜원·김래영2019,I 결과 해석,I2,확인·평가,"이미 나온 해석·주장·결론이 적절한지 따지기",해석한 것을 확인하고 평가한다.
전혜원·김래영2019,X 해당 없음,X,해당 없음,F·P·R·I 어디에도 해당하지 않음 (예: 용어의 뜻 알기),조에서 추가한 코드 (원문 표에는 없음)
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
// 조 코딩 규칙(10/20)의 경계 규칙
const JK_TIPS = {
  F1: '무엇을 알아볼지 정하면 F, 자료를 어떻게 모을지 정하거나 모으면 P',
  F2: '무엇을 알아볼지 정하면 F, 자료를 어떻게 모을지 정하거나 모으면 P',
  P1: '무엇을 알아볼지 정하면 F, 자료를 어떻게 모을지 정하거나 모으면 P',
  P2: '무엇을 알아볼지 정하면 F, 자료를 어떻게 모을지 정하거나 모으면 P',
  R1: '고르면 R1, 그리거나 계산하면 R2. 둘 다 있으면 각각 코딩(행 나누기)',
  R2: '고르면 R1, 그리거나 계산하면 R2. 둘 다 있으면 각각 코딩(행 나누기)',
  R3: '표·그래프·분포의 특징을 물으면 R3, 그 특징을 근거로 집단·상황에 대한 질문에 답하면 I1. 예) "30회 이상인 학생은 어느 반이 더 많은가?" → R3',
  I1: '특징을 근거로 집단·상황에 답하면 I1(예: "어느 반이 더 잘한다고 할 수 있는가?"). 학생이 결론을 내리면 I1, 이미 나온 결론을 따지면 I2',
  I2: '학생이 결론을 내리면 I1, 이미 나온 결론을 따지면 I2. 표본의 대표성을 따지는 문항(예: "10명에게만 물은 결과를 믿을 수 있나?")도 I2',
  F: '교육과정 전용. 문제 설정에 관한 동사인데 F1·F2 중 무엇인지 적혀 있지 않을 때',
  P: '교육과정 전용. 자료 수집에 관한 동사인데 P1·P2 중 무엇인지 적혀 있지 않을 때',
  R: '교육과정 전용. "분석하고"처럼 R1·R2·R3 중 무엇인지 적혀 있지 않을 때. 집계에서 R 단계 합계에 들어감',
  I: '교육과정 전용. 해석에 관한 동사인데 I1·I2 중 무엇인지 적혀 있지 않을 때',
};
const LIT_DESC = {
  '통계·수학적 지식의 절차적 활용': '통계 지식 적용(통계적 문제 판단·수집 방법·표현·계산·용어·의미)',
  '비판적 평가': '주장·결론·그래프·자료를 따지기',
  '의사소통': '설명·발표·토론이 활동의 중심일 때',
  '해당 없음': '세 요소 모두 해당하지 않음',
};
function codeHelp(code) {
  const c = codeList().find((x) => x.code === code);
  if (!c) return '';
  const fwName = S.cfg.activeFramework;
  const tip = fwName === '전혜원·김래영2019' ? JK_TIPS[code] : fwName === '우리초안' ? (isCur() ? VERB_TIPS[code] : CODE_TIPS[code]) : '';
  return `<b>${esc(c.code)} ${esc(c.name)}</b>${c.desc ? ' — ' + esc(c.desc) : ''}`
    + (c.def ? `<div class="def"><span>표 Ⅲ-1 하위 요소</span> ${esc(c.def)}</div>` : '')
    + (tip ? `<div class="tip">구분: ${esc(tip)}</div>` : '');
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
  v2: true, v3: true, v4: true, v5: true,
});

// ───────── 상태 ─────────
const S = {
  key: '', cfg: null, cfgEtag: null,
  metas: {}, book: null, units: [], unitsEtag: null, dirty: new Set(), deleted: new Set(),
  mine: { done: false, items: {} }, mineEtag: null,
  coder: '', page: 0, sel: null, multi: new Set(), edit: false, draw: false, zoom: 1,
  imgCache: new Map(), prog: {}, metaOpen: false,
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
  parseCSV(text).slice(1).forEach(([fw, stage, code, name, desc, def]) => {
    if (!fw || !code) return;
    (out[fw.trim()] ||= []).push({ stage: stage.trim(), code: code.trim(), name: (name || '').trim(), desc: (desc || '').trim(), def: (def || '').trim() });
  });
  return out;
}
function frameworksToCSV(fws) {
  const rows = [['후보', '단계', '코드', '이름', '학생이 하는 일', '원문 정의']];
  for (const [fw, list] of Object.entries(fws)) list.forEach((c) => rows.push([fw, c.stage, c.code, c.name, c.desc, c.def || '']));
  return rows.map((r) => r.map(csvCell).join(',')).join('\n');
}

// ───────── API ─────────
async function api(path, opts = {}) {
  // 떠날 때는 keepalive로 보내 요청이 끊기지 않게. keepalive는 64KB까지만 되므로 큰 데이터는 화면이 가려질 때(visibilitychange) 미리 저장된 것에 맡김
  const ka = S.leaving && (!opts.body || opts.body.length < 60000);
  const res = await fetch(path, { ...opts, ...(ka ? { keepalive: true } : {}), headers: { 'x-app-key': S.key, 'content-type': 'application/json', ...(opts.headers || {}) } });
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
  // 주소에 버전(v)을 붙여서, 같은 경로에 쪽 이미지를 다시 올리면 새 주소로 받게 함(1년 캐시라도 옛 이미지 안 보임)
  const url = '/api/img?p=' + encodeURIComponent(p) + '&v=' + encodeURIComponent((S.metas[bookId] || {}).v || 1);
  const prom = (async () => {
    let cache = null;
    try { cache = await caches.open('snu-pages-v1'); const hit = await cache.match(url); if (hit) return URL.createObjectURL(await hit.blob()); } catch {}
    const r = await fetch(url, { headers: { 'x-app-key': S.key } });
    if (!r.ok) throw new Error('이미지 없음');
    try { if (cache) await cache.put(url, r.clone()); } catch {}
    return URL.createObjectURL(await r.blob());
  })();
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
  // 교과서: 2차 코드까지. 교육과정: 하위 활동이 안 적힌 동사를 위해 큰 단계(F·P·R·I)만 고르는 선택지도
  if (!isCur()) return fw();
  const out = [];
  fw().forEach((c) => {
    const L = c.stage[0];
    if (L !== 'X' && !out.some((x) => x.code === L)) out.push({ stage: c.stage, code: L, name: '', desc: `하위 활동이 적혀 있지 않은 동사는 큰 단계까지만 (예: "분석하고" → R)`, def: '' });
    out.push(c);
  });
  return out;
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
  codeList().forEach((c) => { const k = levelOf(c.code, level); if (!seen.includes(k)) seen.push(k); });
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
// 내용 요소: 박스에 직접 정한 값(u.ce)이 있으면 그것, 없으면 발문 요약·성취기준으로 자동
const CE_RULES = [
  ['줄기와 잎 그림', /줄기|잎/], ['도수분포다각형', /다각형/], ['히스토그램', /히스토그램/], ['상대도수', /상대도수/],
  ['도수분포표', /도수분포표|계급|도수분포/], ['상자그림', /상자그림|사분위/], ['산점도·상관관계', /산점도|상관/],
  ['산포도', /분산|표준편차|편차|산포/], ['대푯값', /평균|중앙값|최빈값|대푯값/],
  ['통계적 탐구', /탐구 문제|프로젝트|포스터|통계적 문제해결|조사 주제|자료를 수집|자료 수집|조사.*계획/],
];
const CE_BY_STD = {
  '9수04-01': '대푯값', '9수04-02': '도수분포표', '9수04-03': '상대도수', '9수04-04': '통계적 탐구', '9수04-07': '산포도', '9수04-08': '상자그림', '9수04-09': '산점도·상관관계',
  '9수05-01': '도수분포표', '9수05-02': '상대도수', '9수05-03': '통계적 탐구', '9수05-06': '대푯값', '9수05-07': '산포도', '9수05-08': '산점도·상관관계',
  '도수분포와 그래프': '도수분포표', '대푯값과 산포도': '대푯값',
};
function autoCE(u) {
  const t = `${u.summary || ''} ${u.task || ''}`;
  const hit = CE_RULES.filter(([, re]) => re.test(t)).map(([k]) => k);
  if (hit.length) return hit;
  return CE_BY_STD[u.std] ? [CE_BY_STD[u.std]] : ['기타'];
}
const unitCE = (u) => (u && Array.isArray(u.ce) && u.ce.length ? u.ce : autoCE(u || {}));
// 문제해결 코드는 여러 개 가능 (예전 기록의 code 하나도 읽음)
const codesOf = (it) => (it && Array.isArray(it.codes) ? it.codes : it && it.code ? [it.code] : []);
const LITX = '해당 없음';
// 소양은 여러 개 가능(lits). 예전 기록은 lit 하나를 읽음. '해당 없음'은 다른 것과 같이 고를 수 없음
const litsOf = (it) => (it && Array.isArray(it.lits) ? it.lits : it && it.lit ? [it.lit] : []);
const LIT_ELEMS = () => litList().filter((l) => l !== LITX);
const litMark = (lit) => (!lit ? '' : lit === LITX ? 'X' : litShort(lit)[0]);
const codeStr = (it) => codesOf(it).join('·');
// 목록·박스에 보이는 짧은 표시: 코드 + 소양 첫 글자 (예: R2 절, I1 의, R3 X)
const markStr = (it) => [codeStr(it), ...litsOf(it).map(litMark)].filter(Boolean).join(' ');
const LIT_CLS = { 절: 'lm-p', 비: 'lm-c', 의: 'lm-m', X: 'lm-x' };
const litBadge = (lit) => { const m = litMark(lit); return m ? `<span class="lm ${LIT_CLS[m] || ''}">${m}</span>` : ''; };
const litBadges = (it) => litsOf(it).map(litBadge).join('');
// 색 있는 표시: 코드(단계 색) + 소양 배지
const markHtml = (it, empty = '·') => {
  const c = codeStr(it), b = litBadges(it);
  return c || b ? `<span style="color:${firstColor(it)}">${esc(c)}</span>${b}` : `<span style="color:var(--muted)">${empty}</span>`;
};
const firstColor = (it) => (codesOf(it).length ? stageColor(codesOf(it)[0]) : 'var(--muted)');
const isDone = (it) => !!(it && codesOf(it).length && litsOf(it).length); // 코드가 있고 소양을 하나 이상(해당 없음 포함) 고른 단위
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
  const raw = c.data || {}; // 저장된 값 그대로 (기본값과 섞기 전)
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
  // 저장된 전혜원·김래영 분석틀이 최신(조 코딩 규칙 문구 + X 해당 없음)이 아니면 새로 씀 — 내용으로 판단
  {
    const fresh = DEFAULT_CFG().frameworks['전혜원·김래영2019'];
    const cur = (S.cfg.frameworks || {})['전혜원·김래영2019'] || [];
    const sig = (list) => list.map((x) => `${x.code}:${x.name}:${x.desc}:${x.def || ''}`).join('|');
    // fwVersion은 기본값에 넣지 않음 → 한 번 갱신한 뒤 설정에서 고친 내용은 덮어쓰지 않음
    if ((raw.fwVersion || 0) < 6 && sig(cur) !== sig(fresh)) {
      const next = { ...S.cfg, fwVersion: 6, frameworks: { ...S.cfg.frameworks, '전혜원·김래영2019': fresh } };
      const r = await putStore('config/app.json', next, S.cfgEtag);
      if (r.ok) { S.cfg = next; S.cfgEtag = r.etag; }
    }
  }
  if (S.cfg.books.includes('T0')) {
    const next = { ...S.cfg, books: S.cfg.books.filter((x) => x !== 'T0'), v3: true };
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
  $('#helpBtn').onclick = startTour;
  if (S.coder && !ls.get('tourDone')) setTimeout(startTour, 500);
  loadProgress();
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
function bookLabel(id) {
  const m = S.metas[id] || {}, pg = S.prog[id];
  const name = isCur(id) ? bookName(id) : `${m.period || ''} ${m.title || id}`.trim(); // 출판사는 묶음 제목에 있음
  // 내 것만: 완료 누르면 '✓ 완료', 아니면 (한 개수/전체)
  const fin = pg && pg.by && pg.by[S.coder] && pg.by[S.coder].fin;
  return name + (pg && pg.total ? (fin ? '  ✓ 완료' : `  (${pg.done}/${pg.total})`) : '');
}
function updateBookOption(id) { const o = document.querySelector(`#bookSel option[value="${CSS.escape(id)}"]`); if (o) o.textContent = bookLabel(id); }
// 목록마다 내 진행률을 뒤에서 조용히 불러옴
async function loadProgress(force = false) {
  if (!force && Date.now() - (S.progT || 0) < 180e3) return; // 목록 바꿀 때마다 전부 읽지 않게
  S.progT = Date.now();
  await Promise.all(S.cfg.books.map(async (id) => {
    try {
      const [u, p] = await Promise.all([getStore(`books/${id}/units.json`), api(`/api/codings?book=${encodeURIComponent(id)}&progress=1`)]);
      const units = (u.data && u.data.units) || [];
      const req = units.filter(isRequired), reqIds = new Set(req.map((x) => x.id));
      const by = {};
      S.cfg.coders.forEach((c) => { const v = (p && p[c]) || {}; by[c] = { n: (v.ids || []).filter((x) => reqIds.has(x)).length, fin: !!v.done }; });
      const mine = id === S.book && S.prog[id] ? S.prog[id].done : (by[S.coder] ? by[S.coder].n : 0);
      S.prog[id] = { done: mine, total: req.length, by };
      updateBookOption(id);
    } catch {}
  }));
}
const bookName = (id) => { const m = S.metas[id]; if (!m) return id; if (m.type === 'curriculum') return `${m.period || ''} 교육과정`.trim(); return `${m.period || ''} ${m.publisher || ''} ${m.title || id}`.trim(); };

function fillHeader() {
  fillHeader.books();
  $('#bookSel').onchange = (e) => selectBook(e.target.value);
  fillHeader.coders();
}
fillHeader.books = function () {
  const groups = [];
  S.cfg.books.forEach((id) => {
    const m = S.metas[id] || {};
    // 두 가지 틀: (1) 교육과정 (2) 출판사별 교과서
    const g = isCur(id) ? '교육과정' : (m.publisher || '기타');
    let x = groups.find((y) => y.g === g); if (!x) groups.push(x = { g, ids: [] }); x.ids.push(id);
  });
  const ORDER = ['교육과정', '미래엔', '비상교육', '동아(강)'];
  const rank = (g) => (ORDER.indexOf(g) < 0 ? 99 : ORDER.indexOf(g));
  groups.sort((a, b) => rank(a.g) - rank(b.g) || a.g.localeCompare(b.g));
  const key = (id) => { const m = S.metas[id] || {}; return `${m.period || ''} ${m.title || id}`; };
  groups.forEach((x) => x.ids.sort((a, b) => key(a).localeCompare(key(b), 'ko', { numeric: true })));
  $('#bookSel').innerHTML = groups.map((x) => `<optgroup label="${esc(x.g === '교육과정' ? '① 교육과정' : '② ' + x.g)}">${x.ids.map((id) => `<option value="${esc(id)}">${esc(bookLabel(id))}</option>`).join('')}</optgroup>`).join('') || '<option value="">(목록 없음)</option>';
};
fillHeader.coders = function () {
  const saved = ls.get('coder');
  $('#coderSel').innerHTML = '<option value="">선택하세요</option>' + S.cfg.coders.map((c) => `<option ${c === saved ? 'selected' : ''}>${esc(c)}</option>`).join('');
  S.coder = S.cfg.coders.includes(saved) ? saved : '';
  $('#coderSel').onchange = (e) => setCoder(e.target.value);
  if (!S.coder) showWho();
};

async function setCoder(name) {
  await flushSaves();
  S.coder = name; ls.set('coder', name); $('#coderSel').value = name;
  $('#who').classList.add('hidden');
  S.prog = {}; fillHeaderBooks();
  await loadMine(); renderAll();
  if (name && !ls.get('tourDone')) setTimeout(startTour, 400);
  loadProgress(true);
}
function fillHeaderBooks() { const v = S.book; const sel = $('#bookSel'); const save = sel.onchange; fillHeader.books(); sel.value = v || ''; sel.onchange = save; }
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
  await flushSaves();
  S.book = id || null; S.sel = null; S.page = 0;
  if (id) ls.set('book', id);
  $('#bookSel').value = id || '';
  $('#who').classList.toggle('hidden', !!S.coder);
  S.units = []; S.unitsEtag = null; S.dirty.clear(); S.deleted.clear();
  if (id) {
    const u = await getStore(`books/${id}/units.json`);
    S.units = (u.data && u.data.units) || []; S.unitsEtag = u.etag;
    sortUnits();
  }
  await loadMine();
  const p = Number(ls.get('page:' + id)); if (p && S.metas[id] && p < S.metas[id].pages.length) S.page = p;
  renderAll();
  loadProgress(); // 3분이 지났을 때만 진행률 새로 받기
}

async function loadMine() {
  S.mine = { done: false, items: {} }; S.mineEtag = null;
  if (!S.book || !S.coder) return;
  const r = await api(`/api/codings?book=${encodeURIComponent(S.book)}&coder=${encodeURIComponent(S.coder)}`);
  if (r.data) { S.mine = { done: false, items: {}, ...r.data }; S.mineEtag = r.etag; }
  S.mineSig = S.book + '|' + S.coder + '|' + JSON.stringify([S.mine.done, S.mine.items]);
}

function sortUnits() {
  if (isCur()) return;
  const m = S.metas[S.book] || {};
  // 두 단으로 된 쪽: 오른쪽 단(가운데보다 오른쪽에서 시작하는 좁은 박스)은 왼쪽 단 다음에 센다
  const twoCol = new Set();
  S.units.forEach((u) => { if (u.r[0] >= 0.48 && u.r[2] < 0.55) twoCol.add(u.page); });
  const col = (u) => (twoCol.has(u.page) && S.units.some((v) => v.page === u.page && v.r[0] + v.r[2] <= 0.55) && u.r[0] >= 0.48 && u.r[2] < 0.55 ? 1 : 0);
  S.units.sort((a, b) => a.page - b.page || col(a) - col(b) || Math.round(a.r[1] * 200) - Math.round(b.r[1] * 200) || a.r[0] - b.r[0] || (a.t || 0) - (b.t || 0));
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
      return `<div class="crow ${u.id === S.sel || S.multi.has(u.id) ? 'sel' : ''}" data-id="${u.id}"><span class="cno">#${unitNo(u)}</span><span class="kind">${esc(u.task || '')}</span><span class="ctext">${esc(u.summary)}</span><span class="ccode">${markHtml(it)}</span></div>`;
    }).join('')}</div>`).join('');
  V.onclick = (e) => { const r = e.target.closest('.crow'); if (r) pick(r.dataset.id, e.shiftKey); };
}

function renderPages() {
  const m = S.metas[S.book];
  if (!m || !m.pages) { $('#pageList').innerHTML = ''; return; }
  $('#pageList').innerHTML = m.pages.map((p, i) => {
    const us = S.units.filter((u) => u.page === i);
    const todo = us.filter((u) => isRequired(u) && !isDone(S.mine.items[u.id])).length;
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
  const extra = `${k !== 'main' ? ' ' + KINDS[k] : ''}${codeStr(it) ? ' · ' + codeStr(it) : ''}`;
  return `${unitNo(u)}${extra || litsOf(it).length ? `<span class="tc">${esc(extra)}${litBadges(it)}</span>` : ''}`;
}

function renderBoxes() {
  if (isCur()) { $('#boxes').innerHTML = ''; return; }
  const onPage = S.units.filter((u) => u.page === S.page);
  const html = onPage.map((u, i) => {
    const it = S.mine.items[u.id] || {};
    // 행 나누기로 겹친 박스는 번호표를 옆으로 비켜 표시
    const shift = onPage.slice(0, i).filter((v) => Math.abs(v.r[1] - u.r[1]) < 0.012 && Math.abs(v.r[0] + v.r[2] - u.r[0] - u.r[2]) < 0.012).length;
    const cls = ['box', isDone(it) ? 'coded' : codesOf(it).length || litsOf(it).length ? 'partial' : '', !isRequired(u) ? 'optional' : '', u.id === S.sel || S.multi.has(u.id) ? 'sel' : ''].join(' ');
    const [x, y, w, h] = u.r;
    // 작은 박스가 큰 박스 위에 오게 (겹친 소문항도 누를 수 있게)
    const z = 10 + Math.max(0, 1000 - Math.round(w * h * 1000));
    return `<div class="${cls}" data-id="${u.id}" style="left:${x * 100}%;top:${y * 100}%;width:${w * 100}%;height:${h * 100}%;z-index:${z}"><span class="tag" style="margin-left:${shift * 24}px">${boxLabel(u)}</span><span class="handle"></span></div>`;
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
function goNextTodo() {
  const i = S.units.findIndex((u) => u.id === S.sel);
  const after = S.units.slice(i + 1).concat(S.units.slice(0, i + 1));
  const next = after.find((u) => isRequired(u) && !isDone(S.mine.items[u.id]));
  if (!next) { toast('이 목록의 필수 단위를 모두 했어요! 오른쪽 아래 \'코딩 완료\'를 눌러 주세요.', 3500); step(1); return; }
  select(next.id);
}
function step(d) {
  const list = visibleUnits(); if (!list.length) return;
  let i = list.findIndex((u) => u.id === S.sel);
  i = i < 0 ? 0 : Math.max(0, Math.min(list.length - 1, i + d));
  select(list[i].id);
}
const visibleUnits = () => $('#onlyTodo').checked ? S.units.filter((u) => u.id === S.sel || (isRequired(u) && !isDone(S.mine.items[u.id]))) : S.units;

const TOUCH = !!(window.matchMedia && matchMedia('(hover: none)').matches);
// 태블릿·폰만 처음부터 터치로 봄(아이패드는 키보드가 붙으면 hover가 있다고 나와서 따로 확인). 터치 화면 노트북은 마우스로 시작
const HASTOUCH = TOUCH || /iPad|iPhone|Android/i.test(navigator.userAgent) || (/Mac/.test(navigator.platform) && (navigator.maxTouchPoints || 0) > 1);
let LASTPT = HASTOUCH ? 'touch' : 'mouse';
const isTouch = () => LASTPT === 'touch' || LASTPT === 'pen';
const markTouch = () => { if (!document.body.classList.contains('touch')) { document.body.classList.add('touch'); if (S.book) renderPage(); } };
document.addEventListener('pointerdown', (e) => {
  const was = isTouch(); LASTPT = e.pointerType || 'mouse';
  if (isTouch()) markTouch();
  else if (document.body.classList.contains('touch') && !TOUCH) { document.body.classList.remove('touch'); if (S.book) renderPage(); } // 마우스를 쓰면 다시 컴퓨터 화면으로
  if (was !== isTouch() && S.book) setTimeout(renderPanel, 0); // 안내 문구 바꾸기
}, true);
if (HASTOUCH) document.addEventListener('DOMContentLoaded', markTouch);
document.addEventListener('touchstart', (e) => {
  if (e.target.closest && e.target.closest('[data-code]')) return;
  $('#tip').classList.add('hidden'); S.tipCode = null;
  document.querySelectorAll('[data-code].peek').forEach((x) => x.classList.remove('peek'));
}, { passive: true });
function renderPanel() {
  $('#tip').classList.add('hidden'); S.tipCode = null;
  const u = unitById(S.sel);
  const P = $('#unitPanel');
  if (!S.book) { P.innerHTML = '<p class="hint">설정 탭에서 교과서를 먼저 등록하세요.</p>'; return; }
  if (!u && window.innerWidth <= 760 && S.units.length && !renderPanel.auto) {
    // 폰: 목록이 안 보이니 남은 단위 하나를 바로 고름
    renderPanel.auto = true;
    const n = S.units.find((x) => isRequired(x) && !isDone(S.mine.items[x.id])) || S.units[0];
    select(n.id); renderPanel.auto = false; return;
  }
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

  const reqHere = isRequired(u);
  const statusTxt = !canCode ? '' : isDone(it) ? '✓ 이 단위는 다 했어요' : codesOf(it).length ? '② 통계적 소양을 골라 주세요(미완료)' : litsOf(it).length ? '① 코드를 골라 주세요' : reqHere ? '① 코드와 ② 소양을 고르세요' : '이 유형은 코딩이 선택이에요';
  P.innerHTML = `
    <div class="u-head">
      <span class="num">#${unitNo(u)}</span>
      <span class="kind ${u.kind === 'main' || !u.kind ? 'main' : ''}">${KINDS[u.kind || 'main']}</span>
      <span class="hint">${esc(where(S.book, u))}</span>
      <span class="nav"><button id="uPrev" title="이전 단위 (↑ 키)">↑</button><button id="uNext" title="다음 단위 (↓ 키)">↓</button></span>
    </div>
    <details class="meta-box" ${S.metaOpen ? 'open' : ''}>
      <summary><span class="summ">${esc(u.summary || u.task || '(요약 없음)')}</span><span class="edit-link">박스 정보 고치기</span></summary>
      <p class="hint" style="margin:6px 0">박스 정보는 세 명이 함께 씁니다. 고치면 모두에게 반영돼요.</p>
      ${isCur() ? `<div class="meta-grid">
        <label>성취기준</label><select data-f="std">${opt([...new Set([...S.units.map((x) => x.std).filter(Boolean), ...S.cfg.stdList.filter((x) => x !== '기타'), '공통'])], u.std)}</select>
        <label>출처</label><select data-f="task">${opt([...new Set([...S.units.map((x) => x.task).filter(Boolean), '성취기준', '해설', '교수·학습 유의사항'])], u.task)}</select>
        <label>의미 단위</label><textarea data-f="summary" rows="2">${esc(u.summary)}</textarea>
      </div>
      ${u.orig ? `<div class="meta-ro">원문: ${esc(u.orig)}</div>` : ''}` : `<div class="meta-grid">
        <label>유형</label><select data-f="kind">${Object.entries(KINDS).map(([k, v]) => `<option value="${k}" ${k === (u.kind || 'main') ? 'selected' : ''}>${v}</option>`).join('')}</select>
        <label>발문 요약</label><input data-f="summary" value="${esc(u.summary)}">
        <label>과제 번호</label><input data-f="task" value="${esc(u.task)}">
        <label>위치</label><select data-f="pos">${opt(S.cfg.positions, u.pos)}</select>
        <label>성취기준</label><select data-f="std">${opt([...new Set([...S.units.map((x) => x.std).filter(Boolean), ...S.cfg.stdList])], u.std)}</select>
      </div>`}
      <div class="meta-ce"><span class="hint">내용 요소 ${Array.isArray(u.ce) && u.ce.length ? '' : '(자동)'}</span>
        <div class="chips">${S.cfg.contentElements.map((c) => `<button data-uce="${esc(c)}" class="${unitCE(u).includes(c) ? 'on' : ''}">${esc(c)}</button>`).join('')}</div></div>
      <div class="unit-tools">
        <button id="uSplit" title="한 발문에 행동이 여럿일 때 같은 자리에 행을 하나 더 만듭니다">행 나누기</button>
        ${isCur() ? '<button id="uAdd">아래에 문장 추가</button>' : ''}
        <button id="uDel" class="danger">${isCur() ? '문장' : '박스'} 삭제</button>
        <span class="hint">여러 개 합치기: Shift+클릭</span>
      </div>
    </details>
    ${!canCode ? '<p class="hint" style="color:var(--bad)">위에서 내 이름을 먼저 고르세요.</p>' : `
    ${S.mine.done ? `<p class="lock-note">✓ 완료한 목록이라 코드를 바꿀 수 없어요. 고치려면 오른쪽 아래 '완료 취소'를 누르세요.</p>` : ''}
    <div class="${S.mine.done ? 'locked' : ''}">
    <div class="step"><span class="stepn ${codesOf(it).length ? 'ok' : ''}">${codesOf(it).length ? '✓' : '1'}</span>문제해결 코드 ${reqHere ? '<span class="req">필수</span>' : '<span class="opt">선택</span>'}<span class="hint step-hint">${isTouch() ? '여러 개 가능 · 꾸욱 누르면 설명' : '여러 개 가능 · 올리면 설명'}</span></div>
    <div class="code-grid">${stages.map((s) => `<div class="st" style="color:${stageColor(s.codes[0].code)}">${esc(s.stage.split(' ')[0])}</div>
      <div class="codes">${s.codes.map((c) => `<button data-code="${esc(c.code)}" class="${codesOf(it).includes(c.code) ? 'on' : ''}" style="${codesOf(it).includes(c.code) ? `background:${stageColor(c.code)};border-color:${stageColor(c.code)}` : ''}"><b>${esc(c.code)}</b>${esc(c.name)}</button>`).join('')}</div>`).join('')}</div>
    <div class="step"><span class="stepn ${litsOf(it).length ? 'ok' : ''}">${litsOf(it).length ? '✓' : '2'}</span>통계적 소양 ${reqHere ? '<span class="req">필수</span>' : '<span class="opt">선택</span>'}<span class="hint step-hint">해당하는 것 모두 · 요소마다 따로 판단</span></div>
    <div class="lit-grid">${litList().map((c) => `<button data-lit="${esc(c)}" class="${litsOf(it).includes(c) ? 'on' : ''} ${c === LITX ? 'litx' : ''}" title="${esc(LIT_DESC[c] || '')}"><b>${c === LITX ? '' : `<i class="cb">${litsOf(it).includes(c) ? '☑' : '☐'}</i>`}${litBadge(c)} ${esc(litShort(c))}</b><span>${esc(LIT_DESC[c] || '')}</span></button>`).join('')}</div>
    <textarea id="cMemo" rows="1" class="memo" placeholder="메모 (선택) — 판단 근거나 헷갈린 점" ${S.mine.done ? 'disabled' : ''}>${esc(it.memo)}</textarea>
    </div>
    <div class="next-row"><span class="status ${isDone(it) ? 'ok' : ''}">${statusTxt}</span><button id="goNext" class="primary">다음 ▶</button></div>`}
  `;
  P.querySelector('.meta-box').ontoggle = (e) => { S.metaOpen = e.target.open; };
  P.querySelectorAll('[data-uce]').forEach((b) => b.onclick = () => {
    const ce = new Set(unitCE(u)); ce.has(b.dataset.uce) ? ce.delete(b.dataset.uce) : ce.add(b.dataset.uce);
    u.ce = [...ce]; markDirty(u); renderPanel();
  });
  if ($('#goNext')) $('#goNext').onclick = goNextTodo;

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
    const showTip = (el = b) => {
      const t = $('#tip'), r = el.getBoundingClientRect();
      t.innerHTML = codeHelp(b.dataset.code); t.classList.remove('hidden');
      const w = t.offsetWidth, h = t.offsetHeight;
      t.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left)) + 'px';
      t.style.top = (r.bottom + 6 + h > window.innerHeight - 8 ? Math.max(8, r.top - h - 6) : r.bottom + 6) + 'px';
    };
    // 터치: 꾸욱(0.5초) 누르면 설명만 보고 선택은 안 함
    let lp = null;
    b.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse') return;
      b.dataset.lp = '';
      lp = setTimeout(() => { b.dataset.lp = '1'; showTip(); }, 500);
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => b.addEventListener(ev, () => clearTimeout(lp)));
    b.oncontextmenu = (e) => e.preventDefault();
    b.onclick = () => {
      if (b.dataset.lp === '1') { b.dataset.lp = ''; return; }
      const set = new Set(codesOf(it)); set.has(b.dataset.code) ? set.delete(b.dataset.code) : set.add(b.dataset.code);
      const order = codeList().map((c) => c.code); const codes = [...set].sort((a, c) => order.indexOf(a) - order.indexOf(c));
      const code = b.dataset.code;
      setItem(u.id, { codes, code: codes[0] || '' });
    };
    // 마우스를 올리면 버튼 바로 밑에 설명
    b.onmouseenter = () => { if (!isTouch()) showTip(); };
    b.onmouseleave = () => { if (!isTouch()) $('#tip').classList.add('hidden'); };
  });
  P.querySelectorAll('[data-lit]').forEach((b) => b.onclick = () => {
    // 해당 없음을 고르면 나머지가 풀리고, 세 요소 중 하나를 고르면 해당 없음이 풀림
    const v = b.dataset.lit, cur = litsOf(it);
    let next;
    if (v === LITX) next = cur.includes(LITX) ? [] : [LITX];
    else { const set = new Set(cur.filter((x) => x !== LITX)); set.has(v) ? set.delete(v) : set.add(v); next = litList().filter((x) => set.has(x)); }
    setItem(u.id, { lits: next });
  });
  $('#cMemo').oninput = (e) => setItem(u.id, { memo: e.target.value }, false);
}

function renderList() {
  const list = visibleUnits();
  const m = S.metas[S.book];
  const req = S.units.filter(isRequired);
  const done = req.filter((u) => isDone(S.mine.items[u.id])).length;
  if (S.book) { S.prog[S.book] = { ...(S.prog[S.book] || {}), done, total: req.length }; updateBookOption(S.book); }
  $('#progress').textContent = S.units.length ? `코딩 ${done}/${req.length}` : '';
  $('#unitList').innerHTML = list.map((u) => {
    const it = S.mine.items[u.id] || {};
    return `<div class="row ${u.id === S.sel || S.multi.has(u.id) ? 'sel' : ''} ${isRequired(u) ? '' : 'opt'}" data-id="${u.id}">
      <span>#${unitNo(u)}</span><span>${esc(isCur() ? (u.std || '').replace('9수', '') : (m && m.pages[u.page] ? m.pages[u.page].label + '쪽' : ''))}</span>
      <span class="s">${u.kind && u.kind !== 'main' ? `[${KINDS[u.kind]}] ` : ''}${esc(u.summary || u.task || '(요약 없음)')}</span>
      <span class="c">${markHtml(it, isRequired(u) ? '·' : '')}</span></div>`;
  }).join('') || '<p class="hint" style="padding:8px">분석 단위가 없습니다.</p>';
  $('#unitList').onclick = (e) => { const r = e.target.closest('.row'); if (r) pick(r.dataset.id, e.shiftKey); };
}

function renderDone() {
  const b = $('#doneBtn');
  b.disabled = !S.coder || !S.book;
  const left = S.units.filter((u) => isRequired(u) && !isDone(S.mine.items[u.id])).length;
  b.textContent = S.mine.done ? '✓ 완료함 · 누르면 완료 취소' : left ? `코딩 완료 (${left}개 남음)` : '모두 했어요 → 코딩 완료 누르기';
  b.classList.toggle('ready', !S.mine.done && !left && S.units.length > 0);
  b.classList.toggle('done', !!S.mine.done);
}

// ───────── 내 코딩 저장 ─────────
let mineTimer = null;
function setItem(id, patch, rerender = true) {
  if (S.mine.done) { toast("완료한 목록이에요. 고치려면 오른쪽 아래 '완료 취소'를 먼저 누르세요."); return; }
  const cur = S.mine.items[id] || {};
  S.mine.items[id] = { ...cur, ...patch, t: Date.now() };
  scheduleMine();
  if (rerender) { renderPanel(); renderBoxes(); renderList(); renderPages(); renderCur(); renderDone(); }
}
const SAVE_DELAY = 8000; // 자동 저장 간격(ms): Blob 쓰기 횟수를 줄이려고 길게
function scheduleMine() { saveState('저장 대기…'); clearTimeout(mineTimer); mineTimer = setTimeout(() => { mineTimer = null; saveMine(); }, SAVE_DELAY); }
async function saveMine(retry = true) {
  if (!S.coder || !S.book) return;
  const sig = S.book + '|' + S.coder + '|' + JSON.stringify([S.mine.done, S.mine.items]);
  if (retry && sig === S.mineSig) { saveState('저장됨'); return; } // 바뀐 게 없으면 저장 안 함
  const data = { ...S.mine, framework: S.cfg.activeFramework, coder: S.coder, updated: Date.now() };
  try {
    const r = await api(`/api/codings?book=${encodeURIComponent(S.book)}&coder=${encodeURIComponent(S.coder)}`, { method: 'PUT', body: JSON.stringify({ data, etag: S.mineEtag }) });
    if (r.ok) { S.mineEtag = r.etag; S.mineSig = sig; saveState('저장됨 ' + new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })); return; }
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
function markDirty(u) { u.t2 = Date.now(); S.dirty.add(u.id); saveState('박스 저장 대기…'); clearTimeout(unitTimer); unitTimer = setTimeout(() => { unitTimer = null; saveUnits(); }, SAVE_DELAY); }
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
      const left = S.units.filter((u) => isRequired(u) && !isDone(S.mine.items[u.id])).length;
      if (left && !confirm(`아직 코드·소양을 다 고르지 않은 단위가 ${left}개 있습니다. 그래도 완료로 표시할까요?`)) return;
    }
    if (mineTimer) { clearTimeout(mineTimer); mineTimer = null; }
    S.mine.done = !S.mine.done; renderDone(); renderPanel(); await saveMine();
    { const pg = S.prog[S.book]; if (pg) { pg.by = pg.by || {}; pg.by[S.coder] = { ...(pg.by[S.coder] || {}), fin: S.mine.done }; updateBookOption(S.book); } }
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

  // 터치: 박스는 탭하면 바로 선택, 한 손가락은 기본 스크롤, 두 손가락은 교과서만 확대
  stage.addEventListener('click', (e) => {
    if (!isTouch() || S.draw) return;
    const boxEl = e.target.closest('.box:not(.drawing)');
    if (boxEl) pick(boxEl.dataset.id, false);
  });
  const wrapEl = $('#stageWrap');
  let pinch = null;
  const tdist = (e) => Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
  wrapEl.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 2) return;
    e.preventDefault();
    const r = wrapEl.getBoundingClientRect();
    pinch = { d: tdist(e), z: S.zoom, w: stage.offsetWidth, sl: wrapEl.scrollLeft, st: wrapEl.scrollTop,
      cx: (e.touches[0].clientX + e.touches[1].clientX) / 2 - r.left, cy: (e.touches[0].clientY + e.touches[1].clientY) / 2 - r.top };
  }, { passive: false });
  wrapEl.addEventListener('touchmove', (e) => {
    if (!pinch || e.touches.length !== 2) return;
    e.preventDefault();
    const z = Math.max(0.5, Math.min(3, pinch.z * tdist(e) / pinch.d)), k = z / pinch.z;
    S.zoom = z; stage.style.width = Math.round(pinch.w * k) + 'px';
    wrapEl.scrollLeft = (pinch.sl + pinch.cx) * k - pinch.cx;
    wrapEl.scrollTop = (pinch.st + pinch.cy) * k - pinch.cy;
    $('#zoomLabel').textContent = Math.round(z * 100) + '%';
  }, { passive: false });
  wrapEl.addEventListener('touchend', (e) => { if (e.touches.length < 2) pinch = null; });
  wrapEl.addEventListener('gesturestart', (e) => e.preventDefault());

  stage.addEventListener('mousedown', (e) => {
    if (isTouch()) return;
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
  const head = ['교과서ID', '쪽', '위치', '발문', '문제해결 코드', ...LIT_HEAD(), '코더', '메모', '유형', '과제번호', '성취기준', '내용요소', '단위ID'];
  const rows = [head];
  units.forEach((u) => {
    if (kinds && !kinds.includes(u.kind || 'main')) return;
    const it = items[u.id] || {};
    rows.push([bookId, where(bookId, u), u.pos, u.summary, codesOf(it).join(';'), ...litCols(it), coderLabel, it.memo, KINDS[u.kind || 'main'], u.task, u.std, unitCE(u).join(';'), u.id]);
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
// CSV: 소양 열 4개(절차적 활용·비판적 평가·의사소통·해당 없음)를 예/아니오로
const LIT_HEAD = () => litList().map((l) => '소양: ' + litShort(l));
const litCols = (it) => litList().map((l) => (litsOf(it).includes(l) ? '예' : '아니오'));
const litShort = (c) => ({ '통계·수학적 지식의 절차적 활용': '절차적 활용' })[c] || c;
const pct = (v) => (isNaN(v) ? '—' : (v * 100).toFixed(1) + '%');
const kfmt = (v) => (isNaN(v) ? '—' : v.toFixed(3));
function kappaWord(k) { if (isNaN(k)) return ''; return k > 0.8 ? '거의 완벽' : k > 0.6 ? '상당한 일치' : k > 0.4 ? '보통' : k > 0.2 ? '약간' : '낮음'; }

function majority(vals) {
  const c = {}; vals.filter(Boolean).forEach((v) => { c[v] = (c[v] || 0) + 1; });
  const best = Object.entries(c).sort((a, b) => b[1] - a[1])[0];
  return best && best[1] >= 2 ? best[0] : '';
}


// 일치율 계산: units(분석 단위), items(코더 → 그 코더의 items), coders
function agreeStats(units, items, coders) {
  const lv = (code) => levelOf(code, CMP.level);
  const lvSet = (it) => [...new Set(codesOf(it).map(lv))].sort();
  const sameSet = (a, b) => a.join('|') === b.join('|');
  // κ를 평균낼 코드: 이 단위들에서 누군가 실제로 고른 코드만 (아무도 안 고른 코드는 κ=1로 잡혀 값을 부풀리므로 뺌)
  const cats = [...new Set(units.flatMap((u) => coders.flatMap((c) => lvSet(items(c)[u.id]))))];
  // 코드가 여러 개일 수 있어: (1) 완전 일치율 = 고른 코드 묶음이 똑같은 비율, (2) κ = 코드마다 '골랐다/안 골랐다' κ를 구해 평균
  const pairs = [];
  for (let i = 0; i < coders.length; i++) for (let j = i + 1; j < coders.length; j++) {
    const both = units.filter((u) => codesOf(items(coders[i])[u.id]).length && codesOf(items(coders[j])[u.id]).length);
    const A = both.map((u) => lvSet(items(coders[i])[u.id])), Bs = both.map((u) => lvSet(items(coders[j])[u.id]));
    const po = both.length ? both.filter((_, k) => sameSet(A[k], Bs[k])).length / both.length : NaN;
    const ks = cats.map((c) => cohen(A.map((x) => x.includes(c)), Bs.map((x) => x.includes(c))).k).filter((k) => !isNaN(k));
    // 소양(여러 개 가능): 요소마다 '골랐다/안 골랐다'로 단순 일치율과 Cohen κ, 그리고 고른 묶음이 똑같은 비율
    const lb = units.filter((u) => litsOf(items(coders[i])[u.id]).length && litsOf(items(coders[j])[u.id]).length);
    const LA = lb.map((u) => litsOf(items(coders[i])[u.id])), LB = lb.map((u) => litsOf(items(coders[j])[u.id]));
    const el = {}; litList().forEach((e) => { const r = cohen(LA.map((x) => x.includes(e)), LB.map((x) => x.includes(e))); el[e] = { po: r.po, k: r.k }; });
    const lks = Object.values(el).map((x) => x.k).filter((k) => !isNaN(k));
    const lit = { n: lb.length, po: lb.length ? lb.filter((_, k) => sameSet([...LA[k]].sort(), [...LB[k]].sort())).length / lb.length : NaN, k: lks.length ? lks.reduce((a, b) => a + b, 0) / lks.length : NaN, el };
    pairs.push({ name: `${coders[i]} – ${coders[j]}`, code: { n: both.length, po, k: ks.length ? ks.reduce((a, b) => a + b, 0) / ks.length : NaN }, lit });
  }
  const all3 = units.filter((u) => coders.every((c) => codesOf(items(c)[u.id]).length));
  const sets3 = all3.map((u) => coders.map((c) => lvSet(items(c)[u.id])));
  const flKs = cats.map((c) => fleiss(sets3.map((row) => row.map((x) => x.includes(c)))).k).filter((k) => !isNaN(k));
  const fl = { n: all3.length, po: all3.length ? sets3.filter((row) => sameSet(row[0], row[1]) && sameSet(row[1], row[2])).length / all3.length : NaN, k: flKs.length ? flKs.reduce((a, b) => a + b, 0) / flKs.length : NaN };
  // 세 명: 요소마다 Fleiss κ와 단순 일치율(세 명이 모두 같게 판단한 비율)
  const lall = units.filter((u) => coders.every((c) => litsOf(items(c)[u.id]).length));
  const L3 = lall.map((u) => coders.map((c) => litsOf(items(c)[u.id])));
  const el3 = {};
  litList().forEach((e) => { const rows = L3.map((row) => row.map((x) => x.includes(e))); el3[e] = { po: rows.length ? rows.filter((r) => r.every((v) => v === r[0])).length / rows.length : NaN, k: fleiss(rows).k }; });
  const fks = Object.values(el3).map((x) => x.k).filter((k) => !isNaN(k));
  const flLit = { n: lall.length, po: lall.length ? L3.filter((row) => row.every((x) => sameSet([...x].sort(), [...row[0]].sort()))).length / lall.length : NaN, k: fks.length ? fks.reduce((a, b) => a + b, 0) / fks.length : NaN, el: el3 };
  return { pairs, fl, flLit };
}

// 한눈에 보기: 모든 목록의 완료 상태와 일치율. 교과서는 한 권(같은 연도·출판사·학년) 전체 합계 + 단원별
const OV = { cache: {}, t: 0 };
async function renderOverview() {
  const box = $('#cmpOv'); if (!box) return;
  const coders = S.cfg.coders;
  const fresh = Date.now() - OV.t < 120000;
  if (!fresh) {
    await Promise.all(S.cfg.books.map(async (id) => {
      try {
        const [u, r, f] = await Promise.all([getStore(`books/${id}/units.json`), api(`/api/codings?book=${encodeURIComponent(id)}&all=1`), getStore(`final/${id}.json`)]);
        OV.cache[id] = { units: (u.data && u.data.units) || [], r, fin: (f.data && f.data.items) || {} };
      } catch {}
    }));
    OV.t = Date.now();
  }
  const statOf = (ids) => {
    const open = ids.filter((id) => OV.cache[id] && OV.cache[id].r.opened);
    const units = [], itemsBy = Object.fromEntries(coders.map((c) => [c, {}]));
    let fin = 0, tot = 0;
    open.forEach((id) => {
      const o = OV.cache[id]; const us = o.units.filter((x) => CMP.kinds.includes(x.kind || 'main'));
      us.forEach((x) => { units.push(x); if (codesOf(o.fin[x.id]).length) fin++; });
      tot += us.length;
      coders.forEach((c) => Object.assign(itemsBy[c], (o.r.data[c] && o.r.data[c].items) || {}));
    });
    const st = units.length ? agreeStats(units, (c) => itemsBy[c], coders) : null;
    return { open: open.length, all: ids.length, st, fin, tot };
  };
  const cells = (x) => x.st ? `<td>${x.st.fl.n}</td><td>${pct(x.st.fl.po)}</td><td>${kfmt(x.st.fl.k)} <span class="hint">${kappaWord(x.st.fl.k)}</span></td><td>${kfmt(x.st.flLit.k)} <span class="hint">${kappaWord(x.st.flLit.k)}</span></td><td>${x.fin}/${x.tot}</td>`
    : `<td colspan="5" class="hint">비교 전</td>`;
  const done = (id) => { const o = OV.cache[id]; return coders.map((c) => `${c[0]}${o && o.r.status && o.r.status[c] ? '✓' : '·'}`).join(' '); };
  const meta = (id) => S.metas[id] || {};
  const rows = [];
  // 교육과정
  S.cfg.books.filter((id) => isCur(id)).forEach((id) => rows.push({ id, name: bookName(id), cls: 'ov-main', ...statOf([id]), st2: done(id) }));
  // 교과서: 한 권씩 묶기
  const vols = [];
  S.cfg.books.filter((id) => !isCur(id)).forEach((id) => {
    const m = meta(id), g = ((m.title || '').match(/중\s?\d/) || [''])[0].replace(/\s/, '');
    const key = `${m.period || ''} ${m.publisher || ''} ${g}`.trim();
    let v = vols.find((x) => x.key === key); if (!v) vols.push(v = { key, ids: [] }); v.ids.push(id);
  });
  vols.forEach((v) => {
    rows.push({ id: v.ids[0], name: `${v.key} 전체`, cls: 'ov-main', ...statOf(v.ids), st2: `${v.ids.filter((id) => OV.cache[id] && OV.cache[id].r.opened).length}/${v.ids.length} 단원 열림` });
    if (v.ids.length > 1) [...v.ids].sort((a, b) => (meta(a).title || a).localeCompare(meta(b).title || b, 'ko', { numeric: true })).forEach((id) => rows.push({ id, name: '　' + ((meta(id).title || id).replace(/^중\s?\d\s*/, '')), cls: 'ov-sub', ...statOf([id]), st2: done(id) }));
  });
  box.innerHTML = `<h2>비교·일치율 한눈에 보기</h2>
    <p class="note">세 명 모두 '코딩 완료'를 누른(또는 비교를 연) 목록만 계산해요. 교과서 '전체' 줄은 열린 단원을 합친 값이에요. 줄을 누르면 아래에 자세히 나와요. 유형·비교 수준은 아래 '자세히'에서 고른 값을 함께 써요.</p>
    <div class="ov-wrap"><table class="t ov"><tr><th class="l">목록</th><th>완료</th><th>단위</th><th>세 명 완전 일치</th><th>코드 Fleiss κ</th><th>소양 κ (요소별 Fleiss 평균)</th><th>최종 확정</th></tr>
    ${rows.map((x) => `<tr class="${x.cls} ${x.id === S.book && x.cls === 'ov-sub' || (x.id === S.book && isCur(x.id)) ? 'on' : ''}" data-ov="${esc(x.id)}"><td class="l">${esc(x.name)}</td><td>${esc(x.st2)}</td>${cells(x)}</tr>`).join('')}
    </table></div>`;
  box.querySelectorAll('[data-ov]').forEach((tr) => tr.onclick = async () => {
    if (tr.dataset.ov !== S.book) { await selectBook(tr.dataset.ov); fillHeaderBooks(); }
    renderCompare(); $('#cmpDet').scrollIntoView({ behavior: 'smooth' });
  });
}

// ───────── 비교 화면 ─────────
const CMP = { level: 'fine', onlyDis: true, kinds: null };
let finalState = { data: null, etag: null }, finalTimer = null;

async function renderCompare() {
  const W = $('#compareBody');
  if (!$('#cmpOv')) W.innerHTML = '<div id="cmpOv"><p class="hint">한눈에 보기 불러오는 중…</p></div><div id="cmpDet"></div>';
  renderOverview();
  const B = $('#cmpDet');
  if (!S.book) { B.innerHTML = '<p class="hint">위 표에서 목록을 누르면 자세히 볼 수 있어요.</p>'; return; }
  B.innerHTML = '<p class="hint">불러오는 중…</p>';
  CMP.kinds ||= [...(S.cfg.defaultKinds || ['main', 'intro'])];
  const [r, finRes] = await Promise.all([api(`/api/codings?book=${encodeURIComponent(S.book)}&all=1`), getStore(`final/${S.book}.json`)]);
  finalState = { data: finRes.data || { opened: false, items: {} }, etag: finRes.etag };
  const coders = S.cfg.coders;
  const statusHtml = coders.map((c) => `<span class="kind ${r.status[c] ? 'main' : ''}">${esc(c)} ${r.status[c] ? '완료' : '진행 중'}</span>`).join(' ');

  if (!r.opened) {
    B.innerHTML = `<h3 class="det-h">${esc(bookName(S.book))} 자세히</h3>
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
  const lvSet = (it) => [...new Set(codesOf(it).map(lv))].sort();
  const sameSet = (a, b) => a.join('|') === b.join('|');
  const { pairs, fl, flLit } = agreeStats(units, items, coders);

  const kindBoxes = Object.entries(KINDS).map(([k, v]) => `<label><input type="checkbox" data-kind="${k}" ${CMP.kinds.includes(k) ? 'checked' : ''}> ${v}</label>`).join(' ');
  const levelRadios = [['fine', '세부 코드'], ['basic', '기본 코드'], ['stage', '단계']].map(([k, v]) => `<label><input type="radio" name="lv" value="${k}" ${CMP.level === k ? 'checked' : ''}> ${v}</label>`).join(' ');

  // 다수결 소양: 세 요소마다 두 명 이상 고른 것, 하나도 없으면 '해당 없음'(소양을 고른 사람이 두 명 이상일 때)
  const majLits = (its) => { if (its.filter((x) => litsOf(x).length).length < 2) return []; const m = LIT_ELEMS().filter((e) => its.filter((x) => litsOf(x).includes(e)).length >= 2); return m.length ? m : [LITX]; };
  // 다수결 코드 묶음: 두 명 이상이 고른 코드
  const majCodes = (its) => codeList().map((c) => c.code).filter((c) => its.filter((x) => codesOf(x).includes(c)).length >= 2);
  const disRows = units.map((u) => {
    const its = coders.map((c) => items(c)[u.id] || {});
    const sets = its.map(lvSet);
    const ls = its.map((x) => [...litsOf(x)].sort());
    const dis = sets.some((x) => !x.length) || !sets.every((x) => sameSet(x, sets[0])) || ls.some((x) => !x.length) || !ls.every((x) => sameSet(x, ls[0]));
    return { u, its, dis };
  });
  const shown = CMP.onlyDis ? disRows.filter((x) => x.dis) : disRows;
  const fin = finalState.data.items || {};
  const finLits = (id, f) => `<div class="fin-codes">${litList().map((l) => `<button data-fl="${esc(l)}" data-fid="${id}" class="${litsOf(f).includes(l) ? 'on' : ''}">${litBadge(l)} ${esc(litShort(l))}</button>`).join('')}</div>`;
  const finChips = (id, f) => `<div class="fin-codes">${codeList().map((c) => `<button data-fc="${esc(c.code)}" data-fid="${id}" class="${codesOf(f).includes(c.code) ? 'on' : ''}" style="${codesOf(f).includes(c.code) ? `background:${stageColor(c.code)};border-color:${stageColor(c.code)}` : ''}">${esc(c.code)}</button>`).join('')}</div>`;
  const m = S.metas[S.book];
  const finDone = units.filter((u) => codesOf(fin[u.id]).length).length;

  B.innerHTML = `<h3 class="det-h">${esc(bookName(S.book))} 자세히</h3>
    <p>${statusHtml}</p>
    <div class="bar"><div class="grp"><span>포함할 유형</span>${kindBoxes}</div><div class="grp"><span>비교 수준</span>${levelRadios}</div></div>
    <div class="cards">
      <div class="card"><div class="k">세 명 코드 완전 일치</div><div class="v">${pct(fl.po)}</div><div class="hint">세 명 모두 코딩한 ${fl.n}개 기준</div></div>
      <div class="card"><div class="k">Fleiss' κ (코드별 평균)</div><div class="v">${kfmt(fl.k)}</div><div class="hint">${kappaWord(fl.k)}</div></div>
      <div class="card"><div class="k">최종 코드 확정</div><div class="v">${finDone}/${units.length}</div></div>
    </div>
    <table class="t"><tr><th class="l">쌍</th><th>단위 수</th><th>코드 완전 일치율</th><th>Cohen's κ (코드별 평균)</th><th>소양 완전 일치율</th><th>소양 κ (요소별 평균)</th></tr>
      ${pairs.map((p) => `<tr><td class="l">${esc(p.name)}</td><td>${p.code.n}</td><td>${pct(p.code.po)}</td><td>${kfmt(p.code.k)} <span class="hint">${kappaWord(p.code.k)}</span></td><td>${pct(p.lit.po)}</td><td>${kfmt(p.lit.k)} <span class="hint">${kappaWord(p.lit.k)}</span></td></tr>`).join('')}
      <tr><td class="l"><b>세 명 (Fleiss)</b></td><td>${fl.n}</td><td>${pct(fl.po)}</td><td>${kfmt(fl.k)}</td><td>${pct(flLit.po)}</td><td>${kfmt(flLit.k)}</td></tr>
    </table>
    <h3>통계적 소양: 요소별 일치</h3>
    <table class="t"><tr><th class="l">요소</th><th>세 명 단순 일치율</th><th>Fleiss' κ (세 명)</th>${pairs.map((p) => `<th>${esc(p.name)}<br>일치율 · Cohen κ</th>`).join('')}</tr>
      ${litList().map((e) => `<tr><td class="l">${litBadge(e)} ${esc(litShort(e))}</td><td>${pct(flLit.el[e].po)}</td><td>${kfmt(flLit.el[e].k)} <span class="hint">${kappaWord(flLit.el[e].k)}</span></td>${pairs.map((p) => `<td>${pct(p.lit.el[e].po)} · ${kfmt(p.lit.el[e].k)}</td>`).join('')}</tr>`).join('')}
    </table>
    <p class="note">소양은 여러 개 고를 수 있어서 요소마다 따로 셉니다. <b>단순 일치율</b> = 그 요소를 '골랐다/안 골랐다'가 같은 단위의 비율(세 명은 셋 모두 같은 비율). <b>세 명 κ</b> = 요소마다 Fleiss' κ, <b>두 명씩</b> = 요소마다 Cohen's κ. 위 표의 '소양 κ'는 요소별 κ의 평균이고, '소양 완전 일치율'은 고른 소양 묶음이 똑같은 비율입니다. 거의 모든 단위에서 '예'인 요소는 일치율이 높아도 κ가 낮게 나올 수 있어 일치율을 함께 봅니다. 소양을 모두 입력한 단위(${flLit.n}개)만 셉니다.</p>
    <p class="note">코드는 여러 개 고를 수 있어서, 완전 일치율은 고른 코드 묶음이 똑같은 단위의 비율이고, κ는 코드마다 '골랐다/안 골랐다'의 κ를 구해 평균한 값입니다. 두 사람이 모두 입력한 단위만 셉니다. κ 해석 기준: Landis & Koch(1977). '단계' 수준은 현재 분석틀(${esc(S.cfg.activeFramework)})의 단계로 묶어 비교합니다.</p>

    <h3>단위별 비교와 최종 코드</h3>
    <div class="bar">
      <label><input type="checkbox" id="onlyDis" ${CMP.onlyDis ? 'checked' : ''}> 불일치·미입력만 보기 (${disRows.filter((x) => x.dis).length}개)</label>
      <button id="fillMaj">다수결로 빈 최종 코드 채우기 (두 명 이상 고른 코드)</button>
      <button id="exportFinal">최종 코드 CSV</button>
      <button id="exportAll">세 명 코딩 CSV</button>
    </div>
    <table class="t" id="cmpTable"><tr><th>#</th><th>위치</th><th class="l">발문 요약</th>${coders.map((c) => `<th>${esc(c)}</th>`).join('')}<th>최종 코드</th><th>최종 소양</th><th class="l">메모</th></tr>
      ${shown.map(({ u, its, dis }) => {
        const f = fin[u.id] || {};
        const memos = coders.map((c) => (items(c)[u.id] || {}).memo).filter(Boolean).map((x, i) => esc(x)).join(' / ');
        const cc = its.map((it) => `<td><b style="color:${firstColor(it)}">${esc(codeStr(it) || '—')}</b>${litBadges(it)}</td>`).join('');
        const mj = majCodes(its);
        return `<tr class="${dis ? 'dis' : ''}" data-id="${u.id}"><td><a href="#" data-go="${u.id}">${unitNo(u)}</a></td><td>${esc(where(S.book, u))}</td><td class="l">${esc(u.summary || u.task)}</td>${cc}
          <td class="fin">${finChips(u.id, f)}${!codesOf(f).length && mj.length ? `<span class="hint">다수 ${esc(mj.join('·'))}</span>` : ''}</td>
          <td class="fin">${finLits(u.id, f)}${!litsOf(f).length && majLits(its).length ? `<span class="hint">다수 ${esc(majLits(its).map(litShort).join('·'))}</span>` : ''}</td>
          <td class="l hint">${memos}</td></tr>`;
      }).join('')}
    </table>`;

  B.querySelectorAll('[data-kind]').forEach((el) => el.onchange = () => { CMP.kinds = [...B.querySelectorAll('[data-kind]:checked')].map((x) => x.dataset.kind); renderCompare(); });
  B.querySelectorAll('[name=lv]').forEach((el) => el.onchange = () => { CMP.level = el.value; renderCompare(); });
  $('#onlyDis').onchange = (e) => { CMP.onlyDis = e.target.checked; renderCompare(); };
  B.querySelectorAll('[data-go]').forEach((a) => a.onclick = (e) => { e.preventDefault(); $('#tabs [data-tab=code]').click(); select(a.dataset.go); });
  finalState.data.items ||= {};
  const setFin = (id, patch) => { finalState.data.items ||= {}; finalState.data.items[id] = { ...(finalState.data.items[id] || {}), ...patch }; scheduleFinal(); };
  B.querySelectorAll('[data-fc]').forEach((el) => el.onclick = () => {
    const id = el.dataset.fid, its = coders.map((c) => items(c)[id] || {});
    const f = (finalState.data.items || {})[id] || {};
    const set = new Set(codesOf(f)); set.has(el.dataset.fc) ? set.delete(el.dataset.fc) : set.add(el.dataset.fc);
    const order = codeList().map((c) => c.code); const codes = [...set].sort((a, b) => order.indexOf(a) - order.indexOf(b));
    const patch = { codes, code: codes[0] || '' };
    if (!litsOf(f).length) patch.lits = majLits(its); // 처음 정할 때 소양은 다수결로 함께
    setFin(id, patch);
    el.classList.toggle('on', codes.includes(el.dataset.fc));
    el.style.cssText = codes.includes(el.dataset.fc) ? `background:${stageColor(el.dataset.fc)};border-color:${stageColor(el.dataset.fc)}` : '';
  });
  B.querySelectorAll('[data-fl]').forEach((el) => el.onclick = () => {
    const id = el.dataset.fid, v = el.dataset.fl, cur = litsOf((finalState.data.items || {})[id]);
    let next;
    if (v === LITX) next = cur.includes(LITX) ? [] : [LITX];
    else { const set = new Set(cur.filter((x) => x !== LITX)); set.has(v) ? set.delete(v) : set.add(v); next = litList().filter((x) => set.has(x)); }
    setFin(id, { lits: next });
    el.parentElement.querySelectorAll('[data-fl]').forEach((b) => b.classList.toggle('on', next.includes(b.dataset.fl)));
  });
  $('#fillMaj').onclick = () => {
    let n = 0;
    units.forEach((u) => {
      if (codesOf(fin[u.id]).length) return;
      const its = coders.map((c) => items(c)[u.id] || {});
      const mj = majCodes(its);
      if (!mj.length) return;
      finalState.data.items[u.id] = {
        ...(finalState.data.items[u.id] || {}), codes: mj, code: mj[0],
        lits: majLits(its),
      };
      n++;
    });
    toast(`${n}개를 다수결로 채웠습니다. 세 명이 모두 다른 단위는 직접 정해 주세요.`);
    saveFinal().then(renderCompare);
  };
  $('#exportFinal').onclick = () => exportCSV(S.book, '최종', fin, `${S.book}_최종코드.csv`);
  $('#exportAll').onclick = () => {
    const head = ['교과서ID', '쪽', '위치', '발문', '문제해결 코드', ...LIT_HEAD(), '코더', '메모', '유형', '과제번호', '성취기준', '내용요소', '단위ID'];
    const rows = [head];
    [...coders, '최종'].forEach((c) => {
      const its = c === '최종' ? fin : items(c);
      S.units.forEach((u) => { const it = its[u.id] || {}; rows.push([S.book, where(S.book, u), u.pos, u.summary, codesOf(it).join(';'), ...litCols(it), c, it.memo, KINDS[u.kind || 'main'], u.task, u.std, unitCE(u).join(';'), u.id]); });
    });
    download(`${S.book}_세명코딩.csv`, toCSV(rows));
  };
}
function scheduleFinal() { saveState('최종 코드 저장 대기…'); clearTimeout(finalTimer); finalTimer = setTimeout(() => { finalTimer = null; saveFinal(); }, SAVE_DELAY); }
// 기다리는 저장을 지금 바로 (목록 바꾸기·이름 바꾸기·페이지 떠나기·완료 누르기 전에)
async function flushSaves() {
  const jobs = [];
  if (mineTimer) { clearTimeout(mineTimer); mineTimer = null; jobs.push(saveMine()); }
  if (unitTimer) { clearTimeout(unitTimer); unitTimer = null; jobs.push(saveUnits()); }
  if (finalTimer) { clearTimeout(finalTimer); finalTimer = null; jobs.push(saveFinal()); }
  await Promise.all(jobs);
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') { S.leaving = true; flushSaves().finally(() => { S.leaving = false; }); } });
window.addEventListener('pagehide', () => { S.leaving = true; flushSaves(); });
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
      const it = items[u.id]; if (!it || !codesOf(it).length) return;
      recs.push({ book: id, period: m.period || '?', publisher: m.publisher || '?', u, it });
    });
  }
  const gname = (r) => ST.group === 'book' ? `${r.book} ${r.publisher}` : ST.group === 'period' ? `${r.period} 개정` : r.publisher;
  const groups = [...new Set(recs.map(gname))];
  const cats = categories(ST.level);
  // 코드가 여러 개인 단위는 같은 범주를 한 번만, 서로 다른 범주는 각각 센다
  const crecs = [];
  recs.forEach((r) => { [...new Set(codesOf(r.it).map((c) => levelOf(c, ST.level)))].forEach((k) => crecs.push({ ...r, k, ks: [...new Set(codesOf(r.it).map((c) => levelOf(c, 'stage')))] })); });
  crecs.forEach((r) => { if (r.k && !cats.includes(r.k)) cats.push(r.k); });
  const count = (g, c) => crecs.filter((r) => gname(r) === g && r.k === c).length;
  const gTotal = (g) => crecs.filter((r) => gname(r) === g).length;

  const palette = ['#2456a6', '#c0662b', '#2f7d4f', '#8a4fb3', '#a38a16', '#3b8a9e', '#b3261e', '#555'];
  const chart = barChart(cats, groups, (g, c) => (gTotal(g) ? count(g, c) / gTotal(g) : 0), palette);

  const tableA = [['구분', ...cats.map((c) => c), '합계']];
  groups.forEach((g) => tableA.push([g, ...cats.map((c) => count(g, c)), gTotal(g)]));
  const allRow = ['전체', ...cats.map((c) => crecs.filter((r) => r.k === c).length), crecs.length];

  const stageCats = categories('stage');
  const ces = S.cfg.contentElements;
  const ceCount = (ce, c) => recs.filter((r) => unitCE(r.u).includes(ce) && codesOf(r.it).some((x) => levelOf(x, 'stage') === c)).length;

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
      <tr><td class="l"><b>전체</b></td>${allRow.slice(1, -1).map((v) => `<td><b>${v}</b> <span class="hint">(${pct(v / recs.length)})</span></td>`).join('')}<td><b>${crecs.length}</b></td></tr>
    </table>
    <p class="note">한 단위에 서로 다른 범주의 코드가 여러 개면 각각 한 번씩 셉니다(합계 = 코드 수). 단위 수는 ${recs.length}개입니다.</p>
    <h3>내용 요소 × 단계</h3>
    <table class="t"><tr><th class="l">내용 요소</th>${stageCats.map((c) => `<th>${esc(c)}</th>`).join('')}<th>합계</th></tr>
      ${ces.map((ce) => { const row = stageCats.map((c) => ceCount(ce, c)); const s = row.reduce((a, b) => a + b, 0); return s ? `<tr><td class="l">${esc(ce)}</td>${row.map((v) => `<td>${v || ''}</td>`).join('')}<td><b>${s}</b></td></tr>` : ''; }).join('')}
      <tr><td class="l hint">내용 요소 없음</td>${stageCats.map((c) => `<td>${recs.filter((r) => !unitCE(r.u).length && codesOf(r.it).some((x) => levelOf(x, 'stage') === c)).length || ''}</td>`).join('')}<td>${recs.filter((r) => !unitCE(r.u).length).length}</td></tr>
    </table>
    <p class="note">내용 요소는 박스의 발문 요약·성취기준으로 자동으로 정해집니다(박스 정보에서 고칠 수 있음). 여러 개인 단위는 각 요소에 한 번씩 셉니다.</p>
    <h3>통계적 소양</h3>
    <p class="note"><b>① 단위 기준</b>: 그 요소를 반영한 단위 수 ÷ 전체 단위 수. 한 단위에 소양이 여러 개일 수 있어 <b>합이 100%를 넘을 수 있습니다.</b></p>
    <table class="t"><tr><th class="l">구분</th><th>단위 수</th>${litList().map((l) => `<th>${esc(litShort(l))}</th>`).join('')}<th>미입력</th></tr>
      ${groups.map((g) => { const rs = recs.filter((r) => gname(r) === g); return `<tr><td class="l">${esc(g)}</td><td>${rs.length}</td>${litList().map((l) => { const c = rs.filter((r) => litsOf(r.it).includes(l)).length; return `<td>${c} <span class="hint">(${pct(c / rs.length)})</span></td>`; }).join('')}<td>${rs.filter((r) => !litsOf(r.it).length).length}</td></tr>`; }).join('')}
    </table>
    <p class="note"><b>② 코드 기준</b>: 각 요소 수 ÷ 전체 소양 코드 수(합 100%).</p>
    <table class="t"><tr><th class="l">구분</th><th>소양 코드 수</th>${litList().map((l) => `<th>${esc(litShort(l))}</th>`).join('')}</tr>
      ${groups.map((g) => { const rs = recs.filter((r) => gname(r) === g); const tot = rs.reduce((a, r) => a + litsOf(r.it).length, 0); return `<tr><td class="l">${esc(g)}</td><td>${tot}</td>${litList().map((l) => { const c = rs.filter((r) => litsOf(r.it).includes(l)).length; return `<td>${c} <span class="hint">(${pct(c / tot)})</span></td>`; }).join('')}</tr>`; }).join('')}
    </table>
    <h3>통계적 문제해결 × 통계적 소양 (${ST.level === 'stage' ? '단계' : ST.level === 'basic' ? '기본 코드' : '세부 코드'})</h3>
    <table class="t"><tr><th class="l">문제해결 \ 소양</th>${litList().map((l) => `<th>${esc(litShort(l))}</th>`).join('')}<th>미입력</th><th>합계</th></tr>
      ${cats.map((c) => { const rs = crecs.filter((r) => r.k === c); if (!rs.length) return ''; return `<tr><td class="l">${esc(c)}</td>${litList().map((l) => { const n = rs.filter((r) => litsOf(r.it).includes(l)).length; return `<td>${n || ''}</td>`; }).join('')}<td>${rs.filter((r) => !litsOf(r.it).length).length || ''}</td><td><b>${rs.length}</b></td></tr>`; }).join('')}
      <tr><td class="l"><b>합계</b></td>${litList().map((l) => `<td><b>${crecs.filter((r) => litsOf(r.it).includes(l)).length}</b></td>`).join('')}<td><b>${crecs.filter((r) => !litsOf(r.it).length).length}</b></td><td><b>${crecs.length}</b></td></tr>
    </table>
    <p class="note">한 단위에 소양이 여러 개면 각 소양 칸에 한 번씩 셉니다(소양 칸의 합이 합계보다 클 수 있음).</p>
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
    const rows = [['교과서ID', '쪽', '위치', '발문', '문제해결 코드', ...LIT_HEAD(), '코더', '메모', '유형', '과제번호', '성취기준', '내용요소', '단위ID', '시기', '출판사']];
    recs.forEach(({ book, period, publisher, u, it }) => rows.push([book, where(book, u), u.pos, u.summary, codesOf(it).join(';'), ...litCols(it), ST.source === 'final' ? '최종' : S.coder, it.memo, KINDS[u.kind || 'main'], u.task, u.std, unitCE(u).join(';'), u.id, period, publisher]));
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
    const dist = (book) => { const rs = []; recs.filter((r) => r.book === book).forEach((r) => [...new Set(codesOf(r.it).map((c) => levelOf(c, lv)))].forEach((k) => rs.push(k))); const d = {}; rs.forEach((k) => { d[k] = (d[k] || 0) + 1 / rs.length; }); return d; };
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
      ${c.books.map((id) => { const m = S.metas[id] || {}; return `<tr><td>${esc(id)}</td><td><input data-bm="${esc(id)}" data-k="period" value="${esc(m.period)}" size="6"></td><td><input data-bm="${esc(id)}" data-k="publisher" value="${esc(m.publisher)}" size="10"></td><td><input data-bm="${esc(id)}" data-k="title" value="${esc(m.title)}" size="24"></td><td>${(m.pages || []).length}</td><td>${id === S.book ? S.units.length : ''}</td><td><button data-bsave="${esc(id)}">저장</button> <button data-bdel="${esc(id)}" class="danger">목록에서 빼기</button></td></tr>`; }).join('')}
    </table>
    <h3>교과서 묶음 올리기</h3>
    <p class="note">Claude가 만들어 준 교과서 묶음(.zip: 쪽 이미지 + 1차 박스)을 올립니다. 쪽 이미지는 저장소(GitHub)가 아닌 비공개 저장공간에만 보관됩니다.</p>
    <div id="dropZone" class="dropzone">zip 파일을 여기에 끌어다 놓으세요 (여러 개 한 번에 가능)</div>
    <div class="bar"><input type="file" id="pkgFile" accept=".zip" multiple><button id="pkgGo" class="primary">올리기</button><span id="pkgMsg" class="hint"></span></div>`;
  $('#pkgGo').onclick = () => uploadMany($('#pkgFile').files);
  const dz = $('#dropZone');
  ['dragenter', 'dragover'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove('over'); }));
  dz.addEventListener('drop', (e) => uploadMany(e.dataTransfer.files));

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
  B.querySelectorAll('[data-bdel]').forEach((b) => b.onclick = async () => {
    const id = b.dataset.bdel;
    if (!confirm(`'${bookName(id)}'을(를) 목록에서 뺄까요?\n(저장된 박스·코딩은 지워지지 않고 목록에서만 사라집니다)`)) return;
    const next = { ...S.cfg, books: S.cfg.books.filter((x) => x !== id) };
    const r = await putStore('config/app.json', next, S.cfgEtag);
    if (!r.ok) return toast('저장 충돌 — 새로고침 후 다시 해 주세요');
    S.cfg = next; S.cfgEtag = r.etag; fillHeader(); if (S.book === id) await selectBook(S.cfg.books[0]); renderSettings(); toast('목록에서 뺐습니다');
  });
  B.querySelectorAll('[data-bsave]').forEach((b) => b.onclick = async () => {
    const id = b.dataset.bsave;
    const cur = await getStore(`books/${id}/meta.json`);
    const m = { ...(cur.data || {}) };
    B.querySelectorAll(`[data-bm="${id}"]`).forEach((el) => { m[el.dataset.k] = el.value.trim(); });
    const r = await putStore(`books/${id}/meta.json`, m, cur.etag);
    if (r.ok) { S.metas[id] = m; fillHeader(); $('#bookSel').value = S.book; toast('저장했습니다'); } else toast('저장 실패');
  });
}

// ───────── 처음 쓰는 사람 안내 ─────────
const TOUR = [
  { el: '#bookSel', title: '① 목록에서 분석할 것을 고르세요', text: '교육과정과 교과서 단원이 시기별로 묶여 있어요. 괄호 안 숫자는 내가 끝낸 개수예요.' },
  { el: () => isCur() ? '#curView' : '#stageWrap', title: '② 박스(교육과정은 문장)를 누르세요', text: '주황색 박스가 아직 안 한 것, 초록색이 다 한 것이에요. 쪽은 왼쪽 번호로 넘기고, 화면은 잡고 끌어서 움직여요.' },
  { el: '#unitPanel', title: '③ 오른쪽에서 코드와 소양을 고르세요', text: '① 문제해결 코드와 ② 통계적 소양이 필수예요. 코드에 마우스를 올리면 설명이 나와요. 고르면 자동 저장되고, [다음 ▶]으로 안 한 단위로 넘어가요.' },
  { el: '#doneBtn', title: '④ 다 했으면 \'코딩 완료\'', text: '세 명이 모두 누르면 비교·일치율 탭에서 서로의 코드를 보고 최종 코드를 정해요. 그 전에는 서로 안 보여요.' },
  { el: '#helpBtn', title: '다시 보고 싶으면 ?', text: '이 안내는 위쪽 ? 버튼으로 언제든 다시 볼 수 있어요.' },
];
function startTour() {
  if (!$('#tab-code').classList.contains('on')) $('#tabs [data-tab=code]').click();
  if (!S.sel && S.units.length) select(S.units[0].id, false);
  let i = 0;
  const box = $('#tour'), hole = $('#tourHole'), card = $('#tourCard');
  const show = () => {
    const st = TOUR[i];
    const sel = typeof st.el === 'function' ? st.el() : st.el;
    const el = $(sel); if (!el) { next(); return; }
    const r = el.getBoundingClientRect();
    Object.assign(hole.style, { left: r.left - 6 + 'px', top: r.top - 6 + 'px', width: r.width + 12 + 'px', height: r.height + 12 + 'px' });
    card.innerHTML = `<button id="tourX" class="tour-x" title="안내 건너뛰기">✕</button><div class="tour-step">${i + 1} / ${TOUR.length}</div><h3>${st.title}</h3><p>${st.text}</p>
      <div class="tour-btns"><button id="tourSkip">안내 건너뛰기</button><button id="tourNext" class="primary">${i === TOUR.length - 1 ? '시작하기' : '다음'}</button></div>`;
    const cw = 330, ch = card.offsetHeight || 170;
    let left = r.left, top = r.bottom + 14;
    if (top + ch > window.innerHeight - 10) top = Math.max(10, r.top - ch - 14);
    if (top < 10 || r.height > window.innerHeight * 0.6) { top = Math.min(window.innerHeight - ch - 20, r.top + 20); left = r.left - cw - 20 > 10 ? r.left - cw - 20 : r.right - cw - 20; }
    card.style.left = Math.max(10, Math.min(window.innerWidth - cw - 10, left)) + 'px';
    card.style.top = Math.max(10, Math.min(window.innerHeight - (card.offsetHeight || ch) - 10, top)) + 'px'; // 화면 밖으로 안 나가게
    $('#tourNext').onclick = next; $('#tourSkip').onclick = end; $('#tourX').onclick = end;
  };
  const next = () => { i++; if (i >= TOUR.length) end(); else show(); };
  const end = () => { box.classList.add('hidden'); ls.set('tourDone', '1'); };
  box.onclick = (e) => { if (e.target === box) end(); }; // 어두운 바깥을 누르면 닫힘
  box.classList.remove('hidden'); show();
}

// ───────── 교과서 묶음(.zip) 올리기 ─────────
function loadScript(src) {
  return new Promise((ok, bad) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = bad; document.head.appendChild(s); });
}
async function uploadMany(files) {
  const list = [...(files || [])].filter((f) => /\.zip$/i.test(f.name)).sort((a, b) => a.name.localeCompare(b.name));
  if (!list.length) return toast('zip 파일을 고르세요');
  for (const f of list) await uploadPackage(f, true);
  fillHeader(); renderSettings();
  toast(`${list.length}개 묶음을 올렸습니다`);
}
async function uploadPackage(file, many = false) {
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
  meta.v = Date.now(); // 쪽 이미지 버전: 다시 올리면 브라우저가 새로 받음
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
    if (!many) { fillHeader(); await selectBook(id); renderSettings(); toast(`${id}을(를) 올렸습니다`); }
  } catch (e) { msg('실패: ' + e.message); }
}

init().catch((e) => { console.error(e); saveState('오류: ' + e.message, true); });
