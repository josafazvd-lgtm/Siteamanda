import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, LogOut, ExternalLink, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { api, formatApiError } from "../lib/api";
import { useSite, applyColors } from "../context/SiteContext";
import { Monogram } from "../components/site/Logo";
import { ContentEditor } from "../components/admin/ContentEditor";
import { MediaEditor } from "../components/admin/MediaEditor";
import { ThemeEditor } from "../components/admin/ThemeEditor";
import { LayoutEditor } from "../components/admin/LayoutEditor";
import { MessagesInbox } from "../components/admin/MessagesInbox";

const TABS = [["content", "Textos"], ["media", "Fotos e logo"], ["colors", "Cores"], ["layout", "Disposição"], ["messages", "Mensagens"]];

export default function Admin() {
  const nav = useNavigate();
  const { content, setContent } = useSite();
  const [user, setUser] = useState(null);
  const [draft, setDraft] = useState(content);
  const [saving, setSaving] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    api.get("/auth/me").then((r) => setUser(r.data)).catch(() => nav("/admin/login"));
  }, [nav]);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  useEffect(() => {
    applyColors(draft.colors);
  }, [draft.colors]);

  const setSection = (key, patch) => setDraft((d) => ({ ...d, [key]: { ...(d[key] || {}), ...patch } }));

  const save = async () => {
    setSaving(true);
    try {
      await api.put("/content", { data: draft });
      setContent(draft);
      toast.success("Alterações publicadas no site");
    } catch (e) {
      toast.error(formatApiError(e.response?.data?.detail));
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await api.post("/auth/logout").catch(() => {});
    localStorage.removeItem("aa_token");
    nav("/admin/login");
  };

  if (!user) return <div className="min-h-screen grid place-items-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-slate-50" data-testid="admin-dashboard">
      <header className="sticky top-0 z-30 bg-[var(--navy)] text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center gap-3">
          <Monogram className="h-9 w-9" light />
          <span className="font-display text-xl hidden sm:block">Painel · {content.brand?.name}</span>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/" target="_blank" className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm hover:bg-white/10" data-testid="admin-view-site"><ExternalLink size={15} /> <span className="hidden sm:inline">Ver site</span></Link>
            <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[var(--sky)] text-[var(--navy)] px-4 py-2 text-sm font-semibold disabled:opacity-60" data-testid="admin-save-button">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Salvar
            </button>
            <button onClick={logout} className="rounded-full p-2 hover:bg-white/10" aria-label="Sair" data-testid="admin-logout-button"><LogOut size={18} /></button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <h1 className="font-display text-4xl text-[var(--navy)]">Editar site</h1>
        <p className="text-sm text-slate-600 mt-1">Faça as alterações e clique em <strong>Salvar</strong> para publicar.</p>
        <Tabs defaultValue="content" className="mt-6">
          <TabsList className="h-auto w-full justify-start overflow-x-auto flex-nowrap bg-white border p-1 rounded-full">
            {TABS.map(([v, l]) => (
              <TabsTrigger key={v} value={v} className="rounded-full px-4 py-2 data-[state=active]:bg-[var(--navy)] data-[state=active]:text-white" data-testid={`admin-tab-${v}`}>
                {l}{v === "messages" && unread > 0 ? ` (${unread})` : ""}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="content" className="mt-6"><ContentEditor draft={draft} setSection={setSection} /></TabsContent>
          <TabsContent value="media" className="mt-6"><MediaEditor draft={draft} setSection={setSection} /></TabsContent>
          <TabsContent value="colors" className="mt-6"><ThemeEditor draft={draft} setSection={setSection} /></TabsContent>
          <TabsContent value="layout" className="mt-6"><LayoutEditor draft={draft} setSection={setSection} /></TabsContent>
          <TabsContent value="messages" className="mt-6 data-[state=inactive]:hidden" forceMount><MessagesInbox onCount={setUnread} /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
