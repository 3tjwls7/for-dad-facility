import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categoryLabel } from "@/content/copy";
import { formatDate } from "@/lib/format";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="col-span-12 md:col-span-6">
      <Link href={`/projects/${project.slug}`} className="group block" aria-label={`${project.title} 자세히 보기`}>
        <figure className="relative aspect-[4/3] overflow-hidden rounded-lg bg-paper-2">
          <Image
            src={project.cover.src}
            alt={`${project.title} 현장 사진`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 rounded-full bg-ink/75 px-3 py-1.5 text-sm font-bold text-bone">
            사진 {project.images.length}장
          </span>
          <span className="absolute right-4 bottom-4 grid h-16 w-16 scale-50 place-items-center rounded-full bg-copper text-ink opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
            <ArrowUpRight size={22} aria-hidden />
          </span>
        </figure>
        <div className="pt-5">
          <div className="flex justify-between text-sm font-semibold text-stone-2">
            <span className="text-copper">{categoryLabel(project.category)}</span>
            <time dateTime={project.originalPostDate}>{formatDate(project.originalPostDate)}</time>
          </div>
          <h3 className="mt-2 text-[clamp(1.4rem,2.2vw,2rem)] leading-snug font-bold tracking-[-0.025em]">{project.title}</h3>
        </div>
      </Link>
    </article>
  );
}
