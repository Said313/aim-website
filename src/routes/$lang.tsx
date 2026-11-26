import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { isLang } from "@/lib/i18n";
import { landingHead } from "@/lib/seo";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
  },
  head: ({ params }) => (isLang(params.lang) ? landingHead(params.lang) : {}),
  component: Outlet,
});
