// Cookieless page-view counter.
//
//   POST /api/visits          public — the site reports one page view
//                             body: { path, referrer }
//   GET  /api/visits/summary  read-only totals for the owner's own tools,
//                             Authorization: Bearer <STATS_READ_TOKEN>
//
// Privacy: no cookie, no raw IP, no user agent stored. A visitor is a daily
// hash of ip + user agent + date + a server secret, so the same person counts
// once a day and cannot be identified or followed across days.

import { createHash, timingSafeEqual } from 'crypto';
import express from 'express';
import { pool } from '../db.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// A real visitor opens a handful of pages; this only stops a script flooding the table.
const visitLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false });

const BOT = /bot|crawl|spider|slurp|preview|monitor|headless|lighthouse|python|curl|wget|httpclient|facebookexternalhit/i;
const SKIP_PATHS = ['/admin', '/login'];
const OWN_HOSTS = ['aiautomy.com', 'www.aiautomy.com'];

function clientIp(req) {
  const fwd = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return fwd || req.socket.remoteAddress || '';
}

function cleanPath(p) {
  if (typeof p !== 'string' || !p.startsWith('/')) return null;
  const path = p.split(/[?#]/)[0].slice(0, 200).replace(/\/+$/, '') || '/';
  return /^[\w\-/.]*$/.test(path) ? path : null;
}

function referrerHost(r) {
  if (typeof r !== 'string' || !r) return null;
  try {
    const host = new URL(r).hostname.toLowerCase().replace(/^www\./, '');
    if (OWN_HOSTS.includes(host) || OWN_HOSTS.includes('www.' + host)) return null;
    return host.slice(0, 100);
  } catch {
    return null;
  }
}

router.post('/', visitLimiter, async (req, res) => {
  const ua = String(req.headers['user-agent'] || '');
  const path = cleanPath(req.body?.path);
  if (!ua || BOT.test(ua) || !path || SKIP_PATHS.some((s) => path === s || path.startsWith(s + '/'))) {
    return res.status(204).end();
  }
  const day = new Date().toISOString().slice(0, 10);
  const salt = process.env.STATS_READ_TOKEN || process.env.JWT_SECRET || 'aiautomy';
  const visitor = createHash('sha256').update(`${clientIp(req)}|${ua}|${day}|${salt}`).digest('hex').slice(0, 32);
  const device = /mobile|android|iphone|ipad/i.test(ua) ? 'mobile' : 'desktop';
  try {
    await pool.query(
      'INSERT INTO page_views (path, referrer_host, device, visitor_hash) VALUES ($1, $2, $3, $4)',
      [path, referrerHost(req.body?.referrer), device, visitor]
    );
  } catch (err) {
    console.error('[visits] insert failed:', err.message);
  }
  return res.status(204).end();
});

function readTokenOk(req) {
  const expected = process.env.STATS_READ_TOKEN || '';
  const got = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (expected.length < 24 || !got) return false;
  const a = createHash('sha256').update(expected).digest();
  const b = createHash('sha256').update(got).digest();
  return timingSafeEqual(a, b);
}

router.get('/summary', async (req, res) => {
  if (!process.env.STATS_READ_TOKEN) return res.status(503).json({ error: 'STATS_READ_TOKEN is not set on the server.' });
  if (!readTokenOk(req)) return res.status(401).json({ error: 'Not authorized.' });
  const hours = Math.min(Math.max(parseInt(req.query.hours, 10) || 24, 1), 24 * 31);
  try {
    const since = `now() - interval '${hours} hours'`;
    const [tot, pages, refs, days, dev] = await Promise.all([
      pool.query(`SELECT count(*)::int AS views, count(DISTINCT visitor_hash)::int AS visitors FROM page_views WHERE viewed_at > ${since}`),
      pool.query(`SELECT path, count(*)::int AS views FROM page_views WHERE viewed_at > ${since} GROUP BY path ORDER BY views DESC LIMIT 5`),
      pool.query(`SELECT coalesce(referrer_host, '(direct)') AS source, count(DISTINCT visitor_hash)::int AS visitors FROM page_views WHERE viewed_at > ${since} GROUP BY 1 ORDER BY visitors DESC LIMIT 5`),
      pool.query(`SELECT to_char(viewed_at AT TIME ZONE 'Asia/Karachi', 'YYYY-MM-DD') AS day, count(*)::int AS views, count(DISTINCT visitor_hash)::int AS visitors FROM page_views WHERE viewed_at > now() - interval '7 days' GROUP BY 1 ORDER BY 1`),
      pool.query(`SELECT device, count(DISTINCT visitor_hash)::int AS visitors FROM page_views WHERE viewed_at > ${since} GROUP BY device`),
    ]);
    return res.json({
      hours,
      page_views: tot.rows[0].views,
      visitors: tot.rows[0].visitors,
      top_pages: pages.rows,
      sources: refs.rows,
      devices: dev.rows,
      last_7_days: days.rows,
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[visits] summary failed:', err.message);
    return res.status(500).json({ error: 'Summary failed.' });
  }
});

export default router;
