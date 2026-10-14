import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getSettings } from "@/lib/queries";
import { configuredSiteUrl, homeDescription, homeTitle, ogImage, requestSiteUrl } from "@/lib/seo";
import "./globals.css";

const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const configured = configuredSiteUrl();
  const base = configured ?? (await requestSiteUrl());
  return {
    metadataBase: base ?? undefined,
    title: {
      default: homeTitle,
      template: "%s | 태양설비",
    },
    description: homeDescription,
    alternates: configured ? { canonical: "/" } : undefined,
    openGraph: {
      title: homeTitle,
      description: homeDescription,
      locale: "ko_KR",
      type: "website",
      url: configured ? "/" : undefined,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: homeTitle,
      description: homeDescription,
      images: [ogImage.url],
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const configured = configuredSiteUrl();
  const base = configured ?? (await requestSiteUrl());
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.businessName,
    telephone: settings.phone ?? undefined,
    areaServed: settings.region ?? undefined,
    sameAs: settings.blogUrl ? [settings.blogUrl] : undefined,
    url: configured?.origin,
    image: base ? new URL(ogImage.url, base).href : undefined,
  };

  return (
    <html lang="ko" className={jetbrains.variable} data-scroll-behavior="smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body id="top" className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-copper focus:px-4 focus:py-3 focus:font-semibold">
          본문 바로가기
        </a>
        <Header phone={settings.phone} blogUrl={settings.blogUrl} />
        <main id="main">{children}</main>
        <Footer settings={settings} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
