import { Link, useRouterState } from "@tanstack/react-router";
import { LANGS, LANG_SHORT, type Lang } from "@/lib/i18n";

export function LanguageSwitcher({ current }: { current: Lang }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  function pathForLang(lang: Lang) {
    const stripped = pathname.replace(/^\/(en|ru|kz)(?=\/|$)/, "") || "/";
    return `/${lang}${stripped === "/" ? "" : stripped}`;
  }

  return (
    <div
      className="inline-flex items-center h-11 px-1.5 rounded-full"
      style={{
        background: "rgba(26,34,31,0.55)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {LANGS.map((l) => {
        const active = l === current;
        return (
          <Link
            key={l}
            to={pathForLang(l)}
            className="inline-flex items-center justify-center h-[34px] w-[54px] rounded-full text-[15px] font-medium transition-all duration-200"
            style={
              active
                ? {
                    background: "rgba(122,244,207,0.12)",
                    color: "#F3F2EE",
                    border: "1px solid rgba(122,244,207,0.35)",
                  }
                : {
                    background: "transparent",
                    color: "#A7B4AD",
                    border: "1px solid transparent",
                  }
            }
            onMouseEnter={(e) => {
              if (!active) {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "#F3F2EE";
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#A7B4AD";
              }
            }}
          >
            {LANG_SHORT[l]}
          </Link>
        );
      })}
    </div>
  );
}
