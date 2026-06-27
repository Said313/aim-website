import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { isLang, t, HTML_LANG, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
    return { lang: params.lang as Lang };
  },
  head: ({ params }) => {
    if (!isLang(params.lang)) return {};
    const lang = params.lang as Lang;
    const m = t(lang).meta;
    return {
      meta: [
        { title: m.title },
        { name: "description", content: m.description },
        { property: "og:title", content: m.ogTitle },
        { property: "og:description", content: m.ogDescription },
        { property: "og:url", content: `/${lang}` },
        { property: "og:locale", content: HTML_LANG[lang] },
        { name: "twitter:title", content: m.ogTitle },
        { name: "twitter:description", content: m.ogDescription },
      ],
      links: [
        { rel: "canonical", href: `/${lang}` },
        { rel: "alternate", hrefLang: "en", href: "/en" },
        { rel: "alternate", hrefLang: "ru", href: "/ru" },
        { rel: "alternate", hrefLang: "kk", href: "/kz" },
        { rel: "alternate", hrefLang: "x-default", href: "/en" },
      ],
    };
  },
  component: () => <Outlet />,
});
