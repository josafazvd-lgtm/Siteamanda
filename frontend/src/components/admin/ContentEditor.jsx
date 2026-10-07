import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { TextField, ListField } from "./Fields";

const SCHEMA = [
  { key: "brand", label: "Marca e contato", fields: [["name", "Nome"], ["title", "Especialidade"], ["oab", "OAB"], ["whatsapp", "WhatsApp (DDI + DDD + número, ex: 5591980324349)"], ["email", "E-mail"]] },
  { key: "hero", label: "Topo da página", fields: [["eyebrow", "Chamada"], ["lines", "Título (cada linha em uma nova linha)", true], ["subtitle", "Subtítulo", true], ["ctaPrimary", "Botão WhatsApp"], ["ctaSecondary", "Botão mensagem"]] },
  { key: "marquee", label: "Faixa animada", fields: [["items", "Itens separados por ·", true]] },
  { key: "about", label: "Sobre", fields: [["eyebrow", "Chamada"], ["title", "Título"], ["text", "Texto (parágrafos separados por linha)", true], ["quote", "Citação", true]], list: { key: "highlights", label: "Destaques", fields: [["value", "Valor"], ["label", "Descrição"]] } },
  { key: "areas", label: "Áreas de atuação", fields: [["eyebrow", "Chamada"], ["title", "Título"]], list: { key: "items", label: "Áreas", fields: [["title", "Título"], ["text", "Descrição", true]] } },
  { key: "process", label: "Como funciona", fields: [["eyebrow", "Chamada"], ["title", "Título"]], list: { key: "steps", label: "Etapas", fields: [["title", "Título"], ["text", "Descrição", true]] } },
  { key: "testimonials", label: "Depoimentos", fields: [["eyebrow", "Chamada"], ["title", "Título"]], list: { key: "items", label: "Depoimentos", fields: [["quote", "Depoimento", true], ["author", "Autor"]] } },
  { key: "faq", label: "Perguntas frequentes", fields: [["eyebrow", "Chamada"], ["title", "Título"]], list: { key: "items", label: "Perguntas", fields: [["q", "Pergunta"], ["a", "Resposta", true]] } },
  { key: "contact", label: "Contato", fields: [["eyebrow", "Chamada"], ["title", "Título"], ["text", "Texto", true]] },
  { key: "footer", label: "Rodapé", fields: [["text", "Texto", true]] },
];

export const ContentEditor = ({ draft, setSection }) => (
  <Accordion type="single" collapsible defaultValue="brand" className="space-y-3" data-testid="admin-tab-content-editor">
    {SCHEMA.map((s) => (
      <AccordionItem key={s.key} value={s.key} className="rounded-2xl border bg-white px-5">
        <AccordionTrigger className="font-display text-xl hover:no-underline" data-testid={`content-section-${s.key}`}>{s.label}</AccordionTrigger>
        <AccordionContent className="space-y-4 pb-6">
          {s.fields.map(([k, l, ml]) => (
            <TextField key={k} label={l} multiline={ml} value={draft[s.key]?.[k]} onChange={(v) => setSection(s.key, { [k]: v })} testId={`field-${s.key}-${k}`} />
          ))}
          {s.list && (
            <ListField label={s.list.label} items={draft[s.key]?.[s.list.key]} fields={s.list.fields} onChange={(v) => setSection(s.key, { [s.list.key]: v })} testId={`list-${s.key}`} />
          )}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);
