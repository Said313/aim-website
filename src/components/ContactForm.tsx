import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { CircleCheck } from "lucide-react";
import { submitWaitlist } from "@/lib/waitlist";
import { t, type Lang } from "@/lib/i18n";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ContactForm({ lang, type }: { lang: Lang; type: "user" | "investor" }) {
  const s = t(lang).contact;
  const ready = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const investor = type === "investor";
  const [status, setStatus] = useState<"idle" | "pending" | "error" | "success">("idle");
  const successHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") successHeading.current?.focus();
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending" || status === "success") return;

    const fields = new FormData(event.currentTarget);
    const name = String(fields.get("name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const phone = String(fields.get("phone") ?? "").trim();
    const message = String(fields.get("message") ?? "").trim();
    const contact = { name, email, phone };

    setStatus("pending");
    try {
      await submitWaitlist(
        investor ? { type, ...contact, message: message || undefined } : { type, ...contact },
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="contact-form">
      {status === "success" && (
        <div className="form-success">
          <CircleCheck aria-hidden="true" />
          <h3 ref={successHeading} tabIndex={-1} aria-describedby={`${type}-success-detail`}>
            {investor ? s.successInvestor : s.success}
          </h3>
          <p id={`${type}-success-detail`}>
            {investor ? s.successInvestorDetail : s.successDetail}
          </p>
        </div>
      )}
      {status !== "success" && (
        <form method="post" onSubmit={onSubmit} aria-describedby={`${type}-form-note`}>
          <label htmlFor={`${type}-name`}>{s.name}</label>
          <input
            id={`${type}-name`}
            name="name"
            required
            pattern={".*\\S.*"}
            maxLength={120}
            autoComplete="name"
          />
          <label htmlFor={`${type}-email`}>{s.email}</label>
          <input
            id={`${type}-email`}
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
          />
          <label htmlFor={`${type}-phone`}>{s.phone}</label>
          <input
            id={`${type}-phone`}
            name="phone"
            type="tel"
            required
            pattern=".*[0-9].*"
            maxLength={50}
            autoComplete="tel"
          />
          {investor && (
            <>
              <label htmlFor="investor-message">{s.message}</label>
              <textarea id="investor-message" name="message" rows={3} maxLength={2000} />
            </>
          )}
          <p className="form-note" id={`${type}-form-note`}>
            {investor ? s.investorNote : s.waitlistNote}
          </p>
          {status === "error" && (
            <p role="alert" className="form-error">
              {s.error}
            </p>
          )}
          <div className="submission-actions">
            <button
              className="aim-button aim-button-primary"
              type="submit"
              disabled={!ready || status === "pending"}
            >
              {status === "pending" ? s.submitting : investor ? s.submitInvestor : s.submit}
            </button>
          </div>
          <noscript>
            <style>{".submission-actions{display:none}"}</style>
            <p>{s.noScript}</p>
          </noscript>
        </form>
      )}
    </div>
  );
}
