"""PDF → 쪽 이미지(webp, 비공개 폴더) + 박스 작업용 격자 이미지.
사용: python3 scripts/prep_pages.py <ID> <pdf> [시작쪽 끝쪽]"""
import sys, subprocess, pathlib, json
from PIL import Image, ImageDraw
bid, pdf = sys.argv[1], sys.argv[2]
first = int(sys.argv[3]) if len(sys.argv) > 3 else 1
last = int(sys.argv[4]) if len(sys.argv) > 4 else None
out = pathlib.Path('private/blob/books') / bid / 'pages'; out.mkdir(parents=True, exist_ok=True)
grid = pathlib.Path('private/work/grid') / bid; grid.mkdir(parents=True, exist_ok=True)
tmp = pathlib.Path('private/work/tmp') / bid; tmp.mkdir(parents=True, exist_ok=True)
cmd = ['pdftoppm', '-r', '150', '-png', '-f', str(first)] + (['-l', str(last)] if last else []) + [pdf, str(tmp / 'p')]
subprocess.run(cmd, check=True, stderr=subprocess.DEVNULL)
files = sorted(tmp.glob('p-*.png'))
pages = []
for i, f in enumerate(files):
    im = Image.open(f).convert('RGB')
    name = f'p{i+1:03d}.webp'
    im.save(out / name, 'WEBP', quality=78)
    W, H = im.size
    v = im.resize((W * 1100 // H, 1100)); d = ImageDraw.Draw(v); w, h = v.size
    for k in range(1, 20):
        y = h * k / 20; d.line([(0, y), (w, y)], fill=(255, 0, 0) if k % 2 == 0 else (255, 170, 170), width=1); d.text((2, y - 11), str(k * 5), fill=(220, 0, 0))
        x = w * k / 20; d.line([(x, 0), (x, h)], fill=(0, 0, 255) if k % 2 == 0 else (170, 170, 255), width=1); d.text((x + 2, 2), str(k * 5), fill=(0, 0, 220))
    v.save(grid / f'{i+1:03d}.jpg', quality=72)
    pages.append({'file': name, 'w': W, 'h': H})
    f.unlink()
json.dump(pages, open(grid / 'pages.json', 'w'))
print(bid, len(pages), 'pages')
