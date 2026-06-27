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
    <section id="top" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-[1fr_1.3fr] gap-8 items-center">
        <Reveal variant="left" className="relative z-10">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-3 py-1.5 text-xs text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {s.badge}
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
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" /> {s.sec1}
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-accent" /> {s.sec2}
            </div>
          </div>
        </Reveal>

        <Reveal variant="zoom-in" delay={200} className="relative md:-ml-32 lg:-ml-48 md:-mr-8">
          <div className="relative rounded-3xl overflow-hidden md:w-[130%] lg:w-[140%]">
            <img
              src={heroImg}
              alt=""
              width={1024}
              height={1024}
              className="w-full h-auto object-cover brightness-110 contrast-105 saturate-110"
            />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-background)_95%)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background via-background/50 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background/80 to-transparent pointer-events-none" />

            {/* Transparent metric cards overlaid on the mountain */}
            <div aria-hidden="true" className="absolute inset-0 z-20 pointer-events-none p-[6%] flex flex-col gap-3 md:gap-4">
              {/* Top row: 3 metric cards */}
              <div className="grid grid-cols-3 gap-2 md:gap-3 float-slow">
                {/* Financial Health gauge */}
                <div className="rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/15 p-3 md:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  <div className="text-[8px] md:text-[10px] uppercase tracking-wider text-white/70">Financial Health</div>
                  <div className="mt-1 md:mt-2 relative aspect-square max-w-[80px] md:max-w-[110px] mx-auto">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="url(#gaugeG)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${0.82 * 2 * Math.PI * 42} ${2 * Math.PI * 42}`} />
                      <defs>
                        <linearGradient id="gaugeG" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#ff3ea5" />
                          <stop offset="50%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-2xl md:text-4xl font-semibold text-white leading-none">82</span>
                      <span className="text-[8px] md:text-[10px] text-white/60">/ 100</span>
                    </div>
                  </div>
                  <div className="mt-1 md:mt-2 text-center text-[8px] md:text-[10px] text-accent">↑ +3 this month</div>
                </div>

                {/* Ranking distribution */}
                <div className="rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/15 p-3 md:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  <div className="text-[8px] md:text-[10px] uppercase tracking-wider text-white/70">Your Ranking</div>
                  <div className="mt-2 md:mt-3 text-center">
                    <span className="text-sm md:text-base text-white/80">Top </span>
                    <span className="font-display text-2xl md:text-4xl font-semibold text-brand-gradient">13%</span>
                  </div>
                  <div className="text-center text-[8px] md:text-[10px] text-white/60 mt-1">of Aim users</div>
                  <svg viewBox="0 0 100 36" className="w-full mt-1 md:mt-2">
                    <path d="M0,34 C20,32 30,28 40,18 C45,10 50,4 55,4 C60,4 65,10 70,20 C80,30 90,33 100,34 L100,36 L0,36 Z" fill="rgba(139,92,246,0.25)" />
                    <path d="M0,34 C20,32 30,28 40,18 C45,10 50,4 55,4 C60,4 65,10 70,20 C80,30 90,33 100,34" stroke="#a78bfa" strokeWidth="1" fill="none" />
                    <circle cx="78" cy="28" r="2" fill="#22d3ee" />
                  </svg>
                  <div className="text-center text-[8px] md:text-[9px] text-white/50">Ahead of 87% of users</div>
                </div>

                {/* Freedom Age */}
                <div className="rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/15 p-3 md:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  <div className="text-[8px] md:text-[10px] uppercase tracking-wider text-white/70">Freedom Age</div>
                  <div className="mt-2 md:mt-3 text-center">
                    <span className="font-display text-3xl md:text-5xl font-semibold text-brand-gradient leading-none">51</span>
                    <div className="text-[8px] md:text-[10px] text-white/60 mt-0.5">years</div>
                  </div>
                  <svg viewBox="0 0 100 28" className="w-full mt-1 md:mt-2">
                    <path d="M0,26 L25,18 L45,22 L65,8 L85,16 L100,12 L100,28 L0,28 Z" fill="rgba(34,211,238,0.2)" />
                    <path d="M0,26 L25,18 L45,22 L65,8 L85,16 L100,12" stroke="#22d3ee" strokeWidth="1" fill="none" />
                    <circle cx="65" cy="8" r="2" fill="#ff3ea5" />
                  </svg>
                  <div className="text-center text-[8px] md:text-[10px] text-accent mt-1">↓ −2 yrs this 6 mo</div>
                </div>
              </div>

              {/* Banner */}
              <div className="rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/15 px-4 py-2.5 md:py-3 flex items-center gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.4)] float-slow" style={{ animationDelay: "1.2s" }}>
                <div className="shrink-0 grid h-7 w-7 md:h-9 md:w-9 place-items-center rounded-full bg-white/10">
                  <Target className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] md:text-xs font-semibold text-white">You're on track to financial freedom</div>
                  <div className="text-[8px] md:text-[10px] text-white/60 truncate">Keep going — every step compounds.</div>
                </div>
                <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-white/50 shrink-0" />
              </div>

              {/* Goals list */}
              <div className="rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/15 p-3 md:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)] float-slow flex-1 min-h-0" style={{ animationDelay: "2.4s" }}>
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <span className="text-[10px] md:text-xs uppercase tracking-wider text-white/70">My Goals</span>
                  <span className="text-[9px] md:text-[10px] text-accent">All goals →</span>
                </div>
                <div className="space-y-1.5 md:space-y-2.5">
                  {[
                    { icon: Building2, label: "Apartment", pct: 67, color: "#8b5cf6" },
                    { icon: Sparkles, label: "Trip to Japan", pct: 82, color: "#22d3ee" },
                    { icon: TrendingUp, label: "New car", pct: 23, color: "#10b981" },
                    { icon: Star, label: "Kids' education", pct: 41, color: "#f59e0b" },
                  ].map((g) => (
                    <div key={g.label} className="flex items-center gap-2 md:gap-3">
                      <div className="shrink-0 grid h-6 w-6 md:h-8 md:w-8 place-items-center rounded-full bg-white/10">
                        <g.icon className="h-3 w-3 md:h-4 md:w-4 text-white/80" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-[9px] md:text-xs text-white/90 truncate">{g.label}</span>
                          <span className="text-[9px] md:text-xs font-semibold text-white">{g.pct}%</span>
                        </div>
                        <div className="mt-0.5 md:mt-1 h-1 md:h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${g.pct}%`, background: g.color }} />
                        </div>
                      </div>
                    </div>
                  ))}
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
