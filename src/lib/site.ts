/**
 * Central site configuration.
 *
 * Contact details and the service area are read from environment variables so
 * nothing unconfirmed is hardcoded into the site. When a value is not set, the
 * UI simply omits it (or falls back to neutral copy).
 */

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

const rawUrl = clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000";

export const site = {
  name: "Local Impact Doorstep",
  tagline: "Your business. On local doorsteps.",
  description:
    "Done-for-you neighborhood advertising for local home-service businesses. We design, print, and personally distribute door hanger campaigns to 500 or 1,000 homes in the areas you choose.",
  url: rawUrl.replace(/\/+$/, ""),
  /** Public contact email shown on the site (optional). */
  email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  /** Public phone number shown on the site (optional). */
  phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  /**
   * Plain-language description of the confirmed service area, e.g.
   * "Nashville, TN and surrounding communities". Leave unset until confirmed.
   */
  serviceArea: clean(process.env.NEXT_PUBLIC_SERVICE_AREA),
} as const;

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/industries", label: "Industries" },
  { href: "/examples", label: "Examples" },
  { href: "/about", label: "About" },
] as const;
