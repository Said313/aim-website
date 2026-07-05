import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitWaitlist, emailRegex } from "@/lib/waitlist";
import { t, type Lang, DEFAULT_LANG } from "@/lib/i18n";

export function InvestorContactForm({ lang = DEFAULT_LANG }: { lang?: Lang }) {
  const s = t(lang).forms;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError(s.errName);
    if (!emailRegex.test(email.trim())) return setError(s.errEmail);
    if (!phone.trim()) return setError(s.errPhone);

    setLoading(true);
    try {
      await submitWaitlist({
        type: "investor",
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim() || undefined,
      });
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof w.gtag === "function") {
        w.gtag("event", "investor_contact", { event_category: "conversion", event_label: "investor", language: lang });
      }
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : s.errGeneric);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="glass-card rounded-3xl p-8 text-center">
        <div className="h-14 w-14 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="h-7 w-7 text-accent" />
        </div>
        <h3 className="font-display text-2xl font-semibold">{s.successInvestorTitle}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{s.successInvestorDesc}</p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm text-accent hover:underline"
        >
          {s.addAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-card rounded-3xl p-6 md:p-8 space-y-4" noValidate>
      <Field id="inv-name" label={s.name} value={name} onChange={setName} placeholder={s.namePh} autoComplete="name" />
      <Field id="inv-email" label={s.email} type="email" value={email} onChange={setEmail} placeholder={s.emailPh} autoComplete="email" />
      <Field id="inv-phone" label={s.phone} type="tel" value={phone} onChange={setPhone} placeholder={s.phonePh} autoComplete="tel" />

      <div className="text-left">
        <label htmlFor="inv-message" className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
          {s.message}
        </label>
        <textarea
          id="inv-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={s.messagePh}
          className="w-full bg-transparent border border-border rounded-2xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>

      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-gradient text-primary-foreground hover:bg-primary-gradient-hover rounded-full px-6 py-3.5 text-sm font-semibold shadow-glow hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? s.submittingInvestor : s.submitInvestor}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="text-left">
      <label htmlFor={id} className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full bg-transparent border border-border rounded-2xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
