import { Reveal, Eyebrow } from "./Reveal";

export const Testimonials = ({ content }) => {
  const { testimonials } = content;
  const items = Array.isArray(testimonials.items) ? testimonials.items : [];
  return (
    <section id="testimonials" data-testid="testimonials-section" className="tint-sky text-[var(--navy)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>{testimonials.eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-3xl font-display text-4xl sm:text-5xl font-medium leading-[1.04] tracking-tight">{testimonials.title}</h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="h-full rounded-[28px] bg-white p-8 sm:p-10 border line-navy" data-testid={`testimonial-${i}`}>
                <span className="font-display text-7xl leading-none text-[var(--sky)]">&ldquo;</span>
                <blockquote className="font-display text-2xl sm:text-3xl leading-snug -mt-4">{t?.quote}</blockquote>
                <figcaption className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">{t?.author}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
