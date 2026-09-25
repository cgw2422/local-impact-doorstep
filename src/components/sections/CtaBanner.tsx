import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";

export function CtaBanner({
  title = "Ready to put your business on local doorsteps?",
  text = "Tell us about your business and the neighborhoods you want to reach. We'll follow up personally with next steps. No obligation.",
  secondary = { href: "/pricing", label: "View Pricing" },
}: {
  title?: string;
  text?: string;
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-navy-800 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-orange/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-navy-400/30 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta-title" className="text-3xl font-extrabold leading-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg text-navy-50">{text}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/quote" size="lg">
                Get a Quote <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} variant="outline-light" size="lg">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
