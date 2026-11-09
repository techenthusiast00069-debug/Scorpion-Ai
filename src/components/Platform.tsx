import { Dashboard } from "./Dashboard";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function Platform() {
  return (
    <section id="platform" className="section">
      <div className="shell">
        <Reveal>
          <div className="mb-10 grid items-end gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <span className="label">01 / Command center</span>
              <h2 className="display mt-6 max-w-[560px]">
                The entire operation,
                <br />
                <span className="metal">on one surface.</span>
              </h2>
            </div>
            <div className="lg:pb-1.5">
              <p className="lede max-w-[440px]">
                The Master Agent, every specialist, every task, workflow run and audit entry in one operating view.
                Intent becomes an approved plan, and an approved plan becomes a verified outcome — without switching
                systems.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { icon: "command" as const, label: "Master Agent" },
                  { icon: "eye" as const, label: "Live execution" },
                  { icon: "shield" as const, label: "Approval queue" },
                  { icon: "lock" as const, label: "Immutable audit" },
                ].map((chip) => (
                  <span key={chip.label} className="chip">
                    <Icon name={chip.icon} size={10} />
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <Dashboard />
          <div className="mt-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <span className="mono text-[8.5px] uppercase tracking-[0.14em] text-[#575e68]">
              Fig. 01 — Command center / operations workspace
            </span>
            <span className="mono flex items-center gap-2 text-[8.5px] uppercase tracking-[0.14em] text-[#575e68]">
              <span className="dot dot-live" />
              Interactive preview — switch views
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
