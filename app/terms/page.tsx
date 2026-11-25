import type { Metadata } from "next";
import { Legal } from "@/components/legal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the Bright Decor website and for quotes provided by Bright Decor.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Legal title="Terms of Use" updated="November 2026">
      <p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>

      <h2>Information on this site</h2>
      <p>The content on this website is general information about our services. We take care to keep it accurate, but it may change without notice and does not form a contract.</p>

      <h2>Quotes</h2>
      <p>A quote request does not create an agreement. Work is only agreed once you accept a written quote from Bright Decor. Quotes state their scope, price and validity period.</p>

      <h2>Workmanship guarantee</h2>
      <p>Bright Decor offers a 5-year workmanship guarantee on work we complete. The full conditions are provided with your written quote.</p>

      <h2>Intellectual property</h2>
      <p>Text, images and the Bright Decor name and logo on this site belong to Bright Decor and may not be reused without permission.</p>

      <h2>Limitation of liability</h2>
      <p>To the extent permitted by law, we are not liable for loss arising from your use of this website. Nothing in these terms limits your rights under the Australian Consumer Law.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of Queensland, Australia.</p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </Legal>
  );
}
