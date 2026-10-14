import fs from "fs";
import path from "path";
import {
  aboutCopy,
  blogUrl,
  projectsCopy,
  servicesCopy,
  settingsCopy,
  type CategoryId,
} from "@/content/copy";
import type { Project, ProjectImage, ServiceItem, SiteSettings } from "@/lib/types";

const worksRoot = path.join(process.cwd(), "assets", "images", "works");

function imageFile(logNo: string, sortOrder: number) {
  const base = `${String(sortOrder).padStart(2, "0")}-960.webp`;
  const file = path.join(worksRoot, logNo, base);
  if (!fs.existsSync(file)) return null;
  return {
    sortOrder,
    src: `/media/works/${logNo}/${base}`,
    alt: "",
    isPublic: true,
    reviewNote: null,
    storagePath: "",
  } satisfies ProjectImage;
}

function projectImages(logNo: string, people: number[]): ProjectImage[] {
  const dir = path.join(worksRoot, logNo);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith("-960.webp"))
    .map((name) => Number(name.slice(0, 2)))
    .sort((a, b) => a - b)
    .map((sortOrder): ProjectImage | null => {
      const image = imageFile(logNo, sortOrder);
      if (!image) return null;
      const review = people.includes(sortOrder) ? "프레임 안에 사람이 보입니다. 공개 전 확인이 필요합니다." : null;
      return { ...image, reviewNote: review };
    })
    .filter((image): image is ProjectImage => image !== null);
}

export function localProjects(): Project[] {
  return projectsCopy.map((copy) => {
    const images = projectImages(copy.logNo, copy.peopleInFrame).map((image) => ({
      ...image,
      alt: `${copy.title} 현장 사진 ${image.sortOrder}`,
      storagePath: `${copy.slug}/${String(image.sortOrder).padStart(2, "0")}.webp`,
    }));
    const cover = images.find((image) => image.sortOrder === copy.coverSortOrder) ?? images[0];
    if (!cover) return null;
    return {
      slug: copy.slug,
      title: copy.title,
      summary: copy.summary,
      content: copy.content,
      category: copy.category,
      originalBlogUrl: blogUrl(copy.logNo),
      originalPostDate: copy.date,
      isFeatured: copy.featuredRank != null,
      published: true,
      cover,
      images: images.filter((image) => image.isPublic),
    };
  }).filter((project): project is Project => project !== null);
}

export function localServices(): ServiceItem[] {
  const projects = localProjects();
  return servicesCopy.map((service, index) => {
    const project = projects.find((item) => item.originalBlogUrl.endsWith(service.cover.logNo));
    const image = project?.images.find((item) => item.sortOrder === service.cover.sortOrder) ?? project?.cover ?? null;
    return {
      category: service.category,
      name: service.name,
      description: service.description,
      keywords: service.keywords,
      image,
      sortOrder: index + 1,
    };
  });
}

export function localSettings(): SiteSettings {
  return {
    businessName: settingsCopy.businessName,
    nameEn: settingsCopy.nameEn,
    phone: settingsCopy.phone,
    region: settingsCopy.region,
    blogUrl: settingsCopy.blogUrl,
    about: settingsCopy.about,
    address: null,
  };
}

export function localAboutPhoto(): ProjectImage | null {
  const project = localProjects().find((item) => item.originalBlogUrl.endsWith(aboutCopy.realPhoto.logNo));
  return project?.images.find((image) => image.sortOrder === aboutCopy.realPhoto.sortOrder) ?? project?.cover ?? null;
}

export function isCategory(value: string): value is CategoryId {
  return ["boiler", "plumbing", "leak", "drain", "septic", "repair"].includes(value);
}
