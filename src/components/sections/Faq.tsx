import { ChevronDown } from "lucide-react";

import type { Faq } from "@/lib/faqs";

/** Accessible FAQ accordion using native <details>, no client JS required. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-navy-100 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-[var(--shadow-card)]">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-display text-[1.05rem] font-bold text-navy-800 hover:bg-offwhite sm:px-7 [&::-webkit-details-marker]:hidden">
            <h3>{item.q}</h3>
            <ChevronDown
              className="h-5 w-5 shrink-0 text-orange-ink transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="px-5 pb-6 leading-relaxed text-slate-ink sm:px-7">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
