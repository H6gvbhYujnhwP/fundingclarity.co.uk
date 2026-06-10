/**
 * Meta Pixel Helper — typed wrapper for fbq() calls.
 *
 * The base pixel code is loaded in index.html and fires PageView on every page load.
 * This module provides typed helpers for conversion events fired on specific user actions.
 *
 * Standard Events used:
 *   - ViewContent: User views a key funnel page (quiz, guide, booking)
 *   - Lead: User submits a lead form (quiz completion, guide download, contact form)
 *   - Schedule: User books a clarity call
 *   - CompleteRegistration: User completes the quiz with a result
 */

// Extend window to include fbq
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function fbq(...args: unknown[]): void {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq(...args);
  }
}

/* ─── Standard Events ─── */

/**
 * Fire when a user views a key funnel page.
 * Call on mount of Quiz, Guide, and Booking pages.
 */
export function trackViewContent(params: {
  content_name: string;
  content_category?: string;
}): void {
  fbq("track", "ViewContent", params);
}

/**
 * Fire when a user submits a lead form (quiz result, guide download, contact form).
 */
export function trackLead(params?: {
  content_name?: string;
  value?: number;
  currency?: string;
}): void {
  fbq("track", "Lead", {
    content_name: params?.content_name || "Lead Capture",
    value: params?.value || 0,
    currency: params?.currency || "GBP",
  });
}

/**
 * Fire when a user books a clarity call.
 */
export function trackSchedule(params?: {
  content_name?: string;
}): void {
  fbq("track", "Schedule", {
    content_name: params?.content_name || "Clarity Call Booking",
  });
}

/**
 * Fire when a user completes the quiz and receives their result.
 */
export function trackCompleteRegistration(params?: {
  content_name?: string;
  value?: number;
  currency?: string;
}): void {
  fbq("track", "CompleteRegistration", {
    content_name: params?.content_name || "Quiz Completion",
    value: params?.value || 0,
    currency: params?.currency || "GBP",
  });
}

/**
 * Fire a custom event for more granular tracking.
 */
export function trackCustomEvent(eventName: string, params?: Record<string, unknown>): void {
  fbq("trackCustom", eventName, params);
}
