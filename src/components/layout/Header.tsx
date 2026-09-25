"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { nav, site, telHref } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu whenever the route changes.
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 80rem)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100/70 bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-page flex h-[4.75rem] items-center justify-between gap-4 lg:h-[5.25rem]">
        <Link href="/" className="rounded-md" aria-label={`${site.name} home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative whitespace-nowrap rounded-md px-3 py-2 text-[0.95rem] font-semibold transition-colors hover:text-orange-ink ${
                      active
                        ? "text-navy-800 after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand-orange"
                        : "text-navy-800/80"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <ButtonLink href="/quote" size="md">
              Get a Quote
            </ButtonLink>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy-800 hover:bg-navy-50 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              setOpenedAt(pathname);
              setOpen((v) => !v);
            }}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="h-7 w-7" aria-hidden="true" /> : <Menu className="h-7 w-7" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[4.75rem] overflow-y-auto border-t border-navy-100 bg-white lg:top-[5.25rem] xl:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-4">
            <ul className="divide-y divide-navy-100">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between py-4 font-display text-lg font-bold ${
                        active ? "text-orange-ink" : "text-navy-800"
                      }`}
                    >
                      {item.label}
                      <ArrowRight className="h-5 w-5 opacity-40" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 grid gap-3">
              <ButtonLink href="/quote" size="lg" onClick={() => setOpen(false)}>
                Get a Quote <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </ButtonLink>
              {site.phone && (
                <a
                  href={telHref(site.phone)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-navy-800 font-display font-bold text-navy-800"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" /> {site.phone}
                </a>
              )}
            </div>
            <p className="mt-6 text-center text-sm text-slate-ink">{site.tagline}</p>
          </nav>
        </div>
      )}
    </header>
  );
}
