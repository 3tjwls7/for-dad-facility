import type { CategoryId } from "@/content/copy";

export type ProjectImage = {
  sortOrder: number;
  src: string;
  alt: string;
  isPublic: boolean;
  reviewNote: string | null;
  storagePath: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  content: string[];
  category: CategoryId;
  originalBlogUrl: string;
  originalPostDate: string;
  isFeatured: boolean;
  published: boolean;
  cover: ProjectImage;
  images: ProjectImage[];
};

export type ServiceItem = {
  category: CategoryId;
  name: string;
  description: string;
  keywords: string[];
  image: ProjectImage | null;
  sortOrder: number;
};

export type SiteSettings = {
  businessName: string;
  nameEn: string;
  phone: string | null;
  region: string | null;
  blogUrl: string | null;
  about: string;
  address: string | null;
};
