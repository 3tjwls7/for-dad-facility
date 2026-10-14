import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { aboutCopy } from "@/content/copy";
import type { ProjectImage } from "@/lib/types";

export function AboutSection({ photo }: { photo: ProjectImage | null }) {
  return (
    <section id="about" className="bg-paper py-20 md:py-28" aria-labelledby="about-title">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
        <Reveal>
          <div className="flex items-center gap-3 border-b border-ink/15 pb-5">
            <span className="text-sm font-bold text-copper">03</span>
            <h2 id="about-title" className="text-base font-bold">업체 소개</h2>
          </div>
        </Reveal>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-[46ch] text-xl leading-9 font-semibold tracking-[-0.015em] text-ink md:text-2xl md:leading-10">{aboutCopy.description}</p>
            </Reveal>
            <ol className="mt-10 border-t border-ink/15">
              {aboutCopy.principles.map((item, index) => (
                <li key={item.title} className="border-b border-ink/15 py-5">
                  <div className="flex items-baseline gap-4">
                    <span className="text-sm font-bold text-copper">0{index + 1}</span>
                    <h3 className="text-xl font-bold tracking-[-0.02em]">{item.title}</h3>
                  </div>
                  <p className="mt-2 pl-10 text-base leading-7 text-stone-2">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-paper-2">
                  {photo ? (
                    <Image src={photo.src} alt="태양설비공사의 실제 배관 매설 현장" fill className="object-cover" sizes="(min-width: 1024px) 58vw, 100vw" />
                  ) : null}
                </div>
                <figcaption className="mt-3 text-sm font-semibold text-stone-2">실제 시공 현장 · 배관 매설 작업</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
