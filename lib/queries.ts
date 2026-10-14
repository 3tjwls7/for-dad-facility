import { cache } from "react";
import { isBannerSortOrder } from "@/lib/banners";
import { isCategory, localAboutPhoto, localProjects, localServices, localSettings } from "@/lib/local-catalog";
import { createPublicClient, storagePublicUrl } from "@/lib/supabase/server";
import type { Project, ProjectImage, ServiceItem, SiteSettings } from "@/lib/types";

type ProjectRow = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  original_blog_id: string;
  original_blog_url: string;
  original_post_date: string;
  is_featured: boolean;
  published: boolean;
  cover_image_path: string | null;
  project_images: {
    storage_path: string;
    alt_text: string;
    sort_order: number;
  }[];
};

function toImage(row: ProjectRow["project_images"][number], title: string): ProjectImage {
  return {
    sortOrder: row.sort_order,
    src: storagePublicUrl(row.storage_path),
    alt: row.alt_text || `${title} 현장 사진`,
    isPublic: true,
    reviewNote: null,
    storagePath: row.storage_path,
  };
}

function toProject(row: ProjectRow): Project | null {
  if (!isCategory(row.category)) return null;
  const images = (row.project_images ?? [])
    .filter((image) => !isBannerSortOrder(row.original_blog_id, image.sort_order))
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((image) => toImage(image, row.title));
  if (!images.length) return null;
  const cover = images.find((image) => image.storagePath === row.cover_image_path) ?? images[0];
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    content: row.content.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean),
    category: row.category,
    originalBlogUrl: row.original_blog_url,
    originalPostDate: row.original_post_date,
    isFeatured: row.is_featured,
    published: row.published,
    cover,
    images,
  };
}

async function remoteProjects(): Promise<Project[] | null> {
  const supabase = createPublicClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("projects")
    .select(
      "slug,title,summary,content,category,original_blog_id,original_blog_url,original_post_date,is_featured,published,cover_image_path,project_images(storage_path,alt_text,sort_order)",
    )
    .eq("published", true)
    .order("original_post_date", { ascending: false });
  if (error || !data?.length) return null;
  return (data as ProjectRow[]).map(toProject).filter((item): item is Project => item !== null);
}

export const getProjects = cache(async () => {
  const remote = await remoteProjects();
  return remote?.length ? remote : localProjects();
});

export async function getProject(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects
    .filter((project) => project.isFeatured)
    .sort((a, b) => b.originalPostDate.localeCompare(a.originalPostDate));
}

export async function getServices(): Promise<ServiceItem[]> {
  const supabase = createPublicClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("services")
      .select("slug,name,description,image_path,sort_order")
      .eq("is_active", true)
      .order("sort_order");
    if (!error && data?.length) {
      const local = localServices();
      return data.map((row) => {
        const category = isCategory(row.slug) ? row.slug : "plumbing";
        const match = local.find((item) => item.category === category);
        return {
          category,
          name: row.name,
          description: match?.description ?? row.description,
          keywords: match?.keywords ?? [],
          image: row.image_path
            ? {
                sortOrder: row.sort_order,
                src: storagePublicUrl(row.image_path),
                alt: row.name,
                isPublic: true,
                reviewNote: null,
                storagePath: row.image_path,
              }
            : match?.image ?? null,
          sortOrder: row.sort_order,
        };
      });
    }
  }
  return localServices();
}

export async function getSettings(): Promise<SiteSettings> {
  const supabase = createPublicClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("site_settings")
      .select("business_name,phone,description,service_area,address,blog_url")
      .eq("id", 1)
      .maybeSingle();
    if (!error && data) {
      return {
        businessName: data.business_name,
        nameEn: localSettings().nameEn,
        phone: data.phone,
        region: data.service_area,
        blogUrl: data.blog_url,
        about: data.description,
        address: data.address,
      };
    }
  }
  return localSettings();
}

export async function getAboutPhoto() {
  const project = await getProject("buried-piping-2023");
  return project?.images.find((image) => image.sortOrder === 4) ?? project?.cover ?? localAboutPhoto();
}

export { categoryLabel } from "@/content/copy";
export { formatDate } from "@/lib/format";
