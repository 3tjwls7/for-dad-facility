"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { PhoneButton } from "@/components/phone-button";
import { nav } from "@/content/copy";

const glass = "bg-ink/[0.48] backdrop-blur-2xl backdrop-saturate-150";

export function Header({ phone, blogUrl }: { phone: string | null; blogUrl: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = nav.map((item) => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/8 text-bone backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,box-shadow] duration-300 ${
          scrolled || open ? "bg-ink/[0.48] shadow-[0_10px_32px_rgba(0,0,0,0.14)]" : "bg-ink/[0.24]"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between gap-4 px-4 md:h-[88px] md:px-10 lg:px-16">
          <Logo />
          <nav className="hidden lg:block" aria-label="주요 메뉴">
            <ul className="flex gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative py-2 text-base font-semibold ${active === item.id ? "opacity-100" : "opacity-75 hover:opacity-100"}`}
                  >
                    {item.label}
                    <span className={`absolute inset-x-0 bottom-0 h-px bg-copper transition-transform ${active === item.id ? "scale-x-100" : "scale-x-0"}`} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <PhoneButton phone={phone} label="전화 상담하기" showNumber={false} variant="ghost" className="hidden min-h-11 px-4 text-base md:inline-flex" />
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-bone/15 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      {open ? (
        <nav
          id="mobile-menu"
          className={`fixed inset-x-0 top-[76px] bottom-0 z-40 flex flex-col overflow-y-auto text-bone md:top-[88px] lg:hidden ${glass}`}
          aria-label="모바일 메뉴"
        >
          <ol className="mx-auto w-full max-w-[1600px] px-4 pt-2 md:px-10">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-white/8">
                <a
                  href={item.href}
                  className={`flex items-center justify-between py-4 text-lg font-semibold transition-opacity ${
                    active === item.id ? "opacity-100" : "opacity-75 hover:opacity-100"
                  }`}
                  aria-current={active === item.id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="relative py-1">
                    {item.label}
                    <span className={`absolute inset-x-0 bottom-0 h-px bg-copper transition-transform ${active === item.id ? "scale-x-100" : "scale-x-0"}`} />
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mx-auto grid w-full max-w-[1600px] gap-3 px-4 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-10">
            <PhoneButton phone={phone} label="전화 상담하기" showNumber={false} variant="ghost" className="flex w-full text-base" />
            {blogUrl ? (
              <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-bone/15 text-[0.9375rem] font-semibold transition hover:bg-bone hover:text-ink"
              >
                네이버 블로그
              </a>
            ) : null}
          </div>
        </nav>
      ) : null}
    </>
  );
}
