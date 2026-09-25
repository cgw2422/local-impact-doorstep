import type { Metadata } from "next";
import { BadgeCheck, ClipboardCheck, Footprints, MapPin, MessageSquare, ReceiptText } from "lucide-react";

import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Local Impact Doorstep gives local businesses a straightforward way to reach homeowners, without managing design, printing, or distribution themselves.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

const values = [
  {
    icon: MapPin,
    title: "Local service",
    text: "We work in the communities we serve and plan routes around real neighborhoods, not zip-code guesswork.",
  },
  {
    icon: Footprints,
    title: "Hands-on fulfillment",
    text: "Our team personally places every door hanger. No bulk drop-offs, no handing your campaign to strangers.",
  },
  {
    icon: ReceiptText,
    title: "Clear pricing",
    text: "Two flat-price campaigns that include everything. If something needs a custom quote, we say so up front.",
  },
  {
    icon: MessageSquare,
    title: "Straightforward communication",
    text: "You talk to a real person who knows your campaign, from the first quote to the final report.",
  },
  {
    icon: ClipboardCheck,
    title: "Documented completion",
    text: "Every campaign ends with a completion report showing where and when the work was done.",
  },
  {
    icon: BadgeCheck,
    title: "Honest promises",
    text: "We guarantee distribution, not leads. We'd rather earn your trust than oversell what advertising can do.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Local businesses. <span className="text-brand-orange">Real neighborhoods.</span>
          </>
        }
        intro="Local Impact Doorstep was built to give local businesses a straightforward way to reach homeowners, without needing to manage design, printing, or distribution themselves."
      />

      <Section labelledBy="story-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            id="story-title"
            align="left"
            eyebrow="Why we exist"
            title="Great local businesses shouldn't need a marketing department"
          />
          <div className="space-y-5 text-lg leading-relaxed text-slate-ink">
            <p>
              Most home-service owners are busy running jobs, managing crews, and answering the phone. Door hangers
              are one of the most direct ways to reach homeowners in a specific area, but doing it yourself means
              finding a designer, ordering prints, planning routes, and spending days walking neighborhoods.
            </p>
            <p>
              We take all of that off your plate. You tell us who you want to reach and what you want to say. We
              design it, print it, and personally deliver it, then show you exactly where the campaign went.
            </p>
            <p className="font-display font-bold text-navy-800">
              It&apos;s neighborhood advertising, done for you, and done right.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="offwhite" labelledBy="values-title">
        <SectionHeading id="values-title" eyebrow="How we work" title="What you can expect from us" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-navy-100 bg-white p-7 shadow-[var(--shadow-card)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800">
                <Icon className="h-6 w-6 text-brand-orange" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-navy-800">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate-ink">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner title="Let's talk about your neighborhood" />
    </>
  );
}
