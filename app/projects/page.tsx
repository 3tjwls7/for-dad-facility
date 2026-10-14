import type { Metadata } from "next";
import { ProjectFilters } from "@/components/project-filters";
import { SectionHead } from "@/components/section-head";
import { getProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "시공 사례",
  description: "홍천에서 진행한 보일러, 배관, 누수, 하수구, 정화조, 집수리 현장 기록입니다.",
};

export const revalidate = 60;

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const projects = await getProjects();

  return (
    <section className="bg-paper pt-28 pb-24 md:pt-36 md:pb-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
        <SectionHead
          index="03"
          eyebrow="시공 사례"
          title={"시공 사례"}
          aside="작업 분야를 선택하면 해당 현장만 모아 볼 수 있습니다."
        />
        {projects.length ? (
          <ProjectFilters projects={projects} initial={category ?? "all"} />
        ) : (
          <p className="border-t border-ink/15 py-16 text-stone-2">공개된 시공 사례가 아직 없습니다.</p>
        )}
      </div>
    </section>
  );
}
