import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PhoneButton } from "@/components/phone-button";
import { ProjectCard } from "@/components/project-card";
import { ProjectGallery } from "@/components/project-gallery";
import { categoryLabel } from "@/content/copy";
import { formatDate, getProject, getProjects, getSettings } from "@/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "시공 사례" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, projects, settings] = await Promise.all([getProject(slug), getProjects(), getSettings()]);
  if (!project) notFound();
  const related = projects.filter((item) => item.category === project.category && item.slug !== project.slug).slice(0, 3);

  return (
    <article className="bg-paper pt-24 pb-24 md:pt-32">
      <div className="mx-auto grid min-w-0 max-w-[1600px] gap-10 px-5 md:px-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)] lg:px-16">
        <ProjectGallery images={project.images} title={project.title} />
        <div className="lg:pt-6">
          <div className="flex justify-between text-sm font-bold text-copper">
            <span>{categoryLabel(project.category)}</span>
            <time dateTime={project.originalPostDate}>{formatDate(project.originalPostDate)}</time>
          </div>
          <h1 className="mt-4 text-[clamp(1.75rem,3vw,3rem)] leading-tight font-bold tracking-[-0.03em]">{project.title}</h1>
          <p className="mt-5 text-lg leading-8 font-medium text-stone-2">{project.summary}</p>
          <div className="mt-8 grid gap-4 border-t border-ink/15 pt-8 text-base leading-8 text-stone-2">
            {project.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 grid gap-3">
            <a href={project.originalBlogUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-current px-5 font-semibold hover:border-copper hover:bg-copper hover:text-ink">
              블로그 원문 보기
              <ArrowUpRight size={18} aria-hidden />
            </a>
            <PhoneButton phone={settings.phone} showNumber={false} label="이 작업 문의하기" />
          </div>
        </div>
      </div>
      {related.length ? (
        <section className="mx-auto mt-24 max-w-[1600px] px-5 md:px-10 lg:px-16" aria-labelledby="related-title">
          <h2 id="related-title" className="mb-10 text-3xl font-bold tracking-[-0.03em]">같은 분야의 다른 현장</h2>
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            {related.map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
