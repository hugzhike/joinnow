/**
 * Minimal analytics abstraction.
 *
 * Every call pushes a `joinnow_<event>` entry to `window.dataLayer` (Google
 * Tag Manager / GA4 convention) and forwards to `window.plausible` if
 * present, so plugging in a real analytics tool later is a matter of
 * loading its script — no code here needs to change. See ANALYTICS.md.
 */
export type AnalyticsEvent =
  | "page_view"
  | "cta_primary_click"
  | "cta_secondary_click"
  | "waitlist_form_start"
  | "waitlist_form_submit"
  | "activity_selected"
  | "ambassador_cta_click"
  | "referral_share"
  | "demo_interaction";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    plausible?: (event: string, options?: { props?: AnalyticsPayload }) => void;
  }
}

export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    console.debug(`[analytics] ${event}`, payload);
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: `joinnow_${event}`, ...payload });

  window.plausible?.(event, { props: payload });
}
