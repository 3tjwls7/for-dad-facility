import type { Metadata } from "next";
import { ProjectFilters } from "@/components/project-filters";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-head";
import { getProjects } from "@/lib/queries";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/projects",
  "시공 사례",
  "홍천에서 시공한 보일러, 배관, 누수, 하수구, 정화조, 집수리 현장입니다.",
);

export const revalidate = 60;

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const projects = await getProjects();

  return (
    <section className="min-h-screen bg-ink pt-28 pb-16 text-bone md:pt-36 md:pb-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
        <Reveal className="mb-12 md:mb-16">
          <SectionLabel label="시공 사례" labelAs="h1" light />
          <p className="mt-6 text-lg leading-8 font-medium text-bone/70">작업 분야를 선택하면 해당 현장만 모아 볼 수 있습니다.</p>
        </Reveal>
        {projects.length ? (
          <ProjectFilters projects={projects} initial={category ?? "all"} />
        ) : (
          <p className="py-16 text-bone/65">공개된 시공 사례가 아직 없습니다.</p>
        )}
      </div>
    </section>
  );
}
