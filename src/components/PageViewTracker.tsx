import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL, isBackendConfigured } from '../lib/api';

/**
 * Invisible, cookieless page-view counter. Renders nothing.
 * On every route change it tells our own backend (POST /api/visits) which
 * page was opened and which site the visitor came from — nothing else.
 * Admin and login pages are not counted.
 */
export function PageViewTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isBackendConfigured || pathname.startsWith('/admin') || pathname.startsWith('/login')) return;
    try {
      fetch(`${API_BASE_URL}/api/visits`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ path: pathname, referrer: document.referrer || '' }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* counting must never break the page */
    }
  }, [pathname]);

  return null;
}
