import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

import { CompletionReport } from "@/components/sections/CompletionReport";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqList, faqJsonLd } from "@/components/sections/Faq";
import { FeatureStrip } from "@/components/sections/FeatureStrip";
import { HomeHero } from "@/components/sections/HomeHero";
import { IndustryTiles } from "@/components/sections/Industries";
import { PricingCards } from "@/components/sections/PricingCards";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { homeFaqs } from "@/lib/faqs";
import { featuredIndustries } from "@/lib/industries";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Done-For-You Door Hanger Campaigns` },
  description:
    "Put your business on 1,000 local doorsteps. We design, print, and personally distribute targeted door hanger campaigns for roofing, HVAC, landscaping, and other home-service businesses.",
  alternates: { canonical: "/" },
};

const reportItems = [
  "Number of homes distributed",
  "Date completed",
  "Target area",
  "General streets and neighborhoods covered",
  "Photos where practical",
  "Campaign status",
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)).replace(/</g, "\\u003c") }}
      />
      <HomeHero />
      <FeatureStrip />

      <Section tone="offwhite" labelledBy="industries-title">
        <SectionHeading
          id="industries-title"
          eyebrow="Perfect for local home-service businesses"
          title="Built for the trades homeowners call"
          intro="For many home-service businesses, a single new job can cover the cost of a campaign. Results vary by business, offer, and market, but the math is why door hangers are a favorite for the trades."
        />
        <div className="mt-10">
          <IndustryTiles items={featuredIndustries} />
        </div>
        <p className="mt-8 text-center">
          <Link
            href="/industries"
            className="inline-flex items-center gap-1.5 font-display font-bold text-orange-ink hover:text-navy-800"
          >
            View all 16 industries we help <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </p>
      </Section>

      <Section labelledBy="how-title" id="how-it-works">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="how-title"
            align="left"
            eyebrow="How it works"
            title="We design it. Print it. Deliver it."
            intro="A simple, managed process. You approve the design and the area. We handle everything else."
          />
          <ButtonLink href="/how-it-works" variant="outline" className="shrink-0 self-start md:self-auto">
            See the full process
          </ButtonLink>
        </div>
        <div className="mt-10">
          <ProcessSteps />
        </div>
      </Section>

      <Section tone="offwhite" labelledBy="pricing-title" id="pricing">
        <SectionHeading
          id="pricing-title"
          eyebrow="Pricing"
          title="Simple, flat campaign pricing"
          intro="Design, printing, distribution, and reporting in one price. No hidden printing or distribution fees within your campaign scope."
        />
        <div className="mt-14">
          <PricingCards />
        </div>
        <p className="mx-auto mt-10 flex max-w-2xl items-start justify-center gap-2 text-center text-sm text-slate-ink">
          <ShieldCheck className="h-5 w-5 shrink-0 text-orange-ink" aria-hidden="true" />
          <span>
            We guarantee distribution to the agreed number of homes in your target area. Custom quantities and
            special routes are quoted separately. <Link href="/pricing" className="font-semibold text-navy-800 underline underline-offset-2 hover:text-orange-ink">Pricing details</Link>
          </span>
        </p>
      </Section>

      <Section labelledBy="report-title">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHeading
              id="report-title"
              align="left"
              eyebrow="Fulfillment & reporting"
              title="Know exactly where your campaign went"
              intro="After distribution, you receive a simple completion report so you can see the work was done."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {reportItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-navy-800">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-4 w-4 text-green-700" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <CompletionReport />
        </div>
      </Section>

      <Section tone="offwhite" labelledBy="faq-title" id="faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              id="faq-title"
              align="left"
              eyebrow="FAQ"
              title="Straight answers"
              intro="Have a question that isn't covered here? Send it with your quote request and we'll answer it personally."
            />
            <ButtonLink href="/quote" className="mt-8" size="lg">
              Ask About Your Area
            </ButtonLink>
          </div>
          <FaqList items={homeFaqs} />
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
