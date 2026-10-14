import type { Metadata } from "next";
import { headers } from "next/headers";

export const homeTitle = "태양설비 | 홍천 보일러·배관·누수탐지 설비공사";
export const homeDescription =
  "강원도 홍천 태양설비. 보일러 설치, 수도배관, 누수탐지, 하수구, 정화조 시공 등 주요 서비스와 실제 시공 사례를 확인하세요.";

export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "태양설비, 홍천 보일러·배관 설비공사",
};

/** 설정된 공개 주소만 사용한다. 값이 없으면 주소를 만들지 않는다. */
export function configuredSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw.includes("://") ? raw : `https://${raw}`);
  } catch {
    return null;
  }
}

export async function requestSiteUrl() {
  const configured = configuredSiteUrl();
  if (configured) return configured;
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  if (!host) return null;
  const proto = headerList.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  try {
    return new URL(`${proto}://${host}`);
  } catch {
    return null;
  }
}

export function pageMetadata(path: string, title: string, description: string, image: { url: string; width?: number; height?: number; alt: string } = ogImage): Metadata {
  const base = configuredSiteUrl();
  const socialTitle = title.includes("|") ? title : `${title} | 태양설비`;
  return {
    title,
    description,
    alternates: base ? { canonical: path } : undefined,
    openGraph: {
      title: socialTitle,
      description,
      url: base ? path : undefined,
      locale: "ko_KR",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
  };
}
