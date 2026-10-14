import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "h-[52px] w-[190px] md:h-[64px] md:w-[234px]" }: { className?: string }) {
  return (
    <Link href="/" aria-label="태양설비공사 홈으로" className={`relative block shrink-0 overflow-hidden ${className}`}>
      <Image
        src="/media/brand/image.png"
        alt="태양설비공사"
        width={1672}
        height={941}
        priority
        sizes="(min-width: 768px) 234px, 190px"
        className="absolute left-0 top-1/2 h-auto w-full -translate-y-1/2"
      />
    </Link>
  );
}
