import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { waLink } from "../../lib/api";

export const Footer = ({ content }) => {
  const { brand, footer } = content;
  const year = new Date().getFullYear();
  return (
    <footer data-testid="site-footer" className="grain bg-[var(--navy)] text-white pt-20 pb-10 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <Logo brand={brand} dark testId="footer-brand-logo" />
            <p className="mt-6 max-w-md text-sm text-white/75 leading-relaxed">{footer.text}</p>
          </div>
          <div className="md:col-span-3 text-sm space-y-2">
            <p className="uppercase tracking-[0.25em] text-xs text-[var(--sky)] mb-4">Contato</p>
            <a href={waLink(brand.whatsapp)} target="_blank" rel="noreferrer" className="block text-white/85 hover:text-white" data-testid="footer-whatsapp">WhatsApp</a>
            <a href={`mailto:${brand.email}`} className="block text-white/85 hover:text-white break-all" data-testid="footer-email">{brand.email}</a>
          </div>
          <div className="md:col-span-3 text-sm space-y-2">
            <p className="uppercase tracking-[0.25em] text-xs text-[var(--sky)] mb-4">Registro</p>
            <p className="text-white/85">{brand.oab}</p>
            <p className="text-white/85">Atendimento 100% online</p>
          </div>
        </div>
        <p className="mt-16 font-display font-medium leading-none tracking-tight text-[17vw] sm:text-[13vw] lg:text-[10.5rem] text-white/[0.07] select-none whitespace-nowrap" aria-hidden="true">
          {brand.name}
        </p>
        <div className="mt-6 pt-6 border-t line-white flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/70">
          <span>© {year} {brand.name} · {brand.title}. Todos os direitos reservados.</span>
          <Link to="/admin" data-testid="footer-admin-link" className="hover:text-white">Área administrativa</Link>
        </div>
      </div>
    </footer>
  );
};
