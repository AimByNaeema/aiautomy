# CLAUDE.md — AIAUTOMY

This file gives Claude Code the context it needs to work safely and consistently in this repository. Read it before making any change.

## What this project is

**AIAUTOMY** (brand name, all caps) is the marketing/agency website for a digital studio that builds custom AI agents, websites, ecommerce systems, and automation workflows for other businesses. It is a client-facing React single-page site plus a small serverless backend and an admin console for managing leads and a semi-autonomous "AI Agent" that assists with SEO scans, lead-reply drafting, and website chat support.

- Live site: https://www.aiautomy.com/ (canonical domain)
- Repo: https://github.com/AimByNaeema/aiautomy
- Inquiries inbox: `aiagentstudioo@gmail.com`
- Admin accounts (see `api/_lib/verifyAdminAuth.js`): `aimbynaeema@gmail.com`, `aiagentstudioo@gmail.com`

## Golden rule: do not change the design

**Unless the task explicitly asks for a visual/design/copy change, do not alter layout, styling, colors, spacing, component structure, or existing text.** This site's design is finalized and treated as locked. Bug fixes, new backend logic, new routes/features, and refactors should preserve the existing look and feel exactly. If a change would visibly affect the UI, flag it and confirm before proceeding rather than assuming it's wanted.

## Tech stack

- **Frontend:** React 19 + TypeScript, Vite 6, React Router 7, Tailwind CSS 4 (via `@tailwindcss/vite`), `lucide-react` icons, `motion` for animation.
- **Backend:** Vercel Serverless Functions (plain Node handlers under `api/`), no separate server process in production. `express` + `dotenv` are present for local/dev tooling only (see `.env.example`, `clean` script).
- **Database / Auth (primary):** Firebase — Firestore + Firebase Authentication. Config in `firebase-applet-config.json`, loaded via `src/lib/firebase.ts`.
- **Database (secondary/parallel):** Supabase client exists at `src/lib/supabase.ts` with a full schema in `supabase/schema.sql`, `supabase/seed.sql`, and `supabase/migrations/`. Firebase is the documented primary backend (see `README.md`) — check with the user before assuming Supabase is the active data source for a given feature.
- **AI providers:** Anthropic Claude and Google Gemini, both called server-side only from `api/chat.js` (API keys never reach the browser). `src/lib/agent.ts` drives the Admin Control Center's agent features.
- **Deployment:** Vercel (`vercel.json` rewrites all routes to `index.html` for the SPA; `api/` folder auto-deploys as serverless functions). Firebase Hosting config also present in `firebase.json` as an alternate/secondary target.

## Commands

```bash
npm run dev      # vite dev server on :3000
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint      # tsc --noEmit (type-check only, no separate linter configured)
```

## Project structure

```
api/                     Vercel serverless functions (Node, ESM)
  _lib/verifyAdminAuth.js   shared admin-auth check via Firebase ID token
  agent/lead-draft.js       POST — drafts a reply to a real lead (admin-only, never auto-sends)
  agent/seo-scan.js         POST — scans this site's own live routes for on-page SEO issues
  chat.js                   POST — powers the public ChatWidget (Claude or Gemini)
src/
  App.tsx                 route table
  main.tsx                entry point
  index.css               Tailwind entry
  components/              shared UI (Navbar, Footer, ChatWidget, section blocks, modals, etc.)
  pages/                   one component per route (HomePage, PlatformPage, SolutionsPage, FeaturesPage,
                            HowItWorksPage, PricingPage, ResourcesPage, LoginPage, GetStartedPage, AdminPage,
                            plus AiAgentsPage, ContactPage, ProjectsPage, WebDevelopmentPage referenced elsewhere)
  data/mockData.ts         static/display data for marketing sections (capabilities, pricing, testimonials, FAQ, etc.)
  lib/firebase.ts          Firestore/Auth client + collection helpers
  lib/supabase.ts          Supabase client (secondary)
  lib/agent.ts             client-side driver for the AI Agent's SEO/lead-draft/chat features
  types.ts                 shared TypeScript types/interfaces
  hooks/usePageMetadata.ts SEO meta tag hook per page
supabase/                 SQL schema, seed data, migrations for the Supabase (secondary) backend
firestore.rules           Firestore security rules (see below)
firestore.indexes.json    Firestore composite indexes
firebase-applet-config.json  Firebase project config (public web config, not secret)
vercel.json               SPA rewrite config for Vercel
```

## Routes

`/`, `/platform`, `/solutions`, `/features`, `/how-it-works`, `/pricing`, `/resources`, `/login`, `/get-started`, `/admin` (protected), with an unknown-path fallback that redirects to `/`.

## Data model (Firestore — primary)

- **`project_leads`** — contact-form and 4-step "Get Started" onboarding submissions. Public create, admin-only read/update/delete (see `firestore.rules`). Status pipeline: `new → contacted → qualified → proposal_sent → closed / archived`.
- **`projects`** — portfolio/case studies (flagship: "E-Commerce Growth AI", `in_development`).
- **`services`** — the 5 core offerings (`custom-ai-agents`, `web-development`, `ecommerce-solutions`, `ai-business-automation`, `custom-digital-solutions`). Publicly readable, admin-writable.
- **`agent_categories`** — 8 industry verticals for custom AI agents.
- **`newsletter_subscribers`** — email + consent timestamp + source page.
- **`agent_action_log`** (referenced from `src/lib/agent.ts`) — append-only audit trail of every AI Agent action and human decision.

Security model: public visitors can only *create* validated leads / subscribe to the newsletter. Everything else (reading leads, updating status, editing services/projects/categories) requires an authenticated admin whose email matches `firestore.rules`' `isAdmin()` check or the hardcoded list in `api/_lib/verifyAdminAuth.js`.

## The "AI Agent" (Admin Control Center)

A single, human-supervised agent (not multiple personas) with three capabilities, all gated behind admin auth and all read-only against the live site or proposal-only against the database:

1. **SEO scan** (`api/agent/seo-scan.js`) — fetches this site's own real routes and reports real on-page findings only; anything it can't verify (Search Console, GA, backlinks) is reported as `connected: false`, never faked.
2. **Lead-reply drafting** (`api/agent/lead-draft.js`) — drafts a reply to a real lead using only the lead's real submitted fields and the real published service catalog. It never invents prices/timelines/guarantees and never sends anything — a human must review, edit, and send manually.
3. **Website chat widget** (`api/chat.js`) — public-facing assistant, grounded in the real, currently-published services fetched from Firestore (falls back to a static mirror list only if Firestore is briefly unavailable).

When touching agent code, preserve this pattern: every write is gated by the same `isAdmin()` rule as the rest of the app, every finding/draft carries its evidence/data-source, and nothing here is allowed to autonomously contact a lead, publish content, or perform a bulk action — those always require an explicit click from the signed-in admin.

## Environment variables

See `.env.example` for the full list. Client-side (must be prefixed `VITE_`): Firebase web config. Server-side only (Vercel env vars, never exposed to the browser): `GEMINI_API_KEY`, Claude/Anthropic API key (used in `api/chat.js`), `CONTACT_NOTIFICATION_EMAIL`. Never commit real secrets — `.env` is gitignored; only `.env.example` with placeholders is tracked.

## Working rules for this project

- Preserve the locked design (see Golden rule above) — this applies to every page, component, and the admin console alike.
- Don't introduce a new framework, state library, CSS approach, or backend dependency without checking first — the stack above is deliberate.
- Keep AI-generated content (chat replies, lead drafts, SEO findings) grounded in real data passed into the function; never let it invent facts, prices, or claims — this is an explicit, repeated rule throughout the existing code and should be kept that way in any new agent code.
- Any action that would email/contact a real lead, publish content, or run automatically without a human click needs explicit confirmation before implementing — the current code deliberately keeps every such action as a manual, admin-reviewed step.
- Prefer small, verifiable changes; run `npm run lint` (type-check) before considering a change done.
