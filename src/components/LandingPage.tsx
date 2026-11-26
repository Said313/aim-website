import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Banknote,
  ChartColumnIncreasing,
  ChevronDown,
  Bus,
  FileUp,
  Flag,
  Globe2,
  MapPin,
  ShieldCheck,
  ShoppingBasket,
  Target,
  Wallet,
} from "lucide-react";
import foothills from "@/assets/foothills.webp";
import founderUmidzhan from "@/assets/founder-umidzhan.webp";
import founderSaidgaffor from "@/assets/founder-saidgaffor-upscaled.webp";
import { ContactForm } from "@/components/ContactForm";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { HTML_LANG, t, type Lang } from "@/lib/i18n";

const productIcons = [FileUp, ChartColumnIncreasing, Target];
const marketIcons = [MapPin, Flag, Globe2];
const marketStats = [
  { value: "98%", href: "https://nationalbank.kz/en/news/informacionnye-soobshcheniya/17431" },
  {
    value: "79%",
    href: "https://blogs.worldbank.org/en/allaboutfinance/digital-technology-is-unlocking-financial-inclusion",
  },
];
const scenarios = [
  { active: 50_000, conversion: 0.05, price: 2_000, currency: "KZT" },
  { active: 250_000, conversion: 0.05, price: 5, currency: "USD" },
] as const;
const photos = [
  { src: founderUmidzhan, width: 520, height: 650 },
  { src: founderSaidgaffor, width: 800, height: 800 },
];
const cashFlow = { income: 620_000, spending: 435_600 };
const emergencyFund = { saved: 620_000, target: 1_000_000 };

const numberFormatter = new Intl.NumberFormat("en-US");

function number(value: number, lang: Lang) {
  // Use the same grouping in prerendered HTML and browsers that lack Kazakh number data.
  const formatted = numberFormatter.format(value);
  return lang === "en" ? formatted : formatted.replaceAll(",", "\u00a0");
}

function money(value: number, lang: Lang, currency: "KZT" | "USD" = "KZT") {
  return `${currency === "KZT" ? "₸" : "US$"}${number(value, lang)}`;
}

function Wordmark() {
  return (
    <a className="aim-wordmark" href="#top">
      Aim<span aria-hidden="true">.</span>
    </a>
  );
}

function Nav({ lang }: { lang: Lang }) {
  const s = t(lang).nav;
  return (
    <header className="aim-header">
      <a className="aim-skip" href="#main">
        {s.skip}
      </a>
      <div className="aim-wrap aim-nav">
        <Wordmark />
        <nav className="aim-nav-links" aria-label={s.mainMenu}>
          <a href="#features">{s.product}</a>
          <a href="#vision">{s.market}</a>
          <a href="#founders">{s.team}</a>
          <a href="#investors">{s.investors}</a>
        </nav>
        <div className="aim-nav-actions">
          <LanguageSwitcher current={lang} />
          <a className="aim-button aim-button-primary aim-button-nav" href="#waitlist">
            {s.waitlist}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const { hero: s, preview: p, nav } = t(lang);
  return (
    <section className="aim-wrap aim-hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="aim-kicker">
          <span className="stage-dot" aria-hidden="true" />
          {s.stage}
        </p>
        <h1 id="hero-title">
          {s.title}
          <br />
          <em>{s.accent}</em>
        </h1>
        <p className="hero-description">{s.description}</p>
        <div className="hero-actions">
          <a className="aim-button aim-button-primary" href="#waitlist">
            {nav.waitlist}
          </a>
          <a className="aim-button aim-button-secondary" href="#features">
            {s.preview}
          </a>
        </div>
      </div>
      <figure className="hero-stage">
        <img className="hero-landscape" src={foothills} alt="" fetchPriority="high" />
        <div className="hero-dashboard">
          <div className="dashboard-heading">
            <strong>{p.overview}</strong>
            <Wallet aria-hidden="true" size={20} />
          </div>
          <div className="dashboard-balance">
            <span>{p.balance}</span>
            <strong>{money(2_485_600, lang)}</strong>
          </div>
          <div className="dashboard-subheading">
            <strong>{p.cashFlow}</strong>
            <span>{p.period}</span>
          </div>
          <div className="dashboard-flow">
            <dl>
              <div>
                <dt>{p.income}</dt>
                <dd className="positive">{money(cashFlow.income, lang)}</dd>
              </div>
              <div>
                <dt>{p.spending}</dt>
                <dd className="negative">{money(cashFlow.spending, lang)}</dd>
              </div>
              <div>
                <dt>{p.net}</dt>
                <dd>{money(cashFlow.income - cashFlow.spending, lang)}</dd>
              </div>
            </dl>
            <div className="flow-track" aria-hidden="true">
              <span style={{ width: `${(cashFlow.spending / cashFlow.income) * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="hero-goal">
          <span className="aim-icon goal-icon">
            <ShieldCheck aria-hidden="true" size={20} />
          </span>
          <div>
            <strong>{p.goal}</strong>
            <p>{p.saved}</p>
          </div>
        </div>
      </figure>
    </section>
  );
}

function Product({ lang }: { lang: Lang }) {
  const { product: s, preview } = t(lang);
  const [selected, setSelected] = useState(0);
  const example = useRef<HTMLDivElement>(null);
  const transactions = [
    { label: s.groceries, merchant: "Magnum", amount: -18_450, Icon: ShoppingBasket },
    { label: s.salary, merchant: s.salary, amount: cashFlow.income, Icon: Banknote },
    { label: s.transport, merchant: s.transport, amount: -3_650, Icon: Bus },
  ];
  const spending = [
    { label: s.housing, amount: 210_000 },
    { label: s.everyday, amount: 148_600 },
    { label: s.other, amount: 77_000 },
  ];

  return (
    <section id="features" className="aim-section product-section" aria-labelledby="product-title">
      <div className="aim-wrap product-layout">
        <div>
          <p className="aim-kicker">{s.eyebrow}</p>
          <h2 id="product-title">{s.title}</h2>
          <p className="section-intro">{s.description}</p>
          <div className="product-steps" role="group" aria-label={s.tabsLabel}>
            {s.steps.map((step, index) => {
              const Icon = productIcons[index];
              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={(event) => {
                    setSelected(index);
                    if (event.detail > 0 && window.matchMedia("(max-width: 790px)").matches) {
                      requestAnimationFrame(() =>
                        example.current?.scrollIntoView({ block: "nearest" }),
                      );
                    }
                  }}
                  aria-pressed={selected === index}
                  aria-controls="product-example"
                >
                  <span className="aim-icon">
                    <Icon aria-hidden="true" size={21} />
                  </span>
                  <span>
                    <strong>{step.title}</strong>
                    <span>{step.text}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="product-stage">
          <div className="product-example" id="product-example" ref={example} aria-live="polite">
            {selected === 0 && (
              <>
                <h3>{s.review}</h3>
                <ul className="demo-list">
                  {transactions.map(({ label, merchant, amount, Icon }) => (
                    <li key={label}>
                      <span className="aim-icon">
                        <Icon aria-hidden="true" size={18} />
                      </span>
                      <span className="demo-transaction">
                        <strong>{merchant}</strong>
                        {merchant !== label && <small>{label}</small>}
                      </span>
                      <strong className={amount > 0 ? "positive" : ""}>
                        {amount > 0 ? "+" : "−"}
                        {money(Math.abs(amount), lang)}
                      </strong>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {selected === 1 && (
              <>
                <h3>{s.insights}</h3>
                <p>{s.insightsDetail}</p>
                <strong className="demo-amount">{money(cashFlow.spending, lang)}</strong>
                <ul className="demo-bars">
                  {spending.map(({ label, amount }) => (
                    <li key={label}>
                      <div>
                        <span>{label}</span>
                        <strong>{money(amount, lang)}</strong>
                      </div>
                      <progress max={cashFlow.spending} value={amount} aria-label={label} />
                    </li>
                  ))}
                </ul>
              </>
            )}
            {selected === 2 && (
              <>
                <h3>{s.goals}</h3>
                <p>{s.goalsDetail}</p>
                <div className="demo-goal">
                  <span className="aim-icon">
                    <ShieldCheck aria-hidden="true" size={22} />
                  </span>
                  <strong>{preview.goal}</strong>
                  <p>
                    <b>{money(emergencyFund.saved, lang)}</b> {s.of}{" "}
                    {money(emergencyFund.target, lang)}
                  </p>
                  <progress
                    max={emergencyFund.target}
                    value={emergencyFund.saved}
                    aria-label={preview.goal}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Market({ lang }: { lang: Lang }) {
  const { market: s, nav } = t(lang);
  return (
    <section id="vision" className="aim-section market-section" aria-labelledby="market-title">
      <div className="aim-wrap">
        <div className="market-heading">
          <div>
            <p className="aim-kicker">{s.eyebrow}</p>
            <h2 id="market-title">
              {s.title}
              <br />
              <em>{s.accent}</em>
            </h2>
          </div>
          <p className="section-intro">{s.description}</p>
        </div>
        <div className="market-stats">
          {marketStats.map(({ value, href }, index) => (
            <div key={value}>
              <strong>{value}</strong>
              <div>
                <p>{s.stats[index].detail}</p>
                <a href={href}>{s.stats[index].source}</a>
              </div>
            </div>
          ))}
        </div>
        <div className="market-path">
          {s.stages.map((stage, index) => {
            const Icon = marketIcons[index];
            return (
              <div key={stage.title}>
                <span className="aim-icon">
                  <Icon aria-hidden="true" size={21} />
                </span>
                <p>{stage.label}</p>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </div>
            );
          })}
        </div>
        <div className="scenario">
          <h3>{s.scenarioTitle}</h3>
          <p>{s.scenarioNote}</p>
          <div className="scenario-grid">
            {scenarios.map(({ active, conversion, price, currency }, index) => (
              <div key={currency}>
                <h4>{s.scenarioMarkets[index]}</h4>
                <dl>
                  <div>
                    <dt>{s.scenarioLabels[0]}</dt>
                    <dd>{number(active, lang)}</dd>
                  </div>
                  <div>
                    <dt>{s.scenarioLabels[1]}</dt>
                    <dd>{number(conversion * 100, lang)}%</dd>
                  </div>
                  <div>
                    <dt>{s.scenarioLabels[2]}</dt>
                    <dd>{money(price, lang, currency)}</dd>
                  </div>
                  <div className="scenario-result">
                    <dt>{s.scenarioResult}</dt>
                    <dd>{money(active * conversion * price * 12, lang, currency)}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <a className="aim-button aim-button-light" href="#investors">
            {nav.investors}
          </a>
        </div>
      </div>
    </section>
  );
}

function Founders({ lang }: { lang: Lang }) {
  const s = t(lang).team;
  return (
    <section
      id="founders"
      className="aim-wrap aim-section team-section"
      aria-labelledby="team-title"
    >
      <div>
        <p className="aim-kicker">{s.eyebrow}</p>
        <h2 id="team-title">{s.title}</h2>
      </div>
      <div className="team-grid">
        {photos.map(({ src, width, height }, i) => (
          <article key={src}>
            <img src={src} alt="" loading="lazy" decoding="async" width={width} height={height} />
            <h3>{s.names[i]}</h3>
            <p>{s.roles[i]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQ({ lang }: { lang: Lang }) {
  const s = t(lang).faq;
  return (
    <section id="faq" className="aim-section faq-section" aria-labelledby="faq-title">
      <div className="aim-wrap faq-layout">
        <h2 id="faq-title">{s.title}</h2>
        <div>
          {s.items.map(({ question, answer }) => (
            <details key={question}>
              <summary>
                {question}
                <ChevronDown aria-hidden="true" size={20} />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const { contact: s, nav } = t(lang);
  return (
    <div className="aim-wrap aim-section conversion-grid">
      <section id="waitlist" aria-labelledby="waitlist-title">
        <h2 id="waitlist-title">{s.title}</h2>
        <p>{s.description}</p>
        <ContactForm key={lang} lang={lang} type="user" />
      </section>
      <section id="investors" aria-labelledby="investors-title">
        <p className="aim-kicker">{nav.investors}</p>
        <h2 id="investors-title">{s.investorTitle}</h2>
        <p>{s.investorDescription}</p>
        <ContactForm key={lang} lang={lang} type="investor" />
      </section>
    </div>
  );
}

export function LandingPage({ lang }: { lang: Lang }) {
  const { footer, nav, feedbackNav, feedbackLinks } = t(lang);
  return (
    <div id="top" className="aim-site" lang={HTML_LANG[lang]}>
      <Nav lang={lang} />
      <main id="main" tabIndex={-1}>
        <Hero lang={lang} />
        <Product key={lang} lang={lang} />
        <Market lang={lang} />
        <Founders lang={lang} />
        <FAQ lang={lang} />
        <Contact lang={lang} />
      </main>
      <footer className="aim-footer">
        <div className="aim-wrap">
          <div>
            <Wordmark />
            <p>{footer}</p>
          </div>
          <nav aria-label={nav.footerMenu}>
            <a href="#features">{nav.product}</a>
            <a href="#founders">{nav.team}</a>
            <a href="#investors">{nav.investors}</a>
          </nav>
          <nav aria-label={feedbackNav}>
            {Object.entries(feedbackLinks).map(([page, label]) => (
              <Link key={page} to="/aim-feedback/$page" params={{ page }}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
