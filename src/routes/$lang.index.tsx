import { createFileRoute, notFound } from "@tanstack/react-router";
import { LandingPage } from "@/components/LandingPage";
import { isLang, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/")({
  component: LangIndex,
});

function LangIndex() {
  const { lang } = Route.useParams();
  if (!isLang(lang)) throw notFound();
  return <LandingPage lang={lang as Lang} />;
}
