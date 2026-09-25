import { LogoMark } from "@/components/brand/Logo";
import type { ExampleCampaign } from "@/lib/examples";

const themes = {
  navy: { top: "#0F2D5B", body: "#0F2D5B", text: "#ffffff", sub: "#dbe4f0", accent: "#F97316", bullet: "#F97316" },
  light: { top: "#ffffff", body: "#ffffff", text: "#0F2D5B", sub: "#374151", accent: "#EA580C", bullet: "#F97316" },
  orange: { top: "#F97316", body: "#fff7ed", text: "#0F2D5B", sub: "#374151", accent: "#C2410C", bullet: "#0F2D5B" },
} as const;

function Scene({ scene }: { scene: ExampleCampaign["scene"] }) {
  return (
    <svg viewBox="0 0 240 130" className="block h-full w-full" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <rect width="240" height="130" fill="#bfdbf7" />
      <circle cx="200" cy="28" r="14" fill="#fde68a" />
      <path d="M0 70c30-12 60-8 90-14s70-4 150 2v72H0Z" fill="#86b98a" />
      {/* house */}
      <path d="M50 70 110 34l60 36" fill={scene === "roof" ? "#374151" : "#475569"} />
      <path d="M58 68h104v50H58Z" fill={scene === "paint" ? "#fde7cf" : "#f1f5f9"} />
      <path d="M44 72 110 30l66 42" fill="none" stroke={scene === "roof" ? "#F97316" : "#1f2937"} strokeWidth="5" strokeLinejoin="round" />
      {scene === "roof" &&
        [44, 52, 60].map((y) => (
          <path key={y} d={`M${110 - (y - 30) * 1.4} ${y}h${(y - 30) * 2.8}`} stroke="#1f2937" strokeWidth="1.5" opacity="0.6" />
        ))}
      <rect x="100" y="86" width="20" height="32" fill="#0F2D5B" />
      <rect x="70" y="80" width="18" height="16" fill="#93c5fd" stroke="#fff" strokeWidth="2" />
      <rect x="132" y="80" width="18" height="16" fill="#93c5fd" stroke="#fff" strokeWidth="2" />
      {scene === "garage" && (
        <g>
          <rect x="164" y="80" width="62" height="38" fill="#e2e8f0" />
          <path d="M160 82l35-16 35 16" fill="#475569" />
          <rect x="170" y="88" width="50" height="30" fill="#fff" stroke="#94a3b8" />
          {[95, 102, 109].map((y) => (
            <line key={y} x1="170" x2="220" y1={y} y2={y} stroke="#94a3b8" />
          ))}
        </g>
      )}
      {scene === "hvac" && (
        <g>
          <rect x="172" y="94" width="34" height="26" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
          <circle cx="189" cy="107" r="9" fill="none" stroke="#475569" strokeWidth="2" />
          <path d="M189 98v18M180 107h18" stroke="#475569" strokeWidth="2" />
          <path d="M214 90c4-4 4-8 0-12M222 92c6-6 6-12 0-18" stroke="#F97316" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )}
      {scene === "wash" && (
        <g>
          <path d="M236 120 196 96" stroke="#1f2937" strokeWidth="5" strokeLinecap="round" />
          <path d="M196 96 150 82M196 96 152 92M196 96 156 100" stroke="#e0f2fe" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
          <rect x="58" y="68" width="42" height="50" fill="#fff" opacity="0.7" />
        </g>
      )}
      {scene === "yard" && (
        <g>
          <path d="M0 118h240v12H0Z" fill="#4d7c0f" />
          {[20, 42, 180, 206, 228].map((x) => (
            <circle key={x} cx={x} cy="108" r="12" fill="#3f8f4a" />
          ))}
          {[26, 186, 212].map((x) => (
            <circle key={x} cx={x} cy="104" r="3" fill="#F97316" />
          ))}
        </g>
      )}
      {scene === "paint" && (
        <g>
          <path d="M170 60h40v12h-40Z" fill="#F97316" />
          <path d="M190 72v10h-10v30" stroke="#1f2937" strokeWidth="4" fill="none" />
          <path d="M162 68v50" stroke="#F97316" strokeWidth="10" opacity="0.8" />
        </g>
      )}
    </svg>
  );
}

/** A realistic-looking mock of a 4.25" × 11" door hanger design. */
export function DoorHanger({ example }: { example: ExampleCampaign }) {
  const t = themes[example.theme];
  return (
    <div
      className="relative mx-auto flex aspect-[4.25/11] w-[232px] flex-col overflow-hidden rounded-[14px] shadow-[0_18px_40px_-14px_rgb(15_45_91/0.45)] ring-1 ring-black/5"
      style={{ background: t.body, color: t.text }}
      role="img"
      aria-label={`Sample ${example.industry.toLowerCase()} door hanger design for the fictional business ${example.business}`}
    >
      {/* die-cut hole + slit */}
      <div className="relative shrink-0 px-4 pb-3 pt-[70px]" style={{ background: t.top }}>
        <span className="absolute left-1/2 top-4 h-11 w-11 -translate-x-1/2 rounded-full bg-[#e4eaf3] ring-1 ring-black/10" />
        <div className="flex items-center gap-2">
          <LogoMark className="h-7 w-7 shrink-0" onDark={example.theme === "navy"} />
          <p
            className="font-display text-[0.8rem] font-extrabold leading-tight"
            style={{ color: example.theme === "orange" ? "#0F2D5B" : t.text }}
          >
            {example.business}
          </p>
        </div>
      </div>
      <div className="h-[118px] shrink-0 border-y-4" style={{ borderColor: t.accent }}>
        <Scene scene={example.scene} />
      </div>
      <div className="flex flex-1 flex-col px-4 pb-3 pt-3.5">
        <p className="font-display text-[0.9rem] font-extrabold uppercase leading-none">{example.kicker}</p>
        <p className="mt-1 font-display text-[1.85rem] font-extrabold uppercase leading-[0.95]" style={{ color: t.accent }}>
          {example.highlight}
        </p>
        <p className="font-display text-[1.6rem] font-extrabold uppercase leading-[0.95]">{example.headline}</p>
        <ul className="mt-3 space-y-1.5 text-[0.72rem] font-semibold" style={{ color: t.sub }}>
          {example.bullets.map((b) => (
            <li key={b} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: t.bullet }} />
              {b}
            </li>
          ))}
        </ul>
        <p
          className="mt-auto rounded-md border-2 border-dashed px-2 py-1.5 text-center font-display text-[0.7rem] font-extrabold uppercase"
          style={{ borderColor: t.accent }}
        >
          {example.offer}
        </p>
      </div>
      <div className="shrink-0 bg-brand-orange px-3 py-2.5 text-center text-navy-950">
        <p className="font-display text-[0.62rem] font-extrabold uppercase tracking-wider">Call today</p>
        <p className="font-display text-[1.05rem] font-extrabold leading-tight">(555) 555-0123</p>
      </div>
      <p className="shrink-0 bg-navy-900 px-2 py-1.5 text-center text-[0.55rem] font-bold uppercase tracking-wide text-white">
        {example.footer}
      </p>
    </div>
  );
}
