/**
 * UTM Capture + Attribution + Lead Timeline Tracking
 *
 * - Captures UTM params from URL on first visit
 * - Persists in localStorage for 30 days
 * - Captures document.referrer
 * - Maintains a lead timeline (page visits, quiz events)
 */

const UTM_STORAGE_KEY = "fc_utm";
const REFERRER_STORAGE_KEY = "fc_referrer";
const TIMELINE_STORAGE_KEY = "fc_timeline";
const UTM_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface TimelineEvent {
  event: string;
  path: string;
  timestamp: number;
}

/* ─── UTM Capture ─── */

export function captureUTM(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const utm: UTMData = {};
  let hasUTM = false;

  (["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const).forEach((key) => {
    const val = params.get(key);
    if (val) {
      utm[key] = val;
      hasUTM = true;
    }
  });

  if (hasUTM) {
    const stored = {
      data: utm,
      expires: Date.now() + UTM_TTL_MS,
    };
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(stored));
  }
}

export function getStoredUTM(): UTMData {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed.expires && Date.now() > parsed.expires) {
      localStorage.removeItem(UTM_STORAGE_KEY);
      return {};
    }
    return parsed.data || {};
  } catch {
    return {};
  }
}

/* ─── Referrer Capture ─── */

export function captureReferrer(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(REFERRER_STORAGE_KEY)) return; // only capture first referrer

  const ref = document.referrer;
  if (ref && !ref.includes(window.location.hostname)) {
    localStorage.setItem(REFERRER_STORAGE_KEY, ref);
  }
}

export function getStoredReferrer(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem(REFERRER_STORAGE_KEY) || undefined;
}

/* ─── Lead Timeline ─── */

export function addTimelineEvent(event: string, path?: string): void {
  if (typeof window === "undefined") return;

  try {
    const raw = localStorage.getItem(TIMELINE_STORAGE_KEY);
    const timeline: TimelineEvent[] = raw ? JSON.parse(raw) : [];

    timeline.push({
      event,
      path: path || window.location.pathname,
      timestamp: Date.now(),
    });

    // Keep last 50 events to avoid bloat
    const trimmed = timeline.slice(-50);
    localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Silently fail
  }
}

export function getTimeline(): TimelineEvent[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(TIMELINE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearTimeline(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TIMELINE_STORAGE_KEY);
}

/* ─── Aggregate tracking data for submission ─── */

export interface TrackingData {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  leadTimeline?: string;
}

export function getTrackingData(): TrackingData {
  const utm = getStoredUTM();
  const referrer = getStoredReferrer();
  const timeline = getTimeline();

  return {
    utmSource: utm.utm_source,
    utmMedium: utm.utm_medium,
    utmCampaign: utm.utm_campaign,
    utmTerm: utm.utm_term,
    utmContent: utm.utm_content,
    referrer,
    leadTimeline: timeline.length > 0 ? JSON.stringify(timeline) : undefined,
  };
}

/* ─── Initialise tracking on app load ─── */

export function initTracking(): void {
  captureUTM();
  captureReferrer();
  addTimelineEvent("page_view");
}
