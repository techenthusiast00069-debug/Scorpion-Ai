import { useState, type FormEvent } from "react";
import { Icon } from "./Icon";
import { ScorpionMark } from "./Logo";
import { Reveal } from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

const benefits = [
  "A Master Agent and six specialists, scoped to your workspace",
  "Permission-gated browser, file, data and desktop tools",
  "n8n workflow control with execution logs attached",
  "Signed audit history from the very first action",
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function Access() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [intent, setIntent] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [touched, setTouched] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    if (!isValidEmail(email)) {
      setStatus("error");
      setError("Enter a valid work email so we can reach you.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const response = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), company: company.trim(), intent: intent.trim() }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; reference?: string; error?: string }
        | null;
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || "request_failed");
      }
      setReference(payload.reference ?? "SC-000000");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("We couldn't record the request just now. Write to access@scorpion.ai and we'll add you manually.");
    }
  };

  const reset = () => {
    setStatus("idle");
    setEmail("");
    setCompany("");
    setIntent("");
    setError("");
    setReference("");
    setTouched(false);
  };

  return (
    <section id="access" className="section">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[5px] border border-white/[0.09] bg-[#07080a]">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_78%_10%,rgba(227,32,47,0.14),transparent_65%)]"
              aria-hidden="true"
            />
            <div className="grid-lines opacity-50" aria-hidden="true" />
            <ScorpionMark className="pointer-events-none absolute -right-10 -top-8 w-[420px] max-w-[60vw] opacity-[0.045] sm:w-[520px]" />

            <div className="relative grid gap-10 p-6 sm:p-9 lg:grid-cols-[1fr_0.92fr] lg:gap-16 lg:p-12">
              <div>
                <span className="label">07 / Access</span>
                <h2 className="display mt-6 max-w-[440px]">
                  Enter the
                  <br />
                  <span className="metal">command layer.</span>
                </h2>
                <p className="lede mt-5 max-w-[400px]">
                  Scorpion is onboarding a limited cohort of design partners. Tell us what you want to run — we
                  evaluate access against real workflows, not waitlists.
                </p>

                <ul className="mt-7 space-y-2.5">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-[12px] leading-relaxed text-[#939aa4]">
                      <span className="mt-[2px] grid h-[14px] w-[14px] shrink-0 place-items-center rounded-[2px] border border-white/20 text-[#e6e9ee]">
                        <Icon name="check" size={9} strokeWidth={2.4} />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="mono flex items-center gap-1.5 text-[8px] uppercase tracking-[0.13em] text-[#5f666f]">
                    <Icon name="lock" size={10} />
                    No payment during beta
                  </span>
                  <span className="mono flex items-center gap-1.5 text-[8px] uppercase tracking-[0.13em] text-[#5f666f]">
                    <Icon name="users" size={10} />
                    Weekly cohorts
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-[4px] border border-white/[0.11] bg-[#0a0b0e]/90 p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:p-6">
                  {status === "success" ? (
                    <div className="line-in">
                      <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
                        <span className="mono flex items-center gap-2 text-[8px] uppercase tracking-[0.16em] text-[#8f97a1]">
                          <span className="dot dot-live" />
                          Request received
                        </span>
                        <span className="mono text-[8px] uppercase tracking-[0.12em] text-[#5f666f]">Queued</span>
                      </div>
                      <h3 className="mt-4 text-[19px] font-medium tracking-[-0.02em] text-[#f1f3f6]">
                        You’re on the list.
                      </h3>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-[#8f97a1]">
                        We review new operators weekly. If your objective is a fit for the current cohort, you'll
                        receive an onboarding window at the email you provided.
                      </p>
                      <div className="mt-5 space-y-2 rounded-[2px] border border-white/[0.07] bg-[#060708] px-3 py-3">
                        <div className="flex items-center justify-between">
                          <span className="mono text-[8px] uppercase tracking-[0.12em] text-[#5f666f]">Reference</span>
                          <span className="mono text-[9px] text-[#eef0f3]">{reference}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="mono text-[8px] uppercase tracking-[0.12em] text-[#5f666f]">Channel</span>
                          <span className="mono text-[9px] text-[#b9bfc7]">{email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="mono text-[8px] uppercase tracking-[0.12em] text-[#5f666f]">Status</span>
                          <span className="mono text-[9px] uppercase text-[#b9bfc7]">Awaiting review</span>
                        </div>
                      </div>
                      <button type="button" onClick={reset} className="arrow-link mt-5 text-[11.5px]">
                        Submit another request
                        <Icon name="arrow-right" size={12} />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={submit} noValidate>
                      <div className="flex items-center justify-between border-b border-white/[0.07] pb-3.5">
                        <span className="mono text-[8px] uppercase tracking-[0.16em] text-[#8f97a1]">
                          Access request
                        </span>
                        <span className="mono text-[8px] uppercase tracking-[0.12em] text-[#5f666f]">
                          Private beta
                        </span>
                      </div>

                      <div className="mt-4 space-y-3.5">
                        <div className="field">
                          <label htmlFor="email">Work email</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@company.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            onBlur={() => setTouched(true)}
                            aria-invalid={touched && email.length > 0 && !isValidEmail(email)}
                            required
                          />
                        </div>
                        <div className="field">
                          <label htmlFor="company">Company</label>
                          <input
                            id="company"
                            name="company"
                            type="text"
                            autoComplete="organization"
                            placeholder="Company or workspace"
                            value={company}
                            onChange={(event) => setCompany(event.target.value)}
                          />
                        </div>
                        <div className="field">
                          <label htmlFor="intent">What would you automate first?</label>
                          <textarea
                            id="intent"
                            name="intent"
                            placeholder="e.g. Reconcile supplier invoices, route inbound leads through n8n, organize contract archives."
                            value={intent}
                            onChange={(event) => setIntent(event.target.value)}
                            maxLength={500}
                          />
                        </div>
                      </div>

                      {status === "error" && (
                        <p className="mt-3 border-l border-[#e3202f]/60 bg-[#e3202f]/[0.07] px-2.5 py-2 text-[10.5px] leading-snug text-[#ff9aa2]">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="btn btn-crimson mt-4 w-full disabled:cursor-wait disabled:opacity-70"
                      >
                        {status === "submitting" ? "Submitting request…" : "Request access"}
                        {status !== "submitting" && <Icon name="arrow-right" size={14} />}
                      </button>

                      <p className="mt-3 text-center text-[9.5px] leading-relaxed text-[#5b626b]">
                        We use this only to evaluate access. No newsletter, no resale.
                      </p>
                    </form>
                  )}
                </div>

                <div className="mono mt-3 flex items-center justify-between px-1 text-[8px] uppercase tracking-[0.12em] text-[#4d545d]">
                  <a href="mailto:access@scorpion.ai" className="transition-colors hover:text-[#aab1bb]">
                    Or write to access@scorpion.ai
                  </a>
                  <span className="flex items-center gap-1.5">
                    <span className="dot bg-[#e3202f]" />
                    Limited cohort
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
