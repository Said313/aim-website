import { Link } from "@tanstack/react-router";
import { HTML_LANG, LANGS, LANG_LABELS, LANG_SHORT, t, type Lang } from "@/lib/i18n";

export function LanguageSwitcher({ current }: { current: Lang }) {
  return (
    <nav className="locale-switch" aria-label={t(current).nav.language}>
      {LANGS.map((lang) => (
        <Link
          key={lang}
          to="/$lang"
          params={{ lang }}
          hrefLang={HTML_LANG[lang]}
          lang={HTML_LANG[lang]}
          aria-label={LANG_LABELS[lang]}
          aria-current={lang === current ? "page" : undefined}
          data-selected={lang === current}
        >
          {LANG_SHORT[lang]}
        </Link>
      ))}
    </nav>
  );
}
