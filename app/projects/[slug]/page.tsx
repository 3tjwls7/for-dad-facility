import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import { telHref } from "@/components/phone-button";
import { ProjectCard } from "@/components/project-card";
import { ProjectGallery } from "@/components/project-gallery";
import { categoryLabel } from "@/content/copy";
import { formatDate, getProject, getProjects, getSettings } from "@/lib/queries";
import { ogImage, pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "시공 사례" };
  const image = project.cover.src.startsWith("http")
    ? { url: project.cover.src, alt: project.cover.alt || `${project.title} 현장 사진` }
    : ogImage;
  return pageMetadata(`/projects/${project.slug}`, project.title, project.summary, image);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, projects, settings] = await Promise.all([getProject(slug), getProjects(), getSettings()]);
  if (!project) notFound();
  const related = projects.filter((item) => item.category === project.category && item.slug !== project.slug).slice(0, 3);

  return (
    <article className="min-h-screen bg-ink pt-24 pb-24 text-bone md:pt-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
        <Link href="/projects" className="group inline-flex min-h-11 items-center gap-2 text-base font-bold text-bone/65 transition-colors hover:text-bone">
          <ArrowLeft size={21} strokeWidth={1.8} className="transition-transform group-hover:-translate-x-1" aria-hidden />
          시공 사례 전체 보기
        </Link>
        <div className="mt-7 grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
          <ProjectGallery images={project.images} title={project.title} />
          <div className="lg:pt-6">
          <div className="flex justify-between text-sm font-bold text-copper">
            <span>{categoryLabel(project.category)}</span>
            <time dateTime={project.originalPostDate}>{formatDate(project.originalPostDate)}</time>
          </div>
          <h1 className="mt-4 text-[clamp(1.75rem,3vw,3rem)] leading-tight font-bold tracking-[-0.03em]">{project.title}</h1>
          <p className="mt-5 text-lg leading-8 font-medium text-bone/70">{project.summary}</p>
          <div className="mt-8 grid gap-4 border-t border-bone/15 pt-8 text-base leading-8 text-bone/65">
            {project.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-9 grid grid-cols-2 gap-3">
            <a href={project.originalBlogUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-full bg-bone/[0.08] px-3 text-sm font-bold text-bone transition-colors hover:bg-bone/[0.14] sm:px-5 sm:text-base">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[2px] bg-[#03c75a] text-sm font-black leading-none text-white" aria-hidden>N</span>
              <span className="truncate">블로그 원문</span>
            </a>
            {settings.phone ? (
              <a href={telHref(settings.phone)} className="inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-full bg-bone/[0.08] px-3 text-sm font-bold text-bone transition-colors hover:bg-bone/[0.14] sm:px-5 sm:text-base" aria-label={`이 작업 전화 문의 ${settings.phone}`}>
                <Phone size={20} strokeWidth={1.8} className="shrink-0" aria-hidden />
                <span className="truncate">전화 문의</span>
              </a>
            ) : null}
          </div>
          </div>
        </div>
      </div>
      {related.length ? (
        <section className="mx-auto mt-24 max-w-[1600px] px-5 md:px-10 lg:px-16" aria-labelledby="related-title">
          <h2 id="related-title" className="mb-10 text-3xl font-bold tracking-[-0.03em]">같은 분야의 다른 현장</h2>
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            {related.map((item) => (
              <ProjectCard key={item.slug} project={item} compact dark className="col-span-12 md:col-span-6 xl:col-span-4" />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
