import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { site, telHref } from "@/lib/site";

const columns = [
  {
    title: "Campaigns",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/examples", label: "Sample Campaigns" },
      { href: "/quote", label: "Get a Quote" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/industries", label: "Who We Help" },
      { href: "/#faq", label: "FAQ" },
      { href: "/quote", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Service Terms" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-900 text-navy-100">
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1.4fr_2fr] lg:py-16">
        <div className="max-w-sm">
          <Link href="/" aria-label={`${site.name} home`} className="inline-block rounded-md">
            <Logo onDark />
          </Link>
          <p className="mt-5 leading-relaxed text-navy-100">
            Done-for-you neighborhood advertising for local home-service businesses. We design it, print it, and
            deliver it.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 hover:text-white">
                  <Mail className="h-4 w-4 text-brand-orange" aria-hidden="true" /> {site.email}
                </a>
              </li>
            )}
            {site.phone && (
              <li>
                <a href={telHref(site.phone)} className="inline-flex items-center gap-2.5 hover:text-white">
                  <Phone className="h-4 w-4 text-brand-orange" aria-hidden="true" /> {site.phone}
                </a>
              </li>
            )}
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
              <span>
                {site.serviceArea
                  ? `Serving ${site.serviceArea}`
                  : "Serving select local markets. Ask us about your area."}
              </span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="eyebrow text-white">{col.title}</h2>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[0.95rem] text-navy-100 transition-colors hover:text-brand-orange">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-navy-200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-display font-semibold text-navy-100">Local businesses. Real neighborhoods.</p>
        </div>
      </div>
    </footer>
  );
}
