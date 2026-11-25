import type { Metadata } from "next";
import { Legal } from "@/components/legal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Bright Decor collects, uses and protects your personal information when you use this website or request a quote.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <Legal title="Privacy Policy" updated="November 2026">
      <p>
        Bright Decor (“we”, “us”) respects your privacy and handles personal information in line with the Australian Privacy Act 1988 and the Australian Privacy Principles.
      </p>

      <h2>Information we collect</h2>
      <p>When you request a quote or contact us we collect the details you provide:</p>
      <ul>
        <li>your name, phone number and email address;</li>
        <li>your suburb or property address (optional);</li>
        <li>the service you need and any project details you choose to share.</li>
      </ul>

      <h2>How we use it</h2>
      <p>We use this information only to respond to your enquiry, prepare and deliver a quote, and carry out any work you engage us for. We do not sell your information or use it for unrelated marketing.</p>

      <h2>How it is delivered and stored</h2>
      <p>
        Form submissions are sent to us by email or messaging through trusted service providers that deliver the message on our behalf. This website does not use advertising cookies. We may use privacy-friendly, aggregated analytics to understand how the site is used.
      </p>

      <h2>Disclosure</h2>
      <p>We only share personal information with service providers needed to deliver our service, or where required by law.</p>

      <h2>Access and correction</h2>
      <p>
        You can ask to access, correct or delete the personal information we hold about you at any time by emailing <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or calling {SITE.phone}.
      </p>

      <h2>Contact</h2>
      <p>
        Bright Decor, {SITE.address.street}, {SITE.address.suburb} {SITE.address.state} {SITE.address.postcode}.
      </p>
    </Legal>
  );
}
