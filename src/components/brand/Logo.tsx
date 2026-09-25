type MarkProps = { className?: string; onDark?: boolean };

/** The house + door + pin brand mark. */
export function LogoMark({ className, onDark = false }: MarkProps) {
  const navy = onDark ? "#ffffff" : "#0F2D5B";
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      {/* chimney */}
      <rect x="31" y="8" width="5" height="9" rx="0.5" fill={navy} />
      {/* roof + walls */}
      <path
        d="M4 23.5 24 6.5l20 17"
        fill="none"
        stroke={navy}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 20.5V41.5h10" fill="none" stroke={navy} strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* door frame */}
      <rect x="16" y="23" width="12" height="18.5" rx="0.8" fill="none" stroke={navy} strokeWidth="2.4" />
      {/* open door */}
      <path d="M17.2 24.2 25.6 26.4V42.6l-8.4-1.4Z" fill="#F97316" />
      <circle cx="23.4" cy="34.6" r="1.1" fill="#ffffff" />
      {/* walkway */}
      <path d="M22 44.5c-4.5.4-9 .3-14.5 1.5" fill="none" stroke={onDark ? "#9FB3D1" : "#6B7280"} strokeWidth="2.4" strokeLinecap="round" />
      {/* map pin */}
      <path
        d="M37 22.5c-4.3 0-7.8 3.4-7.8 7.7 0 5.6 7.8 13.8 7.8 13.8s7.8-8.2 7.8-13.8c0-4.3-3.5-7.7-7.8-7.7Z"
        fill="#F97316"
        stroke={onDark ? "#0F2D5B" : "#ffffff"}
        strokeWidth="1.6"
      />
      <circle cx="37" cy="30.2" r="2.8" fill="#ffffff" />
    </svg>
  );
}

type LogoProps = { className?: string; onDark?: boolean; showTagline?: boolean };

/** Full lockup: mark + wordmark (+ optional tagline). Decorative; wrap in a labelled link. */
export function Logo({ className = "", onDark = false, showTagline = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-hidden="true">
      <LogoMark className="h-11 w-11 shrink-0 sm:h-12 sm:w-12" onDark={onDark} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.15rem] font-extrabold tracking-tight sm:text-[1.3rem] ${
            onDark ? "text-white" : "text-navy-800"
          }`}
        >
          Local Impact
        </span>
        <span className="font-display text-[1.3rem] font-extrabold tracking-tight text-brand-orange sm:text-[1.45rem]">
          Doorstep
        </span>
        {showTagline && (
          <span
            className={`mt-1 text-[0.62rem] font-medium tracking-wide sm:text-[0.68rem] ${
              onDark ? "text-navy-100" : "text-slate-ink"
            }`}
          >
            Your business. On local doorsteps.
          </span>
        )}
      </span>
    </span>
  );
}
