import { Reveal } from "@/components/reveal";

export function SectionLabel({
  label,
  light = false,
  labelAs = "span",
  id,
}: {
  label: string;
  light?: boolean;
  labelAs?: "span" | "h1" | "h2";
  id?: string;
}) {
  const Label = labelAs;
  const color = light ? "border-bone/40 text-bone" : "border-ink/30 text-ink";

  return (
    <Label id={id} className={`inline-flex min-h-10 items-center rounded-full border px-5 text-[0.9375rem] font-semibold md:min-h-11 md:text-base ${color}`}>
      {label}
    </Label>
  );
}

export function SectionHead({
  eyebrow,
  title,
  aside,
  id,
  light = false,
  level = "h2",
}: {
  eyebrow: string;
  title: string;
  aside?: string;
  id?: string;
  light?: boolean;
  level?: "h1" | "h2";
}) {
  const Heading = level;
  const asideColor = light ? "text-bone/75" : "text-ink/70";
  return (
    <Reveal className="mb-14 md:mb-20">
      <SectionLabel label={eyebrow} light={light} />
      <div className="mt-6 max-w-[1200px]">
        <Heading id={id} className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.15] font-bold tracking-[-0.04em] [text-wrap:balance]">
          {title}
        </Heading>
        {aside ? <p className={`mt-5 max-w-[72ch] text-lg leading-8 font-medium [text-wrap:pretty] ${asideColor}`}>{aside}</p> : null}
      </div>
    </Reveal>
  );
}
