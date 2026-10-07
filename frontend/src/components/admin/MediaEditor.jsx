import { ImageField } from "./Fields";

const IMAGES = [
  ["brand", "logo", "Logo (opcional)", true],
  ["hero", "image", "Foto principal (topo)"],
  ["about", "image", "Foto — Sobre"],
  ["process", "image", "Foto — Como funciona"],
  ["contact", "image", "Foto — Contato"],
];

export const MediaEditor = ({ draft, setSection }) => (
  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4" data-testid="admin-tab-media">
    {IMAGES.map(([sec, key, label, allowEmpty]) => (
      <ImageField key={`${sec}-${key}`} label={label} allowEmpty={allowEmpty} value={draft[sec]?.[key]} onChange={(v) => setSection(sec, { [key]: v })} testId={`image-${sec}-${key}`} />
    ))}
  </div>
);
