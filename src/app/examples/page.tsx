import type { Metadata } from "next";
import { Info, Lightbulb } from "lucide-react";

import { CtaBanner } from "@/components/sections/CtaBanner";
import { DoorHanger } from "@/components/sections/DoorHanger";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { examples } from "@/lib/examples";

export const metadata: Metadata = {
  title: "Sample Campaigns",
  description:
    "Sample door hanger campaign concepts for roofing, pressure washing, HVAC, garage doors, landscaping, and painting businesses.",
  alternates: { canonical: "/examples" },
  openGraph: { url: "/examples" },
};

export default function ExamplesPage() {
  return (
    <>
      <PageHero
        eyebrow="Examples"
        title={
          <>
            Sample campaign <span className="text-brand-orange">concepts</span>
          </>
        }
        intro="A look at the kind of clean, bold door hangers we design for home-service businesses, and the thinking behind each campaign."
      />

      <Section tone="offwhite" labelledBy="examples-title">
        <div className="mx-auto mb-12 flex max-w-3xl items-start gap-3 rounded-xl border border-navy-100 bg-white px-5 py-4 text-sm text-navy-800 shadow-[var(--shadow-card)]">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-orange-ink" aria-hidden="true" />
          <p>
            <strong className="font-display">Sample campaign concepts.</strong> These designs are illustrative examples
            created to show our style. The businesses and phone numbers are fictional, and these are not completed
            client jobs.
          </p>
        </div>
        <h2 id="examples-title" className="sr-only">
          Campaign examples by industry
        </h2>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((ex) => (
            <li key={ex.slug}>
              <article
                aria-labelledby={`ex-${ex.slug}`}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-[var(--shadow-card)]"
              >
                <div className="bg-[linear-gradient(135deg,#eef3fa,#dbe4f0)] px-4 py-8">
                  <DoorHanger example={ex} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="eyebrow text-[0.7rem] text-orange-ink">Sample concept</p>
                    <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-semibold text-navy-700">
                      {ex.campaign}
                    </span>
                  </div>
                  <h3 id={`ex-${ex.slug}`} className="mt-2 text-xl font-extrabold text-navy-800">
                    {ex.industry}
                  </h3>
                  <p className="mt-3 flex gap-2.5 leading-relaxed text-slate-ink">
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" aria-hidden="true" />
                    <span>{ex.strategy}</span>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="design-title">
        <SectionHeading
          id="design-title"
          eyebrow="Our design approach"
          title="Door hangers built to be read in seconds"
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              title: "One clear offer",
              text: "Each design leads with a single, specific reason to call, like a free inspection or a seasonal tune-up.",
            },
            {
              title: "Bold and readable",
              text: "Strong headlines, high contrast, and a phone number that's easy to find from across the kitchen.",
            },
            {
              title: "Local and trustworthy",
              text: "Your logo, your details, and a clean professional look that feels like a local business, not junk mail.",
            },
          ].map((item, i) => (
            <div key={item.title} className="rounded-2xl border border-navy-100 p-7">
              <p className="font-display text-3xl font-extrabold text-orange-ink" aria-hidden="true">
                0{i + 1}
              </p>
              <h3 className="mt-3 text-xl font-extrabold text-navy-800">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-ink">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Want a design like this for your business?"
        text="Design is included with every campaign. Send us your logo and offer, and we'll create a proof for your approval."
      />
    </>
  );
}
