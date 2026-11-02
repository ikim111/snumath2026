"""전체 백업 + Blob·Firestore 대조 (맥북에서 실행)

  python3 scripts/backup.py            # 사이트 주소는 아래 SITE, 키는 실행할 때 입력(화면에 안 보임)

backup/<날짜>_firestore/, backup/<날짜>_blob/ 에 원래 경로대로 저장하고
manifest.json(경로·크기·md5)과 대조 결과 compare.json을 남김. 화면에는 개수만 출력(코드 값은 출력하지 않음).
"""
import getpass, hashlib, json, os, sys, time, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

SITE = os.environ.get('SITE', 'https://snumath2026.vercel.app')
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'backup')
KEY = os.environ.get('APP_KEY') or getpass.getpass('사이트 키(appkey): ').strip()


def call(params):
    url = SITE + '/api/backup?' + urllib.parse.urlencode(params)
    for i in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={'x-app-key': KEY}), timeout=60) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code in (401, 400, 404):
                raise
            time.sleep(2 * (i + 1))
        except Exception:
            time.sleep(2 * (i + 1))
    raise RuntimeError('받기 실패: ' + params.get('p', 'list'))


def listing(src):
    files, cur = [], None
    while True:
        r = json.loads(call({'src': src, 'list': 1, **({'cursor': cur} if cur else {})}))
        files += r['files']
        cur = r.get('cursor')
        if not cur:
            return files


def backup(src, out):
    files = listing(src)
    bad = []

    def one(f):
        try:
            buf = call({'src': src, 'p': f['p']})
        except Exception as e:
            bad.append(f"{f['p']} ({e})")
            return None
        path = os.path.join(out, f['p'])
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'wb') as fh:
            fh.write(buf)
        md5 = hashlib.md5(buf).hexdigest()
        if len(buf) != f['size'] or (f.get('md5') and f['md5'] != md5):
            bad.append(f"{f['p']} (목록과 크기·md5 다름)")
        return {'p': f['p'], 'size': len(buf), 'md5': md5, **({'t': f['t']} if f.get('t') else {})}

    with ThreadPoolExecutor(6) as ex:
        man = [m for m in ex.map(one, files) if m]
    man.sort(key=lambda m: m['p'])
    with open(os.path.join(out, 'manifest.json'), 'w', encoding='utf-8') as fh:
        json.dump({'src': src, 'site': SITE, 'at': time.strftime('%Y-%m-%d %H:%M:%S'), 'files': man, 'bad': bad}, fh, ensure_ascii=False, indent=1)
    return {m['p']: m for m in man}, bad


def counts(out, man):
    """책별 박스 수, 코더별 코딩한 단위 수(코드·소양 둘 다 있는 것), 최종 코드 수"""
    def load(p):
        try:
            with open(os.path.join(out, p), encoding='utf-8') as fh:
                return json.load(fh)
        except Exception:
            return None
    c = {}
    for p in man:
        parts = p.split('/')
        if parts[0] == 'books' and parts[-1] == 'units.json':
            c[p] = len((load(p) or {}).get('units') or [])
        elif parts[0] == 'codings' and p.endswith('.json'):
            items = (load(p) or {}).get('items') or {}
            c[p] = sum(1 for it in items.values() if it and (it.get('codes') or it.get('code')) and (it.get('lits') or it.get('lit')))
        elif parts[0] == 'final' and p.endswith('.json'):
            c[p] = len((load(p) or {}).get('items') or {})
    return c


def main():
    day = time.strftime('%Y-%m-%d')
    res = {}
    for src in ('firestore', 'blob'):
        out = os.path.join(ROOT, f'{day}_{src}')
        os.makedirs(out, exist_ok=True)
        man, bad = backup(src, out)
        res[src] = (out, man, bad)
        print(f'{src}: 파일 {len(man)}개, {sum(m["size"] for m in man) / 1e6:.1f}MB, 실패 {len(bad)}개')
        for b in bad:
            print('  !', b)

    (fo, fm, _), (bo, bm, _) = res['firestore'], res['blob']
    same = [p for p in fm if p in bm and fm[p]['md5'] == bm[p]['md5']]
    diff = sorted(p for p in fm if p in bm and fm[p]['md5'] != bm[p]['md5'])
    only_fs = sorted(p for p in fm if p not in bm)
    only_blob = sorted(p for p in bm if p not in fm)
    fc, bc = counts(fo, fm), counts(bo, bm)
    rows = [{'p': p, 'firestore': fc.get(p), 'blob': bc.get(p)} for p in sorted(set(fc) | set(bc))]
    cmp = {'same': len(same), 'diff': diff, 'only_firestore': only_fs, 'only_blob': only_blob, 'counts': rows}
    with open(os.path.join(ROOT, f'{day}_compare.json'), 'w', encoding='utf-8') as fh:
        json.dump(cmp, fh, ensure_ascii=False, indent=1)
    print(f'\n같음 {len(same)} / 내용 다름 {len(diff)} / Firestore에만 {len(only_fs)} / Blob에만 {len(only_blob)}')
    for name, ps in (('내용 다름', diff), ('Firestore에만', only_fs), ('Blob에만', only_blob)):
        if ps:
            print(f'[{name}]', *ps[:40], sep='\n  ')
    print('\n[개수: 경로 / Firestore / Blob]')
    for r in rows:
        print(f"  {r['p']}  {r['firestore']}  {r['blob']}")


if __name__ == '__main__':
    try:
        main()
    except urllib.error.HTTPError as e:
        sys.exit(f'오류 {e.code}: ' + ('키가 맞지 않습니다' if e.code == 401 else e.read().decode('utf-8', 'replace')[:200]))
