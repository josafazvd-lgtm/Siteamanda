import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { MaskLines, EASE } from "./Reveal";
import { Monogram } from "./Logo";
import { imgUrl, waLink } from "../../lib/api";
import { scrollToId } from "../../lib/scroll";

const RotatingBadge = ({ text }) => (
  <div className="absolute -left-6 bottom-10 sm:-left-12 h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-[var(--sky)] text-[var(--navy)] grid place-items-center shadow-2xl z-20" data-testid="hero-badge">
    <svg viewBox="0 0 100 100" className="absolute inset-0 spin-slow">
      <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
      <text fontSize="8.6" letterSpacing="2.2" fill="currentColor" fontWeight="600">
        <textPath href="#circ">{text}</textPath>
      </text>
    </svg>
    <Monogram className="h-9 w-9 sm:h-11 sm:w-11" />
  </div>
);

export const Hero = ({ content }) => {
  const { hero, brand, layout } = content;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reverse = layout?.heroImageSide === "left";

  return (
    <section id="top" ref={ref} data-testid="hero-section" className="grain relative min-h-[100svh] overflow-hidden bg-[var(--navy)] text-white">
      <div className="spotlight absolute inset-0" />
      <div className={`relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-32 sm:pt-36 pb-16 lg:pb-24 flex flex-col gap-14 lg:gap-10 lg:items-center ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        <motion.div style={{ y: textY }} className="lg:w-[58%]">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="inline-flex items-center gap-2 rounded-full border line-white px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/85" data-testid="hero-eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--sky)] animate-pulse" /> {hero.eyebrow}
          </motion.p>
          <h1 data-testid="hero-title" className="mt-8 font-display font-medium leading-[0.98] tracking-tight text-[2.9rem] sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]">
            <MaskLines text={hero.lines} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.75, ease: EASE }} className="mt-8 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed" data-testid="hero-subtitle">
            {hero.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease: EASE }} className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href={waLink(brand.whatsapp)} target="_blank" rel="noreferrer" data-testid="hero-whatsapp-cta" className="btn-shine group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--sky)] px-7 py-4 font-semibold text-[var(--navy)] transition-transform duration-300 hover:-translate-y-0.5">
              <MessageCircle size={18} /> {hero.ctaPrimary}
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button onClick={() => scrollToId("contact")} data-testid="hero-contact-cta" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-4 font-semibold transition-colors duration-300 hover:bg-white hover:text-[var(--navy)]">
              {hero.ctaSecondary}
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/75">
            <span data-testid="hero-oab">{brand.oab}</span>
            <span>{brand.email}</span>
          </motion.div>
        </motion.div>

        <div className="lg:w-[42%] flex justify-center" style={{ perspective: 1200 }} onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="relative w-[82%] sm:w-[60%] lg:w-full max-w-[440px]"
          >
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
              className="arch overflow-hidden aspect-[3/4] ring-1 ring-white/15"
            >
              <motion.img style={{ y: imgY, scale: 1.18 }} src={imgUrl(hero.image)} alt={brand.name} data-testid="hero-image" className="h-full w-full object-cover object-top" />
            </motion.div>
            <div className="absolute -inset-4 arch border border-[var(--sky)]/40 -z-10" style={{ transform: "translateZ(-40px)" }} />
            <RotatingBadge text={`${brand.title} • ${brand.oab} • 100% ONLINE • `.toUpperCase()} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
