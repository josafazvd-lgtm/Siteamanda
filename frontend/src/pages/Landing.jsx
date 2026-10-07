import { useEffect } from "react";
import Lenis from "lenis";
import { MessageCircle } from "lucide-react";
import { useSite } from "../context/SiteContext";
import { setLenis } from "../lib/scroll";
import { waLink } from "../lib/api";
import { Nav } from "../components/site/Nav";
import { Hero } from "../components/site/Hero";
import { Marquee } from "../components/site/Marquee";
import { About } from "../components/site/About";
import { Areas } from "../components/site/Areas";
import { Process } from "../components/site/Process";
import { Testimonials } from "../components/site/Testimonials";
import { Faq } from "../components/site/Faq";
import { Contact } from "../components/site/Contact";
import { Footer } from "../components/site/Footer";

const SECTIONS = { about: About, areas: Areas, process: Process, testimonials: Testimonials, faq: Faq, contact: Contact };

export default function Landing() {
  const { content } = useSite();

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    setLenis(lenis);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  const sections = Array.isArray(content.layout?.sections) ? content.layout.sections : [];

  return (
    <div className="overflow-x-clip" data-testid="landing-page">
      <Nav content={content} />
      <main>
        <Hero content={content} />
        {content.layout?.showMarquee !== false && <Marquee text={content.marquee?.items} />}
        {sections.filter((s) => s.visible && SECTIONS[s.id]).map((s) => {
          const C = SECTIONS[s.id];
          return <C key={s.id} content={content} />;
        })}
      </main>
      <Footer content={content} />
      <a
        href={waLink(content.brand?.whatsapp)}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        data-testid="floating-whatsapp"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[var(--sky)] text-[var(--navy)] shadow-[0_12px_30px_-8px_rgba(11,31,58,0.5)] transition-transform duration-300 hover:scale-110"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
