// Generates real, crawlable HTML snapshots of every public route.
//
// Why this exists: the site is a client-side-rendered React app (Vite +
// react-router). A plain `curl`/bot fetch of any route gets back an empty
// <div id="root"></div> shell with no text — because the real content only
// appears after the browser downloads and executes the JS bundle. Search
// engine crawlers and link-preview bots (Google, Facebook, WhatsApp,
// LinkedIn, etc.) mostly do NOT execute JavaScript on the first pass, so
// they were seeing a blank page. This script fixes that without changing
// the app's architecture: it boots a real headless Chromium, loads the
// already-built app locally, waits for it to render each route normally,
// and saves the resulting fully-rendered HTML to disk. serve-static.js then
// serves that snapshot for the *initial* request to a given route, while
// the exact same client-side JS bundle still loads afterward and takes
// over — so real visitors see no difference at all, only bots benefit.
//
// This is intentionally NOT full server-side rendering (no framework
// migration, no risk to the app's behavior) — it is a one-time-per-content-
// change "prerender" pass, the same technique tools like
// vite-plugin-prerender / react-snap use.
//
// Run manually with `node scripts/prerender.mjs` any time page content
// changes meaningfully, then redeploy. Not wired into the Railway build
// step on purpose (keeps deploys fast and independent of a Chromium
// download on the build server).

import { chromium } from 'playwright';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, writeFileSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');
const outDir = join(root, 'prerendered');
const PORT = 4173;

// Public, indexable routes only — mirrors public/sitemap.xml. /admin and
// /login are deliberately excluded (robots.txt already disallows them).
const ROUTES = [
  '/',
  '/ai-agents',
  '/web-development',
  '/solutions',
  '/platform',
  '/features',
  '/projects',
  '/how-it-works',
  '/pricing',
  '/resources',
  '/get-started',
  '/contact',
    '/uk',
    '/us',
];

function waitForServer(url, tries = 40)
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      fetch(url)
        .then(() => resolve())
        .catch((err) => {
          if (n <= 0) return reject(err);
          setTimeout(() => attempt(n - 1), 250);
        });
    };
    attempt(tries);
  });
}

async function main() {
  if (!existsSync(distDir)) {
    console.error('[prerender] dist/ not found — run `npm run build` first.');
    process.exit(1);
  }

  console.log('[prerender] Starting local static server on port', PORT);
  const server = spawn('node', [join(root, 'serve-static.js')], {
    cwd: root,
    env: { ...process.env, PORT: String(PORT) },
    stdio: 'inherit',
  });

  try {
    await waitForServer(`http://localhost:${PORT}/`);

    const browser = await chromium.launch();

    for (const route of ROUTES) {
      const url = `http://localhost:${PORT}${route}`;
      console.log('[prerender] Rendering', route);

      // A fresh browser context per route avoids any cross-navigation state
      // bleeding between routes (seen once as a stale-content bug when a
      // single page/tab was reused for every route in sequence).
      let html = '';
      let lastError = null;
      for (let attempt = 1; attempt <= 3 && !html; attempt++) {
        const context = await browser.newContext();
        const page = await context.newPage();
        let moduleLoadFailed = false;
        page.on('console', (msg) => {
          // Narrow, specific signal that the app's own JS bundle failed to
          // load/execute (as opposed to an unrelated resource like a
          // Google Fonts request, which can fail in sandboxed/offline
          // environments without affecting the actual page render).
          if (msg.type() === 'error' && /Failed to load module script/i.test(msg.text())) {
            moduleLoadFailed = true;
          }
        });
        try {
          await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
          // Give React a beat to finish mounting/painting after network idle.
          await page.waitForTimeout(400);
          const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML || '');
          if (moduleLoadFailed || rootHtml.trim().length < 2000) {
            throw new Error(`Render looked incomplete on attempt ${attempt} (moduleLoadFailed=${moduleLoadFailed}, rootHtml length=${rootHtml.trim().length})`);
          }
          html = await page.content();
        } catch (err) {
          lastError = err;
          console.warn(`[prerender] Attempt ${attempt} for ${route} failed: ${err.message}`);
        } finally {
          await context.close();
        }
      }

      if (!html) {
        throw new Error(`[prerender] Giving up on ${route} after 3 attempts: ${lastError?.message}`);
      }

      const dir = route === '/' ? outDir : join(outDir, route.replace(/^\//, ''));
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, 'index.html'), html, 'utf-8');
    }

    await browser.close();
    console.log(`[prerender] Done. Snapshots written to ${outDir}`);
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});
