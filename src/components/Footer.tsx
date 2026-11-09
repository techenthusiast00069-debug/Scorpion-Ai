import { Icon } from "./Icon";
import { Logo, ScorpionMark } from "./Logo";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Command center", href: "#platform" },
      { label: "Specialized agents", href: "#agents" },
      { label: "Execution lifecycle", href: "#lifecycle" },
      { label: "Security & control", href: "#control" },
    ],
  },
  {
    title: "Systems",
    links: [
      { label: "Workspaces", href: "#workspaces" },
      { label: "Integrations", href: "#integrations" },
      { label: "Architecture", href: "#integrations" },
      { label: "n8n workflows", href: "#integrations" },
    ],
  },
  {
    title: "Access",
    links: [
      { label: "Request early access", href: "#access" },
      { label: "Design partners", href: "#access" },
      { label: "System overview", href: "#platform" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] pt-14">
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 h-56 w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,32,47,0.10),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="shell relative">
        <div className="grid gap-10 pb-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-[320px] text-[12.5px] leading-relaxed text-[#767d87]">
              An intelligent operating layer for autonomous agents, desktop productivity and business workflow
              automation — built for controlled execution.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="chip">
                <span className="dot dot-live" />
                Private beta
              </span>
              <span className="chip">Weekly onboarding</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="mono text-[8px] uppercase tracking-[0.18em] text-[#5b626b]">{column.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="footer-link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/[0.07] py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-[8px] uppercase tracking-[0.14em] text-[#4d545d]">
            © 2026 Scorpion AI · All rights reserved
          </p>
          <p className="mono flex flex-wrap items-center gap-x-2 text-[8px] uppercase tracking-[0.16em] text-[#69707a]">
            <span>Your AI.</span>
            <span>Your System.</span>
            <span className="text-[#ff3341]">Your Control.</span>
          </p>
          <a
            href="#top"
            className="mono group inline-flex items-center gap-1.5 self-start text-[8px] uppercase tracking-[0.14em] text-[#69707a] transition-colors hover:text-white sm:self-auto"
          >
            Back to top
            <Icon name="arrow-down" size={11} className="rotate-180 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/[0.055]">
        <ScorpionMark className="mx-auto -mb-3 mt-2 h-16 w-auto opacity-[0.06]" />
      </div>
    </footer>
  );
}
