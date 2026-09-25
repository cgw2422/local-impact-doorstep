import { CalendarCheck, Camera, CircleCheck, Hash, MapPin, Route } from "lucide-react";

function MockMap() {
  const pins = [
    [70, 60],
    [150, 48],
    [228, 72],
    [96, 128],
    [188, 118],
    [262, 140],
    [126, 190],
    [214, 196],
  ];
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" role="img" aria-label="Sample map showing the covered neighborhood and delivery route">
      <rect width="320" height="240" fill="#eef3fa" />
      {/* blocks */}
      {Array.from({ length: 6 }).map((_, c) =>
        Array.from({ length: 5 }).map((__, r) => (
          <rect key={`${c}-${r}`} x={8 + c * 52} y={6 + r * 47} width="44" height="38" rx="4" fill="#dbe4f0" />
        )),
      )}
      {/* park + water */}
      <rect x="268" y="6" width="44" height="85" rx="6" fill="#cfe6cf" />
      <path d="M0 214c40-10 70 12 120 4s90-18 200-2v24H0Z" fill="#bfd9f2" />
      {/* covered area */}
      <path
        d="M40 30 L250 34 L286 150 L240 222 L80 216 L30 150 Z"
        fill="#f97316"
        fillOpacity="0.16"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeDasharray="6 5"
      />
      {/* route */}
      <path
        d="M56 44 H248 M248 44 V96 H52 M52 96 V142 H262 M262 142 V188 H70"
        fill="none"
        stroke="#0f2d5b"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
      {pins.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 -16c-5 0-9 4-9 9 0 7 9 16 9 16s9-9 9-16c0-5-4-9-9-9Z" fill="#f97316" stroke="#fff" strokeWidth="1.5" />
          <circle cy="-7" r="3" fill="#fff" />
        </g>
      ))}
    </svg>
  );
}

function ProofPhoto({ variant }: { variant: 0 | 1 }) {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" role="img" aria-label="Sample proof photo of a door hanger on a front door">
      <rect width="120" height="90" fill={variant ? "#cbd5e1" : "#e2e8f0"} />
      <rect x="34" y="8" width="52" height="82" fill={variant ? "#7c2d12" : "#0f2d5b"} />
      <rect x="40" y="16" width="40" height="28" rx="2" fill="#000" opacity="0.15" />
      <rect x="40" y="50" width="40" height="34" rx="2" fill="#000" opacity="0.15" />
      <circle cx="78" cy="50" r="2.5" fill="#f3d27a" />
      <g transform="rotate(-4 70 58)">
        <rect x="64" y="46" width="16" height="36" rx="2" fill="#fff" />
        <rect x="64" y="46" width="16" height="12" rx="2" fill="#0f2d5b" />
        <rect x="64" y="74" width="16" height="8" fill="#f97316" />
        <circle cx="72" cy="50" r="2.4" fill={variant ? "#7c2d12" : "#0f2d5b"} />
      </g>
      {variant === 1 && <rect x="0" y="70" width="34" height="20" fill="#4a9152" />}
      {variant === 0 && <circle cx="18" cy="72" r="14" fill="#3d8248" />}
    </svg>
  );
}

const rows = [
  { icon: CircleCheck, label: "Campaign status", value: "Completed" },
  { icon: Hash, label: "Homes distributed", value: "1,000" },
  { icon: CalendarCheck, label: "Date completed", value: "Tuesday, May 12" },
  { icon: MapPin, label: "Target area", value: "Maple Ridge & Oak Hollow" },
];

/** Mock completion report card (clearly labelled as a sample). */
export function CompletionReport() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-[var(--shadow-lift)]">
      <div className="flex items-center justify-between gap-3 bg-navy-800 px-5 py-4 text-white">
        <div>
          <p className="font-display text-base font-extrabold sm:text-lg">Campaign Completion Report</p>
          <p className="text-xs text-navy-100">1,000-Home Campaign · Sample Roofing Co.</p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-navy-50 ring-1 ring-white/20">
          Sample
        </span>
      </div>
      <div className="grid gap-5 p-5 sm:grid-cols-[1.15fr_1fr]">
        <div className="overflow-hidden rounded-xl ring-1 ring-navy-100">
          <MockMap />
        </div>
        <dl className="space-y-3">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="relative pl-8">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-ink">
                <Icon className="absolute left-0 top-0.5 h-5 w-5 text-orange-ink" aria-hidden="true" />
                {label}
              </dt>
              <dd className="font-display font-bold text-navy-800">
                  {label === "Campaign status" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-0.5 text-sm text-green-800 ring-1 ring-green-200">
                      {value}
                    </span>
                  ) : (
                    value
                  )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="grid gap-5 border-t border-navy-100 p-5 sm:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-ink">
            <Route className="h-4 w-4 text-orange-ink" aria-hidden="true" /> Streets covered
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {["Maple Ridge Dr", "Oak Hollow Ln", "Birchwood Ct", "Cedar Bend Way", "Willow Park Rd", "+ 6 more"].map((s) => (
              <li key={s} className="rounded-md bg-offwhite px-2 py-1 text-xs font-medium text-navy-800 ring-1 ring-navy-100">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-ink">
            <Camera className="h-4 w-4 text-orange-ink" aria-hidden="true" /> Photo proof
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-navy-100">
              <ProofPhoto variant={0} />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-navy-100">
              <ProofPhoto variant={1} />
            </div>
          </div>
        </div>
      </div>
      <figcaption className="border-t border-navy-100 bg-offwhite px-5 py-3 text-xs text-slate-ink">
        Illustrative sample. Actual reports reflect your campaign&apos;s real area, dates, and counts.
      </figcaption>
    </figure>
  );
}
