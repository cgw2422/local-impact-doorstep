import type { Metadata } from "next";

import { ContactLine, LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects the information you share with us.`,
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="September 25, 2026">
      <p>
        {site.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy. This policy explains
        what information we collect through this website, how we use it, and the choices you have.
      </p>

      <h2>Information we collect</h2>
      <p>When you request a quote or contact us, we collect the information you choose to provide, such as:</p>
      <ul>
        <li>Your name, business name, email address, and phone number</li>
        <li>Your business type and website</li>
        <li>Details about your campaign, such as target areas, city, neighborhoods, offer, and timing</li>
        <li>Any notes, logos, or artwork you send us</li>
      </ul>
      <p>
        Like most websites, our hosting provider may automatically record basic technical information, such as IP
        address, browser type, and pages visited, for security and performance purposes.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your quote request and communicate with you about your campaign</li>
        <li>To design, print, distribute, and report on campaigns you purchase</li>
        <li>To send invoices and handle billing</li>
        <li>To protect our website against spam and abuse</li>
        <li>To comply with legal obligations</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>How we share information</h2>
      <p>
        We share information only with service providers who help us operate our business, such as website hosting,
        email delivery, printing, and payment processing, and only as needed for them to provide those services. We
        may also disclose information if required by law or to protect our rights.
      </p>

      <h2>Cookies</h2>
      <p>
        This website does not use advertising cookies. Our hosting provider may use strictly necessary cookies or
        similar technologies to deliver the site securely.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep quote requests and campaign records for as long as needed to serve you and to meet our business, tax,
        and legal obligations. You can ask us to delete your information at any time, subject to those obligations.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable measures to protect the information you share with us. No method of transmission or storage
        is completely secure, so we cannot guarantee absolute security.
      </p>

      <h2>Your choices</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information by contacting us. If we
        send you marketing emails, you can opt out at any time.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>This website is intended for business owners and is not directed to children under 13.</p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The &quot;Last updated&quot; date above shows when it was last
        changed.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy? Reach us through <ContactLine />.
      </p>
    </LegalPage>
  );
}
