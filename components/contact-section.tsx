import { Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-head";
import { telHref } from "@/components/phone-button";
import { contactCopy } from "@/content/copy";
import type { SiteSettings } from "@/lib/types";

export function ContactSection({ settings }: { settings: SiteSettings }) {
  return (
    <section id="contact" className="bg-ink py-20 text-bone md:py-28" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-6">
            <SectionLabel label="문의" light />
          </div>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(440px,1.1fr)] lg:gap-24">
          <Reveal>
            <h2 id="contact-title" className="max-w-[12ch] text-[clamp(2.5rem,4.2vw,4.5rem)] leading-[1.12] font-bold tracking-[-0.045em]">
              {contactCopy.title.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </h2>
            <p className="mt-6 max-w-[42ch] whitespace-pre-line text-lg leading-8 text-bone/70">{contactCopy.text}</p>
            {settings.region ? (
              <p className="mt-10 text-sm font-semibold text-bone/50">
                시공 지역 <span className="ml-3 text-base text-bone">{settings.region}</span>
              </p>
            ) : null}
          </Reveal>

          <Reveal className="grid gap-3">
            {settings.phone ? (
              <a href={telHref(settings.phone)} className="group flex items-center gap-5 py-4 md:py-5" aria-label={`전화 상담 ${settings.phone}`}>
                <Phone size={24} strokeWidth={1.8} className="shrink-0 text-bone/65" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-bone/55">전화 상담</span>
                  <span className="mt-1 block text-[clamp(1.45rem,3vw,2.1rem)] font-bold tracking-[-0.025em]">{settings.phone}</span>
                </span>
              </a>
            ) : null}

            {settings.blogUrl ? (
              <a href={settings.blogUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 py-4 md:py-5" aria-label="네이버 블로그 새 창에서 열기">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[3px] bg-[#03c75a] text-[17px] font-black leading-none text-white" aria-hidden>N</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-bone/55">네이버 블로그</span>
                  <span className="mt-1 block truncate text-lg font-bold md:text-xl">{settings.blogUrl.replace(/^https?:\/\//, "")}</span>
                </span>
              </a>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
