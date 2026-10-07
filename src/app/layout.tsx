import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fraunces, manrope } from "./fonts";
import { site } from "@/lib/site";
import { Providers } from "@/components/motion/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Construction company in Pune`, template: `%s · ${site.name}` },
  description: site.description,
  keywords: ["construction company Pune", "builders in Pune", "industrial shed construction Chakan", "bungalow construction Pune", "PEB contractor Pune", "interior fit-out Pune"],
  openGraph: { type: "website", locale: "en_IN", siteName: site.name, title: site.name, description: site.description },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f5f1e8",
  width: "device-width",
  initialScale: 1,
};

// LocalBusiness structured data → eligible for rich results on "construction company in Pune".
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  foundingDate: String(site.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411045",
    addressCountry: "IN",
  },
  areaServed: ["Pune", "Pimpri-Chinchwad", "Chakan", "Talegaon", "Hinjawadi"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
