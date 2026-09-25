import { ClipboardCheck, MapPin, Users } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Targeted Neighborhoods",
    text: "Reach the homes in the areas you want.",
  },
  {
    icon: Users,
    title: "Done-For-You Distribution",
    text: "We handle the design, printing, and on-the-ground delivery.",
  },
  {
    icon: ClipboardCheck,
    title: "Completion Reporting",
    text: "Receive a summary showing where and when your campaign was completed.",
  },
];

export function FeatureStrip() {
  return (
    <section aria-label="Why Local Impact Doorstep" className="border-b border-navy-100 bg-white">
      <div className="container-page">
        <ul className="grid divide-y divide-navy-100 md:grid-cols-3 md:divide-x md:divide-y-0">
          {features.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 py-7 md:px-6 md:py-9 md:first:pl-0 md:last:pr-0">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-soft">
                <Icon className="h-6 w-6 text-orange-ink" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-navy-800">{title}</h2>
                <p className="mt-1 leading-relaxed text-slate-ink">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
