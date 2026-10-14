import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/queries";
import { requestSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await requestSiteUrl();
  if (!base) return [];
  const projects = await getProjects();

  return [
    { url: new URL("/", base).href, changeFrequency: "weekly", priority: 1 },
    { url: new URL("/projects", base).href, changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, base).href,
      lastModified: project.originalPostDate,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
