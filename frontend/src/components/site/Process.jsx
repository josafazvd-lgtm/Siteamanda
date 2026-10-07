import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, Eyebrow } from "./Reveal";
import { imgUrl } from "../../lib/api";

export const Process = ({ content }) => {
  const { process } = content;
  const steps = Array.isArray(process.steps) ? process.steps : [];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const line = useTransform(scrollYProgress, [0.15, 0.7], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} data-testid="process-section" className="grain bg-[var(--navy)] text-white py-24 sm:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow light>{process.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.02] tracking-tight">{process.title}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative h-56 sm:h-72 overflow-hidden rounded-[28px]" style={{ clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%)" }}>
              <motion.img style={{ y, scale: 1.25 }} src={imgUrl(process.image)} alt="Família" data-testid="process-image" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="relative mt-20">
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-white/15">
            <motion.div style={{ width: line }} className="h-full bg-[var(--sky)]" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="relative pl-6 lg:pl-0 border-l lg:border-l-0 line-white" data-testid={`process-step-${i}`}>
                  <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-[var(--sky)] text-[var(--navy)] font-display text-xl font-semibold">{i + 1}</span>
                  <h3 className="mt-6 font-display text-2xl sm:text-3xl">{s?.title}</h3>
                  <p className="mt-3 text-white/75 leading-relaxed text-sm sm:text-base">{s?.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
