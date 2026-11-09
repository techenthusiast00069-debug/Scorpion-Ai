import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

const principles = [
  {
    icon: "lock" as const,
    title: "Least privilege, always",
    body: "Scopes are computed per task: named tools, named targets, a fixed window. Nothing is inherited, nothing is permanent.",
  },
  {
    icon: "shield" as const,
    title: "Authorization, not assumption",
    body: "Writes, sends, purchases and desktop input wait for a named operator. Silence is never treated as approval.",
  },
  {
    icon: "eye" as const,
    title: "Complete audit trail",
    body: "Plans, tool calls, grants, denials, verification checks and rollbacks are recorded with actor, scope and outcome.",
  },
  {
    icon: "desktop" as const,
    title: "Isolated execution",
    body: "Browser profiles, filesystem roots and local agents run constrained. Desktop assistance is opt-in, per action — never unattended.",
  },
];

const policies = [
  { key: "write", rule: "require_human", state: "Enforced" },
  { key: "browser", rule: "domain_allowlist", state: "2 domains" },
  { key: "file", rule: "sandbox_root", state: "/clients" },
  { key: "desktop", rule: "per_action", state: "Local only" },
];

const decisions = [
  { action: "allowed", detail: "browser.read · supplier-a.portal", tone: "normal" },
  { action: "denied", detail: "fs.delete · outside sandbox root", tone: "alert" },
  { action: "blocked", detail: "os.input · no active grant", tone: "alert" },
];

export function Security() {
  return (
    <section id="control" className="section">
      <div className="shell">
        <Reveal>
          <div className="grid items-end gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <span className="label">04 / Security &amp; control</span>
              <h2 className="display mt-6 max-w-[580px]">
                Autonomy without
                <br />
                <span className="metal">blind trust.</span>
              </h2>
            </div>
            <div className="lg:pb-1.5">
              <p className="lede max-w-[440px]">
                Agents are powerful because they are bounded. Scorpion places a permission gateway between intention
                and system effect — and a complete record behind every decision.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_0.92fr] lg:gap-8">
          <div className="grid gap-px overflow-hidden rounded-[4px] border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 45}>
                <article className="group h-full bg-[#08090b] p-5 transition-colors hover:bg-[#0a0c0f] sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-8 w-8 place-items-center rounded-[2px] border border-white/10 bg-white/[0.03] text-[#b9bfc7]">
                      <Icon name={principle.icon} size={15} />
                    </span>
                    <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-5 text-[14.5px] font-medium tracking-[-0.01em] text-[#eef0f3]">
                    {principle.title}
                  </h3>
                  <p className="mt-2.5 text-[11.5px] leading-relaxed text-[#7d848e]">{principle.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div className="surface relative h-full overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                <span className="mono flex items-center gap-2 text-[8px] uppercase tracking-[0.16em] text-[#7c838d]">
                  <Icon name="shield" size={11} />
                  Control plane
                </span>
                <span className="mono flex items-center gap-1.5 text-[8px] uppercase tracking-[0.1em] text-[#b9bfc7]">
                  <span className="dot dot-live" />
                  Enforcing
                </span>
              </div>

              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="mono text-[8px] uppercase tracking-[0.14em] text-[#5b626b]">Active policies</span>
                  <span className="mono text-[8px] uppercase tracking-[0.1em] text-[#4d545d]">04</span>
                </div>
                <div className="space-y-px">
                  {policies.map((policy) => (
                    <div
                      key={policy.key}
                      className="flex items-center justify-between gap-2 border-b border-white/[0.055] py-2 last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="mono w-[52px] text-[8.5px] uppercase tracking-[0.06em] text-[#c3c9d0]">
                          {policy.key}
                        </span>
                        <span className="mono text-[8px] text-[#5f666f]">{policy.rule}</span>
                      </div>
                      <span className="mono text-[8px] uppercase tracking-[0.06em] text-[#9aa1ab]">{policy.state}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="mono text-[8px] uppercase tracking-[0.14em] text-[#5b626b]">Recent decisions</span>
                  <span className="mono text-[8px] uppercase tracking-[0.1em] text-[#4d545d]">Live</span>
                </div>
                <div className="mt-2 rounded-[2px] border border-white/[0.07] bg-[#060708]">
                  {decisions.map((decision, i) => (
                    <div
                      key={decision.detail}
                      className={`flex items-start gap-2 px-3 py-2 ${i > 0 ? "border-t border-white/[0.05]" : ""}`}
                    >
                      <span
                        className={`mono mt-[1px] w-[42px] shrink-0 text-[8px] uppercase tracking-[0.06em] ${
                          decision.tone === "alert" ? "text-[#ff7d87]" : "text-[#b9bfc7]"
                        }`}
                      >
                        {decision.action}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[9.5px] text-[#8f97a1]">{decision.detail}</span>
                      <Icon
                        name={decision.tone === "alert" ? "close" : "check"}
                        size={10}
                        className={decision.tone === "alert" ? "mt-[1px] text-[#ff7d87]" : "mt-[1px] text-[#b9bfc7]"}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                  <span className="mono text-[8px] uppercase tracking-[0.1em] text-[#5b626b]">
                    Signed · exportable
                  </span>
                  <span className="mono flex items-center gap-1.5 text-[8px] uppercase tracking-[0.1em] text-[#8a919b]">
                    <Icon name="lock" size={9} />
                    audit.json
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.065] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[560px] text-[12.5px] leading-relaxed text-[#7d848e]">
              <span className="text-[#d6dae0]">The operator stays the root of authority.</span> Agents can act. They
              cannot act alone.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="chip">Zero standing privileges</span>
              <span className="chip">Per-action tokens</span>
              <span className="chip">Revocable by design</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
