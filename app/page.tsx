import { ArrowUpRight } from "lucide-react";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectCarousel } from "@/components/project-carousel";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { ServicesSection } from "@/components/services-section";
import { getAboutPhoto, getFeaturedProjects, getServices, getSettings } from "@/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, services, featured, photo] = await Promise.all([
    getSettings(),
    getServices(),
    getFeaturedProjects(),
    getAboutPhoto(),
  ]);

  return (
    <>
      <HeroSection />
      <ServicesSection services={services} />
      <section id="works" className="bg-ink py-20 text-bone md:py-28" aria-labelledby="works-title">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
          <SectionHead
            eyebrow="시공 사례"
            title={"최근 시공 현장"}
            id="works-title"
            light
            aside="직접 작업한 현장 사진입니다. 사진을 누르면 자세한 작업 내용을 볼 수 있습니다."
          />
          {featured.length ? (
            <ProjectCarousel projects={featured} />
          ) : (
            <p className="py-16 text-bone/65">공개된 시공 사례가 아직 없습니다.</p>
          )}
          <Reveal className="mt-16 flex justify-center">
            <a href="/projects" className="group inline-flex min-h-12 items-center gap-2 border-b border-bone/35 px-1 font-semibold transition-colors hover:border-bone">
              시공 사례 전체 보기
              <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </Reveal>
        </div>
      </section>
      <AboutSection photo={photo} />
      <ContactSection settings={settings} />
    </>
  );
}
