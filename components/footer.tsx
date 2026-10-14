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
    <footer className="border-t border-bone/15 bg-ink pt-16 text-bone md:pt-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="h-[58px] w-[210px]" />
            <p className="mt-3 text-sm font-semibold text-stone">홍천 보일러 · 배관 · 설비 시공</p>
          </div>
          <div>
            <h2 className="mb-4 text-base font-bold text-copper">사업 안내</h2>
            <dl className="grid gap-2 text-base">
              {rows.map((row) => (
                <div key={row.label} className="flex gap-3">
                  <dt className="w-20 text-stone">{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="mb-4 text-base font-bold text-copper">연락처</h2>
            <ul className="grid gap-2 text-base">
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
            <h2 className="mb-4 text-base font-bold text-copper">메뉴</h2>
            <ul className="grid gap-2 text-base">
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={`/#${item.id}`} className="opacity-80 hover:text-copper-hi hover:opacity-100">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-bone/15 py-7 text-sm text-stone">
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <p>홈페이지의 시공 사진은 태양설비공사의 실제 작업 현장입니다.</p>
          <a href="#top" className="font-semibold hover:text-copper-hi">맨 위로 ↑</a>
        </div>
      </div>
    </footer>
  );
}
