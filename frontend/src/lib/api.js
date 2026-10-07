import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

export const api = axios.create({ baseURL: `${BACKEND_URL}/api`, withCredentials: true });

api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("aa_token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export const imgUrl = (u) => (u && u.startsWith("/api/") ? `${BACKEND_URL}${u}` : u || "");

export const waLink = (number, text = "Olá, Dra. Amanda! Gostaria de agendar uma consulta.") =>
  `https://wa.me/${String(number || "").replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export function formatApiError(detail) {
  if (detail == null) return "Algo deu errado. Tente novamente.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg || JSON.stringify(e)).join(" ");
  return detail?.msg || String(detail);
}
