import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitWaitlist, emailRegex } from "@/lib/waitlist";

export function InvestorContactForm() {
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

    if (!name.trim()) return setError("Please enter your name.");
    if (!emailRegex.test(email.trim())) return setError("Please enter a valid email.");
    if (!phone.trim()) return setError("Please enter your phone number.");

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
        w.gtag("event", "investor_contact", { event_category: "conversion", event_label: "investor" });
      }
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
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
        <h3 className="font-display text-2xl font-semibold">Thank you! We'll contact you soon.</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Our team will reach out shortly to continue the conversation.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-card rounded-3xl p-6 md:p-8 space-y-4" noValidate>
      <Field id="inv-name" label="Name" value={name} onChange={setName} placeholder="Your full name" autoComplete="name" />
      <Field id="inv-email" label="Email" type="email" value={email} onChange={setEmail} placeholder="you@firm.com" autoComplete="email" />
      <Field id="inv-phone" label="Phone number" type="tel" value={phone} onChange={setPhone} placeholder="+1 555 000 0000" autoComplete="tel" />

      <div className="text-left">
        <label htmlFor="inv-message" className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
          Message <span className="normal-case text-muted-foreground/70">(optional)</span>
        </label>
        <textarea
          id="inv-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your fund or what you'd like to discuss."
          className="w-full bg-transparent border border-border rounded-2xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </div>

      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-accent-foreground rounded-full px-6 py-3.5 text-sm font-semibold shadow-glow hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Sending…" : "Contact us"}
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
