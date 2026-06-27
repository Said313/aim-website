import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Globe } from "lucide-react";
import { LANGS, LANG_LABELS, LANG_SHORT, type Lang } from "@/lib/i18n";

export function LanguageSwitcher({ current }: { current: Lang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Strip current /xx prefix, then add the target one
  function pathForLang(lang: Lang) {
    const stripped = pathname.replace(/^\/(en|ru|kz)(?=\/|$)/, "") || "/";
    return `/${lang}${stripped === "/" ? "" : stripped}`;
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition rounded-full px-3 py-1.5 border border-border/60 hover:border-border"
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="font-medium tracking-wide">{LANG_SHORT[current]}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 min-w-[10rem] glass-card rounded-2xl p-1.5 z-50"
        >
          {LANGS.map((l) => (
            <li key={l}>
              <Link
                to={pathForLang(l)}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-2 text-sm transition hover:bg-white/5 ${
                  l === current ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <span className="font-medium mr-2 text-xs opacity-60">{LANG_SHORT[l]}</span>
                {LANG_LABELS[l]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
