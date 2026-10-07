import { Quote } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { imgUrl } from "../../lib/api";

export const About = ({ content }) => {
  const { about, brand } = content;
  const hl = Array.isArray(about.highlights) ? about.highlights : [];
  return (
    <section id="about" data-testid="about-section" className="bg-[var(--paper)] text-[var(--navy)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.02] tracking-tight">{about.title}</h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-5 auto-rows-auto">
          <Reveal className="md:col-span-3 lg:col-span-5 md:row-span-2">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px] group">
              <img src={imgUrl(about.image)} alt="Atendimento" data-testid="about-image" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--navy) 88%, transparent) 0%, transparent 55%)" }} />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs uppercase tracking-[0.28em] text-white/85">{brand.oab}</p>
                <p className="font-display text-3xl mt-1">{brand.name}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-3 lg:col-span-7">
            <div className="h-full rounded-[28px] bg-white p-8 sm:p-10 border line-navy">
              {String(about.text).split("\n").filter(Boolean).map((p, i) => (
                <p key={i} className="text-base sm:text-lg leading-relaxed text-ink-soft mb-4 last:mb-0" data-testid={`about-text-${i}`}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-3 lg:col-span-4">
            <div className="h-full rounded-[28px] bg-[var(--navy)] text-white p-8 sm:p-10 flex flex-col justify-between gap-8">
              <Quote className="text-[var(--sky)]" size={34} />
              <p className="font-display italic text-2xl sm:text-3xl leading-snug" data-testid="about-quote">{about.quote}</p>
            </div>
          </Reveal>

          <div className="md:col-span-6 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-5">
            {hl.map((h, i) => (
              <Reveal key={i} delay={0.2 + i * 0.08}>
                <div className="h-full rounded-[22px] tint-sky p-6 transition-transform duration-500 hover:-translate-y-1" data-testid={`about-highlight-${i}`}>
                  <p className="font-display text-3xl font-semibold">{h?.value}</p>
                  <p className="mt-1 text-sm text-ink-soft">{h?.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
