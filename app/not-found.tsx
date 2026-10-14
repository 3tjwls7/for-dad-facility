import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description: "요청한 주소를 찾을 수 없습니다.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-paper px-5 py-32 text-center">
      <div>
        <p className="font-mono text-xs tracking-[0.14em] text-copper uppercase">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em]">페이지를 찾을 수 없습니다</h1>
        <Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-5 font-semibold text-bone">
          홈으로
        </Link>
      </div>
    </section>
  );
}
