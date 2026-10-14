import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getSettings } from "@/lib/queries";
import "./globals.css";

const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: {
    default: "태양설비공사 | 홍천 보일러 · 배관 · 누수 · 하수구 · 정화조 · 집수리",
    template: "%s | 태양설비공사",
  },
  description: "강원도 홍천 설비 시공. 보일러 설치·교체, 배관, 누수, 하수구, 정화조, 집수리를 실제 현장 사진으로 확인하세요.",
  keywords: ["홍천보일러", "홍천배관공사", "홍천누수", "홍천하수구", "홍천정화조", "홍천집수리"],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: settings.businessName,
    telephone: settings.phone ?? undefined,
    areaServed: settings.region ?? undefined,
    sameAs: settings.blogUrl ? [settings.blogUrl] : undefined,
  };

  return (
    <html lang="ko" className={jetbrains.variable}>
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
