import Image from "next/image";
import { ArrowRight, CircleCheck, CirclePlay } from "lucide-react";

import { HeroScene } from "@/components/illustrations/HeroScene";
import { ButtonLink } from "@/components/ui/Button";

type Props = {
  /** Optional real photo (e.g. "/images/hero.jpg") to replace the illustration. */
  photo?: { src: string; alt: string };
};

export function HomeHero({ photo }: Props) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-navy-800 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-navy-400/25 blur-3xl"
      />
      <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.08fr_1fr] lg:gap-12 lg:py-20">
        <div>
          <p className="eyebrow mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[0.66rem] tracking-[0.08em] sm:text-[0.72rem] sm:tracking-[0.14em] text-navy-50 ring-1 ring-white/15">
            <span className="h-2 w-2 rounded-full bg-brand-orange" aria-hidden="true" />
            Done-for-you neighborhood advertising
          </p>
          <h1
            id="hero-title"
            className="text-[2.35rem] font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
          >
            Put Your Business on <span className="block text-brand-orange">1,000 Local Doorsteps</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-50 sm:text-xl">
            We design, print, and personally distribute targeted neighborhood campaigns for local home-service
            businesses.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quote" size="lg">
              Get a Quote <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/how-it-works" variant="outline-light" size="lg">
              <CirclePlay className="h-5 w-5" aria-hidden="true" /> See How It Works
            </ButtonLink>
          </div>
          <ul className="mt-8 grid gap-x-6 gap-y-2 text-[0.95rem] text-navy-50 sm:grid-cols-2">
            {[
              "Campaigns from $449",
              "Design approval before printing",
              "1,000-home distribution guaranteed",
              "Completion report included",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 shrink-0 text-brand-orange" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15">
            {photo ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={1120}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[15/14] h-auto w-full object-cover"
              />
            ) : (
              <HeroScene className="block aspect-[15/14] h-auto w-full" />
            )}
          </div>
          <div className="absolute -bottom-5 left-3 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-navy-800 shadow-[var(--shadow-lift)] sm:-left-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-soft">
              <CircleCheck className="h-6 w-6 text-orange-ink" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-extrabold">Campaign complete</span>
              <span className="block text-xs text-slate-ink">1,000 homes · report sent</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
