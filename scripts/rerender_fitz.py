"""쪽 이미지를 PyMuPDF로 다시 그리기(poppler에서 한글 글꼴이 빠지는 PDF용). 크기는 기존 webp에 맞춤.
사용: python3 scripts/rerender_fitz.py <ID> <pdf>"""
import sys, pathlib, fitz
from PIL import Image
bid, pdf = sys.argv[1], sys.argv[2]
out = pathlib.Path('private/blob/books') / bid / 'pages'
doc = fitz.open(pdf)
for i, page in enumerate(doc):
    f = out / f'p{i+1:03d}.webp'
    old = Image.open(f).size
    pix = page.get_pixmap(dpi=150)
    im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    if im.size != old: im = im.resize(old)
    im.save(f, 'WEBP', quality=78)
print(bid, len(doc), 'pages re-rendered')
