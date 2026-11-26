import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { LANGS } from "@/lib/i18n";
import { SITE_URL, localePath } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...LANGS.map((lang) => `  <url><loc>${SITE_URL}${localePath(lang)}</loc></url>`),
            ...["support", "privacy", "terms"].map(
              (page) => `  <url><loc>${SITE_URL}/aim-feedback/${page}/</loc></url>`,
            ),
            "</urlset>",
          ].join("\n"),
          { headers: { "Content-Type": "application/xml; charset=utf-8" } },
        ),
    },
  },
});
