import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LANG, isLang, LANGS, type Lang } from "@/lib/i18n";

function detectLang(): Lang {
  if (typeof navigator === "undefined") return DEFAULT_LANG;
  const stored = typeof localStorage !== "undefined" ? localStorage.getItem("aim_lang") : null;
  if (stored && isLang(stored)) return stored;
  const nav = (navigator.languages?.[0] || navigator.language || "").toLowerCase();
  if (nav.startsWith("ru")) return "ru";
  if (nav.startsWith("kk") || nav.startsWith("kz")) return "kz";
  const code = nav.slice(0, 2);
  if ((LANGS as readonly string[]).includes(code)) return code as Lang;
  return DEFAULT_LANG;
}

export const Route = createFileRoute("/")({
  // SSR-safe redirect to English; client may further redirect to preferred lang.
  beforeLoad: () => {
    throw redirect({ to: "/$lang", params: { lang: DEFAULT_LANG }, replace: true });
  },
  component: ClientRedirect,
});

function ClientRedirect() {
  // Fallback in case beforeLoad doesn't run client-side.
  if (typeof window !== "undefined") {
    const lang = detectLang();
    window.location.replace(`/${lang}`);
  }
  return null;
}
