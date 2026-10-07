import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { scrollToId } from "../../lib/scroll";

export const Areas = ({ content }) => {
  const { areas } = content;
  const items = Array.isArray(areas.items) ? areas.items : [];
  return (
    <section id="areas" data-testid="areas-section" className="bg-white text-[var(--navy)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>{areas.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-4xl sm:text-5xl font-medium leading-[1.04] tracking-tight">{areas.title}</h2>
          </div>
        </Reveal>
        <div className="lg:col-span-8 border-b line-navy">
          {items.map((a, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <button
                onClick={() => scrollToId("contact")}
                data-testid="practice-area-item"
                className="group relative w-full text-left grid grid-cols-[auto_1fr_auto] items-start gap-5 sm:gap-8 border-t line-navy py-8 sm:py-10 px-2 sm:px-4 overflow-hidden"
              >
                <span className="absolute inset-0 tint-sky origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100 -z-0" />
                <span className="relative text-sm font-semibold text-[var(--accent)] pt-2">{String(i + 1).padStart(2, "0")}</span>
                <span className="relative">
                  <span className="block font-display text-3xl sm:text-4xl font-medium transition-transform duration-500 group-hover:translate-x-2">{a?.title}</span>
                  <span className="block mt-3 max-w-xl text-sm sm:text-base text-ink-soft leading-relaxed">{a?.text}</span>
                </span>
                <span className="relative mt-1 grid h-11 w-11 place-items-center rounded-full border line-navy transition-[background-color,color,transform] duration-500 group-hover:bg-[var(--navy)] group-hover:text-white group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
