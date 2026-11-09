import { modules } from "../lib/content";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function Workspaces() {
  return (
    <section id="workspaces" className="section">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="label">05 / Workspaces</span>
              <h2 className="display mt-6 max-w-[420px]">
                Everything the operator needs.
                <br />
                <span className="metal">One system.</span>
              </h2>
              <p className="lede mt-6 max-w-[380px]">
                Scorpion is organised around the work, not around a chat window. Each workspace is a control surface for
                a different part of the operation.
              </p>
              <a href="#access" className="arrow-link mt-8">
                Request a walkthrough
                <Icon name="arrow-up-right" size={14} />
              </a>
              <div className="mt-10 hidden items-center gap-3 lg:flex">
                <span className="h-px w-10 bg-white/20" />
                <span className="mono text-[8px] uppercase tracking-[0.16em] text-[#575e68]">
                  08 workspaces · one ledger
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <ul className="border-t border-white/[0.08]">
              {modules.map((module, index) => (
                <li key={module.name}>
                  <div className="group grid grid-cols-[30px_1fr_auto] items-start gap-4 border-b border-white/[0.08] px-1 py-4 transition-colors hover:bg-white/[0.018] sm:grid-cols-[34px_1fr_auto] sm:py-5">
                    <span className="mt-0.5 text-[#6b727c] transition-colors group-hover:text-[#c9ced5]">
                      <Icon name={module.icon} size={17} />
                    </span>
                    <div>
                      <h3 className="text-[13.5px] font-medium tracking-[-0.01em] text-[#dfe3e8] transition-colors group-hover:text-white">
                        {module.name}
                      </h3>
                      <p className="mt-1 text-[11.5px] leading-relaxed text-[#6f767f]">{module.description}</p>
                    </div>
                    <span className="card-index mt-1">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
