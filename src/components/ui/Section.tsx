import type { ReactNode } from "react";

type Tone = "white" | "offwhite" | "navy";

const tones: Record<Tone, string> = {
  white: "bg-white",
  offwhite: "bg-offwhite",
  navy: "bg-navy-800 text-white",
};

export function Section({
  children,
  tone = "white",
  className = "",
  id,
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "center",
  onDark = false,
  as: Tag = "h2",
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  onDark?: boolean;
  as?: "h1" | "h2";
}) {
  const alignCls = align === "center" ? "mx-auto text-center" : "";
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 ${onDark ? "text-brand-orange" : "text-orange-ink"}`}>{eyebrow}</p>
      )}
      <Tag
        id={id}
        className={`text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.6rem] ${
          onDark ? "text-white" : "text-navy-800"
        }`}
      >
        {title}
      </Tag>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${onDark ? "text-navy-100" : "text-slate-ink"}`}>{intro}</p>
      )}
    </div>
  );
}
