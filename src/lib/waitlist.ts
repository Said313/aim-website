export const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyUwzSt2qpzycpoZ4MDD9C0MHDD_EnjlvtWSIShvsJvRetQ9wcQVEemY7LGXDm1X-zokw/exec";

export type UserWaitlistPayload = {
  type: "user";
  name: string;
  email: string;
  phone: string;
};

export type InvestorContactPayload = {
  type: "investor";
  name: string;
  email: string;
  phone: string;
  message?: string;
};

export type WaitlistPayload = UserWaitlistPayload | InvestorContactPayload;

export async function submitWaitlist(payload: WaitlistPayload): Promise<void> {
  // Google Apps Script web apps don't return CORS headers for preflighted
  // requests. Sending as text/plain avoids the preflight while still
  // delivering a JSON body that doPost(e) reads via e.postData.contents.
  const res = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "follow",
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    throw new Error(`Submission failed (${res.status})`);
  }
}
