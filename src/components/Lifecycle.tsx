import { useState } from "react";
import { lifecycle } from "../lib/content";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function Lifecycle() {
  const [active, setActive] = useState(2);
  const step = lifecycle[active];

  return (
    <section id="lifecycle" className="section">
      <div className="shell">
        <Reveal>
          <div className="grid items-end gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <span className="label">03 / Execution lifecycle</span>
              <h2 className="display mt-6 max-w-[560px]">
                Autonomy with
                <br />
                <span className="metal">a paper trail.</span>
              </h2>
            </div>
            <div className="lg:pb-1.5">
              <p className="lede max-w-[450px]">
                Every objective moves through the same six stages. The plan is explicit before anything executes, and
                the record is complete after it does.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={70}>
          <div className="mt-12 grid overflow-hidden rounded-[4px] border border-white/[0.08] bg-[#08090b] lg:grid-cols-[0.94fr_1.06fr]">
            <div className="relative border-b border-white/[0.07] lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
                <span className="mono text-[8px] uppercase tracking-[0.16em] text-[#5b626b]">Execution stages</span>
                <span className="mono text-[8px] uppercase tracking-[0.12em] text-[#5b626b]">06 total</span>
              </div>
              <div className="relative">
                <span className="absolute bottom-6 left-[35px] top-6 w-px bg-white/[0.08]" aria-hidden="true" />
                <div role="tablist" aria-label="Execution lifecycle stages">
                  {lifecycle.map((item, index) => {
                    const selected = index === active;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActive(index)}
                        className={`group relative flex w-full items-start gap-3.5 px-5 py-4 text-left transition-colors ${
                          selected ? "bg-white/[0.028]" : "hover:bg-white/[0.015]"
                        }`}
                      >
                        <span
                          className={`relative z-10 mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border font-mono text-[8px] transition-colors ${
                            selected
                              ? "border-[#e3202f]/70 bg-[#15070a] text-[#ff7d87] shadow-[0_0_18px_-4px_rgba(227,32,47,0.7)]"
                              : "border-white/12 bg-[#0a0b0e] text-[#5b626b] group-hover:border-white/25"
                          }`}
                        >
                          {item.id}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-2">
                            <span className={`text-[13px] ${selected ? "text-[#f2f4f7]" : "text-[#a7aeb7]"}`}>
                              {item.title}
                            </span>
                            <Icon
                              name="arrow-right"
                              size={12}
                              className={`shrink-0 transition-all ${
                                selected ? "text-[#ff7d87]" : "text-transparent group-hover:text-[#5f666f]"
                              }`}
                            />
                          </span>
                          <span className="mt-0.5 block text-[10.5px] leading-snug text-[#626a74]">
                            {item.summary}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-white/[0.06] px-5 py-3">
                <Icon name="shield" size={11} className="text-[#7c838d]" />
                <span className="mono text-[8px] uppercase leading-relaxed tracking-[0.1em] text-[#5b626b]">
                  Human approval is mandatory for writes
                </span>
              </div>
            </div>

            <div className="relative flex flex-col p-5 sm:p-7">
              <div className="pointer-events-none absolute right-4 top-2 select-none font-mono text-[76px] leading-none tracking-[-0.06em] text-white/[0.025]">
                {step.id}
              </div>
              <span className="mono text-[8px] uppercase tracking-[0.16em] text-[#6b727c]">
                Stage {step.id} / {step.title}
              </span>
              <h3 className="mt-3 text-[22px] font-medium tracking-[-0.02em] text-[#f1f3f6] sm:text-[26px]">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[440px] text-[13px] leading-relaxed text-[#8f97a1]">{step.detail}</p>

              <div className="mt-6 rounded-[3px] border border-white/[0.07] bg-[#060708]">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
                  <span className="mono flex items-center gap-1.5 text-[8px] uppercase tracking-[0.14em] text-[#5b626b]">
                    <Icon name="terminal" size={10} />
                    execution record
                  </span>
                  <span className="mono text-[8px] text-[#4d545d]">stage_{step.id}</span>
                </div>
                <div className="space-y-1.5 px-3 py-3">
                  {step.artifact.map((line) => (
                    <p key={line} className="mono text-[9.5px] leading-relaxed text-[#8f97a1]">
                      <span className="mr-2 text-[#e3202f]">·</span>
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-5">
                <span className="mono flex items-center gap-1.5 text-[8px] uppercase tracking-[0.1em] text-[#5b626b]">
                  <span className="dot dot-live" />
                  Logged to immutable audit
                </span>
                <span className="mono text-[8px] uppercase tracking-[0.1em] text-[#4d545d]">
                  {active + 1} / 6
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
