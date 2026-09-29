import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { subscribeNewsletter } from '../lib/api';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribing(true);
    setSubscribeStatus(null);

    try {
      const res = await subscribeNewsletter(newsletterEmail, 'footer');
      setSubscribeStatus({ success: res.success, message: res.message });
      if (res.success) {
        setNewsletterEmail('');
      }
    } catch (err) {
      setSubscribeStatus({ success: false, message: 'Subscription failed. Please try again.' });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand Overview & Newsletter */}
          <div className="col-span-2 space-y-4 text-left">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-base font-mono group-hover:bg-orange-600 transition-colors">
                AI
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                AI<span className="text-orange-500 text-xs uppercase px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/30">AUTOMY</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              We build custom AI agents, professional websites, ecommerce systems, automation workflows, and digital tools designed around the needs of each business.
            </p>
            <div className="flex flex-col gap-1 text-[11px] text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Custom Engineering Studio</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 pt-0.5">
                <span>Inquiries:</span>
                <a href="mailto:aiagentstudioo@gmail.com" className="text-orange-400 hover:underline font-mono">
                  aiagentstudioo@gmail.com
                </a>
              </div>
            </div>

            {/* Newsletter Subscription Box */}
            <div className="pt-2 max-w-sm">
              <span className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                Receive updates on AI agents & digital technology:
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter business email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shrink-0 cursor-pointer disabled:opacity-50 transition-all"
                >
                  {isSubscribing ? '...' : 'Subscribe'}
                </button>
              </form>
              {subscribeStatus && (
                <div className={`mt-1.5 text-[11px] flex items-center gap-1 ${subscribeStatus.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {subscribeStatus.success ? <CheckCircle2 className="w-3 h-3 shrink-0" /> : <AlertCircle className="w-3 h-3 shrink-0" />}
                  <span>{subscribeStatus.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Col 3: Services & Offerings */}
          <div className="space-y-3 text-left">
            <div className="text-white font-bold font-mono uppercase tracking-wider text-xs">What We Build</div>
            <ul className="space-y-2">
              <li><Link to="/ai-agents" className="hover:text-white transition-colors">Custom AI Agents</Link></li>
              <li><Link to="/web-development" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Ecommerce Solutions</Link></li>
              <li><Link to="/ai-agents" className="hover:text-white transition-colors">AI Business Automation</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Custom Digital Solutions</Link></li>
            </ul>
          </div>

          {/* Col 4: Solutions by Goal */}
          <div className="space-y-3 text-left">
            <div className="text-white font-bold font-mono uppercase tracking-wider text-xs">Solutions</div>
            <ul className="space-y-2">
              <li><Link to="/solutions?goal=leads" className="hover:text-white transition-colors">Get More Leads</Link></li>
              <li><Link to="/solutions?goal=support" className="hover:text-white transition-colors">Improve Support</Link></li>
              <li><Link to="/solutions?goal=website" className="hover:text-white transition-colors">Launch Website</Link></li>
              <li><Link to="/solutions?goal=automate" className="hover:text-white transition-colors">Automate Work</Link></li>
              <li><Link to="/solutions?goal=ecommerce" className="hover:text-white transition-colors">Ecommerce Operations</Link></li>
              <li><Link to="/solutions?goal=system" className="hover:text-white transition-colors">Custom Business System</Link></li>
            </ul>
          </div>

          {/* Col 5: Methodology & Trust */}
          <div className="space-y-3 text-left">
            <div className="text-white font-bold font-mono uppercase tracking-wider text-xs">Methodology</div>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">Six-Step Process</Link></li>
              <li><Link to="/how-it-works#human-approval" className="hover:text-white transition-colors">Human Approval Controls</Link></li>
              <li><Link to="/how-it-works#security" className="hover:text-white transition-colors">Security & Data Privacy</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Custom Project Scoping</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Selected Projects</Link></li>
            </ul>
          </div>

          {/* Col 6: Project Intake & Studio */}
          <div className="space-y-3 text-left">
            <div className="text-white font-bold font-mono uppercase tracking-wider text-xs">Studio</div>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">Start Your Project</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing & Scope</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/admin" className="text-slate-400 hover:text-slate-300 transition-colors flex items-center gap-1">Admin Portal <span className="text-[10px] font-mono px-1 rounded bg-slate-800">CRM</span></Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2026 AIAUTOMY. All rights reserved. Built for modern businesses.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>TLS / SSL Secured</span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>PostgreSQL Database</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

