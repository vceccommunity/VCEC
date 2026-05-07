/*
  VCEC Portal - Native HTTP Dev Server
  A zero-dependency ultra-lightweight web server running on port 3000.
*/

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Strip URL query parameters first (e.g. /?zarsrc=3 -> /)
  let urlPath = req.url;
  const queryIndex = urlPath.indexOf('?');
  if (queryIndex !== -1) {
    urlPath = urlPath.substring(0, queryIndex);
  }

  // Normalize request path (if it's root, map to index.html)
  let filePath = urlPath === '/' ? '/index.html' : urlPath;

  // Resolve absolute path safely
  const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
  const fullPath = path.join(__dirname, safePath);

  const extname = path.extname(fullPath).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(fullPath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Fallback for subpages if accessed without .html ext
        const altHtmlPath = fullPath + '.html';
        fs.readFile(altHtmlPath, (altErr, altContent) => {
          if (!altErr) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(altContent, 'utf-8');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>404 Not Found</h1><p>The requested file could not be found / 无法找到该页面。</p>', 'utf-8');
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\x1b[32m==================================================\x1b[0m`);
  console.log(`\x1b[36m🚀 VCEC Bilateral Portal is LIVE at localhost:3000\x1b[0m`);
  console.log(`\x1b[33m🌐 Access URL: http://localhost:${PORT}\x1b[0m`);
  console.log(`\x1b[35m👉 Press Ctrl+C to stop the server\x1b[0m`);
  console.log(`\x1b[32m==================================================\x1b[0m`);
});
