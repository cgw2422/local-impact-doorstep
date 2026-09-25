import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "navy" | "outline" | "outline-light" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-display font-bold transition-[background-color,border-color,color,box-shadow,transform] duration-150 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-orange text-navy-950 shadow-[0_6px_16px_-6px_rgb(249_115_22/0.7)] hover:bg-[#ff8a3d] hover:shadow-[0_10px_22px_-8px_rgb(249_115_22/0.8)]",
  navy: "bg-navy-800 text-white hover:bg-navy-700 shadow-[0_6px_16px_-8px_rgb(15_45_91/0.6)]",
  outline: "border-2 border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white",
  "outline-light": "border-2 border-white/80 text-white hover:bg-white hover:text-navy-800",
  ghost: "text-navy-800 hover:bg-navy-50",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-[0.95rem]",
  lg: "min-h-14 px-7 text-base sm:text-[1.05rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type CommonProps = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentPropsWithoutRef<typeof Link>, "className">) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  type = "button",
  ...rest
}: CommonProps & Omit<ComponentPropsWithoutRef<"button">, "className">) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
