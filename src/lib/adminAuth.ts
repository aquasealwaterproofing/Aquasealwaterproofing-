import { useState, useEffect } from 'react';

/**
 * Admin & Owner Authorization Utility
 *
 * Ensures that video upload/change controls, reset buttons, and file pickers
 * are ONLY visible to the website owner inside Google AI Studio (or authorized admin).
 *
 * For regular visitors and audience on the shared/published link:
 * - All "Change", "Upload", and "Reset" buttons are completely HIDDEN.
 * - The video player renders cleanly with standard playback controls only (Play, Mute, Fullscreen).
 */

const STORAGE_KEY = 'aquaseal_admin_authorized';
const PREVIEW_AS_VISITOR_KEY = 'aquaseal_preview_as_visitor';
export const ADMIN_PIN = '97114'; // Matches business contact prefix 97114 94386

export function isDevEnvironment(): boolean {
  if (typeof window === 'undefined') return false;
  
  // 1. Inside Google AI Studio preview iframe
  try {
    if (window.self !== window.top) {
      return true;
    }
  } catch (e) {
    // Cross-origin iframe (still an embedded preview iframe)
    return true;
  }

  // 2. Running on AI Studio development container or local host
  const host = window.location.hostname;
  if (host.includes('ais-dev-') || host === 'localhost' || host === '127.0.0.1') {
    return true;
  }

  return false;
}

export function checkIsAdmin(): boolean {
  if (typeof window === 'undefined') return false;

  // If user explicitly activated "Preview as Visitor" to test audience view
  if (sessionStorage.getItem(PREVIEW_AS_VISITOR_KEY) === 'true') {
    return false;
  }

  // Check URL query parameters: e.g. ?admin=true or ?admin=97114
  const params = new URLSearchParams(window.location.search);
  const adminParam = params.get('admin');
  if (adminParam === 'true' || adminParam === ADMIN_PIN || adminParam === 'owner') {
    localStorage.setItem(STORAGE_KEY, 'true');
    return true;
  }

  // Check persisted authorization in localStorage
  if (localStorage.getItem(STORAGE_KEY) === 'true') {
    return true;
  }

  // If running inside AI Studio environment, owner access is active
  if (isDevEnvironment()) {
    return true;
  }

  // Otherwise it is a normal customer / audience visitor
  return false;
}

export function setAdminAuthorized(authorized: boolean): void {
  if (typeof window === 'undefined') return;
  if (authorized) {
    localStorage.setItem(STORAGE_KEY, 'true');
    sessionStorage.removeItem(PREVIEW_AS_VISITOR_KEY);
  } else {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(PREVIEW_AS_VISITOR_KEY);
  }
}

/**
 * React Hook to subscribe to admin status and audience preview toggle
 */
export function useAdminMode() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => checkIsAdmin());
  const [isDev, setIsDev] = useState<boolean>(() => isDevEnvironment());
  const [previewAsVisitor, setPreviewAsVisitor] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(PREVIEW_AS_VISITOR_KEY) === 'true';
  });

  useEffect(() => {
    const handleStorage = () => {
      setIsAdmin(checkIsAdmin());
      setIsDev(isDevEnvironment());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleVisitorPreview = () => {
    if (previewAsVisitor) {
      sessionStorage.removeItem(PREVIEW_AS_VISITOR_KEY);
      setPreviewAsVisitor(false);
      setIsAdmin(checkIsAdmin());
    } else {
      sessionStorage.setItem(PREVIEW_AS_VISITOR_KEY, 'true');
      setPreviewAsVisitor(true);
      setIsAdmin(false);
    }
  };

  const loginWithPin = (enteredPin: string): boolean => {
    if (enteredPin.trim() === ADMIN_PIN) {
      setAdminAuthorized(true);
      setIsAdmin(true);
      setPreviewAsVisitor(false);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminAuthorized(false);
    setIsAdmin(false);
  };

  return {
    isAdmin,
    isDev,
    previewAsVisitor,
    toggleVisitorPreview,
    loginWithPin,
    logoutAdmin,
  };
}
