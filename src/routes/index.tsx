import { createFileRoute } from "@tanstack/react-router";
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
} from "lucide-react";
import heroImg from "@/assets/hero-mountain.jpg";
import appMockup from "@/assets/app-mockup.png";
import logo from "@/assets/aim-logo.png";
import { Reveal } from "@/components/Reveal";
import { UserWaitlistForm } from "@/components/UserWaitlistForm";
import { InvestorContactForm } from "@/components/InvestorContactForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aim — Your AI CFO. Confidence to live bigger." },
      {
        name: "description",
        content:
          "Aim is your personal AI CFO. Connect every bank account via Open Banking, get insights, set goals, plan the future. Working worldwide.",
      },
      { property: "og:title", content: "Aim — Your AI CFO" },
      {
        property: "og:description",
        content: "Personal AI CFO that takes finance off your plate, so you can focus on what matters.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return <img src={logo} alt="Aim Personal AI CFO" className={`${className} object-contain`} />;
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="glass-card rounded-full flex items-center justify-between px-4 py-2.5">
          <a href="#top" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-display text-xl font-semibold tracking-tight">Aim</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#platforms" className="hover:text-foreground transition">Platforms</a>
            <a href="#vision" className="hover:text-foreground transition">Vision</a>
            <a href="#investors" className="hover:text-foreground transition">Investors</a>
          </nav>
          <a
            href="#waitlist"
            className="bg-accent text-accent-foreground rounded-full px-5 py-2 text-sm font-semibold hover:opacity-90 transition"
          >
            Join waitlist
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-[1fr_1.3fr] gap-8 items-center">
        <Reveal variant="left" className="relative z-10">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-3 py-1.5 text-xs text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Working worldwide
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
            <span className="sr-only">Aim — Your Personal AI CFO. </span>
            <span aria-hidden="true">Confidence to</span>
            <br aria-hidden="true" />
            <span className="text-accent" aria-hidden="true">live bigger.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Aim is your personal AI CFO. It connects every bank account via Open Banking,
            understands your life, and turns complex finances into clear next steps —
            so you can focus on what truly matters.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#waitlist"
              className="bg-accent text-accent-foreground rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2 shadow-glow hover:opacity-90 transition"
            >
              Get early access <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#features"
              className="glass-card rounded-full px-6 py-3.5 text-sm font-semibold hover:bg-white/5 transition"
            >
              See what it does
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" /> Bank-grade security
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-accent" /> Open Banking
            </div>
          </div>
        </Reveal>

        <Reveal variant="zoom-in" delay={200} className="relative z-0 md:-ml-32 lg:-ml-48 md:-mr-8 pointer-events-none">
          <div className="float-slow relative rounded-3xl overflow-hidden md:w-[130%] lg:w-[140%]">
            <img
              src={heroImg}
              alt="A person on a mountain summit at twilight overlooking a city below"
              width={1024}
              height={1024}
              className="w-full h-auto object-cover brightness-125 contrast-105 saturate-110"
            />

            {/* Edge shading — blends image into the page background */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-background)_95%)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background/80 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background/60 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background/70 to-transparent pointer-events-none" />
            {/* iPhone 17 Pro Max frame wrapping the app screen */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] max-w-[176px] aspect-[9/19.5] rotate-3 drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
            >
              {/* Titanium outer frame */}
              <div className="absolute inset-0 rounded-[1.4rem] bg-[#1a1a1c] ring-1 ring-white/10 shadow-[inset_0_0_0_1.5px_#2a2a2d]" />
              {/* Inner bezel */}
              <div className="absolute inset-[3px] rounded-[1.25rem] bg-black" />
              {/* Side buttons */}
              <div className="absolute -left-[2px] top-[22%] h-[8%] w-[2px] rounded-l-sm bg-[#2a2a2d]" />
              <div className="absolute -left-[2px] top-[34%] h-[12%] w-[2px] rounded-l-sm bg-[#2a2a2d]" />
              <div className="absolute -right-[2px] top-[28%] h-[14%] w-[2px] rounded-r-sm bg-[#2a2a2d]" />
              {/* Screen */}
              <div className="absolute inset-[6px] rounded-[1.05rem] overflow-hidden bg-black">
                <img
                  src={appMockup}
                  alt=""
                  className="w-full h-full object-cover brightness-125 contrast-110 saturate-125"
                />
                {/* Dynamic Island */}
                <div className="absolute top-[1.5%] left-1/2 -translate-x-1/2 w-[32%] h-[4.2%] rounded-full bg-black" />
              </div>
            </div>
          </div>

        </Reveal>
      </div>
    </section>

  );
}

function StatBar() {
  const stats = [
    { value: "1st", label: "Company onboarded to Open Banking" },
    { value: "1st", label: "Fintech AI startup in the region" },
    { value: "100+", label: "Users on the pre-launch waitlist" },
  ];
  return (
    <section className="border-y border-border bg-card/30 backdrop-blur-sm overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-12 grid sm:grid-cols-3 gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} variant="up" delay={i * 150} className="text-center sm:text-left">
            <div className="font-display text-5xl font-semibold leading-none text-accent">
              {s.value}
            </div>
            <div className="text-sm text-muted-foreground mt-3 leading-snug">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Marquee() {
  const words = [
    "Open Banking",
    "AI CFO",
    "Goals",
    "Insights",
    "Investments",
    "Budget",
    "Confidence",
    "Plan ahead",
  ];
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

function Features() {
  const features = [
    {
      icon: MessageSquare,
      title: "Ask anything",
      text: "Get clear answers to any question about your money, in plain language.",
    },
    {
      icon: TrendingUp,
      title: "Understand the why",
      text: "AI explains the changes in your spending, income and financial habits.",
    },
    {
      icon: Target,
      title: "Plan the future",
      text: "Set goals, model scenarios, and see the consequences of decisions before you make them.",
    },
    {
      icon: Star,
      title: "Personal recommendations",
      text: "Practical, tailored advice that helps you reach your goals faster.",
    },
    {
      icon: Building2,
      title: "All finance in one place",
      text: "Banks, cards, accounts, investments and credit — unified via Open Banking.",
    },
    {
      icon: ShieldCheck,
      title: "Private by design",
      text: "Bank-level encryption. Your data is yours. Read-only access, always.",
    },
  ];
  const variants = ["up", "zoom-in", "roll", "left", "right", "zoom-out"] as const;
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal variant="up" className="max-w-2xl mb-16">
          <div className="text-sm uppercase tracking-[0.2em] text-accent mb-4">What Aim does</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
            A CFO that understands <span className="text-brand-gradient">your life.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              variant={variants[i % variants.length]}
              delay={i * 120}
              className="glass-card rounded-3xl p-7 transition hover:-translate-y-1 duration-500"
            >
              <div className="h-12 w-12 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center mb-5">
                <f.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSolution() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12">
        <Reveal variant="left" className="glass-card rounded-3xl p-10">
          <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">The problem</div>
          <h3 className="font-display text-3xl font-semibold mb-6">Too many banks. Too little clarity.</h3>
          <ul className="space-y-4 text-muted-foreground">
            {[
              "Dozens of bank apps, cards and spreadsheets — no single picture.",
              "Managing money takes time, attention, and financial knowledge most people don't have.",
              "It's easy to get lost, miss something, and make costly mistakes.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1 h-5 w-5 rounded-full bg-destructive/20 text-destructive flex items-center justify-center text-xs flex-none">✕</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-foreground font-medium">
            People don't need another tool. They need a financial partner.
          </p>
        </Reveal>
        <Reveal variant="right" delay={150} className="glass-card rounded-3xl p-10 relative overflow-hidden">
          <div className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Our answer</div>
          <h3 className="font-display text-3xl font-semibold mb-6">One AI CFO. Every account. Real decisions.</h3>
          <ul className="space-y-4 text-muted-foreground">
            {[
              "Aim aggregates every account through secure Open Banking.",
              "AI understands your habits, goals and life — not just transactions.",
              "Complex data becomes simple recommendations you can act on today.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 text-accent flex-none" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-foreground font-medium">
            The right moment for a new standard in personal finance.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Platforms() {
  const platforms = [
    { icon: Smartphone, title: "Mobile app", text: "iOS & Android. The full Aim experience in your pocket." },
    { icon: Watch, title: "Watch app", text: "Glanceable balance, goals and alerts on your wrist." },
    { icon: Monitor, title: "Web app", text: "Deep analytics and planning on the big screen." },
    { icon: Globe, title: "Worldwide", text: "Designed for users everywhere." },
  ];
  const variants = ["zoom-in", "up", "zoom-out", "roll"] as const;
  return (
    <section id="platforms" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal variant="up" className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Everywhere you are</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
            One AI CFO, <span className="text-brand-gradient">every device.</span>
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {platforms.map((p, i) => (
            <Reveal
              key={p.title}
              variant={variants[i % variants.length]}
              delay={i * 140}
              className="glass-card rounded-3xl p-7 text-center transition hover:-translate-y-1 duration-500"
            >
              <div className="mx-auto h-14 w-14 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center mb-5">
                <p.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section id="vision" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal variant="zoom-out" className="glass-card rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
          <Sparkles className="h-8 w-8 text-accent mx-auto mb-6" />
          <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Our vision</div>
          <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05]">
            A world where every person has a personal{" "}
            <span className="text-brand-gradient">AI CFO</span> — helping them live the life
            they actually dream of.
          </h2>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium AI. A marketplace. Investments, insurance, lending, mortgages — and much more.
            We're just getting started.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="waitlist" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal variant="zoom-in" className="text-center max-w-3xl mx-auto mb-14">
          <Brain className="h-10 w-10 text-accent mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
            Be the first to <span className="text-brand-gradient">aim higher.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Join the waitlist or get in touch as an investor. Early users get premium AI features free at launch.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Reveal variant="left">
            <div className="flex items-center gap-2 mb-4 text-xs uppercase tracking-[0.2em] text-accent">
              <Sparkles className="h-4 w-4" />
              <span>User waitlist</span>
            </div>
            <UserWaitlistForm />
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div id="investors" className="flex items-center gap-2 mb-4 text-xs uppercase tracking-[0.2em] text-accent scroll-mt-24">
              <Briefcase className="h-4 w-4" />
              <span>Investor contact</span>
            </div>
            <InvestorContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Founders() {
  const founders = [
    { name: "Umidzhan Rakhmankulov", role: "Co-founder", initials: "UR" },
    { name: "Saidgaffor Sabyrov", role: "Co-founder", initials: "SS" },
  ];
  return (
    <section id="founders" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal variant="up" className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Founders</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
            Built by people who <span className="text-brand-gradient">aim higher.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            On a mission to give everyone a personal AI CFO.
          </p>
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
                <div className="text-sm text-muted-foreground mt-1">{f.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Logo className="h-7 w-7" />
          <span className="font-display font-semibold">Aim</span>
          <span className="text-muted-foreground text-sm ml-2">· Your AI CFO</span>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Aim. Made in Kazakhstan, for the world.
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <StatBar />
      <Marquee />
      <Features />
      <ProblemSolution />
      <Platforms />
      <Vision />
      <Founders />
      <CTA />
      <Footer />
    </main>
  );
}
