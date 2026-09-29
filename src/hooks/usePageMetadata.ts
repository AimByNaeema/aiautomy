import { useEffect } from 'react';

interface PageMetadataOptions {
  title: string;
  description: string;
  /** Set true for pages that should NOT be indexed by search engines (e.g. /admin, /login). */
  noIndex?: boolean;
}

const SITE_URL = 'https://www.aiautomy.com';

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function usePageMetadata({ title, description, noIndex }: PageMetadataOptions) {
  useEffect(() => {
    // Update document title
    const fullTitle = title.includes('AIAUTOMY')
      ? title
      : `${title} | AIAUTOMY`;
    document.title = fullTitle;

    // Meta description
    setMetaByName('description', description);

    // Canonical URL (helps avoid duplicate-content issues in search results)
    const canonicalUrl = `${SITE_URL}${window.location.pathname}`;
    setCanonical(canonicalUrl);

    // Open Graph + Twitter tags (kept in sync with the current page so links
    // shared from any page show the right title/description, not just Home)
    setMetaByProperty('og:title', fullTitle);
    setMetaByProperty('og:description', description);
    setMetaByProperty('og:url', canonicalUrl);
    setMetaByProperty('og:type', 'website');
    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:title', fullTitle);
    setMetaByName('twitter:description', description);

    // Robots directive — keep internal/utility pages (admin, login) out of
    // search results while every public marketing page stays indexable.
    setMetaByName('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Scroll to top of window on page mount
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [title, description, noIndex]);
}
