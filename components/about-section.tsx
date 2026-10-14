import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-head";
import { aboutCopy } from "@/content/copy";
import type { ProjectImage } from "@/lib/types";

export function AboutSection({ photo }: { photo: ProjectImage | null }) {
  return (
    <section id="about" className="bg-ink py-20 text-bone md:py-28" aria-labelledby="about-title">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
        <Reveal>
          <SectionLabel label="업체 소개" labelAs="h2" id="about-title" light />
        </Reveal>
        <Reveal className="mt-6">
          <div className="relative min-h-[480px] overflow-hidden rounded-2xl bg-ink-3 md:min-h-[460px]">
            <div className="reveal-media absolute inset-0">
              {photo ? (
                <Image src={photo.src} alt="태양설비공사의 실제 배관 매설 현장" fill priority unoptimized className="object-cover" sizes="100vw" />
              ) : null}
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,29,39,0.94)_0%,rgba(22,29,39,0.78)_45%,rgba(22,29,39,0.18)_100%)] max-md:bg-[linear-gradient(0deg,rgba(22,29,39,0.96)_0%,rgba(22,29,39,0.78)_55%,rgba(22,29,39,0.2)_100%)]" />
            {photo ? (
              <span className="absolute top-5 right-5 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-semibold text-bone/85 backdrop-blur-md md:top-6 md:right-6">
                {aboutCopy.photoCaption}
              </span>
            ) : null}
            <div className="relative flex min-h-[480px] flex-col justify-end gap-5 p-6 md:min-h-[460px] md:justify-center md:p-12 xl:p-16">
              <p className="max-w-[18ch] text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.25] font-bold tracking-[-0.04em] whitespace-pre-line text-bone md:max-w-none">
                {aboutCopy.headline}
              </p>
              <p className="max-w-[44ch] text-base leading-7 text-bone/80 md:text-lg md:leading-8 [text-wrap:pretty]">{aboutCopy.description}</p>
            </div>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
          {aboutCopy.principles.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <li className="border-t border-bone/20 pt-6">
                <h3 className="text-xl font-bold tracking-[-0.02em] text-bone md:text-2xl">{item.title}</h3>
                <p className="mt-3 max-w-[34ch] text-base leading-7 text-bone/70 [text-wrap:pretty]">{item.text}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
