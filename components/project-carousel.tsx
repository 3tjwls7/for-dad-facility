"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Project } from "@/lib/types";

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }));

  return (
    <Carousel opts={{ align: "start", loop: true }} plugins={[autoplay.current]} aria-label="최근 시공 사례">
      <CarouselContent>
        {projects.map((project, index) => (
          <CarouselItem key={project.slug} className="basis-[84%] sm:basis-[72%] md:basis-1/2">
            <Reveal delay={Math.min(index * 90, 180)}>
              <ProjectCard project={project} dark animated />
            </Reveal>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-top-16 right-12 left-auto" />
      <CarouselNext className="-top-16 right-0" />
    </Carousel>
  );
}
