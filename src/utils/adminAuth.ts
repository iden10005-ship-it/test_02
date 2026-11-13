export const ADMIN_SESSION_KEY = 'clearworks_admin_session_v1';
export const DEFAULT_ADMIN_PIN = '1234';

/**
 * Detects whether the app is currently running inside the Google AI Studio
 * builder/dev preview or localhost development environment.
 * External deployments (e.g. Vercel, GitHub Pages, custom domains) return false
 * so visitors never see the web builder UI by default.
 */
export function isGoogleStudioEnv(): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;

  // Local development
  if (host === 'localhost' || host === '127.0.0.1') {
    return true;
  }

  // Google AI Studio development preview domain
  if (host.startsWith('ais-dev-') || host.includes('aistudio.google.com')) {
    return true;
  }

  // Embedded inside an iframe (e.g. Google AI Studio preview pane)
  try {
    if (window.self !== window.top) {
      return true;
    }
  } catch {
    return true;
  }

  return false;
}

/**
 * Checks if the URL explicitly requests opening Admin Mode (e.g. /#/admin or ?admin=1).
 */
export function hasAdminUrlTrigger(): boolean {
  if (typeof window === 'undefined') return false;
  const hash = (window.location.hash || '').toLowerCase();
  if (hash === '#/admin' || hash === '#admin' || hash.startsWith('#/admin/')) {
    return true;
  }
  const params = new URLSearchParams(window.location.search);
  const adminParam = params.get('admin');
  return adminParam === '1' || adminParam === 'true';
}

/**
 * Determines the initial admin mode state.
 * - Inside Google AI Studio: enabled by default unless explicitly exited in this session.
 * - External live site (Vercel, GitHub Pages, etc.): disabled by default unless logged in via sessionStorage.
 */
export function getInitialAdminState(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = window.sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (stored === 'true') return true;
    if (stored === 'false') return false;
  } catch {
    // Ignore storage access errors
  }
  return isGoogleStudioEnv();
}

export function setAdminSession(active: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, active ? 'true' : 'false');
  } catch {
    // Ignore storage access errors
  }
}
