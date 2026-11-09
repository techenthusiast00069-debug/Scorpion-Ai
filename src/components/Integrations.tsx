import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

const integrations = [
  { name: "n8n", note: "Workflow control", state: "Native" },
  { name: "Webhooks", note: "Inbound & outbound", state: "Native" },
  { name: "REST / GraphQL", note: "Any scoped API", state: "Supported" },
  { name: "S3-compatible", note: "Document stores", state: "Supported" },
  { name: "SMTP / IMAP", note: "Mail operations", state: "Supported" },
  { name: "Local filesystem", note: "Sandboxed paths", state: "Local" },
];

const layers = [
  {
    id: "01",
    name: "Operator",
    desc: "Text, voice, approvals",
    chips: ["Web", "Desktop"],
    accent: false,
  },
  {
    id: "02",
    name: "Master Agent",
    desc: "Interpret · plan · delegate · verify",
    chips: ["Coordination", "Memory"],
    accent: false,
  },
  {
    id: "03",
    name: "Agent mesh",
    desc: "Six specialists with narrow mandates",
    chips: ["Research", "Browser", "File", "Data", "Workflow", "Desktop"],
    accent: false,
  },
  {
    id: "04",
    name: "Tool gateway",
    desc: "Permission enforcement · rate limits · audit",
    chips: ["Scoped tokens", "Signed log"],
    accent: true,
  },
  {
    id: "05",
    name: "External systems",
    desc: "n8n · APIs · files · local machine",
    chips: ["n8n", "HTTP", "Storage", "OS"],
    accent: false,
  },
];

export function Integrations() {
  return (
    <section id="integrations" className="section">
      <div className="shell">
        <Reveal>
          <div className="grid items-end gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <span className="label">06 / Integrations &amp; architecture</span>
              <h2 className="display mt-6 max-w-[580px]">
                It connects to the systems
                <br />
                <span className="metal">you already run.</span>
              </h2>
            </div>
            <div className="lg:pb-1.5">
              <p className="lede max-w-[440px]">
                Scorpion sits above your tools rather than replacing them. Workflow automation, APIs, storage and the
                local machine are reachable through one governed gateway.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="min-w-0 space-y-4">
            <Reveal>
              <div className="surface relative overflow-hidden p-5 sm:p-6">
                <div
                  className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(227,32,47,0.16),transparent_65%)]"
                  aria-hidden="true"
                />
                <div className="relative flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-[3px] border border-white/12 bg-white/[0.04]">
                      <Icon name="workflow" size={17} className="text-[#d5dae1]" />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-medium tracking-[-0.01em] text-[#f0f2f5]">n8n, under command</h3>
                      <p className="mono mt-0.5 text-[8px] uppercase tracking-[0.13em] text-[#69707a]">
                        Native workflow control
                      </p>
                    </div>
                  </div>
                  <span className="chip chip-crimson h-[20px] text-[7.5px]">
                    <span className="dot" />
                    Connected
                  </span>
                </div>

                <p className="relative mt-4 max-w-[480px] text-[12.5px] leading-relaxed text-[#8f97a1]">
                  Trigger, inspect and repair executions from the Master Agent. The Workflow Agent reads node graphs,
                  reruns failed runs with a fresh scope and attaches audit context to every execution.
                </p>

                <div className="node-strip relative mt-5 overflow-x-auto">
                  <div className="flex min-w-[430px] items-center gap-1.5 rounded-[3px] border border-white/[0.07] bg-[#060708] px-3 py-2.5">
                    {[
                      { label: "Webhook", sub: "trigger" },
                      { label: "Enrich", sub: "research" },
                      { label: "Route", sub: "condition" },
                      { label: "CRM", sub: "upsert" },
                      { label: "Notify", sub: "slack" },
                    ].map((node, i, arr) => (
                      <div key={node.label} className="flex items-center">
                        <div className="rounded-[2px] border border-white/10 bg-white/[0.025] px-2 py-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className={`dot ${i === 2 ? "bg-[#ff3341]" : "bg-[#717883]"}`} />
                            <span className="text-[9px] text-[#cfd4db]">{node.label}</span>
                          </div>
                          <div className="mono mt-0.5 text-[7px] uppercase tracking-[0.1em] text-[#565d66]">
                            {node.sub}
                          </div>
                        </div>
                        {i < arr.length - 1 && (
                          <span className="mx-1 flex items-center">
                            <span className="h-px w-3 bg-white/15" />
                            <span className="h-1 w-1 rounded-full bg-white/20" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {["Self-hosted", "n8n Cloud", "Execution logs", "Webhooks"].map((tag) => (
                      <span key={tag} className="chip h-[21px] text-[7.5px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mono flex items-center gap-1.5 text-[8px] uppercase tracking-[0.1em] text-[#8a919b]">
                    Workflow agent
                    <Icon name="arrow-up-right" size={11} />
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="grid gap-px overflow-hidden rounded-[4px] border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2">
                {integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="group flex items-center justify-between gap-3 bg-[#08090b] px-4 py-3.5 transition-colors hover:bg-[#0b0d10]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="dot bg-[#5f666f] transition-colors group-hover:bg-[#c9ced5]" />
                      <div>
                        <div className="text-[11.5px] text-[#d5dae1]">{integration.name}</div>
                        <div className="mono text-[7.5px] uppercase tracking-[0.08em] text-[#565d66]">
                          {integration.note}
                        </div>
                      </div>
                    </div>
                    <span className="mono text-[7.5px] uppercase tracking-[0.08em] text-[#7c838d]">
                      {integration.state}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={80} className="min-w-0">
            <div className="surface flex h-full flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                <span className="mono text-[8px] uppercase tracking-[0.16em] text-[#7c838d]">Reference architecture</span>
                <span className="mono text-[8px] uppercase tracking-[0.1em] text-[#4d545d]">Extensible</span>
              </div>

              <div className="flex-1 p-4">
                <div className="relative">
                  <span className="absolute bottom-4 left-[13px] top-4 w-px bg-white/[0.08]" aria-hidden="true" />
                  <div className="space-y-2">
                    {layers.map((layer) => (
                      <div
                        key={layer.id}
                        className={`relative flex gap-3 rounded-[2px] border px-3 py-2.5 ${
                          layer.accent
                            ? "border-[#e3202f]/30 bg-[#e3202f]/[0.055]"
                            : "border-white/[0.07] bg-[#060708]"
                        }`}
                      >
                        <span
                          className={`absolute -left-[3px] top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full border ${
                            layer.accent
                              ? "border-[#e3202f] bg-[#e3202f]"
                              : "border-[#5b626b] bg-[#08090b]"
                          }`}
                          aria-hidden="true"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="mono text-[7px] text-[#4d545d]">{layer.id}</span>
                            <span
                              className={`text-[11.5px] ${
                                layer.accent ? "text-[#ffb3ba]" : "text-[#d5dae1]"
                              }`}
                            >
                              {layer.name}
                            </span>
                          </div>
                          <div className="mono mt-0.5 text-[7.5px] uppercase tracking-[0.08em] text-[#5b626b]">
                            {layer.desc}
                          </div>
                        </div>
                        <div className="hidden max-w-[120px] flex-wrap justify-end gap-1 self-center sm:flex">
                          {layer.chips.slice(0, 2).map((chip) => (
                            <span
                              key={chip}
                              className="mono border border-white/10 px-1 py-[2px] text-[6.5px] uppercase tracking-[0.06em] text-[#7c838d]"
                            >
                              {chip}
                            </span>
                          ))}
                          {layer.chips.length > 2 && (
                            <span className="mono border border-white/10 px-1 py-[2px] text-[6.5px] text-[#5b626b]">
                              +{layer.chips.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-[2px] border border-white/[0.07] bg-white/[0.015] px-3 py-2.5">
                    <div className="mono flex items-center gap-1.5 text-[7.5px] uppercase tracking-[0.12em] text-[#5b626b]">
                      <Icon name="cpu" size={9} />
                      Model router
                    </div>
                    <p className="mt-1.5 text-[9.5px] leading-snug text-[#8f97a1]">OpenAI · Anthropic · local models</p>
                  </div>
                  <div className="rounded-[2px] border border-white/[0.07] bg-white/[0.015] px-3 py-2.5">
                    <div className="mono flex items-center gap-1.5 text-[7.5px] uppercase tracking-[0.12em] text-[#5b626b]">
                      <Icon name="memory" size={9} />
                      Memory
                    </div>
                    <p className="mt-1.5 text-[9.5px] leading-snug text-[#8f97a1]">Operator-owned · provenance kept</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-3">
                <p className="text-[9.5px] leading-snug text-[#626a74]">
                  Add agents, runners and providers without changing the control plane.
                </p>
                <Icon name="layers" size={14} className="shrink-0 text-[#5b626b]" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
