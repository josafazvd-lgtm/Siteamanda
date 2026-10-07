import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 36, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const MaskLines = ({ text = "", className = "", delay = 0.25, accentLast = true }) => {
  const lines = String(text).split("\n").filter(Boolean);
  return (
    <span className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.06em]">
          <motion.span
            className={`block ${accentLast && i === lines.length - 1 && lines.length > 1 ? "italic text-[var(--sky)]" : ""}`}
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.15, delay: delay + i * 0.13, ease: EASE }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export const Eyebrow = ({ children, light = false }) => (
  <span className={`inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] font-semibold ${light ? "text-[var(--sky)]" : "text-[var(--accent)]"}`}>
    <span className="h-px w-8 bg-current" />
    {children}
  </span>
);
