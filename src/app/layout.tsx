import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton, Dancing_Script } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";
import { PortfolioProvider } from "@/components/PortfolioProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { personalInfo } = await getContent();
  const { name, role, tagline } = personalInfo;

  return {
    metadataBase: new URL("https://gerald-pongos.vercel.app"),
    title: `${name} | ${role}`,
    description: tagline,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
      apple: "/favicon.svg",
    },
    keywords: [
      "eCommerce Virtual Assistant",
      "Shopify VA",
      "Amazon Product Research",
      "eBay Listing Optimization",
      "Dropshipping",
      "Marketplace Operations",
    ],
    authors: [{ name: name }],
    creator: name,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "profile",
      locale: "en_US",
      url: "https://gerald-pongos.vercel.app",
      title: `${name} | ${role}`,
      description: tagline,
      siteName: `${name} Portfolio`,
      images: [
        {
          url: personalInfo.avatarUrl,
          width: 328,
          height: 509,
          alt: `${name} Portrait`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${role}`,
      description: tagline,
      images: [personalInfo.avatarUrl],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  const { name, role, tagline, socials } = content.personalInfo;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": role,
    "description": tagline,
    "url": "https://gerald-pongos.vercel.app",
    "sameAs": [
      socials.linkedin || "",
      socials.facebook || "",
    ].filter(Boolean),
    "knowsAbout": [
      "eCommerce Management",
      "Shopify",
      "Amazon Marketplace",
      "eBay",
      "Product Research",
      "Inventory Management",
      "SEO Listing Optimization",
      "Dropshipping",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${dancingScript.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#050403] text-[#f5efe4]">
        <PortfolioProvider data={content}>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
