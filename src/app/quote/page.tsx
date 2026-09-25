import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { QuoteForm, QuoteFormFromParams } from "@/components/forms/QuoteForm";
import { formatPrice, plans } from "@/lib/pricing";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Request a quote for a done-for-you door hanger campaign. Tell us about your business and target area, and we'll follow up personally with next steps.",
  alternates: { canonical: "/quote" },
  openGraph: { url: "/quote" },
};

const next = [
  "We review your target area and confirm availability.",
  "We contact you personally to confirm the details.",
  "You receive an invoice. Payment is handled separately.",
  "We design your proof. Nothing prints until you approve.",
];

export default function QuotePage() {
  return (
    <>
      <section aria-labelledby="page-title" className="relative overflow-hidden bg-navy-800 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <div className="container-page relative pb-28 pt-12 sm:pb-32 sm:pt-16">
          <p className="eyebrow mb-3 text-brand-orange">Get a quote</p>
          <h1 id="page-title" className="max-w-3xl text-4xl font-extrabold leading-[1.08] sm:text-5xl">
            Let&apos;s plan your neighborhood campaign
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-50">
            Tell us about your business and the homes you want to reach. It takes about two minutes, and there&apos;s
            no obligation.
          </p>
        </div>
      </section>

      <div className="bg-offwhite pb-20">
        <div className="container-page relative -mt-20 grid gap-8 lg:grid-cols-[1fr_22rem] xl:grid-cols-[1fr_24rem]">
          <div>
            <Suspense fallback={<QuoteForm />}>
              <QuoteFormFromParams />
            </Suspense>
          </div>

          <aside aria-label="Quote details" className="space-y-6 lg:pt-0">
            <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-navy-100">
              <h2 className="font-display text-lg font-extrabold text-navy-800">Campaign pricing</h2>
              <ul className="mt-4 space-y-3">
                {[...plans].reverse().map((p) => (
                  <li
                    key={p.id}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                      p.featured ? "bg-orange-soft ring-2 ring-brand-orange" : "bg-offwhite ring-1 ring-navy-100"
                    }`}
                  >
                    <span>
                      <span className="block font-display font-bold text-navy-800">
                        {p.homes.toLocaleString("en-US")} Homes
                      </span>
                      {p.badge && (
                        <span className="text-xs font-bold uppercase tracking-wider text-orange-ink">{p.badge}</span>
                      )}
                    </span>
                    <span className="font-display text-2xl font-extrabold text-navy-800">{formatPrice(p.price)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex gap-2 text-sm text-slate-ink">
                <ShieldCheck className="h-5 w-5 shrink-0 text-orange-ink" aria-hidden="true" />
                Design, printing, distribution, and a completion report included. Distribution quantity guaranteed.
              </p>
            </div>

            <div className="rounded-2xl bg-navy-800 p-6 text-white shadow-[var(--shadow-card)]">
              <h2 className="font-display text-lg font-extrabold">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {next.map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange font-display text-sm font-extrabold text-navy-950">
                      {i + 1}
                    </span>
                    <span className="text-navy-50">{t}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-navy-100">
                <Clock className="h-4 w-4 text-brand-orange" aria-hidden="true" />
                Every request is reviewed by a real person.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-navy-100">
              <h2 className="font-display text-lg font-extrabold text-navy-800">
                {site.email || site.phone ? "Prefer to reach out directly?" : "Service area"}
              </h2>
              <ul className="mt-4 space-y-3 text-navy-800">
                {site.email && (
                  <li>
                    <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 font-semibold hover:text-orange-ink">
                      <Mail className="h-5 w-5 text-orange-ink" aria-hidden="true" /> {site.email}
                    </a>
                  </li>
                )}
                {site.phone && (
                  <li>
                    <a href={telHref(site.phone)} className="inline-flex items-center gap-2.5 font-semibold hover:text-orange-ink">
                      <Phone className="h-5 w-5 text-orange-ink" aria-hidden="true" /> {site.phone}
                    </a>
                  </li>
                )}
                <li className="flex items-start gap-2.5 text-slate-ink">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-ink" aria-hidden="true" />
                  {site.serviceArea
                    ? `Currently serving ${site.serviceArea}.`
                    : "We serve select local markets. Include your city and we'll confirm availability."}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
