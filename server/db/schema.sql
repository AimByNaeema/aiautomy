-- ============================================================================
-- AIAUTOMY — PostgreSQL schema (Railway migration)
--
-- Replaces the Firestore collections previously defined in firestore.rules.
-- Field names and shapes mirror src/types.ts exactly so the frontend's
-- existing TypeScript interfaces need no changes. Authorization is enforced
-- in the Express API layer (server/middleware/requireAdmin.js), not in
-- Postgres itself, because the frontend never talks to Postgres directly —
-- every read/write goes through the Node.js backend.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto; -- for gen_random_uuid()

-- ----------------------------------------------------------------------------
-- Admins allowlist (mirrors firestore.rules' isAdmin(): two hardcoded emails
-- plus an /admins collection). Seeded below with the same two addresses.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
  email TEXT PRIMARY KEY,
  password_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- Safe to re-run on an already-migrated database (the table may already
-- exist from before password login was added).
ALTER TABLE admins ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- ----------------------------------------------------------------------------
-- 1. project_leads — Contact form + Get Started onboarding submissions
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS project_leads (
  id TEXT PRIMARY KEY DEFAULT ('lead-' || replace(gen_random_uuid()::text, '-', '')),
  full_name TEXT NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 150),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 5 AND 150),
  phone TEXT,
  company_name TEXT,
  website_url TEXT,
  service_interest TEXT NOT NULL CHECK (service_interest IN (
    'custom_ai_agent', 'web_development', 'ecommerce_solution',
    'ai_automation', 'custom_digital_solution', 'other'
  )),
  business_industry TEXT,
  project_budget TEXT,
  project_timeline TEXT,
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 5 AND 5000),
  source_page TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN (
    'new', 'contacted', 'qualified', 'proposal_sent', 'closed', 'archived'
  )),
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_project_leads_status ON project_leads(status);
CREATE INDEX IF NOT EXISTS idx_project_leads_created_at ON project_leads(created_at DESC);

-- ----------------------------------------------------------------------------
-- 2. newsletter_subscribers
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id TEXT PRIMARY KEY DEFAULT ('sub-' || replace(gen_random_uuid()::text, '-', '')),
  email TEXT NOT NULL UNIQUE CHECK (char_length(email) BETWEEN 5 AND 150),
  consent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source_page TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- ----------------------------------------------------------------------------
-- 3. projects — portfolio / case studies
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY DEFAULT ('proj-' || replace(gen_random_uuid()::text, '-', '')),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN (
    'in_development', 'coming_soon', 'live',
    'available_for_custom_projects', 'concept', 'archived'
  )),
  technologies TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  cover_image_url TEXT,
  project_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published, sort_order);

-- ----------------------------------------------------------------------------
-- 4. services — the 5 core agency offerings
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY DEFAULT ('svc-' || replace(gen_random_uuid()::text, '-', '')),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  icon_key TEXT NOT NULL,
  key_features TEXT[],
  deliverables TEXT[],
  is_available_for_custom_projects BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_services_published ON services(is_published, sort_order);

-- ----------------------------------------------------------------------------
-- 5. agent_categories — 8 industry verticals for custom AI agents
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_categories (
  id TEXT PRIMARY KEY DEFAULT ('cat-' || replace(gen_random_uuid()::text, '-', '')),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 6. agent_findings — AI Agent capability 1: SEO & growth analysis
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_findings (
  id TEXT PRIMARY KEY DEFAULT ('finding-' || replace(gen_random_uuid()::text, '-', '')),
  run_id TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'meta_tags', 'headings', 'broken_links', 'crawlability', 'search_console', 'analytics'
  )),
  page_url TEXT NOT NULL,
  finding TEXT NOT NULL,
  evidence TEXT NOT NULL,
  recommendation TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'low', 'medium', 'high')),
  data_source TEXT NOT NULL CHECK (data_source IN ('live_page_fetch', 'unverified')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'approved', 'dismissed')),
  reviewed_by TEXT REFERENCES admins(email) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_agent_findings_created_at ON agent_findings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_findings_run_id ON agent_findings(run_id);

-- ----------------------------------------------------------------------------
-- 7. agent_lead_drafts — AI Agent capability 2: lead reply drafting
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_lead_drafts (
  id TEXT PRIMARY KEY DEFAULT ('draft-' || replace(gen_random_uuid()::text, '-', '')),
  lead_id TEXT NOT NULL REFERENCES project_leads(id) ON DELETE CASCADE,
  lead_email TEXT NOT NULL,
  lead_name TEXT NOT NULL,
  draft_message TEXT NOT NULL,
  evidence TEXT NOT NULL,
  model_used TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'approved', 'rejected', 'marked_sent'
  )),
  reviewed_by TEXT REFERENCES admins(email) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_agent_lead_drafts_created_at ON agent_lead_drafts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_lead_drafts_lead_id ON agent_lead_drafts(lead_id);

-- ----------------------------------------------------------------------------
-- 8. agent_chat_sessions — AI Agent capability 3: public chat widget transcripts
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_chat_sessions (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL CHECK (provider IN ('claude', 'gemini')),
  messages JSONB NOT NULL DEFAULT '[]',
  page_url TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_agent_chat_sessions_updated_at ON agent_chat_sessions(updated_at DESC);

-- ----------------------------------------------------------------------------
-- 9. agent_action_log — append-only audit trail of every agent + owner action
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_action_log (
  id TEXT PRIMARY KEY DEFAULT ('log-' || replace(gen_random_uuid()::text, '-', '')),
  action TEXT NOT NULL CHECK (action IN (
    'seo_scan_run', 'finding_approved', 'finding_dismissed',
    'lead_draft_generated', 'lead_draft_approved', 'lead_draft_rejected',
    'lead_draft_marked_sent'
  )),
  actor TEXT NOT NULL CHECK (actor IN ('agent', 'owner')),
  target_id TEXT,
  summary TEXT NOT NULL,
  evidence TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_agent_action_log_created_at ON agent_action_log(created_at DESC);

-- ----------------------------------------------------------------------------
-- Seed: the two admin emails already hardcoded in api/_lib/verifyAdminAuth.js
-- and firestore.rules' isAdmin(). Safe to run multiple times.
-- ----------------------------------------------------------------------------
INSERT INTO admins (email) VALUES
  ('aimbynaeema@gmail.com'),
  ('aiagentstudioo@gmail.com')
ON CONFLICT (email) DO NOTHING;

-- Note: initial admin passwords are NOT seeded here (never commit a
-- password hash to source control). See server/db/migrate.js — it applies
-- ADMIN_SEED_PASSWORD_HASH (a Railway environment variable, never in Git)
-- to any admin row that doesn't have a password_hash yet.
