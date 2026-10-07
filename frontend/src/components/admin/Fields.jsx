import { useRef, useState } from "react";
import { toast } from "sonner";
import { Upload, Trash2, Plus, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { api, imgUrl, formatApiError } from "../../lib/api";

export const TextField = ({ label, value, onChange, multiline, testId }) => (
  <div className="space-y-1.5">
    <Label className="text-xs uppercase tracking-wider text-slate-600">{label}</Label>
    {multiline ? (
      <Textarea rows={4} value={value ?? ""} onChange={(e) => onChange(e.target.value)} data-testid={testId} />
    ) : (
      <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} data-testid={testId} />
    )}
  </div>
);

export const ListField = ({ label, items, fields, onChange, testId }) => {
  const list = Array.isArray(items) ? items : [];
  const update = (i, k, v) => onChange(list.map((it, j) => (j === i ? { ...it, [k]: v } : it)));
  const blank = Object.fromEntries(fields.map(([k]) => [k, ""]));
  return (
    <div className="space-y-3">
      <Label className="text-xs uppercase tracking-wider text-slate-600">{label}</Label>
      {list.map((it, i) => (
        <div key={i} className="rounded-xl border bg-slate-50 p-4 space-y-3" data-testid={`${testId}-item-${i}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Item {i + 1}</span>
            <Button type="button" size="sm" variant="ghost" onClick={() => onChange(list.filter((_, j) => j !== i))} data-testid={`${testId}-remove-${i}`}>
              <Trash2 size={14} />
            </Button>
          </div>
          {fields.map(([k, l, ml]) => (
            <TextField key={k} label={l} value={it?.[k]} multiline={ml} onChange={(v) => update(i, k, v)} testId={`${testId}-${i}-${k}`} />
          ))}
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => onChange([...list, blank])} data-testid={`${testId}-add`}>
        <Plus size={14} className="mr-1" /> Adicionar
      </Button>
    </div>
  );
};

export const ImageField = ({ label, value, onChange, testId, allowEmpty }) => {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);
  const upload = async (file) => {
    if (!file) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post("/upload", fd);
      onChange(data.url);
      toast.success("Imagem enviada. Clique em Salvar para publicar.");
    } catch (e) {
      toast.error(formatApiError(e.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="rounded-2xl border bg-white p-4 space-y-3" data-testid={testId}>
      <Label className="text-xs uppercase tracking-wider text-slate-600">{label}</Label>
      <div className="aspect-video rounded-xl bg-slate-100 overflow-hidden grid place-items-center">
        {value ? <img src={imgUrl(value)} alt={label} className="h-full w-full object-contain" /> : <span className="text-xs text-slate-500">Sem imagem (usa o monograma)</span>}
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => upload(e.target.files?.[0])} data-testid={`${testId}-file`} />
      <div className="flex gap-2">
        <Button type="button" size="sm" onClick={() => ref.current?.click()} disabled={busy} data-testid={`${testId}-upload`}>
          {busy ? <Loader2 size={14} className="mr-1 animate-spin" /> : <Upload size={14} className="mr-1" />} Enviar foto
        </Button>
        {allowEmpty && value && (
          <Button type="button" size="sm" variant="outline" onClick={() => onChange("")} data-testid={`${testId}-clear`}>
            Remover
          </Button>
        )}
      </div>
    </div>
  );
};
