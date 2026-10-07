import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import { api, formatApiError } from "../lib/api";
import { useSite } from "../context/SiteContext";
import { Monogram } from "../components/site/Logo";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function AdminLogin() {
  const nav = useNavigate();
  const { content } = useSite();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("aa_token", data.token);
      nav("/admin");
    } catch (err) {
      setError(formatApiError(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grain min-h-screen bg-[var(--navy)] grid place-items-center px-5">
      <div className="spotlight absolute inset-0" />
      <form onSubmit={submit} className="relative z-10 w-full max-w-md rounded-[28px] bg-white p-8 sm:p-10 shadow-2xl" data-testid="admin-login-form">
        <Monogram className="h-12 w-12" />
        <h1 className="mt-6 font-display text-4xl text-[var(--navy)]">Painel administrativo</h1>
        <p className="mt-2 text-sm text-slate-600">{content.brand?.name} · {content.brand?.title}</p>
        <div className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} data-testid="admin-login-email-input" className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pwd">Senha</Label>
            <Input id="pwd" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} data-testid="admin-login-password-input" className="h-12" />
          </div>
          {error && <p className="text-sm text-red-600" data-testid="admin-login-error">{error}</p>}
          <button type="submit" disabled={loading} data-testid="admin-login-submit-button" className="w-full h-12 rounded-full bg-[var(--navy)] text-white font-semibold inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60">
            {loading && <Loader2 size={18} className="animate-spin" />} Entrar
          </button>
        </div>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[var(--navy)]" data-testid="admin-back-to-site">
          <ArrowLeft size={14} /> Voltar ao site
        </Link>
      </form>
    </div>
  );
}
