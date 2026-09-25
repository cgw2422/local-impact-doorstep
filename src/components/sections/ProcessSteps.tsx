import { ChevronRight, ClipboardCheck, Footprints, PenTool, Printer } from "lucide-react";

const steps = [
  {
    icon: PenTool,
    title: "Design",
    text: "We create a custom door hanger campaign for your business, then send you a proof to approve.",
  },
  {
    icon: Printer,
    title: "Print",
    text: "We professionally print your approved door hangers in full color on durable cardstock.",
  },
  {
    icon: Footprints,
    title: "Distribute",
    text: "We personally deliver them to homes in the target area we agreed on together.",
  },
];

export function ProcessSteps() {
  return (
    <div>
      <ol className="grid gap-6 md:grid-cols-3 md:gap-4 lg:gap-8">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="relative flex md:block">
            <div className="flex h-full w-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-[var(--shadow-card)] lg:p-7">
              <div className="flex items-center justify-between">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-50">
                  <Icon className="h-8 w-8 text-navy-800" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange font-display text-lg font-extrabold text-navy-950"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-extrabold text-navy-800">
                <span className="sr-only">Step {i + 1}: </span>
                {title}
              </h3>
              <p className="mt-2 leading-relaxed text-slate-ink">{text}</p>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight
                className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 rounded-full bg-white p-1 text-brand-orange shadow md:block lg:-right-6"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-navy-800 p-6 text-white sm:flex-row sm:items-center lg:p-7">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <ClipboardCheck className="h-7 w-7 text-brand-orange" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-xl font-extrabold">
            <span className="text-brand-orange">4.</span> Report
          </h3>
          <p className="mt-1 text-navy-50">
            When distribution is finished, we send you completion details: how many homes were reached, when, and
            where, with photos where practical.
          </p>
        </div>
      </div>
    </div>
  );
}
