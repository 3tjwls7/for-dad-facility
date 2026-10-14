"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { ServiceItem } from "@/lib/types";

export function ServicesSection({ services }: { services: ServiceItem[] }) {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }));

  return (
    <section id="services" className="bg-ink py-20 text-bone md:py-28" aria-labelledby="services-title">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
        <SectionHead
          eyebrow="작업 분야"
          title="설비 공사, 한 곳에서 해결합니다"
          id="services-title"
          light
          aside="보일러 설치부터 하수구, 정화조, 집수리까지 여러 업체를 부를 필요 없이 태양설비가 직접 시공합니다."
        />
        <Carousel opts={{ align: "start", loop: true }} plugins={[autoplay.current]} aria-label="작업 분야">
          <CarouselContent>
          {services.map((service, index) => (
            <CarouselItem key={service.name} className="basis-[84%] sm:basis-[72%] md:basis-1/2 xl:basis-1/3">
              <Reveal delay={Math.min(index * 90, 270)}>
              <a href={`/projects?category=${service.category}`} className="group block">
                <div className="reveal-media relative aspect-[4/3] overflow-hidden rounded-lg bg-ink-3">
                  {service.image ? (
                    <Image
                      src={service.image.src}
                      alt={`${service.name} 시공 현장`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 90vw"
                    />
                  ) : null}
                  <span className="absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1.5 text-sm font-bold text-bone">0{index + 1}</span>
                </div>
                <div className="flex items-start gap-4 pt-5">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl font-bold tracking-[-0.025em] md:text-[1.7rem]">{service.name}</h3>
                    <p className="mt-3 text-base leading-7 text-bone/75">{service.description}</p>
                    <p className="mt-3 text-sm font-semibold text-copper-hi">{service.keywords.join(" · ")}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center text-bone/65 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone">
                    <ArrowUpRight size={24} strokeWidth={1.8} aria-hidden />
                  </span>
                </div>
              </a>
              </Reveal>
            </CarouselItem>
          ))}
          </CarouselContent>
          <CarouselPrevious className="-top-16 right-12 left-auto" />
          <CarouselNext className="-top-16 right-0" />
        </Carousel>
      </div>
    </section>
  );
}
