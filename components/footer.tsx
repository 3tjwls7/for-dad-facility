import { Logo } from "@/components/logo";
import { nav } from "@/content/copy";
import { telHref } from "@/components/phone-button";
import type { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  const rows = [
    { label: "상호", value: settings.businessName },
    { label: "시공 지역", value: settings.region },
  ].filter((row) => row.value);

  return (
    <footer className="overflow-hidden bg-[#1b2430] pt-8 text-bone lg:pt-14">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
        <div className="lg:hidden">
          <Logo className="h-[46px] w-[168px]" />
          <p className="mt-1.5 text-[0.8125rem] font-semibold text-stone">홍천 보일러 · 배관 · 설비 시공</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8125rem] font-semibold">
            {settings.region ? <span className="text-bone/75">{settings.region}</span> : null}
            {settings.phone ? <a href={telHref(settings.phone)} className="text-bone/75">{settings.phone}</a> : null}
            {settings.blogUrl ? (
              <a href={settings.blogUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-bone/75">
                <span className="grid h-5 w-5 place-items-center rounded-[2px] bg-[#03c75a] text-xs font-black text-white" aria-hidden>N</span>
                블로그
              </a>
            ) : null}
          </div>

          <nav className="mt-4 rounded-lg bg-white/[0.035] px-2 py-2.5" aria-label="푸터 메뉴">
            <ul className="grid grid-cols-4 gap-2 text-center text-[0.8125rem] font-bold">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="block py-1 text-bone/80">{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden gap-8 lg:grid lg:grid-cols-4">
          <div>
            <Logo className="h-[50px] w-[182px]" />
            <p className="mt-2 text-sm font-semibold text-stone">홍천 보일러 · 배관 · 설비 시공</p>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-bold text-copper-hi">사업 안내</h2>
            <dl className="grid gap-1.5 text-sm">
              {rows.map((row) => (
                <div key={row.label} className="flex gap-3">
                  <dt className="w-16 text-stone">{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-bold text-copper-hi">연락처</h2>
            <ul className="grid gap-1.5 text-sm">
              {settings.phone ? (
                <li>
                  <a href={telHref(settings.phone)} className="opacity-80 hover:text-copper-hi hover:opacity-100">{settings.phone}</a>
                </li>
              ) : null}
              {settings.blogUrl ? (
                <li>
                  <a href={settings.blogUrl} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:text-copper-hi hover:opacity-100">네이버 블로그 ↗</a>
                </li>
              ) : null}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-bold text-copper-hi">메뉴</h2>
            <ul className="grid gap-1.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="opacity-80 hover:text-copper-hi hover:opacity-100">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 py-4 text-xs text-stone lg:mt-8 lg:border-t lg:py-5">
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <p className="hidden xl:block">홈페이지의 시공 사진은 태양설비공사의 실제 작업 현장입니다.</p>
          <a href="#top" className="shrink-0 font-semibold hover:text-copper-hi">맨 위로 ↑</a>
        </div>
      </div>
    </footer>
  );
}
