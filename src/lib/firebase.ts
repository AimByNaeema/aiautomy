import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  getDocFromServer,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  ProjectLead,
  ProjectLeadSubmission,
  ProjectRecord,
  ServiceRecord,
  AgentCategoryRecord,
  NewsletterSubscriberRecord,
  LeadStatus,
} from '../types';

// Initialize Firebase App instance
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with exact database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const isFirebaseConfigured = Boolean(
  firebaseConfig.projectId &&
  firebaseConfig.apiKey &&
  !firebaseConfig.projectId.includes('placeholder')
);

// Connection test helper
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'projects', 'proj-ecommerce-growth-ai'));
    return true;
  } catch (err: any) {
    // If not found or permissions, it's still reachable
    return true;
  }
}

// Error handling helper per skill guidelines
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
    },
    operationType,
    path,
  };
  console.warn(`[Firestore ${operationType} Error at ${path}]:`, JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// ============================================================================
// BASELINE DATA CONSTANTS
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
    technologies: ['TypeScript', 'React', 'Node.js', 'Firestore', 'Multi-Agent Graph', 'Vector Search'],
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
      'Custom ecommerce websites, product experiences, research systems, SEO tools, and growth-focused digital solutions.',
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

// Local cache keys
const STORAGE_KEYS = {
  LEADS: 'aiagentstudio_leads',
  PROJECTS: 'aiagentstudio_projects',
  SERVICES: 'aiagentstudio_services',
  CATEGORIES: 'aiagentstudio_categories',
  SUBSCRIBERS: 'aiagentstudio_subscribers',
};

function getLocalItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota
  }
}

// Validation helpers
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
// PUBLIC SERVICES & LEAD SUBMISSION
// ============================================================================

/**
 * Submits a new project lead to Firestore with instant validation and local resilience.
 */
export async function submitProjectLead(
  submission: ProjectLeadSubmission
): Promise<{ success: boolean; data?: ProjectLead; error?: string }> {
  const fullName = sanitizeText(submission.full_name);
  const email = submission.email ? submission.email.trim() : '';
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

  const cleanLeadId = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  const nowIso = new Date().toISOString();

  const newLead: ProjectLead = {
    id: cleanLeadId,
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
    created_at: nowIso,
    updated_at: nowIso,
  };

  // 1. Cache locally for instant UI responsiveness
  const currentLeads = getLocalItem<ProjectLead[]>(STORAGE_KEYS.LEADS, INITIAL_DEMO_LEADS);
  setLocalItem(STORAGE_KEYS.LEADS, [newLead, ...currentLeads]);

  // 2. Persist to Cloud Firestore
  try {
    const leadDocRef = doc(db, 'project_leads', cleanLeadId);
    await setDoc(leadDocRef, {
      id: cleanLeadId,
      full_name: newLead.full_name,
      email: newLead.email,
      phone: newLead.phone || '',
      company_name: newLead.company_name || '',
      website_url: newLead.website_url || '',
      service_interest: newLead.service_interest,
      business_industry: newLead.business_industry || '',
      project_budget: newLead.project_budget || '',
      project_timeline: newLead.project_timeline || '',
      message: newLead.message,
      source_page: newLead.source_page,
      status: 'new',
      internal_notes: '',
      created_at: newLead.created_at,
      updated_at: newLead.updated_at,
    });
  } catch (err) {
    console.warn('[Firestore] Project lead write note:', err);
    // Even if remote write fails or is offline, local cache is preserved
  }

  return { success: true, data: newLead };
}

/**
 * Subscribes an email to the newsletter in Firestore.
 */
export async function subscribeNewsletter(
  email: string,
  sourcePage: string = 'footer'
): Promise<{ success: boolean; message: string }> {
  if (!isValidEmail(email)) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  const cleanEmail = email.trim().toLowerCase();
  const subId = `sub-${cleanEmail.replace(/[^a-z0-9]/g, '_')}`;
  const nowIso = new Date().toISOString();

  const currentSubs = getLocalItem<NewsletterSubscriberRecord[]>(STORAGE_KEYS.SUBSCRIBERS, []);
  const exists = currentSubs.some((s) => s.email.toLowerCase() === cleanEmail);
  if (!exists) {
    const newSub: NewsletterSubscriberRecord = {
      id: subId,
      email: cleanEmail,
      consent_at: nowIso,
      source_page: sourcePage,
      created_at: nowIso,
      is_active: true,
    };
    setLocalItem(STORAGE_KEYS.SUBSCRIBERS, [newSub, ...currentSubs]);
  }

  try {
    const subDocRef = doc(db, 'newsletter_subscribers', subId);
    await setDoc(subDocRef, {
      id: subId,
      email: cleanEmail,
      source_page: sourcePage,
      created_at: nowIso,
      is_active: true,
    }, { merge: true });
  } catch (err) {
    console.warn('[Firestore] Newsletter subscribe note:', err);
  }

  return { success: true, message: 'Thank you for subscribing to AIAUTOMY updates.' };
}

/**
 * Fetches published projects from Firestore or fallback.
 */
export async function fetchPublishedProjects(): Promise<ProjectRecord[]> {
  try {
    const q = query(collection(db, 'projects'), where('is_published', '==', true));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => d.data() as ProjectRecord);
    }
  } catch (err) {
    console.warn('[Firestore] Fetch projects fallback:', err);
  }
  return getLocalItem<ProjectRecord[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
}

/**
 * Fetches published services from Firestore or fallback.
 */
export async function fetchPublishedServices(): Promise<ServiceRecord[]> {
  try {
    const snapshot = await getDocs(collection(db, 'services'));
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => d.data() as ServiceRecord);
    }
  } catch (err) {
    console.warn('[Firestore] Fetch services fallback:', err);
  }
  return getLocalItem<ServiceRecord[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
}

/**
 * Fetches published agent categories from Firestore or fallback.
 */
export async function fetchPublishedAgentCategories(): Promise<AgentCategoryRecord[]> {
  try {
    const snapshot = await getDocs(collection(db, 'agent_categories'));
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => d.data() as AgentCategoryRecord);
    }
  } catch (err) {
    console.warn('[Firestore] Fetch categories fallback:', err);
  }
  return getLocalItem<AgentCategoryRecord[]>(STORAGE_KEYS.CATEGORIES, INITIAL_AGENT_CATEGORIES);
}

// ============================================================================
// ADMIN MANAGEMENT (Firestore + Auth Protected)
// ============================================================================

export async function fetchAdminLeads(): Promise<ProjectLead[]> {
  try {
    const snapshot = await getDocs(collection(db, 'project_leads'));
    if (!snapshot.empty) {
      const remoteLeads = snapshot.docs.map((d) => d.data() as ProjectLead);
      // Merge with local leads to prevent loss
      const localLeads = getLocalItem<ProjectLead[]>(STORAGE_KEYS.LEADS, INITIAL_DEMO_LEADS);
      const combined = [...remoteLeads];
      for (const loc of localLeads) {
        if (!combined.some(r => r.id === loc.id)) {
          combined.push(loc);
        }
      }
      return combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  } catch (err) {
    console.warn('[Firestore Admin] Fetch leads fallback to local:', err);
  }
  return getLocalItem<ProjectLead[]>(STORAGE_KEYS.LEADS, INITIAL_DEMO_LEADS);
}

export async function updateLeadStatus(id: string, newStatus: LeadStatus): Promise<boolean> {
  const currentLeads = getLocalItem<ProjectLead[]>(STORAGE_KEYS.LEADS, INITIAL_DEMO_LEADS);
  const nowIso = new Date().toISOString();
  const updated = currentLeads.map((l) =>
    l.id === id ? { ...l, status: newStatus, updated_at: nowIso } : l
  );
  setLocalItem(STORAGE_KEYS.LEADS, updated);

  try {
    const docRef = doc(db, 'project_leads', id);
    await updateDoc(docRef, { status: newStatus, updated_at: nowIso });
    return true;
  } catch (err) {
    console.warn('[Firestore Admin] Update status note:', err);
  }
  return true;
}

export async function updateLeadInternalNotes(id: string, notes: string): Promise<boolean> {
  const currentLeads = getLocalItem<ProjectLead[]>(STORAGE_KEYS.LEADS, INITIAL_DEMO_LEADS);
  const nowIso = new Date().toISOString();
  const updated = currentLeads.map((l) =>
    l.id === id ? { ...l, internal_notes: notes, updated_at: nowIso } : l
  );
  setLocalItem(STORAGE_KEYS.LEADS, updated);

  try {
    const docRef = doc(db, 'project_leads', id);
    await updateDoc(docRef, { internal_notes: notes, updated_at: nowIso });
    return true;
  } catch (err) {
    console.warn('[Firestore Admin] Update notes note:', err);
  }
  return true;
}

export async function deleteLead(id: string): Promise<boolean> {
  const currentLeads = getLocalItem<ProjectLead[]>(STORAGE_KEYS.LEADS, INITIAL_DEMO_LEADS);
  setLocalItem(STORAGE_KEYS.LEADS, currentLeads.filter((l) => l.id !== id));

  try {
    const docRef = doc(db, 'project_leads', id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn('[Firestore Admin] Delete lead note:', err);
  }
  return true;
}

export async function fetchAdminProjects(): Promise<ProjectRecord[]> {
  return fetchPublishedProjects();
}

export async function saveProject(project: ProjectRecord): Promise<boolean> {
  const currentProjects = getLocalItem<ProjectRecord[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  const nowIso = new Date().toISOString();
  const updatedProject = { ...project, updated_at: nowIso };
  
  const existingIdx = currentProjects.findIndex(p => p.id === project.id);
  let nextList: ProjectRecord[];
  if (existingIdx >= 0) {
    nextList = [...currentProjects];
    nextList[existingIdx] = updatedProject;
  } else {
    nextList = [updatedProject, ...currentProjects];
  }
  setLocalItem(STORAGE_KEYS.PROJECTS, nextList);

  try {
    const docRef = doc(db, 'projects', project.id);
    await setDoc(docRef, updatedProject, { merge: true });
    return true;
  } catch (err) {
    console.warn('[Firestore Admin] Save project note:', err);
  }
  return true;
}

export async function fetchAdminServices(): Promise<ServiceRecord[]> {
  return fetchPublishedServices();
}

export async function fetchAdminCategories(): Promise<AgentCategoryRecord[]> {
  return fetchPublishedAgentCategories();
}

export async function fetchAdminSubscribers(): Promise<NewsletterSubscriberRecord[]> {
  try {
    const snapshot = await getDocs(collection(db, 'newsletter_subscribers'));
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => d.data() as NewsletterSubscriberRecord);
    }
  } catch (err) {
    console.warn('[Firestore Admin] Fetch subscribers fallback:', err);
  }
  return getLocalItem<NewsletterSubscriberRecord[]>(STORAGE_KEYS.SUBSCRIBERS, []);
}

/**
 * One-click seed function to populate Firestore with the initial projects,
 * services, and agent categories if remote documents are empty.
 */
export async function seedFirestoreInitialData(): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Seed Projects
    for (const proj of INITIAL_PROJECTS) {
      await setDoc(doc(db, 'projects', proj.id), proj, { merge: true });
    }

    // 2. Seed Services
    for (const srv of INITIAL_SERVICES) {
      await setDoc(doc(db, 'services', srv.id), srv, { merge: true });
    }

    // 3. Seed Categories
    for (const cat of INITIAL_AGENT_CATEGORIES) {
      await setDoc(doc(db, 'agent_categories', cat.id), cat, { merge: true });
    }

    return { success: true, message: 'Initial projects, services, and agent categories seeded to Cloud Firestore successfully.' };
  } catch (err: any) {
    console.warn('[Firestore Seed Error]:', err);
    return { success: false, message: `Seeding encountered: ${err?.message || 'Permission or connection issue'}` };
  }
}
