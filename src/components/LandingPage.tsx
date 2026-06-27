import {
  Brain,
  Building2,
  Target,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  MessageSquare,
  Star,
  Globe,
  Smartphone,
  Watch,
  Monitor,
  ArrowRight,
  Check,
  Briefcase,
  Activity,
  LineChart,
} from "lucide-react";
import heroImg from "@/assets/hero-mountain.jpg";
import appMockup from "@/assets/app-mockup.png";
import logo from "@/assets/aim-logo.png";
import { Reveal } from "@/components/Reveal";
import { UserWaitlistForm } from "@/components/UserWaitlistForm";
import { InvestorContactForm } from "@/components/InvestorContactForm";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { t, type Lang } from "@/lib/i18n";

const FEATURE_ICONS = [MessageSquare, Building2, Activity, LineChart, ShieldCheck, Star];
const PLATFORM_ICONS = [Smartphone, Watch, Monitor, Globe];

function Logo({ className = "h-9 w-9", alt }: { className?: string; alt: string }) {
  return <img src={logo} alt={alt} className={`${className} object-contain`} />;
}

function Nav({ lang }: { lang: Lang }) {
  const s = t(lang);
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="glass-card rounded-full flex items-center justify-between px-4 py-2.5">
          <a href="#top" className="flex items-center gap-2">
            <Logo className="h-16 w-16" alt="Aim Personal AI CFO" />
            <span className="font-display text-2xl font-semibold tracking-tight">Aim</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">{s.nav.features}</a>
            <a href="#platforms" className="hover:text-foreground transition">{s.nav.platforms}</a>
            <a href="#vision" className="hover:text-foreground transition">{s.nav.vision}</a>
            <a href="#investors" className="hover:text-foreground transition">{s.nav.investors}</a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher current={lang} />
            <a
              href="#waitlist"
              className="bg-accent text-accent-foreground rounded-full px-5 py-2 text-sm font-semibold hover:opacity-90 transition"
            >
              {s.nav.cta}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const s = t(lang).hero;
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-[1fr_1.3fr] gap-8 items-center min-h-[600px]">
        <Reveal variant="left" className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-3 py-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {s.badge}
            </div>
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-3 py-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.18_320)]" />
              Artificial Intelligence
            </div>
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-3 py-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.15_200)]" />
              Open Banking
            </div>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
            <span className="sr-only">{s.srTitle} </span>
            <span aria-hidden="true">{s.line1}</span>
            <br aria-hidden="true" />
            <span className="text-brand-gradient" aria-hidden="true">{s.line2}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">{s.desc}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#waitlist"
              className="bg-accent text-accent-foreground rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2 shadow-glow hover:opacity-90 transition"
            >
              {s.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#features"
              className="glass-card rounded-full px-6 py-3.5 text-sm font-semibold hover:bg-white/5 transition"
            >
              {s.ctaSecondary}
            </a>
          </div>
        </Reveal>

        <Reveal variant="zoom-in" delay={200} className="md:absolute md:inset-y-0 md:right-0 md:-top-36 md:w-[75%] lg:w-[70%] md:pointer-events-none">
          <div className="relative h-full rounded-3xl overflow-hidden">
            <img
              src={heroImg}
              alt=""
              width={1024}
              height={1024}
              className="w-full h-full object-cover brightness-110 contrast-105 saturate-110"
            />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-background)_95%)]" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/70 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/85 via-40% to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background via-background/60 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background/60 to-transparent pointer-events-none" />

            {/* Naked metric labels & diagrams floating over the mountain (right half only) */}
            <div aria-hidden="true" className="absolute inset-0 z-20 pointer-events-none [text-shadow:0_2px_12px_rgba(0,0,0,0.85)]">

              {/* Three metrics in one row across the top */}
              <div className="absolute left-[30%] right-[6%] top-1/2 -translate-y-1/2 grid grid-cols-3 items-stretch gap-3 md:gap-4">

                {/* Financial Health gauge */}
                <div className="h-full flex flex-col text-center rounded-2xl bg-black/55 backdrop-blur-sm px-3 py-4 ring-1 ring-white/10">
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-white font-medium">Financial Health</div>
                  <div className="relative mt-2 aspect-square">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="6" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="url(#gaugeG)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${0.82 * 2 * Math.PI * 42} ${2 * Math.PI * 42}`} />
                      <defs>
                        <linearGradient id="gaugeG" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#ff3ea5" />
                          <stop offset="50%" stopColor="#a78bfa" />
                          <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-3xl md:text-5xl font-semibold text-white leading-none">82</span>
                      <span className="text-[9px] md:text-xs text-white/85">/ 100</span>
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] md:text-xs font-semibold text-[#5eead4]">↑ +3 this month</div>
                </div>

                {/* Ranking distribution */}
                <div className="h-full flex flex-col text-center rounded-2xl bg-black/55 backdrop-blur-sm px-3 py-4 ring-1 ring-white/10">
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-white font-medium">Your Ranking</div>
                  <div className="mt-2">
                    <span className="text-base md:text-xl text-white/90 font-medium">Top </span>
                    <span className="font-display text-3xl md:text-5xl font-semibold text-brand-gradient">13%</span>
                  </div>
                  <svg viewBox="0 0 100 30" className="w-full mt-2 drop-shadow-[0_0_10px_rgba(167,139,250,0.6)]">
                    <path d="M0,28 C20,26 30,22 40,12 C45,4 50,-2 55,-2 C60,-2 65,4 70,14 C80,24 90,27 100,28" stroke="#e879f9" strokeWidth="1.5" fill="none" />
                    <circle cx="78" cy="22" r="2.5" fill="#22d3ee" />
                  </svg>
                  <div className="text-[10px] md:text-xs text-white/85 mt-1">Ahead of 87% of users</div>
                </div>

                {/* Freedom Age */}
                <div className="h-full flex flex-col text-center rounded-2xl bg-black/55 backdrop-blur-sm px-3 py-4 ring-1 ring-white/10">
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-white font-medium">Freedom Age</div>
                  <div className="mt-2 flex items-baseline justify-center gap-2">
                    <span className="font-display text-3xl md:text-5xl font-semibold text-brand-gradient leading-none">51</span>
                    <span className="text-xs md:text-sm text-white/85">yrs</span>
                  </div>
                  <svg viewBox="0 0 100 24" className="w-full mt-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
                    <path d="M0,22 L25,16 L45,18 L65,6 L85,12 L100,8" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
                    <circle cx="65" cy="6" r="2.5" fill="#ff3ea5" />
                  </svg>
                  <div className="text-[10px] md:text-xs font-semibold text-[#5eead4] mt-1">↓ −2 yrs in 6 mo</div>
                </div>

              </div>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}

function StatBar({ lang }: { lang: Lang }) {
  const stats = t(lang).stats;
  return (
    <section className="border-y border-border bg-card/30 backdrop-blur-sm overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-12 grid sm:grid-cols-3 gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} variant="up" delay={i * 150} className="text-center sm:text-left">
            <div className="font-display text-5xl font-semibold leading-none text-accent">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-3 leading-snug">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Marquee({ lang }: { lang: Lang }) {
  const words = t(lang).marquee;
  const row = [...words, ...words];
  return (
    <div className="border-b border-border overflow-hidden py-6">
      <div className="drift-marquee flex gap-12 whitespace-nowrap text-muted-foreground/70">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-2xl tracking-tight">
            {w}
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Features({ lang }: { lang: Lang }) {
  const s = t(lang).features;
  const variants = ["up", "zoom-in", "roll", "left", "right", "zoom-out"] as const;
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal variant="up" className="max-w-2xl mb-16">
          <div className="text-sm uppercase tracking-[0.2em] text-accent mb-4">{s.eyebrow}</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
            {s.titleA} <span className="text-brand-gradient">{s.titleB}</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {s.items.map((f, i) => {
            const Icon = FEATURE_ICONS[i] ?? Sparkles;
            return (
              <Reveal
                key={f.title}
                variant={variants[i % variants.length]}
                delay={i * 120}
                className="glass-card rounded-3xl p-7 transition hover:-translate-y-1 duration-500"
              >
                <div className="h-12 w-12 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center mb-5">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProblemSolution({ lang }: { lang: Lang }) {
  const p = t(lang).problem;
  const sl = t(lang).solution;
  return (
    <section className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12">
        <Reveal variant="left" className="glass-card rounded-3xl p-10">
          <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">{p.eyebrow}</div>
          <h3 className="font-display text-3xl font-semibold mb-6">{p.title}</h3>
          <ul className="space-y-4 text-muted-foreground">
            {p.bullets.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1 h-5 w-5 rounded-full bg-destructive/20 text-destructive flex items-center justify-center text-xs flex-none">✕</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-foreground font-medium">{p.closer}</p>
        </Reveal>
        <Reveal variant="right" delay={150} className="glass-card rounded-3xl p-10 relative overflow-hidden">
          <div className="text-sm uppercase tracking-[0.2em] text-accent mb-4">{sl.eyebrow}</div>
          <h3 className="font-display text-3xl font-semibold mb-6">{sl.title}</h3>
          <ul className="space-y-4 text-muted-foreground">
            {sl.bullets.map((t) => (
              <li key={t} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 text-accent flex-none" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-foreground font-medium">{sl.closer}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Platforms({ lang }: { lang: Lang }) {
  const s = t(lang).platforms;
  const variants = ["zoom-in", "up", "zoom-out", "roll"] as const;
  return (
    <section id="platforms" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal variant="up" className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm uppercase tracking-[0.2em] text-accent mb-4">{s.eyebrow}</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
            {s.titleA} <span className="text-brand-gradient">{s.titleB}</span>
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {s.items.map((p, i) => {
            const Icon = PLATFORM_ICONS[i] ?? Globe;
            return (
              <Reveal
                key={p.title}
                variant={variants[i % variants.length]}
                delay={i * 140}
                className="glass-card rounded-3xl p-7 text-center transition hover:-translate-y-1 duration-500"
              >
                <div className="mx-auto h-14 w-14 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Vision({ lang }: { lang: Lang }) {
  const s = t(lang).vision;
  return (
    <section id="vision" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal variant="zoom-out" className="glass-card rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
          <Sparkles className="h-8 w-8 text-accent mx-auto mb-6" />
          <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">{s.eyebrow}</div>
          <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05]">
            {s.titleA} <span className="text-brand-gradient">{s.titleB}</span> {s.titleC}
          </h2>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto">{s.desc}</p>
        </Reveal>
      </div>
    </section>
  );
}

function CTA({ lang }: { lang: Lang }) {
  const s = t(lang).cta;
  return (
    <section id="waitlist" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal variant="zoom-in" className="text-center max-w-3xl mx-auto mb-14">
          <Brain className="h-10 w-10 text-accent mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
            {s.titleA} <span className="text-brand-gradient">{s.titleB}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">{s.desc}</p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Reveal variant="left">
            <div className="flex items-center gap-2 mb-4 text-xs uppercase tracking-[0.2em] text-accent">
              <Sparkles className="h-4 w-4" />
              <span>{s.userLabel}</span>
            </div>
            <UserWaitlistForm lang={lang} />
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div id="investors" className="flex items-center gap-2 mb-4 text-xs uppercase tracking-[0.2em] text-accent scroll-mt-24">
              <Briefcase className="h-4 w-4" />
              <span>{s.investorLabel}</span>
            </div>
            <InvestorContactForm lang={lang} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Founders({ lang }: { lang: Lang }) {
  const s = t(lang).founders;
  const founders = [
    { name: "Umidzhan Rakhmankulov", initials: "UR" },
    { name: "Saidgaffor Sabyrov", initials: "SS" },
  ];
  return (
    <section id="founders" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal variant="up" className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm uppercase tracking-[0.2em] text-accent mb-4">{s.eyebrow}</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
            {s.titleA} <span className="text-brand-gradient">{s.titleB}</span>
          </h2>
          <p className="mt-5 text-muted-foreground">{s.desc}</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {founders.map((f, i) => (
            <Reveal
              key={f.name}
              variant={i === 0 ? "left" : "right"}
              delay={i * 150}
              className="glass-card rounded-3xl p-8 flex items-center gap-5"
            >
              <div className="h-20 w-20 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center flex-none">
                <span className="font-display text-2xl font-semibold text-accent">{f.initials}</span>
              </div>
              <div className="min-w-0">
                <div className="font-display text-lg font-semibold leading-tight">{f.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const s = t(lang).footer;
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Logo className="h-7 w-7" alt="Aim" />
          <span className="font-display font-semibold">Aim</span>
          <span className="text-muted-foreground text-sm ml-2">· {s.tagline}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {s.copyright}
        </div>
      </div>
    </footer>
  );
}

export function LandingPage({ lang }: { lang: Lang }) {
  return (
    <main className="min-h-screen">
      <Nav lang={lang} />
      <Hero lang={lang} />
      <StatBar lang={lang} />
      <Marquee lang={lang} />
      <Features lang={lang} />
      <ProblemSolution lang={lang} />
      <Platforms lang={lang} />
      <Vision lang={lang} />
      <Founders lang={lang} />
      <CTA lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
