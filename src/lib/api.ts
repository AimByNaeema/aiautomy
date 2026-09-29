// ============================================================================
// AIAUTOMY — backend API client (Railway migration)
//
// Replaces src/lib/firebase.ts. Every exported function keeps the exact same
// name and return shape it had before, so every component that previously
// imported from '../lib/firebase' only needs its import path updated to
// '../lib/api' — no call-site changes. Firestore reads/writes become fetch()
// calls to the new Express + PostgreSQL backend (server/); Firebase Auth's
// admin-session role moves to src/lib/session.ts + Google Identity Services.
// ============================================================================

import {
  ProjectLead,
  ProjectLeadSubmission,
  ProjectRecord,
  ServiceRecord,
  AgentCategoryRecord,
  NewsletterSubscriberRecord,
  LeadStatus,
} from '../types';
import { getSessionToken, setSession } from './session';
import { sanitizeText, isValidEmail } from './sanitize';

// The deployed backend's base URL (e.g. https://your-app.up.railway.app).
// Empty string falls back to same-origin requests, which only works if the
// frontend and backend are ever served from the same host.
export const API_BASE_URL: string = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export const isBackendConfigured: boolean = Boolean(API_BASE_URL);

export async function publicFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const headers = new Headers(options.headers || {});
  if (options.body) headers.set('content-type', 'application/json');
  return fetch(`${API_BASE_URL}${path}`, { ...options, headers });
}

/**
 * Same as publicFetch, but attaches the admin session token. On a 401 (token
 * missing/expired/not-authorized), clears the local session so the UI falls
 * back to the sign-in screen instead of silently failing every request.
 * Exported so src/lib/agent.ts (and any other admin-only client code) can
 * reuse the exact same auth-attaching/401-handling behavior.
 */
export async function adminFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getSessionToken();
  const headers = new Headers(options.headers || {});
  if (options.body) headers.set('content-type', 'application/json');
  if (token) headers.set('authorization', `Bearer ${token}`);
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (res.status === 401) {
    setSession(null);
  }
  return res;
}

export { sanitizeText, isValidEmail };

// ============================================================================
// BASELINE DATA CONSTANTS — unchanged from src/lib/firebase.ts. Used both as
// UI fallback data (fetchPublishedServices etc.) and as the seed payload for
// the "Seed Initial Data" admin action, which populates a fresh Postgres
// database the same way it used to populate a fresh Firestore database.
// ============================================================================

export const INITIAL_PROJECTS: ProjectRecord[] = [
  {
    id: 'proj-cafebot',
    slug: 'cafebot',
    name: 'CafeBot',
    short_description:
      'An AI assistant concept designed to support cafés and restaurants with customer enquiries, menu guidance, reservation support, and everyday service interactions.',
    full_description:
      'CafeBot is an AI assistant concept engineered specifically for the hospitality sector. It streamlines customer inquiries regarding opening hours, special dietary options, table availability, and menu recommendations while giving management direct supervisory controls and human-in-the-loop overrides.',
    category: 'AI Agent / Restaurant & Cafe',
    status: 'in_development',
    technologies: ['TypeScript', 'React', 'Node.js', 'LLM Retrieval', 'Natural Language Understanding'],
    featured: true,
    cover_image_url: null,
    project_url: null,
    sort_order: 1,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'proj-ecommerce-growth-ai',
    slug: 'ecommerce-growth-ai',
    name: 'E-Commerce Growth AI',
    short_description:
      'An intelligent ecommerce growth system designed to help businesses research markets, discover products, improve SEO and listings, plan marketing, analyze advertising, and identify growth opportunities.',
    full_description:
      'E-Commerce Growth AI is our flagship multi-agent commerce intelligence system currently in development. It unifies specialized reasoning agents — from market whitespace discovery and supplier unit cost analysis to SEO listing optimization, ad creative direction, and conversion telemetry — backed by strict human approval controls.',
    category: 'AI Agent / Ecommerce',
    status: 'in_development',
    technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Multi-Agent Graph', 'Vector Search'],
    featured: true,
    cover_image_url: null,
    project_url: '/platform',
    sort_order: 2,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'proj-custom-ai-agents',
    slug: 'custom-ai-agents',
    name: 'Future Custom AI Agents',
    short_description:
      'Custom AI digital employees designed for the specific needs of your business.',
    full_description:
      'Bespoke AI digital employees engineered around your proprietary business workflows, databases, customer touchpoints, and security protocols. Available for custom client projects.',
    category: 'Custom AI Solutions',
    status: 'coming_soon',
    technologies: ['Tailored Agent Architecture', 'API Integrations', 'Private Data RAG', 'Human Approval Gates'],
    featured: true,
    cover_image_url: null,
    project_url: '/contact',
    sort_order: 3,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
];

export const INITIAL_SERVICES: ServiceRecord[] = [
  {
    id: 'srv-1',
    slug: 'custom-ai-agents',
    title: 'Custom AI Agents',
    short_description:
      'Specialized AI digital employees designed around your business workflows, customers, and goals.',
    full_description:
      'We build proprietary, single-purpose and multi-agent AI systems designed around your proprietary business workflows, customer interactions, and data infrastructure. Available for custom client projects.',
    icon_key: 'Bot',
    key_features: [
      'Grounded in verified business documents',
      'Human-in-the-loop approval gates',
      '24/7 customer and staff support workflows',
    ],
    deliverables: [
      'Custom LLM Prompt Architecture',
      'Vector Search & RAG Pipeline',
      'Management Supervisor Dashboard',
    ],
    is_available_for_custom_projects: true,
    sort_order: 1,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'srv-2',
    slug: 'web-development',
    title: 'Web Development',
    short_description:
      'Professional, responsive, SEO-friendly websites and web applications built for trust, speed, and conversion.',
    full_description:
      'From modern brand storefronts and SaaS platforms to dynamic customer dashboards and high-converting landing pages — engineered with clean code, sub-second performance, and responsive mobile precision.',
    icon_key: 'Layout',
    key_features: [
      'Sub-second load times (<1.0s FCP)',
      '100% mobile-first responsive precision',
      'Semantic SEO markup and meta tags',
    ],
    deliverables: [
      'Vite & React Full-Stack Application',
      'Tailwind CSS Design System',
      'Production Deployment on Railway',
    ],
    is_available_for_custom_projects: true,
    sort_order: 2,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'srv-3',
    slug: 'ecommerce-solutions',
    title: 'Ecommerce Solutions',
    short_description:
      'Custom ecommerce websites, product experiences, research systems, SEO tools, and growth-focused digital solutions — for your own website and marketplaces like Shopify, Etsy, Amazon, and eBay.',
    full_description:
      'End-to-end commerce engineering spanning storefront optimization, automated listing enhancements, margin whitespace discovery, ad creative playbooks, and conversion rate optimization — across your independent website and marketplace storefronts (Shopify, Etsy, Amazon, eBay).',
    icon_key: 'ShoppingBag',
    key_features: [
      'Conversion-optimized product pages',
      'Automated catalog SEO enhancements',
      'Market opportunity & margin scanning',
    ],
    deliverables: [
      'Custom Storefront & Checkout Integration',
      'Catalog Management & Search Filters',
      'Telemetry & Conversion Analytics',
    ],
    is_available_for_custom_projects: true,
    sort_order: 3,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'srv-4',
    slug: 'ai-business-automation',
    title: 'AI Business Automation',
    short_description:
      'Automation workflows that help businesses reduce repetitive work and operate more efficiently.',
    full_description:
      'Eliminate manual operational drag with intelligent document processing, multi-channel lead routing, automated data reconciliation, and proactive decision triggers.',
    icon_key: 'Zap',
    key_features: [
      'Inbound lead qualification and routing',
      'Automated document extraction and sync',
      'CRM and webhook pipeline triggers',
    ],
    deliverables: [
      'Multi-Step Automated Logic Engine',
      'API Webhooks & Third-Party Adapters',
      'Error Handling & Fallback Alerting',
    ],
    is_available_for_custom_projects: true,
    sort_order: 4,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'srv-5',
    slug: 'custom-digital-solutions',
    title: 'Custom Digital Solutions',
    short_description:
      'Business-specific dashboards, tools, internal systems, and integrations built for real operational needs.',
    full_description:
      'Tailored digital systems, API middleware, reporting control centers, and secure backends built specifically for your team’s operational requirements.',
    icon_key: 'Layers',
    key_features: [
      'Role-based access control (RBAC)',
      'PostgreSQL-backed persistence',
      'Bespoke operational dashboards',
    ],
    deliverables: [
      'Dedicated Admin Portal & CRM Tools',
      'API Authorization Architecture',
      'Complete Codebase Transfer & Ownership',
    ],
    is_available_for_custom_projects: true,
    sort_order: 5,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
];

export const INITIAL_AGENT_CATEGORIES: AgentCategoryRecord[] = [
  {
    id: 'cat-1',
    slug: 'restaurants-cafes',
    name: 'Restaurants & Cafes',
    description: 'Customer enquiries, menu assistance, reservations, and order support workflows.',
    sort_order: 1,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-2',
    slug: 'ecommerce',
    name: 'Ecommerce',
    description: 'Product research, SEO assistance, customer support, and growth insights.',
    sort_order: 2,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-3',
    slug: 'real-estate',
    name: 'Real Estate',
    description: 'Lead qualification, property enquiries, and follow-up workflows.',
    sort_order: 3,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-4',
    slug: 'customer-support',
    name: 'Customer Support',
    description: 'FAQ assistance, ticket routing, and responsive customer communication.',
    sort_order: 4,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-5',
    slug: 'sales',
    name: 'Sales',
    description: 'Inbound lead qualification, proactive follow-ups, and CRM support.',
    sort_order: 5,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-6',
    slug: 'marketing',
    name: 'Marketing',
    description: 'Campaign planning, copy assistance, creative angles, and content organization.',
    sort_order: 6,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-7',
    slug: 'operations',
    name: 'Operations',
    description: 'Internal knowledge retrieval, reporting, and repetitive task automation.',
    sort_order: 7,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-8',
    slug: 'professional-services',
    name: 'Professional Services',
    description: 'Client intake, document routing, appointment scheduling, and structured requests.',
    sort_order: 8,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-9',
    slug: 'custom-business-agents',
    name: 'Custom Business Agents',
    description: 'Bespoke AI digital employees designed from the ground up for unique business operations.',
    sort_order: 9,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
];

// ============================================================================
// PUBLIC SERVICES & LEAD SUBMISSION
// ============================================================================

/**
 * Submits a new project lead. Mirrors submitProjectLead() in the old
 * src/lib/firebase.ts: same client-side validation and same messages, so
 * every form's error text is unchanged. The backend independently
 * re-validates everything (see server/routes/leads.js).
 */
export async function submitProjectLead(
  submission: ProjectLeadSubmission
): Promise<{ success: boolean; data?: ProjectLead; error?: string }> {
  const fullName = sanitizeText(submission.full_name);
  const email = submission.email ? submission.email.trim() : '';
  const message = sanitizeText(submission.message);

  if (!fullName || fullName.length < 2) {
    return { success: false, error: 'Please provide your full name (at least 2 characters).' };
  }
  if (!isValidEmail(email)) {
    return { success: false, error: 'Please provide a valid business email address.' };
  }
  if (!message || message.length < 5) {
    return { success: false, error: 'Please describe your project requirements in at least 5 characters.' };
  }

  try {
    const res = await publicFetch('/api/leads', {
      method: 'POST',
      body: JSON.stringify(submission),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, error: data?.error || 'Failed to submit. Please try again.' };
    }
    return { success: true, data: data.data as ProjectLead };
  } catch (err) {
    console.warn('[api] submitProjectLead failed:', err);
    return { success: false, error: 'Could not reach the server. Please check your connection and try again.' };
  }
}

/**
 * Subscribes an email to the newsletter. Mirrors subscribeNewsletter().
 */
export async function subscribeNewsletter(
  email: string,
  sourcePage: string = 'footer'
): Promise<{ success: boolean; message: string }> {
  if (!isValidEmail(email)) {
    return { success: false, message: 'Please provide a valid email address.' };
  }
  try {
    const res = await publicFetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: email.trim().toLowerCase(), source_page: sourcePage }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, message: data?.message || 'Could not subscribe right now. Please try again.' };
    }
    return { success: true, message: data.message };
  } catch (err) {
    console.warn('[api] subscribeNewsletter failed:', err);
    return { success: false, message: 'Could not reach the server. Please try again.' };
  }
}

/**
 * Fetches published projects, falling back to the baseline list if the
 * backend is unreachable. Mirrors fetchPublishedProjects().
 */
export async function fetchPublishedProjects(): Promise<ProjectRecord[]> {
  try {
    const res = await publicFetch('/api/projects');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data as ProjectRecord[];
    }
  } catch (err) {
    console.warn('[api] fetchPublishedProjects fallback:', err);
  }
  return INITIAL_PROJECTS;
}

/**
 * Fetches published services, falling back to the baseline list. Mirrors
 * fetchPublishedServices().
 */
export async function fetchPublishedServices(): Promise<ServiceRecord[]> {
  try {
    const res = await publicFetch('/api/services');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data as ServiceRecord[];
    }
  } catch (err) {
    console.warn('[api] fetchPublishedServices fallback:', err);
  }
  return INITIAL_SERVICES;
}

/**
 * Fetches published agent categories, falling back to the baseline list.
 * Mirrors fetchPublishedAgentCategories().
 */
export async function fetchPublishedAgentCategories(): Promise<AgentCategoryRecord[]> {
  try {
    const res = await publicFetch('/api/agent-categories');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data as AgentCategoryRecord[];
    }
  } catch (err) {
    console.warn('[api] fetchPublishedAgentCategories fallback:', err);
  }
  return INITIAL_AGENT_CATEGORIES;
}

// ============================================================================
// ADMIN MANAGEMENT (session-JWT protected — see src/lib/session.ts)
// ============================================================================

export async function fetchAdminLeads(): Promise<ProjectLead[]> {
  try {
    const res = await adminFetch('/api/leads');
    if (res.ok) return (await res.json()) as ProjectLead[];
  } catch (err) {
    console.warn('[api admin] fetchAdminLeads failed:', err);
  }
  return [];
}

export async function updateLeadStatus(id: string, newStatus: LeadStatus): Promise<boolean> {
  try {
    const res = await adminFetch(`/api/leads/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus }),
    });
    return res.ok;
  } catch (err) {
    console.warn('[api admin] updateLeadStatus failed:', err);
    return false;
  }
}

export async function updateLeadInternalNotes(id: string, notes: string): Promise<boolean> {
  try {
    const res = await adminFetch(`/api/leads/${encodeURIComponent(id)}/notes`, {
      method: 'PATCH',
      body: JSON.stringify({ internal_notes: notes }),
    });
    return res.ok;
  } catch (err) {
    console.warn('[api admin] updateLeadInternalNotes failed:', err);
    return false;
  }
}

export async function deleteLead(id: string): Promise<boolean> {
  try {
    const res = await adminFetch(`/api/leads/${encodeURIComponent(id)}`, { method: 'DELETE' });
    return res.ok;
  } catch (err) {
    console.warn('[api admin] deleteLead failed:', err);
    return false;
  }
}

export async function fetchAdminProjects(): Promise<ProjectRecord[]> {
  try {
    const res = await adminFetch('/api/projects/admin');
    if (res.ok) return (await res.json()) as ProjectRecord[];
  } catch (err) {
    console.warn('[api admin] fetchAdminProjects failed:', err);
  }
  return [];
}

export async function saveProject(project: ProjectRecord): Promise<boolean> {
  try {
    const res = await adminFetch(`/api/projects/admin/${encodeURIComponent(project.id || 'new')}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
    return res.ok;
  } catch (err) {
    console.warn('[api admin] saveProject failed:', err);
    return false;
  }
}

export async function fetchAdminServices(): Promise<ServiceRecord[]> {
  try {
    const res = await adminFetch('/api/services/admin');
    if (res.ok) return (await res.json()) as ServiceRecord[];
  } catch (err) {
    console.warn('[api admin] fetchAdminServices failed:', err);
  }
  return [];
}

export async function saveService(service: ServiceRecord): Promise<boolean> {
  try {
    const res = await adminFetch(`/api/services/admin/${encodeURIComponent(service.id || 'new')}`, {
      method: 'PUT',
      body: JSON.stringify(service),
    });
    return res.ok;
  } catch (err) {
    console.warn('[api admin] saveService failed:', err);
    return false;
  }
}

export async function fetchAdminCategories(): Promise<AgentCategoryRecord[]> {
  try {
    const res = await adminFetch('/api/agent-categories/admin');
    if (res.ok) return (await res.json()) as AgentCategoryRecord[];
  } catch (err) {
    console.warn('[api admin] fetchAdminCategories failed:', err);
  }
  return [];
}

export async function fetchAdminSubscribers(): Promise<NewsletterSubscriberRecord[]> {
  try {
    const res = await adminFetch('/api/newsletter');
    if (res.ok) return (await res.json()) as NewsletterSubscriberRecord[];
  } catch (err) {
    console.warn('[api admin] fetchAdminSubscribers failed:', err);
  }
  return [];
}

/**
 * One-click seed action to populate a fresh PostgreSQL database with the
 * initial projects, services, and agent categories — mirrors
 * seedFirestoreInitialData(), which did the same thing for a fresh
 * Firestore database. Idempotent (upsert by id), safe to run more than once.
 */
export async function seedFirestoreInitialData(): Promise<{ success: boolean; message: string }> {
  try {
    for (const proj of INITIAL_PROJECTS) {
      await adminFetch(`/api/projects/admin/${encodeURIComponent(proj.id)}`, {
        method: 'PUT',
        body: JSON.stringify(proj),
      });
    }
    for (const srv of INITIAL_SERVICES) {
      await adminFetch(`/api/services/admin/${encodeURIComponent(srv.id)}`, {
        method: 'PUT',
        body: JSON.stringify(srv),
      });
    }
    for (const cat of INITIAL_AGENT_CATEGORIES) {
      await adminFetch(`/api/agent-categories/admin/${encodeURIComponent(cat.id)}`, {
        method: 'PUT',
        body: JSON.stringify(cat),
      });
    }
    return { success: true, message: 'Initial projects, services, and agent categories seeded to PostgreSQL successfully.' };
  } catch (err: any) {
    console.warn('[api admin] seedFirestoreInitialData failed:', err);
    return { success: false, message: `Seeding encountered: ${err?.message || 'a connection issue'}` };
  }
}
