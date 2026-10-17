// 로컬 시험 서버: node scripts/dev.mjs  (LOCAL_BLOB_DIR=./private/blob, APP_KEY=dev)
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
process.env.LOCAL_BLOB_DIR ||= path.resolve('private/blob');
process.env.APP_KEY ||= 'dev';
const routes = { store: await import('../api/store.js'), codings: await import('../api/codings.js'), img: await import('../api/img.js'), upload: await import('../api/upload.js') };
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.txt': 'text/plain' };
http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const m = url.pathname.match(/^\/api\/(\w+)/);
  if (m && routes[m[1]]) {
    const chunks = []; for await (const c of req) chunks.push(c);
    const body = ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks);
    const r = new Request(url, { method: req.method, headers: req.headers, body });
    const h = routes[m[1]][req.method];
    if (!h) { res.writeHead(405); return res.end(); }
    const out = await h(r);
    res.writeHead(out.status, Object.fromEntries(out.headers));
    return res.end(Buffer.from(await out.arrayBuffer()));
  }
  let f = path.join('public', url.pathname === '/' ? 'index.html' : url.pathname);
  if (/^\/[\w-]+\/?$/.test(url.pathname) && !path.extname(url.pathname)) f = 'public/index.html';
  try { const b = await fs.readFile(f); res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); res.end(b); }
  catch { res.writeHead(404); res.end('not found'); }
}).listen(process.env.PORT || 3000, () => console.log('http://localhost:' + (process.env.PORT || 3000) + '/#k=' + process.env.APP_KEY));
