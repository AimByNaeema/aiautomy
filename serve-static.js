// Minimal static file server for the built frontend (dist/), used to host
// the website on Railway alongside the backend service instead of Vercel.
//
// `npm run build` (vite build + scripts/inject-prerender.mjs) writes a
// crawlable HTML file per public route into dist/<route>/index.html, built
// from the committed prerendered/ snapshots but using the CURRENT build's
// asset hashes. Those are served for the matching route; every other path
// (/login, /admin, unknown URLs) gets the empty SPA shell so client-side
// routing (react-router-dom) keeps working on a hard refresh/direct link.
//
// Requests arriving on the old Railway hostname are 301-redirected to the
// real domain so Google consolidates everything on www.aiautomy.com.

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, 'dist');
const CANONICAL_ORIGIN = process.env.CANONICAL_ORIGIN || 'https://www.aiautomy.com';

const app = express();

app.use((req, res, next) => {
  const host = (req.headers.host || '').toLowerCase();
  if (host.endsWith('.up.railway.app') && process.env.DISABLE_CANONICAL_REDIRECT !== 'true') {
    return res.redirect(301, `${CANONICAL_ORIGIN}${req.originalUrl}`);
  }
  next();
});

app.use(express.static(distDir, { index: false, redirect: false }));

app.get('*', (req, res) => {
  const routePath = req.path === '/' ? '' : req.path.replace(/\/+$/, '');
  const pagePath = join(distDir, routePath, 'index.html');

  if (!routePath.includes('..') && existsSync(pagePath)) {
    return res.sendFile(pagePath);
  }

  const shell = join(distDir, 'app-shell.html');
  res.sendFile(existsSync(shell) ? shell : join(distDir, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[frontend] AI Agent Studio website listening on port ${PORT}`);
});
