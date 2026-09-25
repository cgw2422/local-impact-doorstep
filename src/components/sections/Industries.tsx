import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Industry } from "@/lib/industries";

/** Compact icon tiles, used on the homepage. */
export function IndustryTiles({ items }: { items: Industry[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
      {items.map(({ slug, name, icon: Icon }) => (
        <li key={slug}>
          <Link
            href={`/industries#${slug}`}
            className="group flex h-full flex-col items-center gap-3 rounded-xl border border-navy-100 bg-white px-3 py-6 text-center shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-brand-orange/60 hover:shadow-[var(--shadow-lift)]"
          >
            <Icon className="h-10 w-10 text-navy-800 transition-colors group-hover:text-orange-ink" strokeWidth={1.75} aria-hidden="true" />
            <span className="font-display font-bold text-navy-800">{name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Detailed card with campaign angles, used on the Industries page. */
export function IndustryCard({ industry }: { industry: Industry }) {
  const { slug, name, icon: Icon, summary, angles } = industry;
  return (
    <article
      id={slug}
      aria-labelledby={`${slug}-title`}
      className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy-800">
          <Icon className="h-7 w-7 text-brand-orange" strokeWidth={1.9} aria-hidden="true" />
        </span>
        <h3 id={`${slug}-title`} className="text-xl font-extrabold text-navy-800">
          {name}
        </h3>
      </div>
      <p className="mt-4 leading-relaxed text-slate-ink">{summary}</p>
      <p className="eyebrow mt-5 text-[0.7rem] text-navy-800">Campaign angles</p>
      <ul className="mt-2.5 flex flex-wrap gap-2">
        {angles.map((a) => (
          <li key={a} className="rounded-full bg-offwhite px-3 py-1 text-sm font-medium text-navy-800 ring-1 ring-navy-100">
            {a}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <Link
          href={`/quote?industry=${encodeURIComponent(name)}`}
          className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-orange-ink hover:text-navy-800"
        >
          Plan your campaign<span className="sr-only"> for {name}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
