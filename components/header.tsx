"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { PhoneButton } from "@/components/phone-button";
import { nav } from "@/content/copy";

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
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 text-bone backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open
          ? "bg-ink/70 shadow-[0_10px_35px_rgba(0,0,0,0.22)]"
          : "bg-ink/45"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between gap-4 px-4 md:h-[88px] md:px-10 lg:px-16">
        <Logo />
        <nav className="hidden lg:block" aria-label="주요 메뉴">
          <ul className="flex gap-8">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`/#${item.id}`}
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
          <PhoneButton phone={phone} variant="ghost" className="hidden min-h-11 px-4 text-base md:inline-flex" />
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
      {open ? (
        <nav id="mobile-menu" className="border-t border-bone/15 bg-ink lg:hidden" aria-label="모바일 메뉴">
          <ol className="mx-auto max-w-[1600px] px-5 py-6">
            {nav.map((item, index) => (
              <li key={item.id} className="border-b border-bone/15">
                <a href={`/#${item.id}`} className="flex items-baseline gap-4 py-4 text-4xl font-bold tracking-[-0.04em]" onClick={() => setOpen(false)}>
                  <span className="font-mono text-xs text-copper">0{index + 1}</span>
                  {item.label}
                  <span className="ml-auto font-mono text-xs tracking-[0.12em] text-stone uppercase">{item.en}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mx-auto grid max-w-[1600px] gap-3 px-5 pb-8">
            <PhoneButton phone={phone} className="w-full" />
            {blogUrl ? (
              <a href={blogUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-bone/15">
                네이버 블로그
              </a>
            ) : null}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
