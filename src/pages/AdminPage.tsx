import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  Building2,
  Globe,
  Calendar,
  Filter,
  CheckCircle2,
  Clock,
  Archive,
  Trash2,
  ExternalLink,
  RefreshCw,
  Search,
  Database,
  Layers,
  Sparkles,
  Bot,
  AlertCircle,
  FileText,
  User,
  DollarSign,
  Tag
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { AgentControlCenter } from '../components/AgentControlCenter';
import {
  ProjectLead,
  LeadStatus,
  ServiceInterest,
  ProjectRecord,
  ServiceRecord,
  AgentCategoryRecord,
  NewsletterSubscriberRecord,
} from '../types';
import {
  isBackendConfigured,
  API_BASE_URL,
  fetchAdminLeads,
  updateLeadStatus,
  updateLeadInternalNotes,
  deleteLead,
  fetchAdminProjects,
  fetchAdminServices,
  fetchAdminCategories,
  fetchAdminSubscribers,
  seedFirestoreInitialData,
} from '../lib/api';
import { getSession, setSession, onSessionChange, AdminSession } from '../lib/session';

// Only these Google accounts may reach the admin dashboard. This mirrors the
// server-side allowlist in server/middleware/requireAdmin.js (the `admins`
// Postgres table) - this client-side check is a UX convenience only, never
// the actual security boundary. Every protected API call is independently
// re-checked server-side against that same table.
const ADMIN_EMAILS = ['aimbynaeema@gmail.com', 'aiagentstudioo@gmail.com'];

export const AdminPage: React.FC = () => {
  usePageMetadata({
    title: 'Admin Management & Lead CRM | AIAUTOMY',
    description: 'Internal administration portal for managing project inquiries, portfolio records, and platform telemetry.',
    noIndex: true,
  });

  const [currentSession, setCurrentSession] = useState<AdminSession | null>(getSession());
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Monitor the admin session (set after email/password sign-in verifies against the
  // backend's admin allowlist; cleared automatically on a 401 from any
  // admin-only request — see src/lib/api.ts's adminFetch).
  useEffect(() => {
    const unsubscribe = onSessionChange(setCurrentSession);
    return unsubscribe;
  }, []);

  // Authenticated AND on the admin allowlist. See ADMIN_EMAILS note above -
  // real enforcement is server-side; this only controls what the client renders.
  const isAuthenticated = Boolean(currentSession) && ADMIN_EMAILS.includes(currentSession?.email ?? '');

  // Tabs: 'leads' | 'projects' | 'services' | 'categories' | 'subscribers' | 'database'
  const [activeTab, setActiveTab] = useState<'leads' | 'projects' | 'services' | 'categories' | 'subscribers' | 'agent' | 'database'>('leads');

  // Leads state
  const [leads, setLeads] = useState<ProjectLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<ProjectLead | null>(null);
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [leadServiceFilter, setLeadServiceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNotes, setEditingNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Secondary tables state
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [categories, setCategories] = useState<AgentCategoryRecord[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriberRecord[]>([]);

  // Load data
  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [leadsData, projData, srvData, catData, subData] = await Promise.all([
        fetchAdminLeads(),
        fetchAdminProjects(),
        fetchAdminServices(),
        fetchAdminCategories(),
        fetchAdminSubscribers(),
      ]);
      setLeads(leadsData);
      setProjects(projData);
      setServices(srvData);
      setCategories(catData);
      setSubscribers(subData);
      if (leadsData.length > 0 && !selectedLead) {
        setSelectedLead(leadsData[0]);
        setEditingNotes(leadsData[0].internal_notes || '');
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setAuthError('Please enter your admin email and password.');
      return;
    }
    setIsAuthLoading(true);
    setAuthError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data?.error || 'Incorrect email or password.');
        return;
      }
      setSession({ token: data.token, email: data.email, name: data.name, picture: data.picture });
      setLoginPassword('');
    } catch (err: any) {
      setAuthError(err?.message || 'Sign-in failed. Please try again.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setSession(null);
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    await updateLeadStatus(leadId, newStatus);
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
    showToast(`Lead status updated to ${newStatus.toUpperCase()}`);
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    await updateLeadInternalNotes(selectedLead.id, editingNotes);
    setLeads((prev) =>
      prev.map((l) => (l.id === selectedLead.id ? { ...l, internal_notes: editingNotes } : l))
    );
    setSelectedLead({ ...selectedLead, internal_notes: editingNotes });
    showToast('Internal notes saved securely.');
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this lead?')) return;
    await deleteLead(leadId);
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(null);
    }
    showToast('Lead record removed.');
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
    const matchesService = leadServiceFilter === 'all' || l.service_interest === leadServiceFilter;
    const matchesSearch =
      !searchQuery ||
      l.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.company_name && l.company_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      l.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesService && matchesSearch;
  });

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">NEW</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">CONTACTED</span>;
      case 'qualified':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">QUALIFIED</span>;
      case 'proposal_sent':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">PROPOSAL SENT</span>;
      case 'closed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">CLOSED WON</span>;
      case 'archived':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-700 text-slate-400 border border-slate-600">ARCHIVED</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-300">{status}</span>;
    }
  };

  const formatServiceLabel = (service: ServiceInterest | string) => {
    switch (service) {
      case 'custom_ai_agent':
        return 'Custom AI Agent';
      case 'web_development':
        return 'Web Development';
      case 'ecommerce_solution':
        return 'Ecommerce Solution';
      case 'ai_automation':
        return 'AI Business Automation';
      case 'custom_digital_solution':
        return 'Custom Digital Solution';
      default:
        return service;
    }
  };

  // ----------------------------------------------------------------------------
  // AUTH GATE SCREEN
  // ----------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="pt-24 pb-20 bg-slate-950 text-white min-h-[90vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-lg mx-auto font-mono shadow-lg shadow-orange-500/20">
            AI
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-white">AIAUTOMY</h1>
            <p className="text-xs text-slate-400">Restricted Administration & CRM Portal</p>
          </div>

          <div className="space-y-4 text-left">
            <p className="text-xs text-slate-400 text-center">
              Sign in with your administrator email and password.
            </p>

            <form onSubmit={handleEmailSignIn} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Admin Email</label>
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Password</label>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-xs text-white transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2.5"
              >
                {isAuthLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {authError && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}

            <p className="text-[10px] text-slate-600 text-center">
              Access is limited to pre-authorized administrator accounts only.
            </p>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-center gap-1.5 border-t border-slate-800/80">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>Protected by PostgreSQL</span>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------------
  // MAIN ADMIN DASHBOARD
  // ----------------------------------------------------------------------------
  return (
    <div className="pt-24 pb-20 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <Breadcrumbs items={[{ label: 'Admin Portal & Inquiries' }]} />
            <div className="flex items-center gap-3 pt-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                AIAUTOMY <span className="text-orange-500">Control Center</span>
              </h1>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300">
                <span className={`w-2 h-2 rounded-full ${isBackendConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span>{isBackendConfigured ? 'Backend Connected' : 'Local Fallback Mode'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-500/40 text-xs text-slate-300 hover:text-rose-300 cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 border-b border-slate-800/80">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Project Leads</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-950/60 text-[10px] font-mono">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Projects & Portfolio</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-950/60 text-[10px] font-mono">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'services'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Services ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Agent Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'subscribers'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Subscribers ({subscribers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('agent')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'agent'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Agent</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'database'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Database & Schema</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: PROJECT LEADS CRM */}
        {/* ========================================================================= */}
        {activeTab === 'leads' && (
          <div className="pt-6 space-y-6">
            {/* Filters Bar */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search name, email, company, or message..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-slate-500" />
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="closed">Closed Won</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <select
                    value={leadServiceFilter}
                    onChange={(e) => setLeadServiceFilter(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  >
                    <option value="all">All Service Types</option>
                    <option value="custom_ai_agent">Custom AI Agents</option>
                    <option value="web_development">Web Development</option>
                    <option value="ecommerce_solution">Ecommerce Solutions</option>
                    <option value="ai_automation">AI Automation</option>
                    <option value="custom_digital_solution">Custom Solutions</option>
                  </select>
                </div>
              </div>

              <div className="text-slate-400 font-mono text-[11px]">
                Showing {filteredLeads.length} of {leads.length} Inquiries
              </div>
            </div>

            {/* Split View: Master List + Detail Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Leads List */}
              <div className="lg:col-span-5 space-y-3">
                {filteredLeads.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
                    <Mail className="w-8 h-8 text-slate-600 mx-auto" />
                    <div className="text-sm font-bold text-white">No Inquiries Found</div>
                    <p className="text-xs text-slate-400">
                      Inquiries submitted via the Contact or Evaluation forms will populate here.
                    </p>
                  </div>
                ) : (
                  filteredLeads.map((lead) => {
                    const isSelected = selectedLead?.id === lead.id;
                    return (
                      <div
                        key={lead.id}
                        onClick={() => {
                          setSelectedLead(lead);
                          setEditingNotes(lead.internal_notes || '');
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'bg-slate-900 border-orange-500 shadow-md shadow-orange-500/10'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-1.5">
                          <span className="font-bold text-sm text-white">{lead.full_name}</span>
                          {getStatusBadge(lead.status)}
                        </div>

                        <div className="text-xs text-slate-400 flex items-center gap-2 pb-2">
                          <span>{lead.email}</span>
                          {lead.company_name && (
                            <>
                              <span>•</span>
                              <span className="text-slate-300 font-medium">{lead.company_name}</span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80 text-slate-400 font-mono">
                          <span className="text-orange-400 font-semibold">
                            {formatServiceLabel(lead.service_interest)}
                          </span>
                          <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Right Column: Selected Lead Deep Inspection */}
              <div className="lg:col-span-7">
                {selectedLead ? (
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 text-left">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-lg font-bold text-white">{selectedLead.full_name}</h2>
                          {getStatusBadge(selectedLead.status)}
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          Received {new Date(selectedLead.created_at).toLocaleString()} (Source: {selectedLead.source_page})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={selectedLead.status}
                          onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                          className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-orange-400 focus:outline-none"
                        >
                          <option value="new">Mark: NEW</option>
                          <option value="contacted">Mark: CONTACTED</option>
                          <option value="qualified">Mark: QUALIFIED</option>
                          <option value="proposal_sent">Mark: PROPOSAL SENT</option>
                          <option value="closed">Mark: CLOSED WON</option>
                          <option value="archived">Mark: ARCHIVED</option>
                        </select>

                        <button
                          onClick={() => handleDeleteLead(selectedLead.id)}
                          className="p-2 rounded-lg bg-slate-950 hover:bg-rose-950/50 text-slate-400 hover:text-rose-300 border border-slate-800 cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-slate-500 font-mono text-[10px] block">EMAIL</span>
                        <a href={`mailto:${selectedLead.email}`} className="font-semibold text-white hover:text-orange-400 truncate block">
                          {selectedLead.email}
                        </a>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-slate-500 font-mono text-[10px] block">PHONE</span>
                        <span className="text-slate-300 font-mono">{selectedLead.phone || 'N/A'}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-slate-500 font-mono text-[10px] block">COMPANY</span>
                        <span className="text-slate-200 font-semibold">{selectedLead.company_name || 'N/A'}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-slate-500 font-mono text-[10px] block">SERVICE INTEREST</span>
                        <span className="text-orange-400 font-bold">{formatServiceLabel(selectedLead.service_interest)}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-slate-500 font-mono text-[10px] block">BUDGET</span>
                        <span className="text-emerald-400 font-mono font-bold">{selectedLead.project_budget || 'N/A'}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-slate-500 font-mono text-[10px] block">TIMELINE</span>
                        <span className="text-slate-300">{selectedLead.project_timeline || 'Immediate'}</span>
                      </div>
                    </div>

                    {/* Web Link if present */}
                    {selectedLead.website_url && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                        <Globe className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-400">Website:</span>
                        <a
                          href={selectedLead.website_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-orange-400 hover:underline flex items-center gap-1 font-mono truncate"
                        >
                          <span>{selectedLead.website_url}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    {/* Inquiry Message */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                        Project Scope & Message
                      </label>
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {selectedLead.message}
                      </div>
                    </div>

                    {/* Internal Notes & Follow-Up Tracker */}
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                          Internal Staff Notes (Secure)
                        </label>
                        <span className="text-[10px] text-slate-500">Only visible to administrators</span>
                      </div>
                      <textarea
                        rows={3}
                        placeholder="Add discovery call notes, technical evaluation summary, pricing proposals..."
                        value={editingNotes}
                        onChange={(e) => setEditingNotes(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                      />
                      <button
                        onClick={handleSaveNotes}
                        className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs cursor-pointer shadow-sm"
                      >
                        Save Internal Notes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
                    <User className="w-8 h-8 text-slate-600 mx-auto" />
                    <div className="text-sm font-bold text-white">Select an Inquiry</div>
                    <p className="text-xs text-slate-400">Click any lead on the left to inspect full requirements.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PROJECTS & PORTFOLIO */}
        {/* ========================================================================= */}
        {activeTab === 'projects' && (
          <div className="pt-6 space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Portfolio & Public Projects</h2>
                <p className="text-xs text-slate-400">
                  Manage active case studies and development status. Only real projects are published.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">{proj.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                          {proj.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono block pt-0.5">{proj.category}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{proj.short_description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {(proj.technologies || []).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Slug: <code className="text-orange-400 font-mono">{proj.slug}</code></span>
                    <span className="text-emerald-400 font-semibold">Published</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SERVICES */}
        {/* ========================================================================= */}
        {activeTab === 'services' && (
          <div className="pt-6 space-y-6 text-left">
            <div>
              <h2 className="text-lg font-bold text-white">Agency Services Catalog</h2>
              <p className="text-xs text-slate-400">5 primary service offerings delivered by AIAUTOMY.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((srv) => (
                <div key={srv.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{srv.title}</span>
                    <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-mono font-bold">
                      #{srv.sort_order}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{srv.short_description}</p>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex justify-between items-center">
                    <span>Slug: <code className="text-slate-300 font-mono">{srv.slug}</code></span>
                    <span className="text-emerald-400 font-semibold">Available for custom projects</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: AGENT CATEGORIES */}
        {/* ========================================================================= */}
        {activeTab === 'categories' && (
          <div className="pt-6 space-y-6 text-left">
            <div>
              <h2 className="text-lg font-bold text-white">Industry AI-Agent Verticals</h2>
              <p className="text-xs text-slate-400">Supported industry categories for custom agent deployments.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{cat.name}</span>
                    <span className="text-[10px] font-mono text-orange-400">#{cat.sort_order}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{cat.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SUBSCRIBERS */}
        {/* ========================================================================= */}
        {activeTab === 'subscribers' && (
          <div className="pt-6 space-y-6 text-left">
            <div>
              <h2 className="text-lg font-bold text-white">Briefing & Newsletter Subscribers</h2>
              <p className="text-xs text-slate-400">Verified email subscribers captured from website footers and resources.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              {subscribers.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">No subscribers captured yet.</div>
              ) : (
                <div className="divide-y divide-slate-800 text-xs">
                  {subscribers.map((sub) => (
                    <div key={sub.id} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-orange-400" />
                        <span className="font-mono text-white">{sub.email}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        <span>Joined {new Date(sub.created_at).toLocaleDateString()}</span>
                        <span className="ml-2 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: AI AGENT CONTROL CENTER */}
        {/* ========================================================================= */}
        {activeTab === 'agent' && (
          <AgentControlCenter leads={leads} services={services} showToast={showToast} />
        )}

        {/* ========================================================================= */}
        {/* TAB 6: DATABASE & SETUP GUIDE */}
        {/* ========================================================================= */}
        {activeTab === 'database' && (
          <div className="pt-6 space-y-6 text-left">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <Database className="w-6 h-6 text-orange-500" />
                <div>
                  <h3 className="text-base font-bold text-white">PostgreSQL & Express Architecture</h3>
                  <p className="text-xs text-slate-400">Production relational database schema on Railway, with authorization enforced in the Express API layer and admin email/password sign-in.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">1. PostgreSQL Tables</span>
                  <span className="text-slate-400 block text-[11px]">
                    <code className="text-orange-400">project_leads</code>, <code className="text-orange-400">projects</code>, <code className="text-orange-400">services</code>, <code className="text-orange-400">agent_categories</code>, <code className="text-orange-400">newsletter_subscribers</code>, <code className="text-orange-400">admins</code>.
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">2. Authorization (server/middleware)</span>
                  <span className="text-slate-400 block text-[11px]">
                    Strict validation on public lead submissions. Admin-only read, update, and delete access via session-JWT + allowlist.
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">3. Future Extensions</span>
                  <span className="text-slate-400 block text-[11px]">
                    Multi-tenant <code className="text-emerald-400">businesses</code>, <code className="text-emerald-400">connected_integrations</code>, <code className="text-emerald-400">approval_requests</code>, <code className="text-emerald-400">agent_runs</code>.
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300 font-bold">
                  <span>Backend Config</span>
                  <span className="text-[11px] text-orange-400">server/.env</span>
                </div>
                <pre className="text-[11px] font-mono text-slate-400 p-3 rounded-lg bg-slate-900 overflow-x-auto border border-slate-800">
{`// Backend configuration active:
- API base URL: ${API_BASE_URL || '(same-origin — VITE_API_BASE_URL not set)'}
- Database: PostgreSQL (Railway)
- Auth: admin email + password + session JWT
- Schema: server/db/schema.sql (Active & Deployed)`}
                </pre>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <span className="text-xs text-slate-400">
                    Ensure standard projects & service catalog are seeded to PostgreSQL:
                  </span>
                  <button
                    onClick={async () => {
                      const res = await seedFirestoreInitialData();
                      showToast(res.message);
                    }}
                    className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs cursor-pointer transition-colors shadow-md shadow-orange-500/20"
                  >
                    Sync / Seed to PostgreSQL
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-orange-500/50 text-white rounded-xl shadow-2xl p-4 flex items-center gap-3 text-xs animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
};
