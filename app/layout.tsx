import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileCta } from "@/components/mobile-cta";
import { JsonLd, siteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import "./globals.css";

const serif = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], variable: "--f-serif", display: "swap" });
const sans = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--f-sans", display: "swap" });

const title = "Painters Brisbane | Residential, Commercial & Body Corporate | Bright Decor";
const description =
  "Bright Decor are licensed, insured Brisbane painters with 20+ years' experience. Residential, commercial and body corporate painting with a 5-year workmanship guarantee. Free quote.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: "%s | Bright Decor" },
  description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  keywords: ["painters Brisbane", "house painters Brisbane", "commercial painters Brisbane", "body corporate painting", "strata painting Brisbane", "exterior painting", "interior painting", "Sunnybank Hills painter"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE.url,
    siteName: SITE.name,
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Freshly painted modern Queensland home by Bright Decor" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: { "msvalidate.01": "EF0708005C6D7ABB43E456DF919321AC" },
  },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" data-scroll-behavior="smooth" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only z-[60] rounded-lg bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCta />
        <JsonLd nodes={siteSchema} />
      </body>
    </html>
  );
}
