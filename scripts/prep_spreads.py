"""스캔한 두 쪽 펼침면 PDF → 한 쪽씩 잘라 쪽 이미지(webp) + 격자 이미지.
사용: python3 scripts/prep_spreads.py <ID> <pdf>"""
import sys, subprocess, pathlib, json
from PIL import Image, ImageDraw
bid, pdf = sys.argv[1], sys.argv[2]
out = pathlib.Path('private/blob/books') / bid / 'pages'; out.mkdir(parents=True, exist_ok=True)
grid = pathlib.Path('private/work/grid') / bid; grid.mkdir(parents=True, exist_ok=True)
tmp = pathlib.Path('private/work/tmp') / bid; tmp.mkdir(parents=True, exist_ok=True)
subprocess.run(['pdftoppm', '-r', '150', '-png', pdf, str(tmp / 'p')], check=True, stderr=subprocess.DEVNULL)
pages = []
for f in sorted(tmp.glob('p-*.png')):
    im = Image.open(f).convert('RGB'); W, H = im.size
    halves = [im.crop((0, 0, W // 2, H)), im.crop((W // 2, 0, W, H))] if W > H else [im]
    for half in halves:
        i = len(pages); name = f'p{i+1:03d}.webp'
        half.save(out / name, 'WEBP', quality=78)
        w0, h0 = half.size
        v = half.resize((w0 * 1100 // h0, 1100)); d = ImageDraw.Draw(v); w, h = v.size
        for k in range(1, 20):
            y = h * k / 20; d.line([(0, y), (w, y)], fill=(255, 0, 0) if k % 2 == 0 else (255, 170, 170), width=1); d.text((2, y - 11), str(k * 5), fill=(220, 0, 0))
            x = w * k / 20; d.line([(x, 0), (x, h)], fill=(0, 0, 255) if k % 2 == 0 else (170, 170, 255), width=1); d.text((x + 2, 2), str(k * 5), fill=(0, 0, 220))
        v.save(grid / f'{i+1:03d}.jpg', quality=72)
        pages.append({'file': name, 'w': w0, 'h': h0})
    f.unlink()
json.dump(pages, open(grid / 'pages.json', 'w'))
print(bid, len(pages), 'pages')
