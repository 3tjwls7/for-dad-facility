"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ProjectImage } from "@/lib/types";

export function ProjectGallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const current = images[index] ?? images[0];
  if (!current) return null;

  const move = (step: number) => setIndex((value) => (value + step + total) % total);

  return (
    <div
      className="min-w-0"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
    >
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-lg bg-paper-2 md:aspect-[4/3] lg:h-[72vh] lg:aspect-auto"
        onPointerUp={(event) => {
          const start = Number((event.currentTarget as HTMLElement).dataset.x ?? "");
          if (!Number.isFinite(start)) return;
          const delta = event.clientX - start;
          if (Math.abs(delta) > 40) move(delta < 0 ? 1 : -1);
          delete (event.currentTarget as HTMLElement).dataset.x;
        }}
        onPointerDown={(event) => {
          (event.currentTarget as HTMLElement).dataset.x = String(event.clientX);
        }}
      >
        <Image
          src={current.src}
          alt={current.alt || `${title} 현장 사진 ${index + 1}`}
          fill
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-contain"
          priority={index === 0}
        />
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <button type="button" className="grid h-12 w-12 place-items-center rounded-full border border-ink/15" aria-label="이전 사진" onClick={() => move(-1)}>
          <ChevronLeft size={20} />
        </button>
        <span className="min-w-20 text-center text-base font-bold text-stone-2" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button type="button" className="grid h-12 w-12 place-items-center rounded-full border border-ink/15" aria-label="다음 사진" onClick={() => move(1)}>
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {images.map((image, imageIndex) => (
          <button
            key={`${image.storagePath}-${image.sortOrder}`}
            type="button"
            aria-label={`사진 ${imageIndex + 1}`}
            aria-current={imageIndex === index ? "true" : undefined}
            onClick={() => setIndex(imageIndex)}
            className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-md ${imageIndex === index ? "outline-2 outline-offset-2 outline-copper" : "opacity-60 hover:opacity-100"}`}
          >
            <Image src={image.src} alt="" fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}
