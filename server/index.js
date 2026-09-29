import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { pool } from './db.js';
import { generalLimiter, chatLimiter } from './middleware/rateLimit.js';

import authRoutes from './routes/auth.js';
import leadsRoutes from './routes/leads.js';
import newsletterRoutes from './routes/newsletter.js';
import projectsRoutes from './routes/projects.js';
import servicesRoutes from './routes/services.js';
import agentCategoriesRoutes from './routes/agentCategories.js';
import agentRoutes from './routes/agent.js';
import chatRoutes from './routes/chat.js';

const app = express();

app.use(helmet());

// Comma-separated allow-list of frontend origins (the deployed Vercel site,
// localhost for development). An empty list allows any origin — set
// CORS_ORIGIN in production so only the real frontend can call this API.
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(generalLimiter);

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    return res.status(200).json({ status: 'ok', db: 'connected', time: new Date().toISOString() });
  } catch (err) {
    return res.status(503).json({ status: 'degraded', db: 'unreachable', error: err.message });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/agent-categories', agentCategoriesRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/chat', chatLimiter, chatRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[server] Unhandled error:', err);
  if (err && err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'This origin is not allowed to access the API.' });
  }
  res.status(500).json({ error: 'Something went wrong.' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[server] Aiautomy API listening on port ${PORT}`);
});
