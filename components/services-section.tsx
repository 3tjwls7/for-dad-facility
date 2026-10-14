import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { SectionHead } from "@/components/section-head";
import type { ServiceItem } from "@/lib/types";

export function ServicesSection({ services }: { services: ServiceItem[] }) {
  return (
    <section id="services" className="bg-ink py-20 text-bone md:py-28" aria-labelledby="services-title">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
        <SectionHead
          index="01"
          eyebrow="작업 분야"
          title={"필요한 설비 작업을\n현장에서 직접 합니다"}
          id="services-title"
          aside="증상과 현장 상태를 확인한 뒤 필요한 범위를 정해 작업합니다."
          light
        />
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <a key={service.name} href={`/projects?category=${service.category}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ink-3">
                {service.image ? (
                  <Image
                    src={service.image.src}
                    alt={`${service.name} 시공 현장`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
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
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-bone/25 transition group-hover:border-copper group-hover:bg-copper group-hover:text-ink">
                  <ArrowUpRight size={20} aria-hidden />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
