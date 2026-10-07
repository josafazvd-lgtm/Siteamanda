import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Mail, MessageCircle, Loader2 } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { api, imgUrl, waLink, formatApiError } from "../../lib/api";

const field = "w-full bg-transparent border-b line-navy py-4 text-base outline-none transition-colors focus:border-[var(--accent)] placeholder:text-[color-mix(in_srgb,var(--navy)_55%,white)]";

export const Contact = ({ content }) => {
  const { contact, brand } = content;
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/contact", form);
      toast.success("Mensagem enviada! Retornarei em breve.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail));
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="bg-white text-[var(--navy)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <Reveal className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <Eyebrow>{contact.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.02] tracking-tight">{contact.title}</h2>
            <p className="mt-6 text-base sm:text-lg text-ink-soft leading-relaxed">{contact.text}</p>
          </div>
          <div className="relative h-56 sm:h-64 overflow-hidden rounded-[28px]">
            <img src={imgUrl(contact.image)} alt="Família" data-testid="contact-image" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="grid gap-3">
            <a href={waLink(brand.whatsapp)} target="_blank" rel="noreferrer" data-testid="contact-whatsapp-link" className="group flex items-center gap-3 rounded-2xl bg-[var(--navy)] text-white p-5 transition-transform duration-300 hover:-translate-y-0.5">
              <MessageCircle size={20} className="text-[var(--sky)]" />
              <span className="text-sm font-semibold">WhatsApp</span>
              <ArrowUpRight size={16} className="ml-auto transition-transform group-hover:rotate-45" />
            </a>
            <a href={`mailto:${brand.email}`} data-testid="contact-email-link" className="group flex items-center gap-3 rounded-2xl tint-sky p-5 transition-transform duration-300 hover:-translate-y-0.5 min-w-0">
              <Mail size={20} className="text-[var(--accent)] shrink-0" />
              <span className="text-sm font-semibold truncate">{brand.email}</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form onSubmit={submit} data-testid="contact-form" className="rounded-[28px] tint-sky p-6 sm:p-12">
            <div className="grid sm:grid-cols-2 gap-x-8">
              <input required minLength={2} value={form.name} onChange={set("name")} placeholder="Seu nome" data-testid="contact-input-name" className={field} />
              <input required type="email" value={form.email} onChange={set("email")} placeholder="Seu e-mail" data-testid="contact-input-email" className={field} />
            </div>
            <input value={form.phone} onChange={set("phone")} placeholder="Telefone / WhatsApp (opcional)" data-testid="contact-input-phone" className={field} />
            <textarea required minLength={5} rows={5} value={form.message} onChange={set("message")} placeholder="Conte brevemente sobre o seu caso" data-testid="contact-input-message" className={`${field} resize-none`} />
            <button type="submit" disabled={sending} data-testid="contact-submit-button" className="btn-shine mt-10 inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[var(--navy)] px-9 py-4 font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60">
              {sending ? <Loader2 size={18} className="animate-spin" /> : null}
              Enviar mensagem <ArrowUpRight size={18} />
            </button>
            <p className="mt-5 text-xs text-ink-soft">Suas informações são tratadas com total sigilo.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
