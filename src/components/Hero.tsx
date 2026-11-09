import { Icon } from "./Icon";
import { ScorpionMark } from "./Logo";
import { MasterConsole } from "./MasterConsole";

const stats = [
  { value: "06", label: "Specialists under one Master Agent" },
  { value: "01", label: "Permission gateway for every task" },
  { value: "100%", label: "Actions recorded and auditable" },
  { value: "00", label: "Unrestricted system access" },
];

const tickerItems = [
  ["20:41:12", "plan.created", "OBJ-2418 · 6 steps · 4 agents"],
  ["20:41:19", "permission.requested", "browser.read · supplier-a.portal"],
  ["20:40:02", "task.verified", "forecast.q4 · 3 checks passed"],
  ["20:38:47", "fs.move", "218 files filed · sandboxed"],
  ["20:36:10", "n8n.run", "lead-routing · execution 1042 · 6.2s"],
  ["20:33:58", "os.input", "accounting.exe · denied by operator"],
  ["20:31:02", "memory.write", "client brief · provenance attached"],
];

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="grid-lines" aria-hidden="true" />
      <ScorpionMark className="crest-watermark" aria-hidden="true" />

      <div className="shell relative">
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.055] pb-4">
          <span className="label">Agentic operating layer</span>
          <span className="mono hidden text-[9px] uppercase tracking-[0.18em] text-[#5d646e] sm:block">
            Scorpion AI / 2026 · Private beta
          </span>
        </div>

        <div className="mt-10 grid items-start gap-14 lg:mt-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <h1 className="hero-title">
              <span className="metal">Your AI.</span>
              <span className="metal">Your System.</span>
              <span className="metal">
                Your Control<span className="text-[#ff3341]">.</span>
              </span>
            </h1>

            <p className="lede mt-7 max-w-[520px]">
              An intelligent operating layer for real work. A Master Agent interprets the objective, builds the plan,
              requests only the permissions it needs and executes through approved tools — while every action is
              verified and recorded.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#access" className="btn btn-crimson">
                Request early access
                <Icon name="arrow-up-right" size={15} />
              </a>
              <a href="#platform" className="btn btn-line">
                <Icon name="terminal" size={15} />
                Inspect the platform
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 border-l border-t border-white/[0.075] sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="border-b border-r border-white/[0.075] px-3 py-4">
                  <div className="mono text-[19px] leading-none tracking-[-0.02em] text-[#eef0f3]">{stat.value}</div>
                  <div className="mt-2 text-[10.5px] leading-snug text-[#727983]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-10 bg-[radial-gradient(60%_50%_at_60%_20%,rgba(227,32,47,0.10),transparent_70%)]" />
            <MasterConsole />
            <div className="mt-3 flex items-center justify-between gap-3 px-1">
              <span className="mono flex items-center gap-2 text-[8.5px] uppercase tracking-[0.14em] text-[#5c636d]">
                <span className="h-px w-6 bg-white/20" />
                Live coordination surface
              </span>
              <span className="mono hidden text-[8.5px] uppercase tracking-[0.14em] text-[#5c636d] sm:block">
                Try the gate ↗
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="ticker-shell relative mt-14 overflow-hidden border-y border-white/[0.065] bg-white/[0.012]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#060708] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#060708] to-transparent" />
        <div className="flex items-stretch">
          <div className="relative z-20 hidden shrink-0 items-center gap-2 border-r border-white/[0.065] bg-[#070809] px-5 md:flex">
            <span className="dot dot-live" />
            <span className="mono text-[8.5px] uppercase tracking-[0.18em] text-[#7c838d]">Audit stream</span>
          </div>
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div className="ticker-track py-2.5">
              {[0, 1].map((dupe) => (
                <div key={dupe} className="flex shrink-0 items-center" aria-hidden={dupe === 1}>
                  {tickerItems.map(([time, event, detail]) => (
                    <span key={`${dupe}-${time}`} className="flex items-center whitespace-nowrap">
                      <span className="mono px-4 text-[9px] text-[#4f565f]">{time}</span>
                      <span className="mono text-[9px] uppercase tracking-[0.06em] text-[#9aa1ab]">{event}</span>
                      <span className="mono px-2 text-[9px] text-[#4a515a]">/</span>
                      <span className="mono pr-4 text-[9px] text-[#666d77]">{detail}</span>
                      <span className="h-2.5 w-px bg-white/10" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
