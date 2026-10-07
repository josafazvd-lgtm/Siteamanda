import { imgUrl } from "../../lib/api";

export const Monogram = ({ className = "h-10 w-10", light = false }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <rect width="64" height="64" rx="14" fill={light ? "#FFFFFF" : "var(--navy)"} />
    <path d="M14 48 L26 16 L38 48" fill="none" stroke="var(--sky)" strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M26 48 L38 16 L50 48" fill="none" stroke={light ? "var(--navy)" : "#FFFFFF"} strokeWidth="3.2" strokeLinejoin="round" />
    <path d="M18 38 H46" stroke="var(--sky)" strokeWidth="2.4" />
  </svg>
);

export const Logo = ({ brand, dark = false, testId = "nav-brand-logo" }) => (
  <a href="#top" data-testid={testId} className="flex items-center gap-3 group">
    {brand?.logo ? (
      <img src={imgUrl(brand.logo)} alt={brand?.name} className="h-10 w-auto max-w-[160px] object-contain" />
    ) : (
      <Monogram className="h-10 w-10 transition-transform duration-500 group-hover:rotate-[8deg]" light={dark} />
    )}
    <span className="leading-tight">
      <span className="block font-display text-xl font-medium tracking-tight">{brand?.name}</span>
      <span className="block text-[11px] uppercase tracking-[0.28em] opacity-80">{brand?.title}</span>
    </span>
  </a>
);
