import { ArrowRight, Check } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { formatPrice, plans, type Plan } from "@/lib/pricing";

export function PricingCard({ plan, headingLevel = "h3" }: { plan: Plan; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const featured = plan.featured;
  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={`relative flex h-full flex-col rounded-2xl bg-white p-6 sm:p-8 ${
        featured
          ? "border-[3px] border-brand-orange shadow-[0_24px_60px_-20px_rgb(249_115_22/0.45)] lg:-my-4 lg:py-12"
          : "border border-navy-100 shadow-[var(--shadow-card)]"
      }`}
    >
      {plan.badge && (
        <p className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-orange px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-navy-950 shadow">
          {plan.badge}
        </p>
      )}
      <H id={`plan-${plan.id}`} className="text-xl font-extrabold text-navy-800">
        {plan.name}
      </H>
      <p className="mt-2 text-slate-ink">{plan.blurb}</p>
      <p className="mt-6 flex items-end gap-2">
        <span className="font-display text-5xl font-extrabold tracking-tight text-navy-800 sm:text-6xl">
          {formatPrice(plan.price)}
        </span>
        <span className="pb-2 text-sm text-slate-ink">flat price</span>
      </p>
      <p className="mt-1 text-sm font-semibold text-orange-ink">
        {plan.homes.toLocaleString("en-US")}-home distribution guaranteed · {plan.perHome}
      </p>
      <ul className="mt-6 space-y-3 border-t border-navy-100 pt-6">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3 text-navy-800">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" strokeWidth={3} aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <ButtonLink
          href={`/quote?size=${plan.id}`}
          variant={featured ? "primary" : "navy"}
          size="lg"
          className="w-full"
          aria-label={`Get a quote for the ${plan.name}`}
        >
          Get a Quote <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </ButtonLink>
      </div>
    </article>
  );
}

export function PricingCards({ headingLevel }: { headingLevel?: "h2" | "h3" }) {
  // Featured plan is shown first on mobile, second (right) on desktop.
  return (
    <div className="mx-auto grid max-w-4xl items-stretch gap-8 md:grid-cols-2 md:gap-6 lg:gap-8">
      {plans.map((plan) => (
        <div key={plan.id} className={plan.featured ? "order-first md:order-none" : ""}>
          <PricingCard plan={plan} headingLevel={headingLevel} />
        </div>
      ))}
    </div>
  );
}
