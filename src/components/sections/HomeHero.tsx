import Image from "next/image";
import { ArrowRight, CircleCheck, CirclePlay } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import heroPhoto from "../../../public/images/hero-door-hanger.webp";

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-800 text-white">
      <Image
        src={heroPhoto}
        alt="A Local Impact Doorstep team member hanging a door hanger on the front door of a brick home on a tree-lined street"
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[72%_center]"
      />
      {/* Navy overlay: solid behind the text, fading out toward the photo on wide screens. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-navy-900/80 lg:bg-transparent lg:bg-[linear-gradient(90deg,rgb(11_34_71/0.96)_0%,rgb(15_45_91/0.9)_38%,rgb(15_45_91/0.55)_58%,rgb(15_45_91/0)_78%)]"
      />
      <div className="container-page relative py-16 sm:py-20 lg:py-28 xl:py-32">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[0.66rem] tracking-[0.08em] text-navy-50 ring-1 ring-white/15 backdrop-blur-sm sm:text-[0.72rem] sm:tracking-[0.14em]">
            <span className="h-2 w-2 rounded-full bg-brand-orange" aria-hidden="true" />
            Done-for-you neighborhood advertising
          </p>
          <h1
            id="hero-title"
            className="text-[2.35rem] font-extrabold leading-[1.05] drop-shadow-sm sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
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
          <ul className="mt-8 grid max-w-xl gap-x-6 gap-y-2 text-[0.95rem] text-navy-50 sm:grid-cols-2">
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
      </div>
    </section>
  );
}
