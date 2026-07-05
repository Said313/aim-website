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
  Briefcase,
  Activity,
  LineChart,
  User,
} from "lucide-react";
import heroImg from "@/assets/hero-mountain.jpg";
import appMockup from "@/assets/app-mockup.png";
import logo from "@/assets/aim-logo.png";
import freedomMountain from "@/assets/freedom-mountain.png";
import founderUmidzhan from "@/assets/founder-umidzhan.png";
import founderSaidgaffor from "@/assets/founder-saidgaffor.png";
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
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 md:py-4">
        <div className="glass-card rounded-full flex items-center justify-between gap-2 px-2.5 md:px-4 py-1.5 md:py-2.5">
          <a href="#top" className="flex items-center gap-1.5 md:gap-2 min-w-0">
            <Logo className="h-9 w-9 md:h-16 md:w-16 shrink-0" alt="Aim Personal AI CFO" />
            <span className="font-display text-lg md:text-2xl font-semibold tracking-tight">Aim</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">{s.nav.features}</a>
            <a href="#platforms" className="hover:text-foreground transition">{s.nav.platforms}</a>
            <a href="#vision" className="hover:text-foreground transition">{s.nav.vision}</a>
            <a href="#investors" className="hover:text-foreground transition">{s.nav.investors}</a>
          </nav>
          <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
            <LanguageSwitcher current={lang} />
            <a
              href="#waitlist"
              className="bg-primary-gradient text-primary-foreground hover:bg-primary-gradient-hover rounded-full px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold hover:opacity-90 transition whitespace-nowrap"
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
        <Reveal variant="fade" className="relative z-10 md:col-span-2 md:col-start-1 flex flex-col items-center text-center">
          <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
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
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight text-[#F8F7F3]">
            <span className="sr-only">{s.srTitle} </span>
            <span aria-hidden="true">{s.line1}</span>
            <br aria-hidden="true" />
            <span aria-hidden="true">{s.line2}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">{s.desc}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#waitlist"
              className="bg-primary-gradient text-primary-foreground hover:bg-primary-gradient-hover rounded-full px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2 shadow-glow hover:opacity-90 transition"
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
          <div className="mt-5">
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-3 py-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-[oklch(0.78_0.15_150)]" />
              {t(lang).hero.sec1}
            </div>
          </div>
        </Reveal>


        <Reveal variant="zoom-in" delay={200} className="-mx-6 -my-12 md:mx-0 md:my-0 md:absolute md:inset-y-0 md:right-0 md:-top-36 md:w-[75%] lg:w-[70%] md:pointer-events-none">
          <div className="relative h-[60vh] min-h-[420px] md:h-full md:rounded-3xl overflow-hidden">
            <img
              src={heroImg}
              alt=""
              width={1024}
              height={1024}
              className="w-full h-full object-cover brightness-[1.3] contrast-105 saturate-110 md:brightness-105 md:contrast-100 md:saturate-105 [filter:hue-rotate(-25deg)_saturate(1.05)_brightness(1.05)] md:[filter:hue-rotate(-25deg)_saturate(1.05)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_22%,black_72%,transparent_100%)] md:[mask-image:none]"
            />
            {/* Warm evergreen color grade */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(91,112,101,0.18)_0%,rgba(48,64,64,0.30)_60%,rgba(48,64,64,0.55)_100%)] mix-blend-multiply" />
            {/* Emerald atmospheric bloom */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_60%_45%,rgba(105,255,205,0.15),transparent_55%),radial-gradient(ellipse_at_30%_70%,rgba(170,255,220,0.08),transparent_60%)]" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(48,64,64,0.95)_98%)] md:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(48,64,64,0.9)_95%)]" />
            <div className="absolute inset-x-0 top-0 h-40 md:h-40 bg-gradient-to-b from-[#5B7065] via-[rgba(91,112,101,0.7)] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 md:h-1/2 bg-gradient-to-t from-[#304040] via-[rgba(48,64,64,0.85)] via-40% to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-1/6 md:w-1/3 bg-gradient-to-r from-[rgba(48,64,64,0.55)] md:from-[#304040] via-[rgba(48,64,64,0.2)] md:via-[rgba(48,64,64,0.55)] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-1/6 md:w-1/5 bg-gradient-to-l from-[rgba(48,64,64,0.4)] md:from-[rgba(48,64,64,0.6)] to-transparent pointer-events-none" />


            {/* Cinematic climb animation — user's financial journey to the summit */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 z-20 w-full h-full pointer-events-none"
            >
              <defs>
                <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(180,255,225,1)" />
                  <stop offset="45%" stopColor="rgba(120,255,210,0.95)" />
                  <stop offset="100%" stopColor="rgba(120,255,210,0)" />
                </radialGradient>
                <radialGradient id="summitGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(180,255,225,0.9)" />
                  <stop offset="60%" stopColor="rgba(120,255,210,0.25)" />
                  <stop offset="100%" stopColor="rgba(120,255,210,0)" />
                </radialGradient>
                <path
                  id="climbPath"
                  d="M 18 92 Q 26 84 32 78 T 44 64 T 55 48 T 66 32 T 74 20"
                  fill="none"
                />
              </defs>

              {/* Faint path guide */}
              <use
                href="#climbPath"
                stroke="rgba(120,255,210,0.18)"
                strokeWidth="0.35"
                strokeLinecap="round"
                fill="none"
              />
              <use
                href="#climbPath"
                stroke="rgba(120,255,210,0.55)"
                strokeWidth="0.15"
                strokeLinecap="round"
                fill="none"
              />

              {/* Milestones — flash + persistent soft glow */}
              {[
                { cx: 32, cy: 78, begin: "4s" },
                { cx: 48, cy: 60, begin: "8s" },
                { cx: 62, cy: 38, begin: "12s" },
              ].map((m, i) => (
                <g key={i}>
                  {/* Persistent illumination after activation */}
                  <circle cx={m.cx} cy={m.cy} r="0.9" fill="rgba(120,255,210,0.9)">
                    <animate attributeName="opacity" values="0.35;0.35" dur="16s" begin={m.begin} repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0" to="0.35" dur="0.4s" begin={m.begin} fill="freeze" />
                  </circle>
                  {/* Expanding ring */}
                  <circle cx={m.cx} cy={m.cy} fill="none" stroke="rgba(120,255,210,0.85)" strokeWidth="0.25">
                    <animate attributeName="r" from="0.6" to="4.5" dur="1.2s" begin={m.begin} repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.9" to="0" dur="1.2s" begin={m.begin} repeatCount="indefinite" />
                  </circle>
                  {/* Bright flash */}
                  <circle cx={m.cx} cy={m.cy} r="1.6" fill="url(#orbGrad)">
                    <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin={m.begin} repeatCount="indefinite" />
                  </circle>
                  {/* Scattering particles */}
                  {[0, 1, 2, 3, 4].map((p) => {
                    const angle = (p / 5) * Math.PI * 2 + i;
                    const dx = Math.cos(angle) * 3;
                    const dy = Math.sin(angle) * 3;
                    return (
                      <circle key={p} cx={m.cx} cy={m.cy} r="0.25" fill="rgba(120,255,210,0.95)">
                        <animate attributeName="cx" from={m.cx} to={m.cx + dx} dur="1s" begin={m.begin} repeatCount="indefinite" />
                        <animate attributeName="cy" from={m.cy} to={m.cy + dy} dur="1s" begin={m.begin} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;1;0" dur="1s" begin={m.begin} repeatCount="indefinite" />
                      </circle>
                    );
                  })}
                </g>
              ))}

              {/* Summit pulse + rays */}
              <g>
                <circle cx="74" cy="20" r="3" fill="url(#summitGrad)">
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.85;1" dur="16s" begin="15s" repeatCount="indefinite" />
                  <animate attributeName="r" values="1;5;5;2" keyTimes="0;0.1;0.85;1" dur="16s" begin="15s" repeatCount="indefinite" />
                </circle>
                <circle cx="74" cy="20" fill="none" stroke="rgba(120,255,210,0.7)" strokeWidth="0.2">
                  <animate attributeName="r" from="1" to="12" dur="2.5s" begin="15.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.8" to="0" dur="2.5s" begin="15.5s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Climbing orb — the user */}
              <g>
                <circle r="1.4" fill="url(#orbGrad)" opacity="0.85">
                  <animateMotion dur="16s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.42 0 0.58 1">
                    <mpath href="#climbPath" />
                  </animateMotion>
                </circle>
                <circle r="0.55" fill="rgba(255,255,255,0.95)">
                  <animateMotion dur="16s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.42 0 0.58 1">
                    <mpath href="#climbPath" />
                  </animateMotion>
                </circle>
              </g>
            </svg>


          </div>
        </Reveal>

      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section aria-label="Key financial metrics" className="pt-16 pb-20 md:pt-16 md:pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-white/[0.03] ring-1 ring-white/5 px-4 md:px-8 py-8 md:py-10 [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 items-stretch">
            {/* Financial Health gauge */}
            <Reveal variant="up" delay={0} className="h-full flex flex-col text-center rounded-2xl bg-black/40 backdrop-blur-md px-4 py-5 ring-1 ring-white/10">
              <div className="text-[11px] md:text-xs uppercase tracking-[0.18em] text-white font-medium">Financial Health</div>
              <div className="relative mt-3 aspect-square mx-auto w-full max-w-[180px]">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="6" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="url(#gaugeG2)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${0.82 * 2 * Math.PI * 42} ${2 * Math.PI * 42}`} />
                  <defs>
                    <linearGradient id="gaugeG2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ff3ea5" />
                      <stop offset="50%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-4xl md:text-5xl font-semibold text-white leading-none">82</span>
                  <span className="text-xs text-white/85">/ 100</span>
                </div>
              </div>
              <div className="mt-3 text-xs font-semibold text-[#5eead4]">↑ +3 this month</div>
            </Reveal>

            {/* Your Ranking */}
            <Reveal variant="up" delay={120} className="h-full flex flex-col items-center text-center rounded-2xl bg-black/40 backdrop-blur-md px-4 py-5 ring-1 ring-white/10">
              <div className="text-[11px] md:text-xs uppercase tracking-[0.18em] text-white font-medium">Your Ranking</div>
              <div className="mt-3 flex items-baseline justify-center gap-1">
                <span className="text-lg md:text-xl text-white/90 font-medium">Top</span>
                <span className="font-display text-4xl md:text-5xl font-semibold text-white leading-none">13%</span>
              </div>
              <div className="flex-1 flex items-center justify-center w-full my-2">
                <svg viewBox="0 0 100 34" className="w-full max-w-[220px] drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="bellFill2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="bellStroke2" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ff3ea5" />
                      <stop offset="50%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                    <linearGradient id="bellHi2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
                    </linearGradient>
                    <clipPath id="bellTopClip2">
                      <rect x="87" y="0" width="13" height="34" />
                    </clipPath>
                  </defs>
                  <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
                  <path d="M-2,30 L0,29.99 L2,29.98 L4,29.97 L6,29.94 L8,29.90 L10,29.84 L12,29.74 L14,29.60 L16,29.38 L18,29.07 L20,28.63 L22,28.04 L24,27.27 L26,26.28 L28,25.06 L30,23.60 L32,21.91 L34,20.02 L36,17.99 L38,15.89 L40,13.84 L42,11.94 L44,10.31 L46,9.06 L48,8.27 L50,8.00 L52,8.27 L54,9.06 L56,10.31 L58,11.94 L60,13.84 L62,15.89 L64,17.99 L66,20.02 L68,21.91 L70,23.60 L72,25.06 L74,26.28 L76,27.27 L78,28.04 L80,28.63 L82,29.07 L84,29.38 L86,29.60 L88,29.74 L90,29.84 L92,29.90 L94,29.94 L96,29.97 L98,29.98 L100,29.99 L102,30 Z" fill="url(#bellFill2)" />
                  <g clipPath="url(#bellTopClip2)">
                    <path d="M-2,30 L0,29.99 L2,29.98 L4,29.97 L6,29.94 L8,29.90 L10,29.84 L12,29.74 L14,29.60 L16,29.38 L18,29.07 L20,28.63 L22,28.04 L24,27.27 L26,26.28 L28,25.06 L30,23.60 L32,21.91 L34,20.02 L36,17.99 L38,15.89 L40,13.84 L42,11.94 L44,10.31 L46,9.06 L48,8.27 L50,8.00 L52,8.27 L54,9.06 L56,10.31 L58,11.94 L60,13.84 L62,15.89 L64,17.99 L66,20.02 L68,21.91 L70,23.60 L72,25.06 L74,26.28 L76,27.27 L78,28.04 L80,28.63 L82,29.07 L84,29.38 L86,29.60 L88,29.74 L90,29.84 L92,29.90 L94,29.94 L96,29.97 L98,29.98 L100,29.99 L102,30 Z" fill="url(#bellHi2)" />
                  </g>
                  <path d="M0,29.99 L2,29.98 L4,29.97 L6,29.94 L8,29.90 L10,29.84 L12,29.74 L14,29.60 L16,29.38 L18,29.07 L20,28.63 L22,28.04 L24,27.27 L26,26.28 L28,25.06 L30,23.60 L32,21.91 L34,20.02 L36,17.99 L38,15.89 L40,13.84 L42,11.94 L44,10.31 L46,9.06 L48,8.27 L50,8.00 L52,8.27 L54,9.06 L56,10.31 L58,11.94 L60,13.84 L62,15.89 L64,17.99 L66,20.02 L68,21.91 L70,23.60 L72,25.06 L74,26.28 L76,27.27 L78,28.04 L80,28.63 L82,29.07 L84,29.38 L86,29.60 L88,29.74 L90,29.84 L92,29.90 L94,29.94 L96,29.97 L98,29.98 L100,29.99" stroke="url(#bellStroke2)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                  <line x1="87" y1="30" x2="87" y2="29.5" stroke="#22d3ee" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
                  <circle cx="87" cy="29.5" r="1.8" fill="#22d3ee" stroke="#0a0a1a" strokeWidth="0.6" />
                </svg>
              </div>
              <div className="text-xs font-semibold text-[#5eead4]">Ahead of 87% of users</div>
            </Reveal>

            {/* Freedom Age */}
            <Reveal variant="up" delay={240} className="h-full flex flex-col items-center text-center rounded-2xl bg-black/40 backdrop-blur-md px-4 py-5 ring-1 ring-white/10">
              <div className="text-[11px] md:text-xs uppercase tracking-[0.18em] text-white font-medium">Freedom Age</div>
              <div className="mt-3 flex items-baseline justify-center gap-2">
                <span className="font-display text-4xl md:text-5xl font-semibold text-white leading-none">51</span>
                <span className="text-sm text-white/85">yrs</span>
              </div>
              <div className="flex-1 flex items-center justify-center w-full my-2">
                <img
                  src={freedomMountain}
                  alt="Mountain with flag at summit"
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-24 md:w-28 h-auto opacity-90"
                />
              </div>
              <div className="text-xs font-semibold text-[#5eead4]">↓ −2 yrs in 6 mo</div>
            </Reveal>
          </div>
        </div>
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
  const r = s.roadmap;
  const stageAccents = [
    { dot: "bg-[oklch(0.72_0.18_320)]", text: "text-[oklch(0.78_0.18_320)]" },
    { dot: "bg-accent", text: "text-accent" },
    { dot: "bg-[oklch(0.78_0.15_200)]", text: "text-[oklch(0.82_0.15_200)]" },
  ];
  return (
    <section id="vision" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal variant="zoom-out" className="glass-card rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
          <Sparkles className="h-8 w-8 text-accent mx-auto mb-6" />
          <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">{s.eyebrow}</div>
          <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05]">
            {s.titleA} <span className="text-brand-gradient">{s.titleB}</span> {s.titleC}
          </h2>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto">{s.desc}</p>
        </Reveal>

        {/* Roadmap */}
        <Reveal variant="up" delay={100} className="mt-16 text-center max-w-3xl mx-auto">
          <h3 className="font-display text-3xl md:text-5xl font-semibold leading-tight">
            {r.title} <span className="text-brand-gradient">{r.titleAccent}</span>
          </h3>
          <p className="mt-5 text-muted-foreground">{r.desc}</p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5 items-stretch relative">
          {/* Connector line */}
          <div aria-hidden="true" className="hidden md:block absolute top-5 left-[16%] right-[16%] border-t border-dashed border-border" />
          {r.stages.map((stage, i) => {
            const accent = stageAccents[i % stageAccents.length];
            return (
              <Reveal
                key={stage.title}
                variant={i === 1 ? "up" : i === 0 ? "left" : "right"}
                delay={i * 150}
                className="relative"
              >
                <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                  <span className={`h-9 w-9 rounded-full ${accent.dot} text-background font-display font-semibold flex items-center justify-center text-sm shadow-glow`}>
                    {i + 1}
                  </span>
                  <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${accent.text}`}>{stage.tag}</span>
                </div>
                <div className="glass-card rounded-3xl p-7 h-full flex flex-col">
                  <h4 className="font-display text-xl font-semibold">{stage.title}</h4>
                  <p className="text-sm text-muted-foreground mt-2">{stage.desc}</p>
                  <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground flex-1">
                    {stage.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <Check className={`h-4 w-4 mt-0.5 flex-none ${accent.text}`} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-border text-xs">
                    <div className="text-muted-foreground">{stage.audienceLabel}</div>
                    <div className={`font-semibold mt-1 ${accent.text}`}>{stage.audience}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="up" delay={200} className="mt-16">
          <div className="glass-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto text-center">
            <div className="h-12 w-12 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              {r.closingA}{" "}
              <span className="text-foreground font-medium">{r.closingB}</span>{" "}
              <span className="text-brand-gradient font-semibold">{r.closingC}</span>
            </p>
            <div className="mt-8 pt-8 border-t border-border/60">
              <p className="font-display text-lg md:text-xl font-semibold">
                {r.banner}
              </p>
            </div>
          </div>
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
          <Brain className="h-32 w-32 text-accent mx-auto mb-6" strokeWidth={1.25} />
          <h2 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
            {s.titleA} <span className="text-brand-gradient">{s.titleB}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">{s.desc}</p>
        </Reveal>

        <div id="investors" className="scroll-mt-24">
          <RoleSelector lang={lang} />
        </div>
      </div>
    </section>
  );
}

function RoleSelector({ lang }: { lang: Lang }) {
  const s = t(lang).cta;
  const [role, setRole] = useState<"user" | "investor" | null>(null);

  if (role === null) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center text-xs uppercase tracking-[0.2em] text-accent mb-6">
          {s.rolePrompt}
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <button
            type="button"
            onClick={() => setRole("user")}
            className="glass-card rounded-3xl p-8 text-left transition hover:-translate-y-1 hover:bg-white/5 duration-300 group"
          >
            <div className="h-12 w-12 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center mb-5">
              <User className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold">{s.roleUser}</h3>
            <p className="text-sm text-muted-foreground mt-2">{s.roleUserDesc}</p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              {s.userLabel} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </button>
          <button
            type="button"
            onClick={() => setRole("investor")}
            className="glass-card rounded-3xl p-8 text-left transition hover:-translate-y-1 hover:bg-white/5 duration-300 group"
          >
            <div className="h-12 w-12 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center mb-5">
              <Briefcase className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold">{s.roleInvestor}</h3>
            <p className="text-sm text-muted-foreground mt-2">{s.roleInvestorDesc}</p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              {s.investorLabel} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
          {role === "user" ? <Sparkles className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />}
          <span>{role === "user" ? s.userLabel : s.investorLabel}</span>
        </div>
        <button
          type="button"
          onClick={() => setRole(null)}
          className="text-xs text-muted-foreground hover:text-foreground transition"
        >
          {s.back}
        </button>
      </div>
      {role === "user" ? <UserWaitlistForm lang={lang} /> : <InvestorContactForm lang={lang} />}
    </div>
  );
}

function Founders({ lang }: { lang: Lang }) {
  const s = t(lang).founders;
  const founders = [
    { name: "Umidzhan Rakhmankulov", initials: "UR", photo: founderUmidzhan, role: s.roleCeo },
    { name: "Saidgaffor Sabyrov", initials: "SS", photo: founderSaidgaffor, role: s.roleCto },
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
              <div className="h-20 w-20 rounded-2xl border border-accent/30 bg-accent/10 overflow-hidden flex items-center justify-center flex-none">
                {f.photo ? (
                  <img src={f.photo} alt={f.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="font-display text-2xl font-semibold text-accent">{f.initials}</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="font-display text-lg font-semibold leading-tight whitespace-nowrap">{f.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{f.role}</div>
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
      <MetricsSection />

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
