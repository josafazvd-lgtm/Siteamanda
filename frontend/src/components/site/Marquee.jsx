import { Fragment } from "react";

export const Marquee = ({ text }) => {
  const items = String(text || "").split("·").map((s) => s.trim()).filter(Boolean);
  const row = (
    <div className="flex items-center shrink-0">
      {items.map((it, i) => (
        <Fragment key={i}>
          <span className="font-display italic text-4xl sm:text-6xl px-6 sm:px-10 whitespace-nowrap">{it}</span>
          <span className="h-3 w-3 rotate-45 bg-[var(--accent)] shrink-0" />
        </Fragment>
      ))}
    </div>
  );
  return (
    <div data-testid="editorial-marquee" className="tint-sky-strong text-[var(--navy)] py-7 sm:py-10 overflow-hidden border-y line-navy">
      <div className="marquee-track flex">
        {row}
        {row}
      </div>
    </div>
  );
};
