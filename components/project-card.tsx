import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categoryLabel } from "@/content/copy";
import { formatDate } from "@/lib/format";
import type { Project } from "@/lib/types";

export function ProjectCard({
  project,
  className = "col-span-12 md:col-span-6",
  compact = false,
  dark = false,
  animated = false,
}: {
  project: Project;
  className?: string;
  compact?: boolean;
  dark?: boolean;
  animated?: boolean;
}) {
  return (
    <article className={className}>
      <Link href={`/projects/${project.slug}`} className="group block" aria-label={`${project.title} 자세히 보기`}>
        <figure className={`${animated ? "reveal-media " : ""}relative aspect-[4/3] overflow-hidden rounded-lg ${dark ? "bg-ink-3" : "bg-paper-2"}`}>
          <Image
            src={project.cover.src}
            alt={`${project.title} 현장 사진`}
            fill
            sizes={compact ? "(min-width: 1280px) 23vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 rounded-full bg-ink/75 px-3 py-1.5 text-sm font-bold text-bone">
            사진 {project.images.length}장
          </span>
          <span className="absolute right-5 bottom-5 grid place-items-center text-bone opacity-0 drop-shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100">
            <ArrowUpRight size={30} strokeWidth={1.8} aria-hidden />
          </span>
        </figure>
        <div className="pt-5">
          <div className={`flex justify-between text-sm font-semibold ${dark ? "text-bone/60" : "text-stone-2"}`}>
            <span className={dark ? "text-copper-hi" : "text-copper"}>{categoryLabel(project.category)}</span>
            <time dateTime={project.originalPostDate}>{formatDate(project.originalPostDate)}</time>
          </div>
          <h3 className={compact ? "mt-2 text-xl leading-snug font-bold tracking-[-0.025em] md:text-2xl xl:text-xl" : "mt-2 text-[clamp(1.4rem,2.2vw,2rem)] leading-snug font-bold tracking-[-0.025em]"}>{project.title}</h3>
        </div>
      </Link>
    </article>
  );
}
