import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { ScorpionMark } from "./Logo";

type Phase = "awaiting" | "executing" | "verified" | "denied";

const executionLines = [
  { text: "gateway.allow  ·  browser.read · scope matched", tone: "dim" },
  { text: "browser.read    ·  42 invoices · 2 domains", tone: "normal" },
  { text: "verify          ·  totals reconciled · 4 drifts flagged", tone: "normal" },
  { text: "report          ·  delivered · audit entry written", tone: "accent" },
];

export function MasterConsole() {
  const [phase, setPhase] = useState<Phase>("awaiting");
  const [visibleLines, setVisibleLines] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => timers.current.forEach((t) => window.clearTimeout(t));
  }, []);

  const authorize = () => {
    if (phase !== "awaiting") return;
    setPhase("executing");
    setVisibleLines(0);
    executionLines.forEach((_, index) => {
      const timer = window.setTimeout(() => {
        setVisibleLines(index + 1);
        if (index === executionLines.length - 1) setPhase("verified");
      }, 620 + index * 720);
      timers.current.push(timer);
    });
  };

  const deny = () => {
    if (phase !== "awaiting") return;
    setPhase("denied");
  };

  const reset = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setVisibleLines(0);
    setPhase("awaiting");
  };

  const statusMap: Record<Phase, { label: string; className: string }> = {
    awaiting: { label: "AWAITING AUTHORIZATION", className: "text-[#ff5563]" },
    executing: { label: "EXECUTING · GATED", className: "text-[#d6dae0]" },
    verified: { label: "COMPLETE · VERIFIED", className: "text-[#d6dae0]" },
    denied: { label: "HALTED · DENIED", className: "text-[#ff5563]" },
  };
  const status = statusMap[phase];

  return (
    <div className="console">
      <div className="console-bar">
        <div className="flex items-center gap-2.5">
          <span className="console-orb">
            <span className="block h-[9px] w-[9px]">
              <ScorpionMark className="h-full w-full" />
            </span>
          </span>
          <span className="mono text-[9.5px] uppercase tracking-[0.17em] text-[#c7ccd3]">Master Agent</span>
          <span className="mono hidden text-[9px] uppercase tracking-[0.13em] text-[#515861] sm:inline">
            / scorpion core
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="mono flex items-center gap-2 text-[8.5px] uppercase tracking-[0.12em]">
            <span className={`dot ${phase === "awaiting" || phase === "denied" ? "dot-live" : ""}`} />
            <span className={status.className}>{status.label}</span>
          </span>
        </div>
      </div>

      <div className="relative px-4 pb-4 pt-4 sm:px-5">
        <div className="scanline" />

        <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <span className="mono text-[8.5px] uppercase tracking-[0.16em] text-[#59606a]">Objective / OBJ-2418</span>
          <span className="mono text-[8.5px] uppercase tracking-[0.14em] text-[#59606a]">Session 4C-9</span>
        </div>

        <p className="mb-4 text-[13px] leading-relaxed text-[#d6dae0]">
          <span className="mono mr-2 text-[#ff3341]">&gt;</span>
          Audit Q4 supplier invoices, reconcile totals and flag pricing drift.
        </p>

        <div className="mb-2 flex items-center justify-between">
          <span className="mono text-[8.5px] uppercase tracking-[0.16em] text-[#59606a]">Execution plan</span>
          <span className="mono text-[8.5px] uppercase tracking-[0.14em] text-[#59606a]">6 steps</span>
        </div>

        <ol className="mb-4 space-y-[7px]">
          {[
            { n: "01", label: "Interpret objective", meta: "constraints locked", state: "done" },
            { n: "02", label: "Compose plan", meta: "4 agents assigned", state: "done" },
            { n: "03", label: "Request permissions", meta: "1 scope required", state: phase === "denied" ? "blocked" : "attention" },
            { n: "04", label: "Execute via gateway", meta: "read-only", state: "idle" },
            { n: "05", label: "Verify results", meta: "3 criteria", state: "idle" },
            { n: "06", label: "Record & report", meta: "audit trail", state: "idle" },
          ].map((step) => {
            const isDone = step.state === "done" || (step.n === "03" && phase !== "awaiting" && phase !== "denied");
            const isAttention = step.state === "attention";
            const isBlocked = step.state === "blocked";
            const isActive = step.n === "04" && phase === "executing";
            return (
              <li key={step.n} className="flex items-center gap-2.5">
                <span
                  className={`grid h-[14px] w-[14px] shrink-0 place-items-center rounded-[2px] border ${
                    isDone
                      ? "border-white/20 bg-white/[0.08] text-[#e7eaee]"
                      : isAttention || isBlocked
                        ? "border-[#e3202f]/60 bg-[#e3202f]/15 text-[#ff5563]"
                        : "border-white/10 text-[#4c535c]"
                  }`}
                >
                  {isDone ? (
                    <Icon name="check" size={9} strokeWidth={2.2} />
                  ) : (
                    <span className={`mono text-[7px] ${isActive ? "text-[#ff3341]" : ""}`}>
                      {isBlocked ? "×" : step.n}
                    </span>
                  )}
                </span>
                <span
                  className={`min-w-0 flex-1 truncate text-[11px] ${
                    isDone ? "text-[#b9bfc7]" : isAttention || isBlocked ? "text-[#f0f2f5]" : "text-[#6f767f]"
                  }`}
                >
                  {step.label}
                </span>
                <span
                  className={`mono shrink-0 text-[8.5px] uppercase tracking-[0.08em] ${
                    isAttention ? "text-[#ff5563]" : isBlocked ? "text-[#ff5563]" : "text-[#565d66]"
                  }`}
                >
                  {step.meta}
                </span>
              </li>
            );
          })}
        </ol>

        {phase === "awaiting" && (
          <div className="permission p-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="mono text-[8.5px] uppercase tracking-[0.15em] text-[#ff7d87]">
                Permission request
              </span>
              <span className="chip chip-crimson h-[18px] px-1.5 text-[7.5px]">Read-only</span>
            </div>
            <p className="mb-2.5 text-[12px] leading-snug text-[#e7e9ed]">
              Browser Agent requests <span className="mono text-[11px] text-white">browser.read</span> on two supplier
              portals.
            </p>
            <div className="mb-3 grid grid-cols-2 gap-x-4 gap-y-1">
              {[
                ["Scope", "read · 2 domains"],
                ["Window", "15 minutes"],
                ["Writes", "none requested"],
                ["Audit", "recorded on decision"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-2 border-b border-white/[0.05] pb-1">
                  <span className="mono text-[8px] uppercase tracking-[0.1em] text-[#626973]">{k}</span>
                  <span className="mono text-[8.5px] text-[#b6bcc5]">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="btn-micro is-allow flex-1" onClick={authorize}>
                Authorize
              </button>
              <button type="button" className="btn-micro flex-1" onClick={deny}>
                Deny
              </button>
            </div>
          </div>
        )}

        {phase === "executing" && (
          <div className="permission p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="mono text-[8.5px] uppercase tracking-[0.15em] text-[#9aa1ab]">Authorized</span>
              <span className="mono text-[8.5px] text-[#6d747e]">grant 15:00 · auto-expires</span>
            </div>
            <p className="mono mb-2 text-[10px] text-[#cfd4db]">
              operator.approve · browser.read <span className="text-[#ff3341]">·</span> executing
              <span className="caret ml-1" />
            </p>
            <div className="space-y-1.5">
              {executionLines.slice(0, visibleLines).map((line) => (
                <p
                  key={line.text}
                  className={`mono line-in text-[9.5px] leading-relaxed ${
                    line.tone === "accent" ? "text-[#ff7d87]" : "text-[#8f97a1]"
                  }`}
                >
                  {line.text}
                </p>
              ))}
            </div>
          </div>
        )}

        {phase === "verified" && (
          <div className="permission p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="mono text-[8.5px] uppercase tracking-[0.15em] text-[#b9bfc7]">
                Complete · verified
              </span>
              <span className="flex items-center gap-1.5 text-[#d7dbe1]">
                <Icon name="check" size={11} strokeWidth={2} />
                <span className="mono text-[8.5px] uppercase tracking-[0.1em]">audit</span>
              </span>
            </div>
            <div className="mb-2.5 space-y-1.5">
              {executionLines.map((line) => (
                <p
                  key={line.text}
                  className={`mono text-[9.5px] leading-relaxed ${
                    line.tone === "accent" ? "text-[#ff7d87]" : "text-[#8f97a1]"
                  }`}
                >
                  {line.text}
                </p>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-white/[0.06] pt-2">
              <span className="mono text-[8px] uppercase tracking-[0.1em] text-[#59606a]">27 audit entries</span>
              <button type="button" onClick={reset} className="mono text-[8.5px] uppercase tracking-[0.1em] text-[#aab0b9] underline-offset-4 hover:text-white hover:underline">
                Run again
              </button>
            </div>
          </div>
        )}

        {phase === "denied" && (
          <div className="permission p-3">
            <p className="mono mb-1.5 text-[10px] text-[#ff7d87]">permission.denied · operator</p>
            <p className="mb-2.5 text-[11.5px] leading-snug text-[#c5cbd3]">
              Execution halted. No tool was called and the objective remains open for revision.
            </p>
            <div className="flex items-center justify-between border-t border-white/[0.06] pt-2">
              <span className="mono text-[8px] uppercase tracking-[0.1em] text-[#59606a]">audit recorded</span>
              <button
                type="button"
                onClick={reset}
                className="mono flex items-center gap-1.5 text-[8.5px] uppercase tracking-[0.1em] text-[#aab0b9] hover:text-white"
              >
                Reconsider
                <Icon name="arrow-right" size={10} />
              </button>
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="mono flex items-center gap-1.5 text-[8px] uppercase tracking-[0.1em] text-[#4f565f]">
            <Icon name="lock" size={9} />
            Scope enforced by gateway
          </span>
          <span className="mono text-[8px] uppercase tracking-[0.1em] text-[#4f565f]">v1.0.4</span>
        </div>
      </div>
    </div>
  );
}
