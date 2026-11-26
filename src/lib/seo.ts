import socialPreview from "@/assets/social-preview.jpg";
import { DEFAULT_LANG, HTML_LANG, LANGS, t, type Lang } from "./i18n";

export const SITE_URL = "https://theaim.app";

export function localePath(lang: Lang) {
  return `/${lang}/`;
}

export function landingHead(lang: Lang) {
  const { title, description } = t(lang).meta;
  const url = SITE_URL + localePath(lang);
  const image = new URL(socialPreview, SITE_URL).href;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { name: "twitter:image", content: image },
      { property: "og:locale", content: { en: "en_US", kz: "kk_KZ", ru: "ru_KZ" }[lang] },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: url },
      ...LANGS.map((locale) => ({
        rel: "alternate",
        hrefLang: HTML_LANG[locale],
        href: SITE_URL + localePath(locale),
      })),
      { rel: "alternate", hrefLang: "x-default", href: SITE_URL + localePath(DEFAULT_LANG) },
    ],
    scripts:
      lang === DEFAULT_LANG
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Aim",
                url: SITE_URL,
                founder: [
                  { "@type": "Person", name: "Umidzhan Rakhmankulov" },
                  { "@type": "Person", name: "Saidgaffor Sabyrov" },
                ],
              }),
            },
          ]
        : [],
  };
}
