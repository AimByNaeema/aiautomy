import { Router } from 'express';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { publicWriteLimiter } from '../middleware/rateLimit.js';
import { isValidEmail } from '../lib/sanitize.js';

const router = Router();

// POST /api/newsletter — public. Mirrors subscribeNewsletter() (idempotent
// resubscribe via ON CONFLICT, same as the old setDoc(..., {merge:true})).
router.post('/', publicWriteLimiter, async (req, res) => {
  const email = req.body?.email;
  if (!isValidEmail(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }
  const cleanEmail = String(email).trim().toLowerCase();
  const source_page = req.body?.source_page ? String(req.body.source_page).slice(0, 100) : 'footer';

  try {
    await pool.query(
      `INSERT INTO newsletter_subscribers (email, source_page, is_active)
       VALUES ($1, $2, true)
       ON CONFLICT (email) DO UPDATE SET is_active = true, source_page = EXCLUDED.source_page`,
      [cleanEmail, source_page]
    );
    return res.status(200).json({ success: true, message: 'Thank you for subscribing to AIAUTOMY updates.' });
  } catch (err) {
    console.error('[newsletter] subscribe error:', err);
    return res.status(500).json({ success: false, message: 'Could not subscribe right now. Please try again.' });
  }
});

// GET /api/newsletter — admin only. Mirrors fetchAdminSubscribers().
router.get('/', requireAdmin, async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM newsletter_subscribers ORDER BY created_at DESC');
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('[newsletter] list error:', err);
    return res.status(500).json({ error: 'Could not load subscribers.' });
  }
});

export default router;
