import type { ReactNode } from "react";

/** Compact hero used at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden bg-navy-800 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-navy-400/25 blur-3xl"
      />
      <div className="container-page relative py-14 sm:py-16 lg:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3 text-brand-orange">{eyebrow}</p>
          <h1 id="page-title" className="text-4xl font-extrabold leading-[1.08] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-50 sm:text-xl">{intro}</p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
