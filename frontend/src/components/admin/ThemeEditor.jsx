import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DEFAULT_CONTENT } from "../../lib/defaults";

const COLORS = [
  ["navy", "Azul escuro (principal)"],
  ["sky", "Azul claro (destaque)"],
  ["accent", "Azul vivo (detalhes)"],
  ["paper", "Fundo claro"],
];

const PRESETS = [
  { name: "Clássico", colors: DEFAULT_CONTENT.colors },
  { name: "Oceano", colors: { navy: "#062B4A", sky: "#7DD3FC", accent: "#0284C7", paper: "#F0F9FF" } },
  { name: "Noite", colors: { navy: "#111A2E", sky: "#B6CCF5", accent: "#4F7CD9", paper: "#F5F7FB" } },
  { name: "Céu", colors: { navy: "#1E3A5F", sky: "#BFE0FA", accent: "#3B82F6", paper: "#F7FBFF" } },
];

export const ThemeEditor = ({ draft, setSection }) => {
  const c = draft.colors || {};
  return (
    <div className="space-y-6" data-testid="admin-tab-color-picker">
      <div className="rounded-2xl border bg-white p-5">
        <p className="text-xs uppercase tracking-wider text-slate-600 mb-3">Paletas prontas</p>
        <div className="flex flex-wrap gap-3">
          {PRESETS.map((p) => (
            <button key={p.name} onClick={() => setSection("colors", p.colors)} data-testid={`preset-${p.name}`} className="flex items-center gap-2 rounded-full border px-3 py-2 text-sm hover:bg-slate-50">
              <span className="flex -space-x-1">{Object.values(p.colors).map((v) => <span key={v} className="h-5 w-5 rounded-full border-2 border-white" style={{ background: v }} />)}</span>
              {p.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {COLORS.map(([k, l]) => (
          <div key={k} className="rounded-2xl border bg-white p-5 flex items-center gap-4">
            <input type="color" value={c[k] || "#000000"} onChange={(e) => setSection("colors", { [k]: e.target.value })} className="h-14 w-14 rounded-xl cursor-pointer border-0 bg-transparent" data-testid={`color-${k}`} />
            <div className="flex-1 space-y-1">
              <Label className="text-sm">{l}</Label>
              <Input value={c[k] || ""} onChange={(e) => setSection("colors", { [k]: e.target.value })} data-testid={`color-${k}-hex`} />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl overflow-hidden border" data-testid="theme-preview">
        <div className="p-8" style={{ background: c.navy, color: "#fff" }}>
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: c.sky }}>Pré-visualização</p>
          <p className="font-display text-3xl mt-2">Cuidar da sua família <em style={{ color: c.sky }}>é justiça.</em></p>
          <span className="mt-4 inline-block rounded-full px-5 py-2 text-sm font-semibold" style={{ background: c.sky, color: c.navy }}>Agendar consulta</span>
        </div>
        <div className="p-6" style={{ background: c.paper, color: c.navy }}>
          <span className="text-sm font-semibold" style={{ color: c.accent }}>01</span> <span className="font-display text-2xl">Divórcio</span>
        </div>
      </div>
    </div>
  );
};
