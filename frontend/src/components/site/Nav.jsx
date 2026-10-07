import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { waLink } from "../../lib/api";
import { scrollToId } from "../../lib/scroll";
import { SECTION_LABELS } from "../../lib/defaults";

export const Nav = ({ content }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = (content.layout?.sections || []).filter((s) => s.visible && SECTION_LABELS[s.id]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  const solid = scrolled || open;
  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,color,box-shadow] duration-500 ${
        solid ? "bg-white/85 backdrop-blur-xl text-[var(--navy)] shadow-[0_1px_0_rgba(11,31,58,0.08)]" : "text-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-[76px] flex items-center justify-between">
        <Logo brand={content.brand} dark={!solid} />
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((s) => (
            <button key={s.id} data-testid={`nav-link-${s.id}`} onClick={() => go(s.id)} className="relative text-sm font-medium group">
              {SECTION_LABELS[s.id]}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
          <a
            href={waLink(content.brand?.whatsapp)}
            target="_blank"
            rel="noreferrer"
            data-testid="nav-whatsapp-cta"
            className="btn-shine inline-flex items-center gap-2 rounded-full bg-[var(--sky)] px-5 py-2.5 text-sm font-semibold text-[var(--navy)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Agendar consulta <ArrowUpRight size={16} />
          </a>
        </nav>
        <button data-testid="nav-mobile-toggle" className="lg:hidden p-2 -mr-2" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl"
            data-testid="nav-mobile-menu"
          >
            <div className="px-5 pb-8 pt-2 flex flex-col">
              {links.map((s, i) => (
                <button key={s.id} data-testid={`mobile-link-${s.id}`} onClick={() => go(s.id)} className="flex items-baseline gap-4 py-4 border-b line-navy text-left">
                  <span className="text-xs text-[var(--accent)] font-semibold">0{i + 1}</span>
                  <span className="font-display text-3xl">{SECTION_LABELS[s.id]}</span>
                </button>
              ))}
              <a href={waLink(content.brand?.whatsapp)} target="_blank" rel="noreferrer" data-testid="mobile-whatsapp-cta" className="mt-6 inline-flex justify-center items-center gap-2 rounded-full bg-[var(--navy)] px-5 py-4 font-semibold text-white">
                Agendar consulta <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
