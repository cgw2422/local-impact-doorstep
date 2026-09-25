import Link from "next/link";
import type { ReactNode } from "react";

import { site } from "@/lib/site";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section aria-labelledby="page-title" className="bg-navy-800 text-white">
        <div className="container-page py-12 sm:py-16">
          <p className="eyebrow mb-3 text-brand-orange">Legal</p>
          <h1 id="page-title" className="text-4xl font-extrabold sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-navy-100">Last updated {updated}</p>
        </div>
      </section>
      <div className="bg-white py-14 sm:py-16">
        <article className="container-page max-w-3xl text-[1.05rem] leading-relaxed text-gray-700 [&_a]:font-semibold [&_a]:text-navy-800 [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-navy-800 [&_li]:mt-1.5 [&_p]:mt-4 [&_strong]:text-navy-800 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </article>
      </div>
    </>
  );
}

export function ContactLine() {
  return site.email ? (
    <a href={`mailto:${site.email}`}>{site.email}</a>
  ) : (
    <>
      our <Link href="/quote">contact form</Link>
    </>
  );
}
