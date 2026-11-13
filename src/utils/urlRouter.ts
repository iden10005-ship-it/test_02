import { PageView } from '../types/siteData';

/**
 * Converts a PageView into a URL hash string.
 * Uses decode/encode safely for Korean characters so they are legible in address bars.
 */
export function getHashFromPage(page: PageView): string {
  switch (page.type) {
    case 'home':
      return '';
    case 'region':
      return `#/region/${encodeURIComponent(page.regionName)}`;
    case 'service':
      return `#/service/${encodeURIComponent(page.serviceId)}`;
    case 'matrix':
      return `#/region/${encodeURIComponent(page.regionName)}/${encodeURIComponent(page.serviceId)}`;
    case 'gallery_list':
      return `#/gallery`;
    case 'gallery_detail':
      return `#/gallery/${encodeURIComponent(page.postId)}`;
    default:
      return '';
  }
}

/**
 * Parses the current URL hash into a PageView object.
 */
export function getPageFromHash(): PageView {
  if (typeof window === 'undefined') return { type: 'home' };
  const rawHash = window.location.hash || '';
  const clean = rawHash.replace(/^#\/?/, '').trim();
  if (!clean) return { type: 'home' };

  const parts = clean.split('/').map((segment) => {
    try {
      return decodeURIComponent(segment);
    } catch {
      return segment;
    }
  });

  if (parts[0] === 'region' && parts[1]) {
    if (parts[2]) {
      return { type: 'matrix', regionName: parts[1], serviceId: parts[2] };
    }
    return { type: 'region', regionName: parts[1] };
  }

  if (parts[0] === 'service' && parts[1]) {
    return { type: 'service', serviceId: parts[1] };
  }

  if (parts[0] === 'gallery') {
    if (parts[1]) {
      return { type: 'gallery_detail', postId: parts[1] };
    }
    return { type: 'gallery_list' };
  }

  return { type: 'home' };
}

/**
 * Constructs the absolute URL for a given region.
 */
export function getRegionUrl(regionName: string, fullDomain = true): string {
  const relativeHash = `#/region/${encodeURIComponent(regionName)}`;
  if (!fullDomain || typeof window === 'undefined') {
    return `/${relativeHash}`;
  }
  const origin = window.location.origin;
  const pathname = window.location.pathname.endsWith('/') ? window.location.pathname : `${window.location.pathname}/`;
  return `${origin}${pathname}${relativeHash}`;
}

/**
 * Constructs the absolute URL for a given service.
 */
export function getServiceUrl(serviceId: string, fullDomain = true): string {
  const relativeHash = `#/service/${encodeURIComponent(serviceId)}`;
  if (!fullDomain || typeof window === 'undefined') {
    return `/${relativeHash}`;
  }
  const origin = window.location.origin;
  const pathname = window.location.pathname.endsWith('/') ? window.location.pathname : `${window.location.pathname}/`;
  return `${origin}${pathname}${relativeHash}`;
}

/**
 * Returns a unique canonical key for any PageView to store page-specific SEO configurations.
 */
export function getPageKey(page: PageView): string {
  switch (page.type) {
    case 'home':
      return 'home';
    case 'region':
      return `region:${page.regionName}`;
    case 'service':
      return `service:${page.serviceId}`;
    case 'matrix':
      return `matrix:${page.regionName}:${page.serviceId}`;
    case 'gallery_list':
      return 'gallery_list';
    case 'gallery_detail':
      return `gallery_detail:${page.postId}`;
    default:
      return 'home';
  }
}

