import type { Metadata } from "next";
import {
  CalendarRange,
  ClipboardCheck,
  FileText,
  Footprints,
  Map as MapIcon,
  MessageSquare,
  PenTool,
  Printer,
  Ruler,
  ThumbsUp,
} from "lucide-react";

import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqList } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "From quote to completion report: see how Local Impact Doorstep designs, prints, and personally distributes your door hanger campaign, step by step.",
  alternates: { canonical: "/how-it-works" },
  openGraph: { url: "/how-it-works" },
};

const steps = [
  {
    icon: MessageSquare,
    title: "Request a quote",
    text: "Fill out a short form with your business details and the area you'd like to reach. It takes about two minutes.",
    you: true,
  },
  {
    icon: Ruler,
    title: "Choose your campaign size",
    text: "Pick a 500-home test campaign or our 1,000-home campaign. Need something different? We'll quote a custom campaign.",
    you: true,
  },
  {
    icon: MapIcon,
    title: "Select your general target area",
    text: "Tell us the neighborhoods, communities, or zip codes that matter to your business. We'll confirm the route and home count with you.",
    you: true,
  },
  {
    icon: FileText,
    title: "Send your logo, contact info, and offer",
    text: "Share your logo, phone number, website, and the service or promotion you want to feature. No artwork? No problem.",
    you: true,
  },
  {
    icon: PenTool,
    title: "Receive your design proof",
    text: "Our team designs a clean, professional door hanger built around your offer and sends you a digital proof.",
  },
  {
    icon: ThumbsUp,
    title: "Approve the artwork",
    text: "Request changes until it's right. Nothing is printed until you give your approval.",
    you: true,
  },
  {
    icon: Printer,
    title: "Door hangers are printed",
    text: "Your approved design is professionally printed in full color on durable, heavyweight cardstock.",
  },
  {
    icon: Footprints,
    title: "Distribution is completed",
    text: "We personally walk the agreed route and place a door hanger at each home, respecting posted no-solicitation signs.",
  },
  {
    icon: ClipboardCheck,
    title: "Completion report is provided",
    text: "You receive a summary of the homes reached, the date completed, the area and streets covered, and photos where practical.",
  },
];

const processFaqs = faqs.filter((f) =>
  ["How long does a campaign take?", "Do I approve the design first?", "Do I need to provide artwork?", "How does payment work?"].includes(f.q),
);

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            Neighborhood advertising <span className="text-brand-orange">without the hassle</span>
          </>
        }
        intro="You make a few simple decisions. We manage the design, printing, route planning, distribution, and reporting."
      >
        <ButtonLink href="/quote" size="lg">
          Start With a Quote
        </ButtonLink>
      </PageHero>

      <Section labelledBy="steps-title">
        <SectionHeading
          id="steps-title"
          eyebrow="Nine simple steps"
          title="From first message to finished campaign"
          intro="Steps marked “Your part” need a quick decision from you. Everything else is on us."
        />
        <ol className="relative mx-auto mt-14 max-w-3xl">
          <span aria-hidden="true" className="absolute bottom-6 left-[1.6rem] top-6 w-0.5 bg-navy-100 sm:left-[1.85rem]" />
          {steps.map(({ icon: Icon, title, text, you }, i) => (
            <li key={title} className="relative flex gap-5 pb-8 last:pb-0 sm:gap-7">
              <span className="relative z-10 flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full bg-navy-800 font-display text-lg font-extrabold text-white ring-8 ring-white sm:h-[3.75rem] sm:w-[3.75rem] sm:text-xl">
                {i + 1}
              </span>
              <div className="flex-1 rounded-2xl border border-navy-100 bg-white p-5 shadow-[var(--shadow-card)] sm:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <Icon className="h-6 w-6 text-orange-ink" aria-hidden="true" />
                  <h3 className="text-lg font-extrabold text-navy-800 sm:text-xl">{title}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${
                      you ? "bg-orange-soft text-orange-ink" : "bg-navy-50 text-navy-700"
                    }`}
                  >
                    {you ? "Your part" : "We handle it"}
                  </span>
                </div>
                <p className="mt-2 leading-relaxed text-slate-ink">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="offwhite" labelledBy="split-title">
        <SectionHeading id="split-title" eyebrow="Who does what" title="A managed service, start to finish" />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-navy-100 bg-white p-7 shadow-[var(--shadow-card)]">
            <h3 className="text-xl font-extrabold text-navy-800">What you provide</h3>
            <ul className="mt-5 space-y-3 text-navy-800">
              {[
                "Your logo (or just your business name)",
                "Phone number, website, and any licensing info to display",
                "The service or offer you want to promote",
                "The general area you want to reach",
                "Design feedback and final approval",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-orange" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-navy-800 p-7 text-white shadow-[var(--shadow-lift)]">
            <h3 className="text-xl font-extrabold">What we handle</h3>
            <ul className="mt-5 space-y-3 text-navy-50">
              {[
                "Custom door hanger design and revisions",
                "Professional full-color printing",
                "Route planning for your target homes",
                "Personal, on-foot distribution",
                "Completion report with area, count, date, and photos where practical",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-orange" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-6 flex max-w-5xl items-start gap-4 rounded-2xl border border-navy-100 bg-white p-6">
          <CalendarRange className="h-7 w-7 shrink-0 text-orange-ink" aria-hidden="true" />
          <p className="leading-relaxed text-navy-800">
            <strong className="font-display">Typical timeline:</strong> most campaigns are completed within about two
            to three weeks of design approval. Timing depends on revisions, print production, route size, and
            weather. We&apos;ll share an expected schedule when we confirm your campaign.
          </p>
        </div>
      </Section>

      <Section labelledBy="hiw-faq-title">
        <div className="mx-auto max-w-3xl">
          <SectionHeading id="hiw-faq-title" eyebrow="Questions" title="Common process questions" />
          <div className="mt-10">
            <FaqList items={processFaqs} />
          </div>
        </div>
      </Section>

      <CtaBanner title="Ready to plan your campaign?" />
    </>
  );
}
