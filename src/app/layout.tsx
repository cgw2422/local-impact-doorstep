import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/lib/site";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Done-For-You Door Hanger Campaigns`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: `${site.name} | Done-For-You Door Hanger Campaigns`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Done-For-You Door Hanger Campaigns`,
    description: site.description,
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0F2D5B",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  ...(site.email ? { email: site.email } : {}),
  ...(site.phone ? { telephone: site.phone } : {}),
  ...(site.serviceArea ? { areaServed: site.serviceArea } : {}),
  priceRange: "$449–$699",
  makesOffer: [
    {
      "@type": "Offer",
      name: "500-Home Door Hanger Campaign",
      price: "449",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "1,000-Home Door Hanger Campaign",
      price: "699",
      priceCurrency: "USD",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
