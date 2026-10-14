import { ArrowUpRight } from "lucide-react";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectCard } from "@/components/project-card";
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
      <section id="works" className="bg-paper py-24 md:py-36" aria-labelledby="works-title">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
          <SectionHead
            index="02"
            eyebrow="시공 사례"
            title={"최근 시공 현장"}
            id="works-title"
            aside="태양설비가 직접 작업한 현장입니다. 사진을 누르면 공정별 기록을 볼 수 있습니다."
          />
          {featured.length ? (
            <div className="grid grid-cols-12 gap-x-6 gap-y-12 md:gap-y-16">
              {featured.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <p className="border-t border-ink/15 py-16 text-stone-2">공개된 시공 사례가 아직 없습니다.</p>
          )}
          <Reveal className="mt-16 flex justify-center">
            <a href="/projects" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-current px-5 font-semibold hover:border-copper hover:bg-copper hover:text-ink">
              시공 사례 전체 보기
              <ArrowUpRight size={18} aria-hidden />
            </a>
          </Reveal>
        </div>
      </section>
      <AboutSection photo={photo} />
      <ContactSection settings={settings} />
    </>
  );
}
