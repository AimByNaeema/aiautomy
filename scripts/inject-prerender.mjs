// Post-build step: turns the committed prerendered/ snapshots into real,
// crawlable HTML files inside dist/, using the CURRENT build's asset hashes.
//
// Why: prerendered/<route>/index.html snapshots are captured once (see
// scripts/prerender.mjs) and reference the JS/CSS file names of the build
// they were captured from. After any rebuild those hashed files no longer
// exist, so serving a snapshot as-is would load a missing bundle. This
// script instead takes the fresh dist/index.html shell (correct asset
// hashes), and copies into it only the per-route SEO <head> tags and the
// rendered #root markup from the snapshot. Result per route:
//   dist/index.html              -> "/"  (home content)
//   dist/<route>/index.html      -> "/<route>"
//   dist/app-shell.html          -> empty SPA shell for every other path
//                                   (/login, /admin, unknown URLs)
// Works on Vercel (see vercel.json rewrites) and Railway (serve-static.js).
// Runs automatically after `npm run build` via the "postbuild" script. No
// browser download needed, so builds stay fast.

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const snapDir = join(root, 'prerendered');

const shellPath = join(distDir, 'index.html');
if (!existsSync(shellPath)) {
  console.error('[inject-prerender] dist/index.html not found — run vite build first.');
  process.exit(1);
}
const shell = readFileSync(shellPath, 'utf-8');

// Keep a pristine SPA shell for non-prerendered paths.
writeFileSync(join(distDir, 'app-shell.html'), shell, 'utf-8');

// Per-route head tags to carry over from the snapshot.
const HEAD_PATTERNS = [
  /<title>[\s\S]*?<\/title>/i,
  /<meta\s+name="description"[^>]*>/i,
  /<link\s+rel="canonical"[^>]*>/i,
  /<meta\s+name="robots"[^>]*>/i,
  /<meta\s+property="og:title"[^>]*>/i,
  /<meta\s+property="og:description"[^>]*>/i,
  /<meta\s+property="og:url"[^>]*>/i,
  /<meta\s+name="twitter:title"[^>]*>/i,
  /<meta\s+name="twitter:description"[^>]*>/i,
];

function extractRoot(html) {
  const start = html.indexOf('<div id="root">');
  if (start === -1) return null;
  const bodyEnd = html.lastIndexOf('</body>');
  // #root is followed by the module script(s) in the snapshot; cut at the
  // first <script after #root opens, then strip the trailing </div>.
  const afterOpen = start + '<div id="root">'.length;
  let end = html.indexOf('<script', afterOpen);
  if (end === -1 || end > bodyEnd) end = bodyEnd;
  let inner = html.slice(afterOpen, end).trimEnd();
  if (inner.endsWith('</div>')) inner = inner.slice(0, -'</div>'.length);
  return inner;
}

// Brand/domain fixes applied to snapshots at build time, so older snapshots
// never leak the previous brand name or the old Railway hostname to crawlers.
const SNAPSHOT_FIXES = [
  [/https:\/\/frontend-production-650e\.up\.railway\.app/g, 'https://www.aiautomy.com'],
  [/AI AGENT (<span[^>]*>)STUDIO(<\/span>)/g, 'AI$1AUTOMY$2'],
  [/AI AGENT STUDIO — AI Digital Employees &amp; Websites/g, 'AIAUTOMY — Custom AI Agents, Websites &amp; Business Automation'],
  [/AI AGENT STUDIO — AI Digital Employees & Websites/g, 'AIAUTOMY — Custom AI Agents, Websites & Business Automation'],
  [/AI AGENT STUDIO/g, 'AIAUTOMY'],
  [/AI Agent Studio/g, 'Aiautomy'],
  [/workspace\.studio\/architecture/g, 'aiautomy.com/workspace'],
];

function fixSnapshot(html) {
  return SNAPSHOT_FIXES.reduce((s, [re, to]) => s.replace(re, to), html);
}

function buildPage(rawSnapshot) {
  const snapshot = fixSnapshot(rawSnapshot);
  let out = shell;
  for (const re of HEAD_PATTERNS) {
    const fromSnap = snapshot.match(re);
    if (fromSnap && re.test(out)) out = out.replace(re, () => fromSnap[0]);
  }
  const inner = extractRoot(snapshot);
  if (inner) out = out.replace('<div id="root"></div>', () => `<div id="root">${inner}</div>`);
  return out;
}

function walk(dir, rel = '') {
  const entries = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) entries.push(...walk(p, `${rel}/${name}`));
    else if (name === 'index.html') entries.push(rel || '/');
  }
  return entries;
}

const routes = walk(snapDir);
for (const route of routes) {
  const snapshot = readFileSync(join(snapDir, route, 'index.html'), 'utf-8');
  const html = buildPage(snapshot);
  const outDir = route === '/' ? distDir : join(distDir, route);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html, 'utf-8');
  console.log(`[inject-prerender] ${route} -> ${join('dist', route === '/' ? '' : route, 'index.html')}`);
}
