import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { api, waLink } from "../../lib/api";

export const MessagesInbox = ({ onCount }) => {
  const [msgs, setMsgs] = useState([]);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get("/messages");
      const list = Array.isArray(data) ? data : [];
      setMsgs(list);
      onCount?.(list.filter((m) => !m.read).length);
    } catch (e) {
      toast.error("Não foi possível carregar as mensagens");
    }
  }, [onCount]);

  useEffect(() => {
    load();
  }, [load]);

  const markRead = async (id) => {
    await api.patch(`/messages/${id}/read`);
    load();
  };
  const remove = async (id) => {
    await api.delete(`/messages/${id}`);
    toast.success("Mensagem excluída");
    load();
  };

  if (!msgs.length) return <p className="rounded-2xl border bg-white p-10 text-center text-slate-600" data-testid="messages-empty">Nenhuma mensagem recebida ainda.</p>;

  return (
    <div className="space-y-3" data-testid="admin-tab-inbox-messages">
      {msgs.map((m) => (
        <article key={m.id} className={`rounded-2xl border bg-white p-5 ${m.read ? "" : "border-l-4 border-l-[var(--accent)]"}`} data-testid={`message-${m.id}`} onClick={() => !m.read && markRead(m.id)}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-[var(--navy)]">{m.name} {!m.read && <Badge className="ml-2">Nova</Badge>}</p>
              <p className="text-xs text-slate-500 mt-0.5">{new Date(m.created_at).toLocaleString("pt-BR")}</p>
            </div>
            <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); remove(m.id); }} data-testid={`message-delete-${m.id}`}><Trash2 size={16} /></Button>
          </div>
          <p className="mt-3 text-sm text-slate-700 whitespace-pre-line">{m.message}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 text-[var(--accent)]"><Mail size={14} /> {m.email}</a>
            {m.phone && <span className="inline-flex items-center gap-1.5 text-slate-600"><Phone size={14} /> {m.phone}</span>}
            {m.phone && <a href={waLink(m.phone.replace(/\D/g, "").length <= 11 ? `55${m.phone}` : m.phone, `Olá, ${m.name}!`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[var(--accent)]"><MessageCircle size={14} /> Responder no WhatsApp</a>}
          </div>
        </article>
      ))}
    </div>
  );
};
