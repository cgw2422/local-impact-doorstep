import type { Metadata } from "next";

import { CtaBanner } from "@/components/sections/CtaBanner";
import { IndustryCard } from "@/components/sections/Industries";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries We Help",
  description:
    "Door hanger campaigns for roofing, HVAC, garage doors, landscaping, lawn care, pressure washing, plumbing, electrical, pest control, and more local home-service businesses.",
  alternates: { canonical: "/industries" },
  openGraph: { url: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we help"
        title={
          <>
            Built for local <span className="text-brand-orange">home-service</span> businesses
          </>
        }
        intro="Door hangers work best for services homeowners need at their own house. For many trades, one new job can cover the cost of a campaign, though results always depend on your business, offer, and market."
      />

      <Section tone="offwhite" labelledBy="industries-list-title">
        <h2 id="industries-list-title" className="sr-only">
          Industries and campaign ideas
        </h2>
        <nav aria-label="Jump to industry" className="mb-10">
          <ul className="flex flex-wrap justify-center gap-2">
            {industries.map((i) => (
              <li key={i.slug}>
                <a
                  href={`#${i.slug}`}
                  className="inline-block rounded-full border border-navy-100 bg-white px-3.5 py-1.5 text-sm font-semibold text-navy-800 hover:border-brand-orange hover:text-orange-ink"
                >
                  {i.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-center text-slate-ink">
          Don&apos;t see your industry? If homeowners are your customers, a neighborhood campaign may still be a good
          fit. Tell us about your business in your quote request.
        </p>
      </Section>

      <CtaBanner
        title="Let's plan the right campaign for your trade"
        secondary={{ href: "/examples", label: "See Sample Campaigns" }}
      />
    </>
  );
}
