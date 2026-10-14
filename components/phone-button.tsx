import { Phone } from "lucide-react";

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function PhoneButton({
  phone,
  label = "전화 상담",
  showNumber = true,
  variant = "solid",
  className = "inline-flex",
}: {
  phone: string | null;
  label?: string;
  showNumber?: boolean;
  variant?: "solid" | "ghost" | "line";
  className?: string;
}) {
  const styles = {
    solid: "border-copper bg-copper text-ink hover:bg-bone hover:border-bone",
    ghost: "border-bone/15 text-bone hover:bg-bone hover:text-ink",
    line: "border-current hover:border-copper hover:bg-copper hover:text-ink",
  }[variant];
  const base = `min-h-12 items-center justify-center gap-2 rounded-full border px-5 text-[0.9375rem] font-semibold transition ${styles} ${className}`;

  if (!phone) {
    return (
      <span className={`${base} cursor-not-allowed opacity-45`} aria-disabled="true">
        <Phone size={18} aria-hidden />
        전화 상담 준비 중
      </span>
    );
  }

  return (
    <a className={base} href={telHref(phone)} aria-label={`${label} ${phone}`}>
      <Phone size={18} aria-hidden />
      <span>{showNumber ? phone : label}</span>
    </a>
  );
}
