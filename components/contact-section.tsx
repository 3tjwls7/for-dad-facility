import { ArrowUpRight } from "lucide-react";
import { PhoneButton, telHref } from "@/components/phone-button";
import { Reveal } from "@/components/reveal";
import { contactCopy } from "@/content/copy";
import type { SiteSettings } from "@/lib/types";

export function ContactSection({ settings }: { settings: SiteSettings }) {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 text-bone md:py-32" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-12 flex items-center gap-4 border-b border-bone/15 pb-5">
            <span className="text-sm font-bold text-copper">04</span>
            <span className="text-base font-bold">문의</span>
          </div>
          <h2 id="contact-title" className="text-[clamp(2.125rem,5vw,5rem)] leading-[1.1] font-bold tracking-[-0.045em]">
            {contactCopy.title.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-8 text-bone/80">{contactCopy.text}</p>
        </Reveal>
        <Reveal>
          {settings.phone ? (
            <a href={telHref(settings.phone)} className="group mt-16 grid items-center gap-4 border-y border-bone/15 py-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-6">
              <span className="text-base font-bold text-copper-hi">전화 상담</span>
              <span className="text-[clamp(2.25rem,8.5vw,8.75rem)] leading-none font-bold tracking-[-0.05em] transition group-hover:translate-x-2 group-hover:text-copper-hi">
                {settings.phone}
              </span>
              <span className="grid h-16 w-16 place-items-center rounded-full bg-copper text-ink transition group-hover:rotate-45 md:h-24 md:w-24">
                <ArrowUpRight className="size-8 md:size-10" aria-hidden />
              </span>
            </a>
          ) : (
            <p className="mt-16 border-y border-bone/15 py-8 text-3xl text-bone/50">전화번호 준비 중</p>
          )}
        </Reveal>
        <Reveal className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <dl className="flex flex-wrap gap-x-12 gap-y-4">
            {settings.region ? (
              <div>
                <dt className="text-sm font-semibold text-stone">시공 지역</dt>
                <dd className="mt-1 font-semibold">{settings.region}</dd>
              </div>
            ) : null}
            {settings.blogUrl ? (
              <div>
                <dt className="text-sm font-semibold text-stone">네이버 블로그</dt>
                <dd className="mt-1 font-semibold">
                  <a href={settings.blogUrl} target="_blank" rel="noopener noreferrer" className="border-b border-bone/20 hover:border-copper-hi hover:text-copper-hi">
                    {settings.blogUrl.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
          <div className="flex flex-wrap gap-3">
            <PhoneButton phone={settings.phone} showNumber={false} label="지금 전화 상담" />
            {settings.blogUrl ? (
              <a href={settings.blogUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-current px-5 font-semibold hover:border-copper hover:bg-copper hover:text-ink">
                블로그 바로가기
                <ArrowUpRight size={18} aria-hidden />
              </a>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
