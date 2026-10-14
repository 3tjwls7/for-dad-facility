import { Reveal } from "@/components/reveal";

export function SectionHead({
  index,
  eyebrow,
  title,
  aside,
  id,
  light = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  aside?: string;
  id?: string;
  light?: boolean;
}) {
  const line = light ? "border-bone/15" : "border-ink/15";
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className={`flex items-center gap-3 border-b pb-5 ${line}`}>
        <span className="text-sm font-bold text-copper">{index}</span>
        <span className="text-base font-bold">{eyebrow}</span>
      </div>
      <div className="mt-8 grid items-end gap-6 lg:grid-cols-12">
        <h2 id={id} className="text-[clamp(2.125rem,5vw,5rem)] leading-[1.08] font-bold tracking-[-0.045em] whitespace-pre-line lg:col-span-8">
          {title}
        </h2>
        {aside ? <p className="max-w-[36ch] text-base leading-7 opacity-80 lg:col-span-4 lg:justify-self-end">{aside}</p> : null}
      </div>
    </Reveal>
  );
}
