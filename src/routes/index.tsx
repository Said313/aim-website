import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
  X,
  Mail,
  Share2,
  CheckCircle2,
} from "lucide-react";
import heroImg from "@/assets/hero-mountain.jpg";
import appMockup from "@/assets/app-mockup.png";
import logo from "@/assets/aim-logo.png";

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
  return <img src={logo} alt="Aim Personal AI CFO" width={64} height={64} className={className} />;
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
            <a href="#faq" className="hover:text-foreground transition">FAQ</a>
          </nav>
          <a
            href="#waitlist"
            className="bg-gradient-brand text-primary-foreground rounded-full px-5 py-2 text-sm font-semibold hover:opacity-90 transition"
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
      <img
        src={heroImg}
        alt=""
        width={1600}
        height={1200}
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-3 py-1.5 text-xs text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Working worldwide
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
            <span className="sr-only">Aim — Your Personal AI CFO. </span>
            <span aria-hidden="true">Confidence to</span>
            <br aria-hidden="true" />
            <span className="text-gradient" aria-hidden="true">live bigger.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Aim is your personal AI CFO. It connects every bank account via Open Banking,
            understands your life, and turns complex finances into clear next steps —
            so you can focus on what truly matters.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#waitlist"
              className="bg-gradient-brand text-primary-foreground rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2 shadow-glow hover:opacity-90 transition"
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
        </div>

        <div className="relative flex justify-center">
          <div className="absolute -inset-10 bg-gradient-radial blur-3xl opacity-70" />
          <img
            src={appMockup}
            alt="Aim mobile app dashboard"
            width={520}
            height={780}
            className="relative w-[80%] max-w-[460px] drop-shadow-[0_40px_80px_rgba(120,80,255,0.35)]"
          />
        </div>
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
    <section className="border-y border-border bg-card/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12 grid sm:grid-cols-3 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center sm:text-left">
            <div className="font-display text-5xl font-semibold leading-none">
              <span className="text-gradient">{s.value}</span>
            </div>
            <div className="text-sm text-muted-foreground mt-3 leading-snug">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
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
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-sm uppercase tracking-[0.2em] text-accent mb-4">What Aim does</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
            A CFO that understands <span className="text-gradient">your life.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card rounded-3xl p-7 hover:translate-y-[-2px] transition group"
            >
              <div className="h-12 w-12 rounded-2xl bg-gradient-brand p-[1px] mb-5">
                <div className="h-full w-full rounded-2xl bg-background flex items-center justify-center">
                  <f.icon className="h-5 w-5 text-gradient" style={{ stroke: "url(#g)" }} />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.82 0.18 200)" />
              <stop offset="100%" stopColor="oklch(0.7 0.27 340)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}

function ProblemSolution() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12">
        <div className="glass-card rounded-3xl p-10">
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
        </div>
        <div className="glass-card rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 bg-gradient-brand rounded-full opacity-20 blur-3xl" />
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
        </div>
      </div>
    </section>
  );
}

function Platforms() {
  const platforms = [
    { icon: Smartphone, title: "Mobile app", text: "iOS & Android. The full Aim experience in your pocket." },
    { icon: Watch, title: "Watch app", text: "Glanceable balance, goals and alerts on your wrist." },
    { icon: Monitor, title: "Web app", text: "Deep analytics and planning on the big screen." },
    { icon: Globe, title: "Worldwide", text: "Built in Kazakhstan. Designed for users everywhere." },
  ];
  return (
    <section id="platforms" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Everywhere you are</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
            One AI CFO, <span className="text-gradient">every device.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {platforms.map((p) => (
            <div key={p.title} className="glass-card rounded-3xl p-7 text-center">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-brand p-[1px] mb-5">
                <div className="h-full w-full rounded-2xl bg-background flex items-center justify-center">
                  <p.icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.text}</p>
            </div>
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
        <div className="glass-card rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial opacity-50" />
          <div className="relative">
            <Sparkles className="h-8 w-8 text-accent mx-auto mb-6" />
            <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Our vision</div>
            <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05]">
              A world where every person has a personal{" "}
              <span className="text-gradient">AI CFO</span> — helping them live the life
              they actually dream of.
            </h2>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium AI. A marketplace. Investments, insurance, lending, mortgages — and much more.
              We're just getting started.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [step, setStep] = useState<"email" | "confirm" | "done">("email");
  const [error, setError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setStep("confirm");
  }

  function handleConfirmSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()) {
      setError("Emails don't match. Please re-enter to confirm.");
      return;
    }
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("event", "waitlist_signup", {
        event_category: "conversion",
        event_label: "waitlist",
        method: "email",
      });
      w.gtag("event", "conversion", { send_to: "G-X8MMPFXYDJ" });
    }
    console.info("Waitlist signup:", email);
    setSubmittedEmail(email.trim());
    setStep("done");
    setEmail("");
    setConfirmEmail("");
  }

  function reset() {
    setStep("email");
    setError(null);
    setEmail("");
    setConfirmEmail("");
  }

  return (
    <section id="waitlist" className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Brain className="h-10 w-10 text-gradient mx-auto mb-6" style={{ stroke: "url(#g)" }} />
        <h2 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
          Be the first to <span className="text-gradient">aim higher.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Join the waitlist. Early users get premium AI features free at launch.
        </p>

        {step === "email" && (
          <form
            onSubmit={handleEmailSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            noValidate
          >
            <label htmlFor="waitlist-email" className="sr-only">Email address</label>
            <input
              id="waitlist-email"
              name="waitlist-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Email address"
              aria-invalid={error ? "true" : "false"}
              className="flex-1 glass-card rounded-full px-5 py-3.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="bg-gradient-brand text-primary-foreground rounded-full px-6 py-3.5 text-sm font-semibold shadow-glow hover:opacity-90 transition"
            >
              Get early access
            </button>
          </form>
        )}

        {step === "email" && error && (
          <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>
        )}
      </div>

      {step === "confirm" && (
        <ThankYouModal
          title="One quick confirmation"
          onClose={reset}
        >
          <p className="text-muted-foreground text-sm">
            We sent the signup to <span className="text-foreground font-medium">{email}</span>.
            Please re-enter your email so we don't miss you at launch.
          </p>
          <form onSubmit={handleConfirmSubmit} className="mt-6 space-y-3" noValidate>
            <label htmlFor="confirm-email" className="sr-only">Confirm email address</label>
            <input
              id="confirm-email"
              type="email"
              required
              autoFocus
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Re-enter your email"
              aria-label="Confirm email address"
              aria-invalid={error ? "true" : "false"}
              className="w-full glass-card rounded-full px-5 py-3.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {error && (
              <p role="alert" className="text-sm text-destructive text-left px-2">{error}</p>
            )}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={reset}
                className="flex-1 glass-card rounded-full px-5 py-3 text-sm font-semibold hover:bg-white/5 transition"
              >
                Edit email
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-brand text-primary-foreground rounded-full px-5 py-3 text-sm font-semibold shadow-glow hover:opacity-90 transition"
              >
                Confirm
              </button>
            </div>
          </form>
        </ThankYouModal>
      )}

      {step === "done" && (
        <ThankYouModal title="You're on the list" onClose={reset}>
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-2xl bg-gradient-brand p-[2px] mb-5">
              <div className="h-full w-full rounded-2xl bg-background flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-accent" />
              </div>
            </div>
            <h3 className="font-display text-2xl font-semibold">
              Thank you — welcome to <span className="text-gradient">Aim.</span>
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              We've added <span className="text-foreground font-medium">{submittedEmail}</span> to the waitlist.
              You'll be among the first to get access at launch.
            </p>

            <div className="w-full mt-8 text-left space-y-3">
              <div className="text-xs uppercase tracking-[0.2em] text-accent">What's next</div>
              <ul className="space-y-3">
                {[
                  { icon: Mail, text: "Check your inbox for a confirmation from the Aim team." },
                  { icon: Sparkles, text: "We'll email you the moment early access opens." },
                  { icon: Share2, text: "Help a friend live bigger — share Aim with them." },
                ].map((item) => (
                  <li key={item.text} className="flex gap-3 items-start">
                    <span className="mt-0.5 h-8 w-8 rounded-xl glass-card flex items-center justify-center flex-none">
                      <item.icon className="h-4 w-4 text-accent" />
                    </span>
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={() => {
                  const url = typeof window !== "undefined" ? window.location.origin : "https://aim.app";
                  const text = "I just joined the Aim waitlist — a personal AI CFO. Confidence to live bigger.";
                  const nav = navigator as Navigator & { share?: (d: ShareData) => Promise<void> };
                  if (nav.share) {
                    nav.share({ title: "Aim", text, url }).catch(() => {});
                  } else {
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + " " + url)}`,
                      "_blank",
                      "noopener",
                    );
                  }
                }}
                className="flex-1 glass-card rounded-full px-5 py-3 text-sm font-semibold hover:bg-white/5 transition inline-flex items-center justify-center gap-2"
              >
                <Share2 className="h-4 w-4" /> Share Aim
              </button>
              <button
                type="button"
                onClick={reset}
                className="flex-1 bg-gradient-brand text-primary-foreground rounded-full px-5 py-3 text-sm font-semibold shadow-glow hover:opacity-90 transition"
              >
                Done
              </button>
            </div>
          </div>
        </ThankYouModal>
      )}
    </section>
  );
}

function ThankYouModal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />
      <div className="relative glass-card rounded-3xl p-8 md:p-10 w-full max-w-md text-left shadow-glow">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 h-9 w-9 rounded-full glass-card flex items-center justify-center hover:bg-white/5 transition"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

function Founders() {
  const founders = [
    {
      name: "Umidzhan Rakhmankulov",
      role: "Co-founder",
      initials: "UR",
    },
    {
      name: "Saidgaffor Sabyrov",
      role: "Co-founder",
      initials: "SS",
    },
  ];
  return (
    <section id="founders" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Founders</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
            Built by people who <span className="text-gradient">aim higher.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            From Kazakhstan to the world — on a mission to give everyone a personal AI CFO.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {founders.map((f) => (
            <div key={f.name} className="glass-card rounded-3xl p-8 flex items-center gap-5">
              <div className="h-20 w-20 rounded-2xl bg-gradient-brand p-[2px] flex-none">
                <div className="h-full w-full rounded-2xl bg-background flex items-center justify-center">
                  <span className="font-display text-2xl font-semibold text-gradient">{f.initials}</span>
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-display text-lg font-semibold leading-tight">{f.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{f.role}</div>
              </div>
            </div>
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
