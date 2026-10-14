import type { MetadataRoute } from "next";
import { requestSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = await requestSiteUrl();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: base ? new URL("/sitemap.xml", base).href : undefined,
  };
}
