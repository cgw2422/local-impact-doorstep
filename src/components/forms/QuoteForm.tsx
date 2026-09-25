"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ArrowRight, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { businessTypeOptions } from "@/lib/industries";
import {
  HONEYPOT_FIELD,
  STARTED_AT_FIELD,
  artworkOptions,
  campaignSizeOptions,
  maxLengths,
  normalizeQuote,
  timeframeOptions,
  validateQuote,
  type QuoteData,
  type QuoteErrors,
  type QuoteField,
} from "@/lib/quote";

const empty: QuoteData = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  businessType: "",
  website: "",
  campaignSize: "1000",
  targetArea: "",
  city: "",
  neighborhoods: "",
  offer: "",
  artwork: "",
  timeframe: "",
  message: "",
};

const fieldOrder: QuoteField[] = [
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

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "block w-full rounded-lg border border-navy-200 bg-white px-3.5 py-3 text-base text-navy-800 shadow-sm transition-colors placeholder:text-gray-500 focus:border-navy-800 focus:outline-none focus:ring-2 focus:ring-brand-orange/60 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-600/20";

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy-800">
        {label}
        {required ? (
          <span className="text-red-700" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-slate-ink"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate-ink">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-700">
          <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Reads ?size= and ?industry= to prefill the form. Render inside <Suspense>. */
export function QuoteFormFromParams() {
  const params = useSearchParams();
  return <QuoteForm initialSize={params.get("size")} initialIndustry={params.get("industry")} />;
}

export function QuoteForm({
  initialSize = null,
  initialIndustry = null,
}: {
  initialSize?: string | null;
  initialIndustry?: string | null;
}) {
  const [data, setData] = useState<QuoteData>(() => {
    const size = initialSize;
    const industry = initialIndustry;
    return {
      ...empty,
      campaignSize: size && campaignSizeOptions.some((o) => o.value === size) ? size : empty.campaignSize,
      businessType: industry && businessTypeOptions.includes(industry) ? industry : "",
    };
  });
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [touched, setTouched] = useState<Partial<Record<QuoteField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const startedAt = useRef(0);
  const successRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.scrollIntoView({ block: "start" });
      successRef.current?.focus({ preventScroll: true });
    }
  }, [status]);

  const describedBy = (f: QuoteField, hint?: boolean) =>
    errors[f] ? `${f}-error` : hint ? `${f}-hint` : undefined;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const next = { ...data, [name]: value } as QuoteData;
    setData(next);
    if (touched[name as QuoteField] || errors[name as QuoteField]) {
      const all = validateQuote(normalizeQuote(next));
      setErrors((prev) => ({ ...prev, [name]: all[name as QuoteField] }));
    }
  };

  const onBlur = (e: { target: { name: string } }) => {
    const name = e.target.name as QuoteField;
    setTouched((t) => ({ ...t, [name]: true }));
    const all = validateQuote(normalizeQuote(data));
    setErrors((prev) => ({ ...prev, [name]: all[name] }));
  };

  const common = (f: QuoteField, hint = false) => ({
    id: f,
    name: f,
    value: data[f],
    onChange,
    onBlur,
    maxLength: maxLengths[f],
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": describedBy(f, hint),
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setServerError("");

    const normalized = normalizeQuote(data);
    const found = validateQuote(normalized);
    setErrors(found);
    setTouched(Object.fromEntries(fieldOrder.map((f) => [f, true])));
    const firstInvalid = fieldOrder.find((f) => found[f]);
    if (firstInvalid) {
      setStatus("error");
      requestAnimationFrame(() => {
        const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
        el?.focus();
      });
      return;
    }

    const honeypot = (formRef.current?.elements.namedItem(HONEYPOT_FIELD) as HTMLInputElement | null)?.value ?? "";

    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...normalized, [HONEYPOT_FIELD]: honeypot, [STARTED_AT_FIELD]: startedAt.current }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: QuoteErrors };
      if (res.ok && json.ok) {
        setStatus("success");
        return;
      }
      if (json.errors) setErrors(json.errors);
      setServerError(json.error || "Something went wrong. Please try again.");
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setServerError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="scroll-mt-28 rounded-2xl border-2 border-green-600/30 bg-white p-8 text-center shadow-[var(--shadow-lift)] focus:outline-none sm:p-12"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CircleCheck className="h-9 w-9 text-green-700" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-3xl font-extrabold text-navy-800">Request received!</h2>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-slate-ink">
          Thanks, your campaign request has been received. We&apos;ll review your target area and contact you with the
          next steps.
        </p>
        <div className="mx-auto mt-8 max-w-md rounded-xl bg-offwhite p-5 text-left">
          <p className="font-display font-bold text-navy-800">What happens next</p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-slate-ink">
            <li>We review your area and confirm availability.</li>
            <li>We reach out personally to confirm details and timing.</li>
            <li>You receive an invoice, then we start on your design proof.</li>
          </ol>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/examples" className="font-display font-bold text-orange-ink underline underline-offset-4 hover:text-navy-800">
            Browse sample campaigns
          </Link>
          <span className="hidden text-navy-200 sm:inline" aria-hidden="true">
            |
          </span>
          <Link href="/" className="font-display font-bold text-orange-ink underline underline-offset-4 hover:text-navy-800">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-describedby="form-required-note"
      className="relative rounded-2xl border border-navy-100 bg-white p-5 shadow-[var(--shadow-lift)] sm:p-8"
    >
      <p id="form-required-note" className="mb-6 text-sm text-slate-ink">
        Fields marked <span className="text-red-700">*</span> are required.
      </p>

      <div ref={summaryRef} tabIndex={-1} aria-live="assertive" className="focus:outline-none">
        {status === "error" && (serverError || errorCount > 0) && (
          <div className="mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p className="text-sm font-medium">
              {serverError ||
                `Please fix ${errorCount} ${errorCount === 1 ? "field" : "fields"} highlighted below.`}
            </p>
          </div>
        )}
      </div>

      <fieldset>
        <legend className="font-display text-lg font-extrabold text-navy-800">Your business</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field id="businessName" label="Business name" required error={errors.businessName}>
            <input type="text" autoComplete="organization" required className={inputCls} {...common("businessName")} />
          </Field>
          <Field id="contactName" label="Contact name" required error={errors.contactName}>
            <input type="text" autoComplete="name" required className={inputCls} {...common("contactName")} />
          </Field>
          <Field id="email" label="Email" required error={errors.email}>
            <input type="email" autoComplete="email" inputMode="email" required className={inputCls} {...common("email")} />
          </Field>
          <Field id="phone" label="Phone" required error={errors.phone}>
            <input type="tel" autoComplete="tel" inputMode="tel" required className={inputCls} {...common("phone")} />
          </Field>
          <Field id="businessType" label="Business type" required error={errors.businessType}>
            <select required className={inputCls} {...common("businessType")}>
              <option value="">Select your industry…</option>
              {businessTypeOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field id="website" label="Website" error={errors.website}>
            <input
              type="text"
              autoComplete="url"
              inputMode="url"
              placeholder="yourbusiness.com"
              className={inputCls}
              {...common("website")}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-10" aria-describedby={errors.campaignSize ? "campaignSize-error" : undefined}>
        <legend className="font-display text-lg font-extrabold text-navy-800">
          Campaign size<span className="text-red-700" aria-hidden="true"> *</span>
        </legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {campaignSizeOptions.map((o) => {
            const checked = data.campaignSize === o.value;
            return (
              <label
                key={o.value}
                className={`relative flex cursor-pointer flex-col rounded-xl border-2 p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-orange has-[:focus-visible]:ring-offset-2 ${
                  checked ? "border-brand-orange bg-orange-soft" : "border-navy-100 bg-white hover:border-navy-300"
                }`}
              >
                <input
                  type="radio"
                  name="campaignSize"
                  value={o.value}
                  checked={checked}
                  onChange={onChange}
                  className="sr-only"
                />
                {o.value === "1000" && (
                  <span className="mb-1 self-start rounded-full bg-brand-orange px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-navy-950">
                    Best value
                  </span>
                )}
                <span className="font-display font-extrabold text-navy-800">{o.label.split(" — ")[0]}</span>
                <span className="text-sm text-gray-600">{o.label.split(" — ")[1] ?? "Custom quantity or route"}</span>
                {checked && (
                  <CircleCheck className="absolute right-3 top-3 h-5 w-5 text-orange-ink" aria-hidden="true" />
                )}
              </label>
            );
          })}
        </div>
        {errors.campaignSize && (
          <p id="campaignSize-error" className="mt-2 text-sm font-medium text-red-700">
            {errors.campaignSize}
          </p>
        )}
      </fieldset>

      <fieldset className="mt-10">
        <legend className="font-display text-lg font-extrabold text-navy-800">Target area</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field
            id="targetArea"
            label="Preferred target area"
            required
            hint="E.g. “Homes near my shop” or “North side of town”."
            error={errors.targetArea}
          >
            <input type="text" required className={inputCls} {...common("targetArea", true)} />
          </Field>
          <Field id="city" label="City" required error={errors.city}>
            <input type="text" autoComplete="address-level2" required className={inputCls} {...common("city")} />
          </Field>
          <Field
            id="neighborhoods"
            label="Approximate neighborhoods / communities"
            hint="List any subdivisions, communities, or zip codes you have in mind."
            error={errors.neighborhoods}
            className="sm:col-span-2"
          >
            <textarea rows={3} className={inputCls} {...common("neighborhoods", true)} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="font-display text-lg font-extrabold text-navy-800">Your campaign</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field
            id="offer"
            label="Main service or offer to promote"
            required
            hint="E.g. “Free roof inspections” or “$79 AC tune-up”."
            error={errors.offer}
            className="sm:col-span-2"
          >
            <input type="text" required className={inputCls} {...common("offer", true)} />
          </Field>
          <Field id="artwork" label="Do you already have artwork?" required error={errors.artwork}>
            <select required className={inputCls} {...common("artwork")}>
              <option value="">Select an option…</option>
              {artworkOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field id="timeframe" label="Desired start timeframe" required error={errors.timeframe}>
            <select required className={inputCls} {...common("timeframe")}>
              <option value="">Select a timeframe…</option>
              {timeframeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field id="message" label="Message / notes" error={errors.message} className="sm:col-span-2">
            <textarea rows={4} className={inputCls} {...common("message")} />
          </Field>
        </div>
      </fieldset>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Company fax</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-navy-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-ink sm:max-w-sm">
          No payment is collected here. We&apos;ll follow up personally. See our{" "}
          <Link href="/privacy" className="font-semibold text-navy-800 underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Request My Quote <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
