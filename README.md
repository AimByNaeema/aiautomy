# AIAUTOMY — Firebase Backend & Architecture

## Overview
**AIAUTOMY** is powered by Google Cloud Firestore and Firebase Authentication for enterprise-grade, real-time data persistence and access control.

- **Brand:** AIAUTOMY
- **Inquiries:** `aiagentstudioo@gmail.com`
- **Core Offerings:** Custom AI Agents, Web Development, Ecommerce Solutions, AI Business Automation, Custom Digital Solutions.
- **Flagship Project:** E-Commerce Growth AI (*In Development / Coming Soon*).

---

## 1. Firebase & Firestore Setup

### Configuration
Configuration is defined in `firebase-applet-config.json` and loaded into `src/lib/firebase.ts`:
- **Project ID:** `mimetic-decorator-26shk`
- **Firestore Database ID:** `ai-studio-ecommercegrowtha-baa4d071-ea03-48b0-8a5b-d03756fa7107`

### Environment Variables
Refer to `.env.example`:
```bash
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=mimetic-decorator-26shk.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mimetic-decorator-26shk
VITE_FIREBASE_STORAGE_BUCKET=mimetic-decorator-26shk.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=443666498518
VITE_FIREBASE_APP_ID=1:443666498518:web:be99a59a4bccfcc0d0da77

CONTACT_NOTIFICATION_EMAIL=aiagentstudioo@gmail.com
```

---

## 2. Firestore Collections & Schema

### `project_leads`
Stores inquiries from the Contact modal and the 4-step Get Started onboarding flow.
- `id` (string, unique)
- `full_name` (string, min 2 chars)
- `email` (string, valid email)
- `phone` (string, optional)
- `company_name` (string, optional)
- `website_url` (string, optional)
- `service_interest` (enum: `custom_ai_agent`, `web_development`, `ecommerce_solution`, `ai_automation`, `custom_digital_solution`, `other`)
- `business_industry` (string, optional)
- `project_budget` (string, optional)
- `project_timeline` (string, optional)
- `message` (string, min 5 chars)
- `source_page` (string)
- `status` (enum: `new`, `contacted`, `qualified`, `proposal_sent`, `closed`, `archived`)
- `internal_notes` (string, confidential)
- `created_at` (ISO timestamp)
- `updated_at` (ISO timestamp)

### `projects`
Stores published portfolio projects and case studies.
- Flagship item: **E-Commerce Growth AI** (`in_development`)

### `services`
Stores the 5 core agency services.
- `custom-ai-agents`
- `web-development`
- `ecommerce-solutions`
- `ai-business-automation`
- `custom-digital-solutions`

### `agent_categories`
Stores the 8 industry verticals for custom AI agents.
- Ecommerce, Restaurants & Cafes, Real Estate, Marketing, Sales, Customer Support, Operations, Custom Business Agents.

### `newsletter_subscribers`
Stores subscriber email addresses with consent timestamp and source page.

---

## 3. Firestore Security Rules (`firestore.rules`)
- **Public Write / Protected Read:** Public visitors can create validated `project_leads` and subscribe to newsletter briefings.
- **Admin Isolation:** Only authenticated administrators (`aiagentstudioo@gmail.com` or users listed in `/admins/{uid}`) can read, query, update, or delete lead submissions.
- **Content Immutability:** Projects, services, and agent categories are publicly readable but editable only by admins.

---

## 4. Admin Management Portal (`/admin`)
Access the protected admin management console at `/admin`:
- Filter, search, and view complete lead inquiries.
- Update lead status pipeline (`NEW` -> `CONTACTED` -> `QUALIFIED` -> `PROPOSAL SENT` -> `CLOSED WON` -> `ARCHIVED`).
- Record confidential client discovery notes.
- One-click cloud catalog synchronization.
