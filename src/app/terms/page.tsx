import type { Metadata } from "next";
import Link from "next/link";

import { ContactLine, LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Terms",
  description: `The basic terms that apply to ${site.name} door hanger design, printing, and distribution campaigns.`,
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Service Terms" updated="September 25, 2026">
      <p>
        These terms describe how {site.name} campaigns work. By booking a campaign, you agree to these terms along with
        any details confirmed in your written quote or invoice. If your quote or invoice says something different, the
        quote or invoice controls.
      </p>

      <h2>1. Our services</h2>
      <p>
        We provide done-for-you door hanger campaigns, which include custom design, printing, personal distribution to
        homes in an agreed target area, and a completion report. Package contents and pricing are described on our{" "}
        <Link href="/pricing">Pricing page</Link> and confirmed in your quote.
      </p>

      <h2>2. What we guarantee</h2>
      <p>
        <strong>We guarantee distribution, not marketing results.</strong> We will distribute the agreed number of door
        hangers to homes within the agreed target area. We do not guarantee any number of leads, calls, customers,
        sales, or return on investment. Results depend on many factors outside our control, including your offer,
        pricing, market, timing, and follow-up.
      </p>

      <h2>3. Quotes, payment, and scheduling</h2>
      <ul>
        <li>Quote requests submitted on this website are not orders and do not create any obligation.</li>
        <li>A campaign is booked once we confirm the details in writing and you pay the invoice.</li>
        <li>Printing begins only after payment and your written approval of the final design.</li>
        <li>
          Timelines are estimates. Weather, print production, revisions, and access conditions may affect scheduling.
        </li>
      </ul>

      <h2>4. Design and approval</h2>
      <p>
        We will send you a digital proof for review. You are responsible for checking all content, including phone
        numbers, prices, offers, licensing details, and spelling, before approving. Once you approve a design, we are
        not responsible for errors in the approved content.
      </p>

      <h2>5. Your content</h2>
      <p>
        You confirm that you have the right to use any logos, images, text, and offers you provide, and that your
        offers and claims are accurate and lawful. You grant us permission to use your content to produce your
        campaign.
      </p>

      <h2>6. Distribution practices</h2>
      <ul>
        <li>Door hangers are placed on front doors or door handles.</li>
        <li>Materials are not placed inside mailboxes unless legally permitted.</li>
        <li>
          We respect posted signs asking not to leave flyers or solicitations, and we skip homes or communities where
          access is restricted. Skipped homes are not counted toward your distribution total.
        </li>
        <li>We may adjust routes within your general target area to reach the agreed number of homes.</li>
      </ul>

      <h2>7. Custom quotes</h2>
      <p>
        Special requests, unusually spread-out routes, custom quantities, rush timelines, or areas outside our standard
        service area may require a custom quote. We will tell you before any additional charge applies.
      </p>

      <h2>8. Changes and cancellations</h2>
      <p>
        You may cancel before printing begins. If design work has already started, we may retain a reasonable portion
        of the payment for work performed, as described in your quote or invoice. Once printing has started, the
        campaign cannot be canceled for a refund of printing costs.
      </p>

      <h2>9. Completion reports</h2>
      <p>
        After distribution, we provide a completion report that summarizes the number of homes reached, the date
        completed, and the general area and streets covered, with photos where practical.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the extent permitted by law, our total liability for any claim related to a campaign is limited to the
        amount you paid for that campaign. We are not liable for indirect or consequential damages, including lost
        profits or lost business.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The terms in effect when you book a campaign apply to that
        campaign.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these terms? Reach us through <ContactLine />.
      </p>
    </LegalPage>
  );
}
