import { useState } from "react";
import { Icon } from "./Icon";
import { ScorpionMark } from "./Logo";

type Tab = "overview" | "agents" | "workflows" | "audit";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "agents", label: "Agents" },
  { id: "workflows", label: "Workflows" },
  { id: "audit", label: "Audit" },
];

const metrics = [
  { label: "Agents active", value: "04", meta: "of 06 configured", tone: "normal" },
  { label: "Tasks in flight", value: "12", meta: "3 awaiting verification", tone: "normal" },
  { label: "Workflow runs", value: "38", meta: "last 24 hours", tone: "normal" },
  { label: "Awaiting approval", value: "02", meta: "operator required", tone: "alert" },
];

const roster = [
  { name: "Research", task: "Competitive landscape · EU energy", state: "62%" },
  { name: "Browser", task: "Supplier portal · invoice export", state: "41%" },
  { name: "File", task: "Filing 218 contracts · /clients", state: "78%" },
  { name: "Data", task: "Q4 pipeline forecast · verified", state: "done" },
  { name: "Workflow", task: "lead-routing · n8n", state: "idle" },
  { name: "Desktop", task: "Accounting app · waiting grant", state: "idle" },
];

const flowNodes = [
  { label: "Webhook", sub: "lead.created", state: "done" },
  { label: "Enrich", sub: "research", state: "done" },
  { label: "Score", sub: "data", state: "done" },
  { label: "Route", sub: "condition", state: "active" },
  { label: "CRM", sub: "upsert", state: "next" },
  { label: "Notify", sub: "slack", state: "next" },
];

export function Dashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [approved, setApproved] = useState(false);

  return (
    <div className="dash">
      <div className="dash-bar">
        <div className="flex min-w-0 items-center gap-3">
          <ScorpionMark className="h-5 w-auto shrink-0" />
          <span className="mono hidden text-[9px] uppercase tracking-[0.2em] text-[#c2c8d0] sm:block">Scorpion</span>
          <span className="hidden h-3.5 w-px bg-white/15 sm:block" />
          <span className="mono text-[9px] uppercase tracking-[0.14em] text-[#69707a]">Command center</span>
          <span className="chip hidden h-[20px] px-1.5 text-[7.5px] lg:inline-flex">Operations / Production</span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="mono hidden items-center gap-1.5 text-[8px] uppercase tracking-[0.12em] text-[#6f767f] md:flex">
            <span className="dot dot-live" />
            Master online
          </span>
          <span className="mono hidden text-[8px] uppercase tracking-[0.12em] text-[#5c636d] sm:block">
            04 agents active
          </span>
          <span className="grid h-6 w-6 place-items-center rounded-full border border-white/15 bg-white/[0.05]">
            <span className="mono text-[7.5px] text-[#c9ced5]">AV</span>
          </span>
        </div>
      </div>

      <div className="dash-body">
        <aside className="dash-side">
          <div className="mb-3 flex h-7 items-center gap-2 rounded-[2px] border border-white/[0.07] bg-white/[0.02] px-2">
            <Icon name="search" size={11} className="text-[#5f666f]" />
            <span className="text-[10px] text-[#5f666f]">Search commands</span>
            <span className="mono ml-auto text-[7.5px] text-[#4a515a]">⌘K</span>
          </div>

          <div className="mb-2 px-2 pt-1">
            <span className="mono text-[7.5px] uppercase tracking-[0.18em] text-[#4d545d]">Workspace</span>
          </div>
          <div className="space-y-0.5">
            {[
              { icon: "grid" as const, label: "Overview", tab: "overview" as Tab },
              { icon: "command" as const, label: "Master Agent", tab: null },
              { icon: "users" as const, label: "Agents", tab: "agents" as Tab },
              { icon: "workflow" as const, label: "Workflows", tab: "workflows" as Tab },
              { icon: "eye" as const, label: "Tasks", tab: null },
            ].map((item) => {
              const active = item.tab !== null && item.tab === tab;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => item.tab && setTab(item.tab)}
                  className={`dash-nav-item w-full ${active ? "is-active" : ""} ${
                    item.tab ? "" : "cursor-default opacity-55 hover:bg-transparent hover:text-[#8b929c]"
                  }`}
                >
                  <Icon name={item.icon} size={13} />
                  <span>{item.label}</span>
                  {item.label === "Tasks" && (
                    <span className="mono ml-auto rounded-sm bg-[#e3202f]/15 px-1 text-[7.5px] text-[#ff7d87]">12</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mb-2 px-2 pt-5">
            <span className="mono text-[7.5px] uppercase tracking-[0.18em] text-[#4d545d]">System</span>
          </div>
          <div className="space-y-0.5">
            {[
              { icon: "layers" as const, label: "Integrations" },
              { icon: "memory" as const, label: "Memory" },
              { icon: "sliders" as const, label: "Policy" },
            ].map((item) => (
              <div key={item.label} className="dash-nav-item cursor-default opacity-55">
                <Icon name={item.icon} size={13} />
                <span>{item.label}</span>
              </div>
            ))}
            <button type="button" onClick={() => setTab("audit")} className={`dash-nav-item w-full ${tab === "audit" ? "is-active" : ""}`}>
              <Icon name="shield" size={13} />
              <span>Audit log</span>
            </button>
          </div>

          <div className="mt-5 rounded-[2px] border border-white/[0.07] bg-white/[0.015] p-2.5">
            <div className="mb-1.5 flex items-center gap-1.5">
              <span className="dot bg-[#e3202f]" />
              <span className="mono text-[7.5px] uppercase tracking-[0.12em] text-[#8b929c]">Policy engine</span>
            </div>
            <p className="text-[9px] leading-snug text-[#565d66]">Least privilege enforced. 2 scopes active.</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="dash-tabs">
            <div className="flex items-center gap-5" role="tablist" aria-label="Command center views">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === item.id}
                  onClick={() => setTab(item.id)}
                  className={`dash-tab ${tab === item.id ? "is-active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="ml-auto hidden items-center gap-2 md:flex">
              <span className="mono flex items-center gap-1.5 text-[8px] uppercase tracking-[0.1em] text-[#5c636d]">
                <Icon name="clock" size={10} />
                Last 24h
              </span>
              <span className="h-3 w-px bg-white/10" />
              <span className="mono text-[8px] uppercase tracking-[0.1em] text-[#5c636d]">Live</span>
              <span className="dot dot-live" />
            </div>
          </div>

          <div className="dash-main">
            {tab === "overview" && <Overview approved={approved} onApprove={() => setApproved(true)} />}
            {tab === "agents" && <AgentsView />}
            {tab === "workflows" && <WorkflowsView />}
            {tab === "audit" && <AuditView approved={approved} />}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] px-4 py-2.5">
            <span className="mono flex items-center gap-1.5 text-[7.5px] uppercase tracking-[0.1em] text-[#4d545d]">
              <Icon name="lock" size={9} />
              All actions pass through the permission gateway
            </span>
            <span className="mono flex items-center gap-3 text-[7.5px] uppercase tracking-[0.1em] text-[#4d545d]">
              <span>Core v1.0.4</span>
              <span className="hidden sm:inline">EU-West</span>
              <span className="flex items-center gap-1">
                <span className="dot bg-[#8f97a1]" />
                Synced 4s ago
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Overview({ approved, onApprove }: { approved: boolean; onApprove: () => void }) {
  const steps = [
    { label: "Interpret objective", meta: "constraints parsed", state: "done" },
    { label: "Compose execution plan", meta: "6 steps · 4 agents", state: "done" },
    { label: "Request permissions", meta: approved ? "granted · operator" : "1 scope awaiting", state: approved ? "done" : "attention" },
    { label: "Execute via gateway", meta: approved ? "running · 0 writes" : "queued", state: approved ? "running" : "idle" },
    { label: "Verify results", meta: "3 criteria", state: "idle" },
    { label: "Record & report", meta: "audit trail", state: "idle" },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric">
            <div className="mono mb-2 text-[8px] uppercase tracking-[0.12em] text-[#69707a]">{metric.label}</div>
            <div className="flex items-end justify-between gap-2">
              <span className="metric-val">{metric.label === "Awaiting approval" && approved ? "01" : metric.value}</span>
              {metric.tone === "alert" ? (
                <span className="mono pb-0.5 text-[7.5px] uppercase tracking-[0.1em] text-[#ff7d87]">action</span>
              ) : (
                <span className="mono pb-0.5 text-[7.5px] uppercase tracking-[0.1em] text-[#5f666f]">live</span>
              )}
            </div>
            <div className="mt-1.5 text-[8.5px] leading-snug text-[#5b626b]">{metric.meta}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr]">
        <div className="panel-mini overflow-hidden">
          <div className="panel-head">
            <span className="flex items-center gap-2">
              Active objective
              <span className="text-[#3f464f]">/</span>
              <span className="text-[#8a919b]">OBJ-2418</span>
            </span>
            <span className={`chip h-[18px] px-1.5 text-[7px] ${approved ? "" : "chip-crimson"}`}>
              {approved ? "In progress" : "Awaiting approval"}
            </span>
          </div>
          <div className="p-3">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-[13px] font-medium tracking-[-0.01em] text-[#eef0f3]">
                Q4 supplier audit &amp; pricing drift
              </h4>
              <span className="mono text-[8px] uppercase tracking-[0.1em] text-[#5b626b]">4 agents · 12:48 elapsed</span>
            </div>

            <div className="mb-3 space-y-[6px]">
              {steps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2.5">
                  <span
                    className={`grid h-[15px] w-[15px] shrink-0 place-items-center rounded-[2px] border ${
                      step.state === "done"
                        ? "border-white/20 bg-white/[0.07] text-[#e7eaee]"
                        : step.state === "attention"
                          ? "border-[#e3202f]/60 bg-[#e3202f]/12 text-[#ff7d87]"
                          : step.state === "running"
                            ? "border-[#e3202f]/40 bg-[#e3202f]/10"
                            : "border-white/10 text-[#4c535c]"
                    }`}
                  >
                    {step.state === "done" ? (
                      <Icon name="check" size={9} strokeWidth={2.2} />
                    ) : step.state === "running" ? (
                      <span className="dot dot-live" />
                    ) : (
                      <span className="mono text-[7px]">{String(i + 1).padStart(2, "0")}</span>
                    )}
                  </span>
                  <span
                    className={`min-w-0 flex-1 truncate text-[10.5px] ${
                      step.state === "idle" ? "text-[#6f767f]" : "text-[#c3c9d0]"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span
                    className={`mono hidden shrink-0 text-[8px] uppercase tracking-[0.06em] sm:block ${
                      step.state === "attention" ? "text-[#ff7d87]" : "text-[#565d66]"
                    }`}
                  >
                    {step.meta}
                  </span>
                  {step.state === "attention" && (
                    <button type="button" className="btn-micro is-allow h-[20px] px-2 text-[8px]" onClick={onApprove}>
                      Authorize
                    </button>
                  )}
                </div>
              ))}
            </div>

            {approved && (
              <div className="line-in mb-3 flex items-center gap-2 border-l border-[#e3202f]/50 bg-[#e3202f]/[0.06] px-2.5 py-1.5">
                <Icon name="shield" size={10} className="text-[#ff7d87]" />
                <span className="mono text-[8.5px] text-[#d6dae0]">
                  browser.read granted · 15 min window · audited
                </span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-2.5">
              <span className="mono flex items-center gap-1.5 text-[8px] uppercase tracking-[0.1em] text-[#5b626b]">
                <span className="dot dot-live" />
                Master Agent · coordinating
              </span>
              <span className="mono text-[8px] uppercase tracking-[0.1em] text-[#5b626b]">
                6 steps · 0 writes
              </span>
            </div>
          </div>
        </div>

        <div className="panel-mini overflow-hidden">
          <div className="panel-head">
            <span className="flex items-center gap-2">
              Agent roster
              <span className="text-[#3f464f]">/</span>
              <span className="text-[#8a919b]">4 active</span>
            </span>
            <span className="mono text-[8px] text-[#5b626b]">SCOPE</span>
          </div>
          <div>
            {roster.map((agent) => (
              <div key={agent.name} className="agent-row">
                <span
                  className={`dot shrink-0 ${
                    agent.state === "idle" ? "bg-[#4d545d]" : agent.state === "done" ? "bg-[#e7eaee]" : "bg-[#e3202f]"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[10px] text-[#dfe3e8]">{agent.name}</span>
                    <span className="mono text-[7.5px] uppercase tracking-[0.1em] text-[#5c636d]">agent</span>
                  </div>
                  <div className="truncate text-[8.5px] text-[#5f666f]">{agent.task}</div>
                </div>
                <span
                  className={`mono shrink-0 text-[8px] uppercase tracking-[0.06em] ${
                    agent.state === "idle" ? "text-[#4d545d]" : "text-[#9aa1ab]"
                  }`}
                >
                  {agent.state === "done" ? "verified" : agent.state}
                </span>
              </div>
            ))}
          </div>
          <button type="button" className="flex w-full items-center justify-between border-t border-white/[0.06] px-3 py-2 text-[8.5px] text-[#7c838d] transition-colors hover:text-white">
            <span>Open agent center</span>
            <Icon name="arrow-right" size={10} />
          </button>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr]">
        <div className="panel-mini overflow-hidden">
          <div className="panel-head">
            <span className="flex items-center gap-2">
              Workflow executions
              <span className="text-[#3f464f]">/</span>
              <span className="text-[#8a919b]">n8n</span>
            </span>
            <span className="mono text-[8px] text-[#5b626b]">24H</span>
          </div>
          {[
            { name: "Lead intake · enrichment · routing", runs: "1,204", time: "1m ago", progress: 100, state: "Success" },
            { name: "Invoice reconciliation", runs: "842", time: "14m ago", progress: 100, state: "Success" },
            { name: "Weekly pipeline digest", runs: "96", time: "2h ago", progress: 74, state: "Review" },
          ].map((run, i) => (
            <div key={run.name} className="run-row">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[2px] border border-white/10 bg-white/[0.03]">
                <Icon name="workflow" size={11} className="text-[#9aa1ab]" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[10px] text-[#d5dae1]">{run.name}</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="bar w-full max-w-[110px]">
                    <span style={{ width: `${run.progress}%` }} className={i === 2 ? "opacity-60" : ""} />
                  </span>
                  <span className="mono text-[7.5px] text-[#565d66]">{run.runs} runs</span>
                </div>
              </div>
              <div className="hidden shrink-0 text-right sm:block">
                <div className={`mono text-[8px] uppercase tracking-[0.08em] ${i === 2 ? "text-[#ff9aa2]" : "text-[#9aa1ab]"}`}>
                  {run.state}
                </div>
                <div className="mono text-[7.5px] text-[#4d545d]">{run.time}</div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-white/[0.06] px-3 py-2">
            <span className="mono text-[8px] text-[#5b626b]">38 runs · 0 failures</span>
            <span className="mono flex items-center gap-1 text-[8px] text-[#7c838d]">
              Workflow control
              <Icon name="arrow-right" size={9} />
            </span>
          </div>
        </div>

        <div className="panel-mini overflow-hidden">
          <div className="panel-head">
            <span>Connected systems</span>
            <span className="mono text-[8px] text-[#5b626b]">06</span>
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/[0.05]">
            {[
              { name: "n8n", state: "Linked" },
              { name: "Webhooks", state: "Linked" },
              { name: "Postgres", state: "Scoped" },
              { name: "Google Drive", state: "Scoped" },
              { name: "Slack", state: "Linked" },
              { name: "Local FS", state: "Local" },
            ].map((system) => (
              <div key={system.name} className="bg-[#0a0b0e] px-3 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="dot bg-[#9aa1ab]" />
                  <span className="truncate text-[9.5px] text-[#cfd4db]">{system.name}</span>
                </div>
                <div className="mono mt-1 text-[7.5px] uppercase tracking-[0.1em] text-[#565d66]">{system.state}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-white/[0.06] px-3 py-2">
            <span className="mono text-[8px] text-[#5b626b]">2 scopes expiring</span>
            <span className="mono flex items-center gap-1 text-[8px] text-[#7c838d]">
              Registry
              <Icon name="arrow-right" size={9} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentsView() {
  const rows = [
    { agent: "Research", mandate: "Reconnaissance & synthesis", scope: "Read-only web", state: "Active", last: "web.search · 2m ago" },
    { agent: "Browser", mandate: "Controlled web operations", scope: "Per-action approval", state: "Active", last: "session.open · 4m ago" },
    { agent: "File", mandate: "Documents & filesystem", scope: "Sandboxed dirs", state: "Active", last: "fs.move · 9m ago" },
    { agent: "Data", mandate: "Analysis & reporting", scope: "Read-only data", state: "Active", last: "sql.query · 22m ago" },
    { agent: "Workflow", mandate: "Business automation", scope: "Approval required", state: "Idle", last: "n8n.trigger · 1h ago" },
    { agent: "Desktop", mandate: "Windows assistance", scope: "Per-action, local", state: "Idle", last: "awaiting grant" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-[13px] font-medium text-[#eef0f3]">Specialist agents</h4>
          <p className="mono mt-1 text-[8px] uppercase tracking-[0.1em] text-[#5b626b]">
            6 configured · 0 inherited permissions
          </p>
        </div>
        <span className="chip h-[20px] px-2 text-[7.5px]">
          <Icon name="plus" size={9} /> New agent
        </span>
      </div>

      <div className="panel-mini overflow-x-auto">
        <table className="scorpion-table">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Mandate</th>
              <th>Tool scope</th>
              <th>State</th>
              <th>Last action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.agent}>
                <td>
                  <span className="flex items-center gap-2">
                    <span className={`dot ${row.state === "Active" ? "bg-[#e3202f]" : "bg-[#4d545d]"}`} />
                    <span className="text-[#eef0f3]">{row.agent}</span>
                  </span>
                </td>
                <td className="text-[#8a919b]">{row.mandate}</td>
                <td>
                  <span className="chip h-[18px] px-1.5 text-[7px]">{row.scope}</span>
                </td>
                <td className={row.state === "Active" ? "text-[#d5dae1]" : "text-[#69707a]"}>{row.state}</td>
                <td className="mono text-[7.5px] text-[#5f666f]">{row.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {[
          { label: "Active mandates", value: "04", meta: "scoped per task" },
          { label: "Blocked calls", value: "01", meta: "out of scope" },
          { label: "Grants expiring", value: "02", meta: "under 15 min" },
        ].map((item) => (
          <div key={item.label} className="metric">
            <div className="mono mb-1.5 text-[8px] uppercase tracking-[0.1em] text-[#69707a]">{item.label}</div>
            <div className="flex items-baseline justify-between">
              <span className="text-[19px] leading-none tracking-[-0.04em] text-[#eef0f3]">{item.value}</span>
              <span className="mono text-[7.5px] uppercase tracking-[0.08em] text-[#565d66]">{item.meta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowsView() {
  return (
    <div className="space-y-3">
      <div className="panel-mini overflow-hidden">
        <div className="panel-head">
          <span className="flex items-center gap-2">
            lead-routing
            <span className="text-[#3f464f]">/</span>
            <span className="text-[#8a919b]">n8n workflow</span>
          </span>
          <span className="flex items-center gap-1.5 text-[#ff7d87]">
            <span className="dot dot-live" />
            <span className="mono text-[8px] uppercase tracking-[0.1em]">Running</span>
          </span>
        </div>
        <div className="overflow-x-auto p-3">
          <div className="flex min-w-[520px] items-center gap-1">
            {flowNodes.map((node, i) => (
              <div key={node.label} className="flex items-center gap-1">
                <div className={`flow-node ${node.state === "active" ? "is-active" : ""}`}>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`dot ${
                        node.state === "done" ? "bg-[#9aa1ab]" : node.state === "active" ? "bg-[#ff3341]" : "bg-[#3f464f]"
                      }`}
                    />
                    <span className="text-[9px] text-[#d5dae1]">{node.label}</span>
                  </div>
                  <div className="mono mt-0.5 text-[7.5px] uppercase tracking-[0.08em] text-[#565d66]">{node.sub}</div>
                </div>
                {i < flowNodes.length - 1 && (
                  <span className="flex items-center">
                    <span className="h-px w-4 bg-white/15" />
                    <Icon name="chevron-down" size={8} className="-rotate-90 text-[#4d545d]" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] px-3 py-2">
          <span className="mono text-[8px] uppercase tracking-[0.1em] text-[#5b626b]">
            execution 1042 · 6.2s · 0 errors
          </span>
          <span className="mono flex items-center gap-1.5 text-[8px] text-[#7c838d]">
            <Icon name="play" size={9} /> Re-run with scope
          </span>
        </div>
      </div>

      <div className="panel-mini overflow-x-auto">
        <div className="panel-head">
          <span>Recent executions</span>
          <span className="mono text-[8px] text-[#5b626b]">24H</span>
        </div>
        <table className="scorpion-table">
          <thead>
            <tr>
              <th>Execution</th>
              <th>Workflow</th>
              <th>Started</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["#1042", "lead-routing", "20:36:04", "6.2s", "Success"],
              ["#1041", "invoice-reconciliation", "20:22:41", "18.4s", "Success"],
              ["#1040", "pipeline-digest", "18:00:12", "41.8s", "Review"],
              ["#1039", "lead-routing", "17:58:33", "5.9s", "Success"],
            ].map(([id, wf, started, duration, status]) => (
              <tr key={id}>
                <td className="mono text-[#d5dae1]">{id}</td>
                <td className="text-[#9aa1ab]">{wf}</td>
                <td className="mono text-[8px] text-[#5f666f]">{started}</td>
                <td className="mono text-[8px] text-[#5f666f]">{duration}</td>
                <td>
                  <span className={`mono text-[8px] uppercase tracking-[0.08em] ${status === "Success" ? "text-[#b9bfc7]" : "text-[#ff9aa2]"}`}>
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AuditView({ approved }: { approved: boolean }) {
  const [filter, setFilter] = useState("All");
  const base = [
    {
      time: approved ? "20:42:31" : "20:41:19",
      actor: "Security",
      event: approved ? "permission.approved" : "permission.requested",
      detail: "browser.read · supplier-a.portal",
      result: approved ? "allowed" : "awaiting",
    },
    { time: "20:41:12", actor: "Master Agent", event: "plan.created", detail: "OBJ-2418 · 6 steps · 4 agents", result: "recorded" },
    { time: "20:40:02", actor: "Data Agent", event: "task.verified", detail: "forecast.q4 · 3 checks passed", result: "passed" },
    { time: "20:38:47", actor: "File Agent", event: "fs.move", detail: "218 files → /clients · sandbox", result: "allowed" },
    { time: "20:36:10", actor: "Workflow Agent", event: "n8n.run", detail: "lead-routing · execution 1042", result: "completed" },
    { time: "20:33:58", actor: "Desktop Agent", event: "input.send", detail: "accounting.exe · no grant", result: "denied" },
    { time: "20:31:02", actor: "Research Agent", event: "web.search", detail: "12 sources · citations attached", result: "allowed" },
  ];
  const filters = ["All", "Permissions", "Executions", "Denials"];
  const rows = base.filter((row) => {
    if (filter === "Permissions") return row.event.startsWith("permission");
    if (filter === "Executions") return ["n8n.run", "fs.move", "web.search"].includes(row.event);
    if (filter === "Denials") return row.result === "denied";
    return true;
  });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-[13px] font-medium text-[#eef0f3]">Audit trail</h4>
          <p className="mono mt-1 text-[8px] uppercase tracking-[0.1em] text-[#5b626b]">
            Immutable · signed · exportable
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`mono h-[22px] rounded-[2px] border px-2 text-[7.5px] uppercase tracking-[0.08em] transition-colors ${
                filter === item
                  ? "border-white/25 bg-white/[0.08] text-[#f0f2f5]"
                  : "border-white/10 text-[#69707a] hover:text-[#b9bfc7]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="panel-mini overflow-x-auto">
        <table className="scorpion-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Actor</th>
              <th>Event</th>
              <th>Detail</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.time}-${row.event}`}>
                <td className="mono text-[8px] text-[#5f666f]">{row.time}</td>
                <td className="text-[#cfd4db]">{row.actor}</td>
                <td className="mono text-[8px] text-[#9aa1ab]">{row.event}</td>
                <td className="text-[#7c838d]">{row.detail}</td>
                <td>
                  <span
                    className={`mono text-[8px] uppercase tracking-[0.08em] ${
                      row.result === "denied" ? "text-[#ff7d87]" : row.result === "awaiting" ? "text-[#ff9aa2]" : "text-[#b9bfc7]"
                    }`}
                  >
                    {row.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="mono text-[8px] uppercase tracking-[0.1em] text-[#5b626b]">
          Showing {rows.length} of {base.length} entries
        </span>
        <span className="mono flex items-center gap-1.5 text-[8px] uppercase tracking-[0.1em] text-[#7c838d]">
          <Icon name="file" size={9} /> Export signed record
        </span>
      </div>
    </div>
  );
}
