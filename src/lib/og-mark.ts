/** Brand mark as a data URI for next/og image generation. */
export function markDataUri(onDark = false): string {
  const navy = onDark ? "#ffffff" : "#0F2D5B";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="31" y="8" width="5" height="9" fill="${navy}"/><path d="M4 23.5 24 6.5l20 17" fill="none" stroke="${navy}" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 20.5V41.5h10" fill="none" stroke="${navy}" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/><rect x="16" y="23" width="12" height="18.5" rx="0.8" fill="none" stroke="${navy}" stroke-width="2.4"/><path d="M17.2 24.2 25.6 26.4V42.6l-8.4-1.4Z" fill="#F97316"/><path d="M37 22.5c-4.3 0-7.8 3.4-7.8 7.7 0 5.6 7.8 13.8 7.8 13.8s7.8-8.2 7.8-13.8c0-4.3-3.5-7.7-7.8-7.7Z" fill="#F97316" stroke="${onDark ? "#0F2D5B" : "#ffffff"}" stroke-width="1.6"/><circle cx="37" cy="30.2" r="2.8" fill="#ffffff"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
