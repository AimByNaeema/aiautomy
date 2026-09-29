import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  ProjectLead,
  ProjectLeadSubmission,
  ProjectRecord,
  ServiceRecord,
  AgentCategoryRecord,
  NewsletterSubscriberRecord,
  LeadStatus,
} from '../types';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-ref.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

// Create the Supabase client instance (or null if not configured)
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// ============================================================================
// INITIAL SEED CONSTANTS (Local Fallback & Baseline Reference)
// ============================================================================

export const INITIAL_PROJECTS: ProjectRecord[] = [
  {
    id: 'proj-ecommerce-growth-ai',
    slug: 'ecommerce-growth-ai',
    name: 'E-Commerce Growth AI',
    short_description:
      'An intelligent ecommerce growth system designed to help businesses research markets, discover products, optimize SEO and listings, plan marketing, analyze advertising and identify growth opportunities.',
    full_description:
      'E-Commerce Growth AI is our flagship multi-agent commerce intelligence system currently in development. It unifies 9 specialized reasoning agents — from market whitespace discovery and supplier unit cost analysis to SEO listing optimization, ad creative direction, and autonomous conversion telemetry — backed by strict human approval controls.',
    category: 'AI Agent / Ecommerce',
    status: 'in_development',
    technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Multi-Agent Graph', 'Vector Search'],
    featured: true,
    cover_image_url: null,
    project_url: '/platform',
    sort_order: 1,
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
      'Intelligent, domain-tailored AI agents engineered to automate complex workflows and accelerate operations.',
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
      'Professional, responsive, and high-performance websites, customer portals, and web applications.',
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
      'Cloud Run or Firebase Hosting Deployment',
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
      'AI-powered ecommerce systems, product research, SEO, marketing, analytics, and growth solutions.',
    full_description:
      'End-to-end commerce engineering spanning storefront optimization, automated listing enhancements, margin whitespace discovery, ad creative playbooks, and conversion rate optimization.',
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
      'Custom AI-powered workflows, data pipelines, and autonomous business orchestration.',
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
      'Business-specific software, internal tools, analytics dashboards, and multi-system integrations.',
    full_description:
      'Tailored digital systems, API middleware, reporting control centers, and secure backends built specifically for your team’s operational requirements.',
    icon_key: 'Layers',
    key_features: [
      'Role-based access control (RBAC)',
      'Google Cloud Firestore persistence',
      'Bespoke operational dashboards',
    ],
    deliverables: [
      'Dedicated Admin Portal & CRM Tools',
      'Firestore Security Rules Architecture',
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
    slug: 'ecommerce',
    name: 'Ecommerce',
    description: 'Specialized commerce agents for catalog analysis, SEO recovery, whitespace discovery, and ad optimization.',
    sort_order: 1,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-2',
    slug: 'restaurants-cafes',
    name: 'Restaurants & Cafes',
    description: 'Operational agents for menu demand forecasting, reservation routing, review intelligence, and supply inventory.',
    sort_order: 2,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-3',
    slug: 'real-estate',
    name: 'Real Estate',
    description: 'Property matching agents, automated listing copy generation, buyer qualification, and market pricing telemetry.',
    sort_order: 3,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-4',
    slug: 'marketing',
    name: 'Marketing',
    description: 'Campaign planning agents, multi-channel copy generation, viral ad hooks, and retention loop automation.',
    sort_order: 4,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-5',
    slug: 'sales',
    name: 'Sales',
    description: 'Inbound lead qualification, CRM enrichment, automated proposal drafting, and meeting follow-up summaries.',
    sort_order: 5,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-6',
    slug: 'customer-support',
    name: 'Customer Support',
    description: '24/7 resolution agents with brand-voice alignment, knowledge-base retrieval, and seamless human escalation.',
    sort_order: 6,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-7',
    slug: 'operations',
    name: 'Operations',
    description: 'Workflow coordination agents, automated reconciliation, vendor compliance checks, and team alerts.',
    sort_order: 7,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'cat-8',
    slug: 'custom-business-agents',
    name: 'Custom Business Agents',
    description: 'Bespoke agent architecture designed from the ground up for proprietary industry workflows and private databases.',
    sort_order: 8,
    is_published: true,
    created_at: '2026-08-20T10:00:00.000Z',
    updated_at: '2026-08-28T00:00:00.000Z',
  },
];

// Sample demo leads for preview environment
const INITIAL_DEMO_LEADS: ProjectLead[] = [
  {
    id: 'lead-demo-1',
    full_name: 'Marcus Vance',
    email: 'marcus@lumina-brands.com',
    phone: '+1 (415) 882-9012',
    company_name: 'Lumina Brands Inc.',
    website_url: 'https://lumina-brands.com',
    service_interest: 'custom_ai_agent',
    business_industry: 'Consumer Goods & Retail',
    project_budget: '$10k - $25k',
    project_timeline: '1-2 Months',
    message: 'We are seeking a custom multi-agent inventory and supplier intelligence system to automate purchase order timing and forecast SKU runouts.',
    source_page: 'contact',
    status: 'new',
    internal_notes: 'Urgent enquiry from founder. Schedule discovery call.',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'lead-demo-2',
    full_name: 'Elena Rostova',
    email: 'elena@novus-tech.io',
    phone: '+44 20 7946 0918',
    company_name: 'Novus SaaS',
    website_url: 'https://novus-tech.io',
    service_interest: 'web_development',
    business_industry: 'Fintech & SaaS',
    project_budget: '$25k - $50k',
    project_timeline: '2-3 Months',
    message: 'Need a high-converting web application frontend with responsive dashboard, authentication, and client billing portal.',
    source_page: 'start_project',
    status: 'qualified',
    internal_notes: 'Reviewed requirements; scope fits Q3 delivery window.',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

// ============================================================================
// LOCAL STORAGE PERSISTENCE HELPERS (Reliable Fallback Layer)
// ============================================================================

const STORAGE_KEYS = {
  LEADS: 'aiagentstudio_leads',
  PROJECTS: 'aiagentstudio_projects',
  SERVICES: 'aiagentstudio_services',
  CATEGORIES: 'aiagentstudio_categories',
  SUBSCRIBERS: 'aiagentstudio_subscribers',
  ADMIN_AUTH: 'aiagentstudio_admin_session',
};

function getLocalItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[Supabase Service] Failed to read ${key} from storage:`, err);
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[Supabase Service] Failed to write ${key} to storage:`, err);
  }
}

// ============================================================================
// VALIDATION & SANITIZATION UTILITIES
// ============================================================================

export function sanitizeText(input: string | undefined | null): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '');
}

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email.trim());
}

// ============================================================================
// PUBLIC SERVICE API METHODS
// ============================================================================

/**
 * Submits a new project inquiry / lead into the database.
 * Supports Supabase Postgres with automatic fallback persistence.
 */
export async function submitProjectLead(
  submission: ProjectLeadSubmission
): Promise<{ success: boolean; data?: ProjectLead; error?: string }> {
  // 1. Client-Side Input Validation
  const fullName = sanitizeText(submission.full_name);
  const email = submission.email.trim();
  const message = sanitizeText(submission.message);
  const serviceInterest = submission.service_interest || 'custom_ai_agent';

  if (!fullName || fullName.length < 2) {
    return { success: false, error: 'Please provide your full name (at least 2 characters).' };
  }

  if (!isValidEmail(email)) {
    return { success: false, error: 'Please provide a valid business email address.' };
  }

  if (!message || message.length < 5) {
    return { success: false, error: 'Please describe your project requirements in at least 5 characters.' };
  }

  const newLead: ProjectLead = {
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    full_name: fullName,
    email: email,
    phone: submission.phone ? sanitizeText(submission.phone) : null,
    company_name: submission.company_name ? sanitizeText(submission.company_name) : null,
    website_url: submission.website_url ? sanitizeText(submission.website_url) : null,
    service_interest: serviceInterest,
    business_industry: submission.business_industry ? sanitizeText(submission.business_industry) : null,
    project_budget: submission.project_budget ? sanitizeText(submission.project_budget) : null,
    project_timeline: submission.project_timeline ? sanitizeText(submission.project_timeline) : null,
    message: message,
    source_page: submission.source_page || 'contact',
    status: 'new',
    internal_notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // 2. Always persist to local cache for resilience
  const currentLeads = getLocalItem<ProjectLead[]>(STORAGE_KEYS.LEADS, INITIAL_DEMO_LEADS);
  setLocalItem(STORAGE_KEYS.LEADS, [newLead, ...currentLeads]);

  // 3. Attempt insertion to Supabase if configured
  if (supabase) {
    try {
      const { data, error } = await supabase.from('project_leads').insert([
        {
          full_name: newLead.full_name,
          email: newLead.email,
          phone: newLead.phone,
          company_name: newLead.company_name,
          website_url: newLead.website_url,
          service_interest: newLead.service_interest,
          business_industry: newLead.business_industry,
          project_budget: newLead.project_budget,
          project_timeline: newLead.project_timeline,
          message: newLead.message,
          source_page: newLead.source_page,
          status: 'new',
        },
      ]).select().single();

      if (error) {
        console.warn('[Supabase] Remote insert warning (saved locally):', error.message);
      } else if (data) {
        newLead.id = data.id;
      }
    } catch (err) {
      console.warn('[Supabase] Remote connection error (saved locally):', err);
    }
  }

  return { success: true, data: newLead };
}

/**
 * Subscribes an email to the newsletter list.
 */
export async function subscribeNewsletter(
  email: string,
  sourcePage: string = 'footer'
): Promise<{ success: boolean; message: string }> {
  if (!isValidEmail(email)) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  const cleanEmail = email.trim().toLowerCase();
  const currentSubs = getLocalItem<NewsletterSubscriberRecord[]>(STORAGE_KEYS.SUBSCRIBERS, []);

  // Check duplicate
  const exists = currentSubs.some((s) => s.email.toLowerCase() === cleanEmail);
  if (!exists) {
    const newSub: NewsletterSubscriberRecord = {
      id: `sub-${Date.now()}`,
      email: cleanEmail,
      consent_at: new Date().toISOString(),
      source_page: sourcePage,
      created_at: new Date().toISOString(),
      is_active: true,
    };
    setLocalItem(STORAGE_KEYS.SUBSCRIBERS, [newSub, ...currentSubs]);
  }

  if (supabase) {
    try {
      await supabase.from('newsletter_subscribers').upsert(
        { email: cleanEmail, source_page: sourcePage, is_active: true },
        { onConflict: 'email' }
      );
    } catch (err) {
      console.warn('[Supabase] Newsletter insert warning:', err);
    }
  }

  return { success: true, message: 'Thank you for subscribing to AIAUTOMY briefing updates.' };
}

/**
 * Fetches published projects for the public portfolio.
 */
export async function fetchPublishedProjects(): Promise<ProjectRecord[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as ProjectRecord[];
      }
    } catch (err) {
      console.warn('[Supabase] Fetch projects failed, using fallback:', err);
    }
  }
  return getLocalItem<ProjectRecord[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
}

/**
 * Fetches published services.
 */
export async function fetchPublishedServices(): Promise<ServiceRecord[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as ServiceRecord[];
      }
    } catch (err) {
      console.warn('[Supabase] Fetch services failed, using fallback:', err);
    }
  }
  return getLocalItem<ServiceRecord[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
}

/**
 * Fetches published AI agent categories.
 */
export async function fetchPublishedAgentCategories(): Promise<AgentCategoryRecord[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('agent_categories')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as AgentCategoryRecord[];
      }
    } catch (err) {
      console.warn('[Supabase] Fetch categories failed, using fallback:', err);
    }
  }
  return getLocalItem<AgentCategoryRecord[]>(STORAGE_KEYS.CATEGORIES, INITIAL_AGENT_CATEGORIES);
}

// ============================================================================
// ADMIN MANAGEMENT METHODS (Protected)
// ============================================================================

export async function fetchAdminLeads(): Promise<ProjectLead[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('project_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as ProjectLead[];
      }
    } catch (err) {
      console.warn('[Supabase Admin] Fetch leads fallback:', err);
    }
  }
  return getLocalItem<ProjectLead[]>(STORAGE_KEYS.LEADS, INITIAL_DEMO_LEADS);
}

export async function updateLeadStatus(id: string, newStatus: LeadStatus): Promise<boolean> {
  // Update local
  const currentLeads = getLocalItem<ProjectLead[]>(STORAGE_KEYS.LEADS, INITIAL_DEMO_LEADS);
  const updated = currentLeads.map((l) =>
    l.id === id ? { ...l, status: newStatus, updated_at: new Date().toISOString() } : l
  );
  setLocalItem(STORAGE_KEYS.LEADS, updated);

  if (supabase) {
    try {
      const { error } = await supabase
        .from('project_leads')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);
      return !error;
    } catch (err) {
      console.warn('[Supabase Admin] Update lead status failed:', err);
    }
  }
  return true;
}

export async function updateLeadInternalNotes(id: string, notes: string): Promise<boolean> {
  const currentLeads = getLocalItem<ProjectLead[]>(STORAGE_KEYS.LEADS, INITIAL_DEMO_LEADS);
  const updated = currentLeads.map((l) =>
    l.id === id ? { ...l, internal_notes: notes, updated_at: new Date().toISOString() } : l
  );
  setLocalItem(STORAGE_KEYS.LEADS, updated);

  if (supabase) {
    try {
      const { error } = await supabase
        .from('project_leads')
        .update({ internal_notes: notes, updated_at: new Date().toISOString() })
        .eq('id', id);
      return !error;
    } catch (err) {
      console.warn('[Supabase Admin] Update lead notes failed:', err);
    }
  }
  return true;
}

export async function deleteLead(id: string): Promise<boolean> {
  const currentLeads = getLocalItem<ProjectLead[]>(STORAGE_KEYS.LEADS, INITIAL_DEMO_LEADS);
  setLocalItem(
    STORAGE_KEYS.LEADS,
    currentLeads.filter((l) => l.id !== id)
  );

  if (supabase) {
    try {
      const { error } = await supabase.from('project_leads').delete().eq('id', id);
      return !error;
    } catch (err) {
      console.warn('[Supabase Admin] Delete lead failed:', err);
    }
  }
  return true;
}

export async function fetchAdminProjects(): Promise<ProjectRecord[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data) {
        return data as ProjectRecord[];
      }
    } catch (err) {
      console.warn('[Supabase Admin] Fetch projects failed:', err);
    }
  }
  return getLocalItem<ProjectRecord[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
}

export async function saveProject(project: Partial<ProjectRecord> & { name: string; category: string }): Promise<ProjectRecord> {
  const currentProjects = getLocalItem<ProjectRecord[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  let savedRecord: ProjectRecord;

  if (project.id) {
    savedRecord = {
      ...(currentProjects.find((p) => p.id === project.id) || INITIAL_PROJECTS[0]),
      ...project,
      updated_at: new Date().toISOString(),
    } as ProjectRecord;
    const updated = currentProjects.map((p) => (p.id === project.id ? savedRecord : p));
    setLocalItem(STORAGE_KEYS.PROJECTS, updated);
  } else {
    savedRecord = {
      id: `proj-${Date.now()}`,
      slug: project.slug || project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: project.name,
      short_description: project.short_description || '',
      full_description: project.full_description || '',
      category: project.category,
      status: project.status || 'in_development',
      technologies: project.technologies || [],
      featured: project.featured ?? false,
      cover_image_url: project.cover_image_url || null,
      project_url: project.project_url || null,
      sort_order: project.sort_order ?? currentProjects.length + 1,
      is_published: project.is_published ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setLocalItem(STORAGE_KEYS.PROJECTS, [...currentProjects, savedRecord]);
  }

  if (supabase) {
    try {
      await supabase.from('projects').upsert(savedRecord);
    } catch (err) {
      console.warn('[Supabase Admin] Save project remote error:', err);
    }
  }

  return savedRecord;
}

export async function fetchAdminServices(): Promise<ServiceRecord[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data) return data as ServiceRecord[];
    } catch (err) {
      console.warn('[Supabase Admin] Fetch services failed:', err);
    }
  }
  return getLocalItem<ServiceRecord[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
}

export async function fetchAdminCategories(): Promise<AgentCategoryRecord[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('agent_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data) return data as AgentCategoryRecord[];
    } catch (err) {
      console.warn('[Supabase Admin] Fetch categories failed:', err);
    }
  }
  return getLocalItem<AgentCategoryRecord[]>(STORAGE_KEYS.CATEGORIES, INITIAL_AGENT_CATEGORIES);
}

export async function fetchAdminSubscribers(): Promise<NewsletterSubscriberRecord[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) return data as NewsletterSubscriberRecord[];
    } catch (err) {
      console.warn('[Supabase Admin] Fetch subscribers failed:', err);
    }
  }
  return getLocalItem<NewsletterSubscriberRecord[]>(STORAGE_KEYS.SUBSCRIBERS, []);
}
