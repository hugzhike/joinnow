import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://joinnow-app.example";

const title = "JoinNow — Ne fais plus jamais une activité seul";
const description =
  "Trouve quelqu'un de dispo en quelques minutes pour jouer, courir, sortir ou explorer, près de chez toi. Padel, running, randonnée, sorties : rejoins la liste d'attente à Nice.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · JoinNow",
  },
  description,
  keywords: [
    "JoinNow",
    "activités entre gens",
    "trouver un partenaire de sport",
    "padel Nice",
    "running Nice",
    "rencontres sportives",
    "sorties spontanées",
    "Alpes-Maritimes",
  ],
  authors: [{ name: "JoinNow" }],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "JoinNow",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf9f6",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "JoinNow",
  url: siteUrl,
  description,
  sameAs: ["https://instagram.com/joinnow.app", "https://www.tiktok.com/@joinnow.app"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "JoinNow",
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cloud-50 text-ink-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
