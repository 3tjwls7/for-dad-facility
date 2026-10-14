import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { heroCopy } from "@/content/copy";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[780px] items-end overflow-hidden bg-ink text-bone md:min-h-[860px] lg:min-h-[min(940px,100svh)]" aria-labelledby="hero-title">
      <Image
        src="/media/brand/hero-mechanical-room.webp"
        alt="보일러와 배관이 설치된 기계실"
        fill
        priority
        className="hero-visual -z-20 object-cover object-[72%_center] sm:object-[68%_center] lg:object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(22,29,39,1)_0%,rgba(22,29,39,1)_9%,rgba(22,29,39,0.94)_23%,rgba(13,20,31,0.61)_55%,rgba(13,20,31,0.54)_100%)] max-md:bg-[linear-gradient(0deg,rgba(22,29,39,1)_0%,rgba(22,29,39,1)_11%,rgba(22,29,39,0.95)_27%,rgba(13,20,31,0.68)_60%,rgba(13,20,31,0.52)_100%)]" />

      <div className="mx-auto flex w-full max-w-[1600px] justify-center px-5 pb-20 pt-36 md:px-10 md:pb-28 lg:px-16 lg:pb-24">
        <div className="flex max-w-[1100px] flex-col items-center text-center">
          <p className="hero-kicker mb-7 text-base font-bold tracking-[0.04em] text-copper-hi md:mb-9 md:text-xl">
            홍천 보일러 · 배관 · 생활 설비
          </p>
          <h1 id="hero-title" className="whitespace-nowrap text-[clamp(2.9rem,11vw,10.5rem)] leading-none font-black tracking-[-0.065em] [text-shadow:0_4px_30px_rgba(0,0,0,0.45)]">
            <span className="hero-line"><span style={{ animationDelay: "120ms" }}>태양설비공사</span></span>
          </h1>
          <p className="hero-lead mt-7 max-w-[42ch] whitespace-pre-line text-lg leading-8 font-medium text-bone/90 md:mt-9 md:text-xl md:leading-9">{heroCopy.lead}</p>
          <div className="hero-actions mt-8 flex flex-wrap justify-center gap-3 md:mt-10">
            <a href="#works" className="inline-flex min-h-13 items-center gap-2 rounded-md bg-bone/12 px-6 text-base font-bold text-bone backdrop-blur-sm transition-colors hover:bg-bone/20">
              실제 시공 사례 보기
              <ArrowDown size={19} aria-hidden />
            </a>
            <a href="#services" className="inline-flex min-h-13 items-center rounded-md bg-bone/12 px-6 text-base font-semibold text-bone backdrop-blur-sm transition-colors hover:bg-bone/20">
              작업 분야 확인
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
