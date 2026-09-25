/**
 * Quote request schema and validation, shared by the client form and the API
 * route so both sides enforce exactly the same rules.
 */

export const campaignSizeOptions = [
  { value: "1000", label: "1,000 Homes — $699" },
  { value: "500", label: "500 Homes — $449" },
  { value: "custom", label: "Custom Campaign" },
] as const;

export const artworkOptions = [
  { value: "no", label: "No — please design it for me" },
  { value: "logo", label: "I have a logo, but no door hanger design" },
  { value: "yes", label: "Yes — I have artwork ready" },
] as const;

export const timeframeOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "2-4-weeks", label: "In the next 2–4 weeks" },
  { value: "1-2-months", label: "In 1–2 months" },
  { value: "exploring", label: "Just exploring options" },
] as const;

export type QuoteData = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  website: string;
  campaignSize: string;
  targetArea: string;
  city: string;
  neighborhoods: string;
  offer: string;
  artwork: string;
  timeframe: string;
  message: string;
};

export type QuoteField = keyof QuoteData;
export type QuoteErrors = Partial<Record<QuoteField, string>>;

export const quoteFields: QuoteField[] = [
  "businessName",
  "contactName",
  "email",
  "phone",
  "businessType",
  "website",
  "campaignSize",
  "targetArea",
  "city",
  "neighborhoods",
  "offer",
  "artwork",
  "timeframe",
  "message",
];

export const maxLengths: Record<QuoteField, number> = {
  businessName: 120,
  contactName: 120,
  email: 254,
  phone: 40,
  businessType: 80,
  website: 200,
  campaignSize: 20,
  targetArea: 300,
  city: 120,
  neighborhoods: 500,
  offer: 500,
  artwork: 20,
  timeframe: 20,
  message: 3000,
};

/** Honeypot field name. Real visitors never see or fill it. */
export const HONEYPOT_FIELD = "companyFax";
/** Hidden field holding the time the form was rendered (ms since epoch). */
export const STARTED_AT_FIELD = "startedAt";
/** Submissions faster than this are treated as automated. */
export const MIN_FILL_MS = 3000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_LIKE_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;
const URL_IN_TEXT_RE = /https?:\/\/|www\./gi;

const allowed = <T extends readonly { value: string }[]>(opts: T) => opts.map((o) => o.value as string);

export function normalizeQuote(input: Record<string, unknown>): QuoteData {
  const out = {} as QuoteData;
  for (const field of quoteFields) {
    const raw = input[field];
    out[field] = typeof raw === "string" ? raw.trim().slice(0, maxLengths[field]) : "";
  }
  return out;
}

export function validateQuote(data: QuoteData): QuoteErrors {
  const errors: QuoteErrors = {};

  if (data.businessName.length < 2) errors.businessName = "Please enter your business name.";
  if (data.contactName.length < 2) errors.contactName = "Please enter your name.";

  if (!data.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";

  const digits = data.phone.replace(/\D/g, "");
  if (!data.phone) errors.phone = "Please enter a phone number.";
  else if (digits.length < 10 || digits.length > 15) errors.phone = "Please enter a valid phone number.";

  if (!data.businessType) errors.businessType = "Please choose your business type.";

  if (data.website && !URL_LIKE_RE.test(data.website))
    errors.website = "Please enter a valid website, like example.com.";

  if (!allowed(campaignSizeOptions).includes(data.campaignSize))
    errors.campaignSize = "Please choose a campaign size.";

  if (data.targetArea.length < 2) errors.targetArea = "Tell us the general area you'd like to reach.";
  if (data.city.length < 2) errors.city = "Please enter a city.";
  if (data.offer.length < 2) errors.offer = "Tell us the main service or offer to promote.";

  if (!allowed(artworkOptions).includes(data.artwork)) errors.artwork = "Please choose an option.";
  if (!allowed(timeframeOptions).includes(data.timeframe)) errors.timeframe = "Please choose a timeframe.";

  return errors;
}

/** Heuristic check for link-stuffed spam in free-text fields. */
export function looksLikeSpam(data: QuoteData): boolean {
  const text = [data.message, data.offer, data.neighborhoods, data.targetArea].join(" ");
  const links = text.match(URL_IN_TEXT_RE)?.length ?? 0;
  return links > 3;
}

export function labelFor<T extends readonly { value: string; label: string }[]>(opts: T, value: string) {
  return opts.find((o) => o.value === value)?.label ?? value;
}
