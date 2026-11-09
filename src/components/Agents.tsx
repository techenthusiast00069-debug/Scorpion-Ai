import { agents } from "../lib/content";
import { Icon } from "./Icon";
import { ScorpionMark } from "./Logo";
import { Reveal } from "./Reveal";

const scopeTone: Record<string, string> = {
  read: "text-[#b9bfc7]",
  approval: "text-[#ff7d87]",
  sandbox: "text-[#b9bfc7]",
  local: "text-[#9aa1ab]",
};

export function Agents() {
  return (
    <section id="agents" className="section">
      <div className="shell">
        <Reveal>
          <div className="grid items-end gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <span className="label">02 / Specialized agents</span>
              <h2 className="display mt-6 max-w-[540px]">
                Six specialists.
                <br />
                <span className="metal">One intelligence.</span>
              </h2>
            </div>
            <div className="lg:pb-1.5">
              <p className="lede max-w-[450px]">
                The Master Agent delegates to specialists with narrow mandates and explicit tool scopes. No agent
                inherits system access, and no capability survives the task it was granted for.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="surface mt-12 grid gap-px overflow-hidden bg-white/[0.06] md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-[#08090b] p-5">
              <span className="mono text-[8px] uppercase tracking-[0.16em] text-[#5b626b]">Input</span>
              <p className="mt-2.5 text-[12.5px] leading-snug text-[#d6dae0]">
                Audit Q4 supplier invoices and flag pricing drift.
              </p>
              <span className="mono mt-3 block text-[8px] uppercase tracking-[0.12em] text-[#4d545d]">
                operator intent
              </span>
            </div>
            <div className="relative bg-[#08090b] p-5">
              <span className="mono text-[8px] uppercase tracking-[0.16em] text-[#5b626b]">Control</span>
              <div className="mt-2.5 flex items-center gap-2.5">
                <ScorpionMark className="h-6 w-auto" />
                <span className="text-[12.5px] text-[#f0f2f5]">Master Agent</span>
              </div>
              <span className="mono mt-3 block text-[8px] uppercase tracking-[0.12em] text-[#4d545d]">
                plans · delegates · verifies
              </span>
              <Icon name="arrow-right" size={13} className="absolute -right-[7px] top-1/2 z-10 hidden -translate-y-1/2 text-[#5f666f] md:block" />
            </div>
            <div className="bg-[#08090b] p-5">
              <span className="mono text-[8px] uppercase tracking-[0.16em] text-[#5b626b]">Delegation</span>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {["Research", "Browser", "Data"].map((name) => (
                  <span key={name} className="mono border border-white/10 bg-white/[0.03] px-1.5 py-1 text-[8px] uppercase tracking-[0.06em] text-[#b9bfc7]">
                    {name}
                  </span>
                ))}
                <span className="mono border border-white/10 px-1.5 py-1 text-[8px] uppercase tracking-[0.06em] text-[#5b626b]">
                  +3
                </span>
              </div>
              <span className="mono mt-3 block text-[8px] uppercase tracking-[0.12em] text-[#4d545d]">
                scoped per task
              </span>
              <Icon name="arrow-right" size={13} className="absolute -right-[7px] top-1/2 z-10 hidden -translate-y-1/2 text-[#5f666f] lg:block" />
            </div>
            <div className="bg-[#08090b] p-5">
              <span className="mono text-[8px] uppercase tracking-[0.16em] text-[#5b626b]">Output</span>
              <p className="mt-2.5 text-[12.5px] leading-snug text-[#d6dae0]">
                42 invoices reconciled · 4 drifts flagged · audit signed.
              </p>
              <span className="mono mt-3 flex items-center gap-1.5 text-[8px] uppercase tracking-[0.12em] text-[#8a919b]">
                <Icon name="check" size={9} />
                verified
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, index) => (
            <Reveal key={agent.name} delay={40 * index}>
              <article className="group surface surface-hover flex h-full flex-col p-5 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="card-index">{agent.id}</span>
                  <span className="flex items-center gap-1.5">
                    <span className={`dot ${agent.state === "active" ? "bg-[#e3202f]" : "bg-[#4d545d]"}`} />
                    <span className="mono text-[8px] uppercase tracking-[0.12em] text-[#69707a]">
                      {agent.state === "active" ? "Active" : "Standby"}
                    </span>
                  </span>
                </div>

                <h3 className="mt-5 text-[17px] font-medium tracking-[-0.02em] text-[#eef0f3]">{agent.name}</h3>
                <p className="mono mt-1 text-[8.5px] uppercase tracking-[0.13em] text-[#7c838d]">{agent.role}</p>

                <p className="mt-4 flex-1 text-[12px] leading-relaxed text-[#8f97a1]">{agent.description}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {agent.tools.map((tool) => (
                    <span
                      key={tool}
                      className="mono border border-white/[0.08] bg-white/[0.02] px-1.5 py-[3px] text-[8px] text-[#7d848e] transition-colors group-hover:border-white/[0.13] group-hover:text-[#a2a9b2]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-3.5">
                  <span className="mono flex items-center gap-1.5 text-[8px] uppercase tracking-[0.1em] text-[#5f666f]">
                    <Icon name="shield" size={10} className={scopeTone[agent.scopeTone]} />
                    <span className={scopeTone[agent.scopeTone]}>{agent.scope}</span>
                  </span>
                  <Icon
                    name="arrow-up-right"
                    size={13}
                    className="text-[#4d545d] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c9ced5]"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[3px] border border-white/[0.07] bg-white/[0.015] px-4 py-3">
            <p className="mono text-[8.5px] uppercase leading-relaxed tracking-[0.1em] text-[#69707a]">
              <span className="text-[#c9ced5]">Composition, not permission.</span> Agents are assembled per objective
              and revoked when the task closes.
            </p>
            <a href="#control" className="arrow-link text-[11.5px]">
              See the control model
              <Icon name="arrow-right" size={13} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
