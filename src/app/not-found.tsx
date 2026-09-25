import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="bg-offwhite py-24 sm:py-32">
      <div className="container-page max-w-2xl text-center">
        <p className="font-display text-7xl font-extrabold text-orange-ink">404</p>
        <h1 className="mt-4 text-3xl font-extrabold text-navy-800 sm:text-4xl">We couldn&apos;t find that doorstep</h1>
        <p className="mt-4 text-lg text-slate-ink">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/quote" variant="outline" size="lg">
            Get a Quote
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
