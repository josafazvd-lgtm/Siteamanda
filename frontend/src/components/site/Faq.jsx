import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Reveal, Eyebrow } from "./Reveal";

export const Faq = ({ content }) => {
  const { faq } = content;
  const items = Array.isArray(faq.items) ? faq.items : [];
  return (
    <section id="faq" data-testid="faq-section" className="bg-[var(--paper)] text-[var(--navy)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl sm:text-5xl font-medium leading-[1.04] tracking-tight">{faq.title}</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <Accordion type="single" collapsible className="border-t line-navy">
            {items.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`} className="border-b line-navy">
                <AccordionTrigger data-testid={`faq-trigger-${i}`} className="py-7 text-left font-display text-2xl sm:text-[1.7rem] font-medium hover:no-underline hover:text-[var(--accent)] transition-colors">
                  {f?.q}
                </AccordionTrigger>
                <AccordionContent className="pb-7 text-base text-ink-soft leading-relaxed">{f?.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
};
