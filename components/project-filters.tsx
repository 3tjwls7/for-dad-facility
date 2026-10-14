"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { categories } from "@/content/copy";
import type { Project } from "@/lib/types";

export function ProjectFilters({ projects, initial = "all" }: { projects: Project[]; initial?: string }) {
  const [filter, setFilter] = useState(initial);
  const [open, setOpen] = useState(false);
  const mobileFilterRef = useRef<HTMLDivElement>(null);
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
  const selected = filters.find((item) => item.id === filter) ?? filters[0];

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!mobileFilterRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <>
      <div ref={mobileFilterRef} className="relative z-20 mb-10 md:hidden">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex h-12 w-full items-center rounded-lg border border-bone/15 bg-ink-2 px-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-bone/30"
        >
          <span className="flex-1 text-base font-bold">{selected.label}</span>
          <span className="mr-3 text-sm font-bold tabular-nums text-bone/55">{selected.count}</span>
          <ChevronDown size={19} className={`text-bone/65 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
        </button>
        {open ? (
          <div className="absolute top-full left-0 mt-2 w-full overflow-hidden rounded-xl border border-bone/10 bg-ink-2 p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.32)]" role="listbox" aria-label="작업 분야 선택">
            {filters.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(item.id);
                    setOpen(false);
                  }}
                  className={`flex h-11 w-full items-center rounded-lg px-3 text-left transition-colors ${active ? "bg-bone/12" : "hover:bg-bone/7"}`}
                >
                  <span className="flex-1 text-base font-semibold">{item.label}</span>
                  <span className="mr-3 text-sm font-semibold tabular-nums text-bone/55">{item.count}</span>
                  <Check size={18} className={active ? "opacity-100" : "opacity-0"} aria-hidden />
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="mb-12 hidden gap-2 md:flex" role="toolbar" aria-label="시공 사례 분류">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors lg:text-base ${filter === item.id ? "border-bone bg-bone text-ink" : "border-bone/20 text-bone/75 hover:border-bone/55 hover:text-bone"}`}
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
          {visible.map((project, index) => (
            <Reveal key={project.slug} className="col-span-12 sm:col-span-6 xl:col-span-3" delay={Math.min((index % 4) * 70, 210)}>
              <ProjectCard project={project} compact dark animated className="" />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="py-16 text-bone/65">이 분야의 공개된 시공 사례가 없습니다.</p>
      )}
    </>
  );
}
