# 통계 단원 코딩 도구 (snumath2026)

중학교 통계 영역 교과서·교육과정 분석용 조별 코딩 사이트입니다.

- **코딩**: 교과서 쪽 이미지 위의 박스(분석 단위)마다 코드·내용 요소·비판·소통·메모 입력
- **비교·일치율**: 세 명이 모두 '완료'하면 열림. 쌍별 Cohen's κ, Fleiss' κ, 불일치 목록, 최종 코드 저장
- **통계표**: 단계별 비율 막대그래프, 빈도표, 내용 요소 × 단계, 비판·소통, CSV 내보내기
- **설정**: 분석틀(코드 목록) 수정·전환, 입력 목록, 기본 포함 유형, 교과서 묶음(.zip) 올리기

## 저작권
교과서 쪽 이미지는 **이 저장소에 넣지 않습니다**(.gitignore로 막음). Vercel의 비공개 Blob 저장공간에만 두고,
사이트는 비밀 키(`APP_KEY`)가 붙은 링크(`/#k=…`)로만 열립니다.

## 구조
- `public/` 화면 (index.html, app.js, style.css)
- `api/` Vercel 함수 — `store`(설정·박스·최종 코드), `codings`(개인 코딩, 비교 전 비공개), `img`(쪽 이미지), `upload`
- `scripts/dev.mjs` 로컬 시험 서버 (`node scripts/dev.mjs` → http://localhost:3000/#k=dev, 자료는 `private/blob/`)
- `scripts/make_package.py` 교과서 묶음 zip 만들기

## Vercel 설정
1. 이 저장소를 Vercel 프로젝트로 가져오기 (Framework: Other)
2. Storage → Blob 저장공간 만들기 (**Private**), 이 프로젝트에 연결 → `BLOB_READ_WRITE_TOKEN` 자동 추가
3. Environment Variables에 `APP_KEY` (긴 무작위 문자열) 추가 후 다시 배포
