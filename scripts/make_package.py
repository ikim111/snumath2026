"""교과서 묶음(.zip) 만들기: private/blob/books/<ID>/ 의 meta.json, units.json, pages/*.webp → private/packages/<ID>.zip
사용: python3 scripts/make_package.py T0"""
import json, sys, zipfile, pathlib
bid = sys.argv[1]
src = pathlib.Path('private/blob/books') / bid
meta = json.load(open(src / 'meta.json')); units = json.load(open(src / 'units.json'))['units']
out = pathlib.Path('private/packages'); out.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(out / f'{bid}.zip', 'w', zipfile.ZIP_STORED) as z:
    z.writestr('book.json', json.dumps({'meta': meta, 'units': units}, ensure_ascii=False))
    for p in meta['pages']: z.write(src / 'pages' / p['file'], 'pages/' + p['file'])
print(out / f'{bid}.zip', len(meta['pages']), 'pages', len(units), 'units')
