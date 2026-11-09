import { ScorpionMark } from "./Logo";
import { Reveal } from "./Reveal";

export function BrandBand() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_60%_at_50%_52%,rgba(227,32,47,0.12),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="grid-lines opacity-60" aria-hidden="true" />

      <div className="shell relative">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="mono text-[8.5px] uppercase tracking-[0.28em] text-[#6b727c]">The command layer</span>

            <div className="relative mt-7 flex w-full items-center justify-center">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" aria-hidden="true" />
              <div className="relative mx-6 shrink-0 sm:mx-10">
                <span
                  className="absolute left-1/2 top-1/2 -z-10 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] sm:h-[280px] sm:w-[280px]"
                  aria-hidden="true"
                />
                <span
                  className="absolute left-1/2 top-1/2 -z-10 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e3202f]/20 sm:h-[200px] sm:w-[200px]"
                  aria-hidden="true"
                />
                <ScorpionMark className="h-[118px] w-auto drop-shadow-[0_18px_36px_rgba(0,0,0,0.8)] sm:h-[150px]" />
              </div>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" aria-hidden="true" />
            </div>

            <h2 className="mt-10 max-w-[880px] text-[clamp(1.75rem,4.4vw,3.15rem)] font-medium leading-[1.02] tracking-[-0.04em]">
              <span className="metal">Your AI. Your System.</span> <span className="text-[#ff3341]">Your Control.</span>
            </h2>

            <p className="mt-5 max-w-[520px] text-[13.5px] leading-relaxed text-[#7d848e]">
              Autonomy is only useful when it is accountable. Scorpion is built to take real work — and leave you in
              command of every action it takes.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {["Desktop", "Cloud", "Local agents", "External models"].map((item, i) => (
                <span key={item} className="flex items-center gap-5">
                  {i > 0 && <span className="h-3 w-px bg-white/10" aria-hidden="true" />}
                  <span className="mono text-[8px] uppercase tracking-[0.18em] text-[#5f666f]">{item}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
