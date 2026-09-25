import type { Metadata } from "next";
import { Check, Minus, ReceiptText, ShieldCheck, SlidersHorizontal } from "lucide-react";

import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqList } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { PricingCards } from "@/components/sections/PricingCards";
import { Section, SectionHeading } from "@/components/ui/Section";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flat-price door hanger campaigns: 500 homes for $449 or 1,000 homes for $699. Design, printing, personal distribution, and a completion report included.",
  alternates: { canonical: "/pricing" },
  openGraph: { url: "/pricing" },
};

const comparison: { label: string; small: string | boolean; large: string | boolean }[] = [
  { label: "Homes reached", small: "500", large: "1,000" },
  { label: "Door hangers printed", small: "500", large: "1,000" },
  { label: "Custom door hanger design", small: true, large: true },
  { label: "Design proof and approval before printing", small: true, large: true },
  { label: "Target neighborhood selection", small: true, large: true },
  { label: "Personal, on-foot distribution", small: true, large: true },
  { label: "Completion report (area, count, date)", small: true, large: true },
  { label: "Photos of fulfillment where practical", small: true, large: true },
  { label: "Approximate cost per home", small: "$0.90", large: "$0.70" },
];

const pricingFaqs = faqs.filter((f) =>
  ["Do you guarantee leads?", "How does payment work?", "Can I choose the neighborhood?", "What size are the door hangers?"].includes(f.q),
);

function Cell({ value }: { value: string | boolean }) {
  if (value === true)
    return (
      <>
        <Check className="mx-auto h-5 w-5 text-brand-orange" strokeWidth={3} aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    );
  if (value === false)
    return (
      <>
        <Minus className="mx-auto h-5 w-5 text-navy-200" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </>
    );
  return <span className="font-display font-bold">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            One flat price. <span className="text-brand-orange">Everything included.</span>
          </>
        }
        intro="Every campaign includes custom design, professional printing, personal distribution, and a completion report. Choose the reach that fits your business."
      />

      <Section tone="offwhite" labelledBy="plans-title" className="!pt-20 sm:!pt-24">
        <h2 id="plans-title" className="sr-only">
          Campaign packages
        </h2>
        <PricingCards headingLevel="h3" />
      </Section>

      <Section labelledBy="included-title">
        <SectionHeading
          id="included-title"
          eyebrow="Compare"
          title="What's included in each campaign"
          intro="Both campaigns include the same full service. The 1,000-home campaign simply reaches twice as many homes at a lower cost per home."
        />
        <div className="mx-auto mt-10 max-w-3xl overflow-x-auto rounded-2xl border border-navy-100 shadow-[var(--shadow-card)]">
          <table className="w-full border-collapse bg-white text-left text-sm sm:text-base">
            <caption className="sr-only">Comparison of the 500-home and 1,000-home campaigns</caption>
            <thead>
              <tr className="bg-navy-800 text-white">
                <th scope="col" className="px-3 py-4 sm:px-5 font-display text-sm font-bold">
                  Feature
                </th>
                <th scope="col" className="px-3 py-4 sm:px-5 text-center font-display text-sm font-bold">
                  500 Homes
                  <span className="block text-lg font-extrabold">$449</span>
                </th>
                <th scope="col" className="bg-navy-900 px-3 py-4 sm:px-5 text-center font-display text-sm font-bold">
                  <span className="text-brand-orange">1,000 Homes</span>
                  <span className="block text-[0.65rem] uppercase tracking-wider text-brand-orange">Best value</span>
                  <span className="block text-lg font-extrabold">$699</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100 text-navy-800">
              {comparison.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="px-3 py-3.5 sm:px-5 font-medium">
                    {row.label}
                  </th>
                  <td className="px-3 py-3.5 sm:px-5 text-center">
                    <Cell value={row.small} />
                  </td>
                  <td className="bg-orange-soft/50 px-3 py-3.5 sm:px-5 text-center">
                    <Cell value={row.large} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="offwhite" labelledBy="fees-title">
        <h2 id="fees-title" className="sr-only">
          Pricing details
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: ReceiptText,
              title: "No hidden fees",
              text: "There are no hidden printing or distribution charges within the agreed campaign scope. The price you're quoted is the price you pay.",
            },
            {
              icon: ShieldCheck,
              title: "Distribution guaranteed",
              text: "We guarantee delivery to the agreed number of homes in your target area. We don't promise leads or sales, because no honest advertiser can. We promise the work gets done.",
            },
            {
              icon: SlidersHorizontal,
              title: "When a custom quote applies",
              text: "Special requests, unusually spread-out routes, custom quantities, or areas outside our standard service area may require a custom quote. We'll always tell you up front.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-navy-100 bg-white p-7 shadow-[var(--shadow-card)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-soft">
                <Icon className="h-6 w-6 text-orange-ink" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-navy-800">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate-ink">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="pricing-faq-title">
        <div className="mx-auto max-w-3xl">
          <SectionHeading id="pricing-faq-title" eyebrow="Questions" title="Pricing questions" />
          <div className="mt-10">
            <FaqList items={pricingFaqs} />
          </div>
        </div>
      </Section>

      <CtaBanner
        title="Put your business on 1,000 local doorsteps"
        text="Request a quote and we'll confirm your target area, timeline, and next steps personally."
        secondary={{ href: "/examples", label: "See Sample Campaigns" }}
      />
    </>
  );
}
