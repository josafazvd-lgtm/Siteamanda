import { ArrowUp, ArrowDown } from "lucide-react";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { SECTION_LABELS } from "../../lib/defaults";

export const LayoutEditor = ({ draft, setSection }) => {
  const layout = draft.layout || {};
  const sections = Array.isArray(layout.sections) ? layout.sections : [];
  const setSections = (s) => setSection("layout", { sections: s });
  const move = (i, d) => {
    const s = [...sections];
    const j = i + d;
    if (j < 0 || j >= s.length) return;
    [s[i], s[j]] = [s[j], s[i]];
    setSections(s);
  };

  return (
    <div className="space-y-6" data-testid="admin-tab-layout">
      <div className="rounded-2xl border bg-white p-5 space-y-4">
        <p className="font-display text-xl">Topo da página</p>
        <div className="flex flex-wrap gap-2">
          {[["right", "Foto à direita"], ["left", "Foto à esquerda"]].map(([v, l]) => (
            <button key={v} onClick={() => setSection("layout", { heroImageSide: v })} data-testid={`hero-side-${v}`}
              className={`rounded-full border px-4 py-2 text-sm ${layout.heroImageSide === v ? "bg-[var(--navy)] text-white" : "hover:bg-slate-50"}`}>
              {l}
            </button>
          ))}
        </div>
        <label className="flex items-center justify-between gap-4 text-sm">
          Exibir faixa animada abaixo do topo
          <Switch checked={layout.showMarquee !== false} onCheckedChange={(v) => setSection("layout", { showMarquee: v })} data-testid="toggle-marquee" />
        </label>
      </div>
      <div className="rounded-2xl border bg-white p-5">
        <p className="font-display text-xl">Ordem e visibilidade das seções</p>
        <p className="text-sm text-slate-600 mt-1">Use as setas para reordenar e o botão para mostrar/ocultar.</p>
        <ul className="mt-4 divide-y">
          {sections.map((s, i) => (
            <li key={s.id} className="flex items-center gap-3 py-3" data-testid={`layout-row-${s.id}`}>
              <span className="w-6 text-xs font-semibold text-slate-500">{i + 1}</span>
              <span className={`flex-1 font-medium ${s.visible ? "" : "text-slate-400 line-through"}`}>{SECTION_LABELS[s.id] || s.id}</span>
              <Button size="icon" variant="ghost" onClick={() => move(i, -1)} disabled={i === 0} data-testid={`layout-up-${s.id}`}><ArrowUp size={16} /></Button>
              <Button size="icon" variant="ghost" onClick={() => move(i, 1)} disabled={i === sections.length - 1} data-testid={`layout-down-${s.id}`}><ArrowDown size={16} /></Button>
              <Switch checked={!!s.visible} onCheckedChange={(v) => setSections(sections.map((x) => (x.id === s.id ? { ...x, visible: v } : x)))} data-testid={`layout-toggle-${s.id}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
