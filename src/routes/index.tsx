import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/LandingPage";
import { DEFAULT_LANG } from "@/lib/i18n";
import { landingHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => landingHead(DEFAULT_LANG),
  component: () => <LandingPage lang={DEFAULT_LANG} />,
});
