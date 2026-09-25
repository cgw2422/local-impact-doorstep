/**
 * Illustrated hero scene: a door hanger being placed on a residential front
 * door. Pure SVG, so it is crisp at any size and costs no image requests.
 * Swap for a real photo later via the `photo` prop on <HomeHero />.
 */
export function HeroScene({ className = "" }: { className?: string }) {
  const leaves = Array.from({ length: 56 }, (_, i) => {
    const a = (i / 56) * Math.PI * 2;
    const r = 44 + (i % 4) * 5;
    return {
      x: 300 + Math.cos(a) * r,
      y: 158 + Math.sin(a) * r,
      rot: (a * 180) / Math.PI + 90 + (i % 2 ? 25 : -25),
      fill: ["#2f6b3a", "#3d8248", "#285c32", "#4a9152"][i % 4],
    };
  });
  const berries = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2 + 0.3;
    return { x: 300 + Math.cos(a) * 56, y: 158 + Math.sin(a) * 56 };
  });

  return (
    <svg
      viewBox="0 0 600 560"
      className={className}
      role="img"
      aria-label="A Local Impact Doorstep team member hanging a branded door hanger on the handle of a navy front door"
    >
      <defs>
        <linearGradient id="hs-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9eef5" />
          <stop offset="1" stopColor="#d5dde8" />
        </linearGradient>
        <linearGradient id="hs-door" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a3d73" />
          <stop offset="1" stopColor="#0f2d5b" />
        </linearGradient>
        <radialGradient id="hs-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd9a3" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#ffb866" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffb866" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hs-brass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3d27a" />
          <stop offset="1" stopColor="#b8862f" />
        </linearGradient>
        <linearGradient id="hs-skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9b48f" />
          <stop offset="1" stopColor="#c98a63" />
        </linearGradient>
        <linearGradient id="hs-shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.18" />
          <stop offset="0.25" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <clipPath id="hs-clip">
          <rect width="600" height="560" />
        </clipPath>
        <clipPath id="hs-hanger">
          <rect x="0" y="0" width="104" height="250" rx="8" />
        </clipPath>
      </defs>

      <g clipPath="url(#hs-clip)">
        {/* siding wall */}
        <rect width="600" height="560" fill="url(#hs-wall)" />
        {Array.from({ length: 32 }, (_, i) => (
          <line key={i} x1="0" x2="600" y1={i * 18 + 8} y2={i * 18 + 8} stroke="#c3cedc" strokeWidth="1.5" />
        ))}

        {/* lantern */}
        <circle cx="98" cy="190" r="95" fill="url(#hs-glow)" />
        <rect x="93" y="118" width="10" height="22" fill="#1f2937" />
        <path d="M74 142h48l-6 14H80Z" fill="#111827" />
        <rect x="80" y="156" width="36" height="58" rx="2" fill="#ffe1ad" stroke="#111827" strokeWidth="5" />
        <line x1="98" y1="158" x2="98" y2="212" stroke="#111827" strokeWidth="3" />
        <path d="M76 214h44l-5 10H81Z" fill="#111827" />

        {/* door trim */}
        <rect x="168" y="28" width="284" height="560" fill="#f8fafc" />
        <rect x="168" y="28" width="284" height="560" fill="none" stroke="#dbe3ee" strokeWidth="2" />
        <rect x="160" y="18" width="300" height="18" rx="2" fill="#ffffff" stroke="#dbe3ee" strokeWidth="2" />

        {/* door */}
        <rect x="188" y="48" width="244" height="540" fill="url(#hs-door)" />
        <rect x="188" y="48" width="244" height="540" fill="url(#hs-shade)" />
        {[
          [212, 250, 88, 150],
          [320, 250, 88, 150],
          [212, 420, 88, 150],
          [320, 420, 88, 150],
        ].map(([x, y, w, h]) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width={w} height={h} rx="3" fill="#0c2650" />
            <rect x={x + 7} y={y + 7} width={w - 14} height={h - 14} rx="2" fill="none" stroke="#244a85" strokeWidth="2" />
          </g>
        ))}
        {/* top window panel */}
        <rect x="212" y="72" width="196" height="150" rx="3" fill="#0c2650" />
        <rect x="219" y="79" width="182" height="136" rx="2" fill="none" stroke="#244a85" strokeWidth="2" />

        {/* wreath */}
        <path d="M300 58v40" stroke="#b8862f" strokeWidth="3" />
        {leaves.map((l, i) => (
          <ellipse
            key={i}
            cx={l.x}
            cy={l.y}
            rx="16"
            ry="7"
            fill={l.fill}
            transform={`rotate(${l.rot} ${l.x} ${l.y})`}
          />
        ))}
        {berries.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r="4.2" fill={i % 3 === 0 ? "#f97316" : "#d9442b"} />
        ))}
        <path d="M284 212l16-10 16 10-6 22-10-12-10 12Z" fill="#f97316" />
        <circle cx="300" cy="204" r="6" fill="#ea580c" />

        {/* handle */}
        <rect x="392" y="300" width="18" height="74" rx="9" fill="url(#hs-brass)" />
        <circle cx="401" cy="358" r="4" fill="#7a5418" />
        <rect x="384" y="312" width="44" height="12" rx="6" fill="url(#hs-brass)" />

        {/* arm (behind hanger) */}
        <path d="M650 660 L570 500" stroke="#0f2d5b" strokeWidth="112" strokeLinecap="round" />
        <path d="M616 556 L530 504" stroke="#f97316" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
        <path d="M552 480 L482 418" stroke="url(#hs-skin)" strokeWidth="50" strokeLinecap="round" />

        {/* hanger shadow */}
        <g transform="translate(352 300) rotate(-4)">
          <rect x="0" y="4" width="104" height="250" rx="8" fill="#000" opacity="0.18" />
        </g>

        {/* door hanger */}
        <g transform="translate(346 296) rotate(-4)">
          <g clipPath="url(#hs-hanger)">
            <rect width="104" height="250" fill="#ffffff" />
            <rect width="104" height="92" fill="#0f2d5b" />
            {/* mini house photo */}
            <rect y="92" width="104" height="44" fill="#9cc3e6" />
            <path d="M0 136V120l22-12 22 12v-6l24-14 36 22v14Z" fill="#e5e7eb" />
            <path d="M0 120l22-12 22 12M44 114l24-14 36 22" fill="none" stroke="#4b5563" strokeWidth="3" />
            <rect x="12" y="124" width="8" height="8" fill="#0f2d5b" />
            <rect x="60" y="118" width="10" height="10" fill="#0f2d5b" />
            <path d="M0 136h104" stroke="#f97316" strokeWidth="4" />
            <text x="8" y="154" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="12.5" fill="#0f2d5b">
              LOCAL
            </text>
            <text x="8" y="168" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="12.5" fill="#0f2d5b">
              TRUSTED
            </text>
            <text x="8" y="182" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="12.5" fill="#0f2d5b">
              PROS
            </text>
            <text x="8" y="196" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="12.5" fill="#0f2d5b">
              LIVE HERE.
            </text>
            <path d="M8 204c20-4 44-4 66-2" stroke="#f97316" strokeWidth="3" fill="none" strokeLinecap="round" />
            <rect y="214" width="104" height="36" fill="#f97316" />
            <text x="52" y="229" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="8" fill="#ffffff">
              SUPPORT LOCAL
            </text>
            <text x="52" y="240" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="8" fill="#ffffff">
              BUSINESSES
            </text>
          </g>
          {/* logo on hanger */}
          <g transform="translate(10 44) scale(0.62)">
            <path d="M4 23.5 24 6.5l20 17" fill="none" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.5 20.5V41.5h10" fill="none" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" />
            <path d="M17.2 24.2 25.6 26.4V42.6l-8.4-1.4Z" fill="#F97316" />
            <path d="M37 22.5c-4.3 0-7.8 3.4-7.8 7.7 0 5.6 7.8 13.8 7.8 13.8s7.8-8.2 7.8-13.8c0-4.3-3.5-7.7-7.8-7.7Z" fill="#F97316" />
            <circle cx="37" cy="30.2" r="2.8" fill="#fff" />
          </g>
          <text x="44" y="60" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="9" fill="#ffffff">
            Local Impact
          </text>
          <text x="44" y="71" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="10" fill="#f97316">
            Doorstep
          </text>
          {/* hanger hole around the handle */}
          <circle cx="52" cy="24" r="15" fill="#0c2650" />
          <path d="M52 9v-4" stroke="#0f2d5b" strokeWidth="0" />
          <rect x="0" y="0" width="104" height="250" rx="8" fill="none" stroke="#0b2247" strokeOpacity="0.25" />
        </g>
        {/* handle lever passing in front of the hanger hole */}
        <rect x="384" y="312" width="44" height="12" rx="6" fill="url(#hs-brass)" />

        {/* hand gripping the hanger edge */}
        <g>
          <ellipse cx="468" cy="410" rx="28" ry="34" fill="url(#hs-skin)" transform="rotate(-28 468 410)" />
          {/* fingers curled over the front face */}
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={436 + i * 1.5}
              y={384 + i * 13}
              width="34"
              height="12.5"
              rx="6.25"
              fill="url(#hs-skin)"
              stroke="#b87a55"
              strokeWidth="1"
              transform={`rotate(-8 ${453 + i * 1.5} ${390 + i * 13})`}
            />
          ))}
        </g>

        {/* porch step */}
        <rect x="120" y="540" width="380" height="20" fill="#9ca3af" />
        <rect x="120" y="540" width="380" height="4" fill="#d1d5db" />

        {/* planter */}
        <path d="M44 470h86l-10 90H54Z" fill="#0f2d5b" />
        <rect x="40" y="462" width="94" height="14" rx="3" fill="#153468" />
        <circle cx="87" cy="430" r="44" fill="#2f6b3a" />
        <circle cx="66" cy="420" r="24" fill="#3d8248" />
        <circle cx="106" cy="412" r="22" fill="#3d8248" />
        <circle cx="88" cy="398" r="20" fill="#4a9152" />
      </g>
    </svg>
  );
}
