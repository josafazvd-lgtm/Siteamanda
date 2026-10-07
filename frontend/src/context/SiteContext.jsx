import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";
import { DEFAULT_CONTENT, mergeContent } from "../lib/defaults";

const SiteCtx = createContext({ content: DEFAULT_CONTENT, reload: () => {} });

export const applyColors = (colors) => {
  const root = document.documentElement;
  Object.entries(colors || {}).forEach(([k, v]) => v && root.style.setProperty(`--${k}`, v));
};

export function SiteProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  const reload = useCallback(async () => {
    try {
      const { data } = await api.get("/content");
      setContent(mergeContent(DEFAULT_CONTENT, data?.data ?? {}));
    } catch (e) {
      setContent(DEFAULT_CONTENT);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    applyColors(content.colors);
  }, [content.colors]);

  return <SiteCtx.Provider value={{ content, setContent, reload }}>{children}</SiteCtx.Provider>;
}

export const useSite = () => useContext(SiteCtx);
