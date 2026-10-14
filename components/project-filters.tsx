"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { categories } from "@/content/copy";
import type { Project } from "@/lib/types";

export function ProjectFilters({ projects, initial = "all" }: { projects: Project[]; initial?: string }) {
  const [filter, setFilter] = useState(initial);
  const filters = useMemo(
    () => [
      { id: "all", label: "전체", count: projects.length },
      ...categories
        .map((item) => ({ id: item.id, label: item.label, count: projects.filter((project) => project.category === item.id).length }))
        .filter((item) => item.count > 0),
    ],
    [projects],
  );
  const visible = filter === "all" ? projects : projects.filter((project) => project.category === filter);

  return (
    <>
      <div className="mb-12 flex gap-2 overflow-x-auto pb-1" role="toolbar" aria-label="시공 사례 분류">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={`inline-flex h-12 shrink-0 items-center gap-2 rounded-full border px-5 text-base font-bold ${filter === item.id ? "border-ink bg-ink text-bone" : "border-ink/20 hover:border-ink"}`}
          >
            {item.label}
            <sup className={`text-xs font-bold ${filter === item.id ? "text-copper-hi" : "text-stone"}`}>{item.count}</sup>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length}건 표시
      </p>
      {visible.length ? (
        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="border-t border-ink/15 py-16 text-stone-2">이 분야의 공개된 시공 사례가 없습니다.</p>
      )}
    </>
  );
}
