export type Agent = {
  id: string;
  name: string;
  role: string;
  description: string;
  tools: string[];
  scope: string;
  scopeTone: "read" | "approval" | "sandbox" | "local";
  state: "active" | "idle";
  task: string;
  progress: number;
};

export const agents: Agent[] = [
  {
    id: "01",
    name: "Research Agent",
    role: "Reconnaissance & synthesis",
    description:
      "Searches permitted sources, extracts evidence and returns a cited brief. Distinguishes verified fact from inference before anything reaches the plan.",
    tools: ["web.search", "page.fetch", "memory.write"],
    scope: "Read-only web",
    scopeTone: "read",
    state: "active",
    task: "Compiling competitive landscape — EU energy brokers",
    progress: 62,
  },
  {
    id: "02",
    name: "Browser Agent",
    role: "Controlled web operations",
    description:
      "Operates authenticated sessions through isolated browser profiles. Fills, exports and navigates without ever exposing raw credentials to the model.",
    tools: ["session.open", "form.fill", "file.export"],
    scope: "Per-action approval",
    scopeTone: "approval",
    state: "active",
    task: "Export supplier invoices from portal",
    progress: 41,
  },
  {
    id: "03",
    name: "File Agent",
    role: "Documents & filesystem",
    description:
      "Organizes, renames, converts and indexes files strictly inside directories you grant. Destructive operations are staged and reversible.",
    tools: ["fs.read", "fs.move", "pdf.extract"],
    scope: "Sandboxed directories",
    scopeTone: "sandbox",
    state: "active",
    task: "Filing 218 contracts into client folders",
    progress: 78,
  },
  {
    id: "04",
    name: "Data Agent",
    role: "Analysis & reporting",
    description:
      "Queries approved datasets, reconciles inputs and produces reports with a reproducible method attached to every figure.",
    tools: ["sql.query", "sheet.read", "chart.render"],
    scope: "Read-only datasets",
    scopeTone: "read",
    state: "active",
    task: "Modelling Q4 pipeline forecast",
    progress: 88,
  },
  {
    id: "05",
    name: "Workflow Agent",
    role: "Business automation",
    description:
      "Designs, triggers and monitors n8n workflows. Reads node graphs, repairs failed executions and attaches audit context to every run.",
    tools: ["n8n.trigger", "webhook.send", "run.inspect"],
    scope: "Approval required",
    scopeTone: "approval",
    state: "idle",
    task: "Lead intake → enrichment → routing",
    progress: 100,
  },
  {
    id: "06",
    name: "Desktop Agent",
    role: "Windows assistance",
    description:
      "Assists inside permitted desktop applications with per-action confirmation. Opt-in per machine, never unattended, always recorded.",
    tools: ["window.focus", "input.send", "clipboard.read"],
    scope: "Per-action, local",
    scopeTone: "local",
    state: "idle",
    task: "Reconcile invoice PDFs in accounting app",
    progress: 0,
  },
];

export type LifecycleStep = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  artifact: string[];
};

export const lifecycle: LifecycleStep[] = [
  {
    id: "01",
    title: "Understand",
    summary: "Objective, constraints, success criteria.",
    detail:
      "The Master Agent parses the request into an explicit objective, the boundaries it must respect and the evidence that would count as done. Ambiguity becomes a question, not a guess.",
    artifact: [
      "objective   audit Q4 supplier invoices",
      "boundary    read-only · 2 domains · 15 min",
      "success     42 invoices reconciled, drift flagged",
    ],
  },
  {
    id: "02",
    title: "Plan",
    summary: "Ordered steps, agents, blast radius.",
    detail:
      "Work is decomposed into ordered steps with an assigned specialist for each. The plan states what will be touched, what could go wrong and how it will be undone.",
    artifact: [
      "steps       6 · research, browser, data",
      "writes      none",
      "rollback    not required (read path)",
    ],
  },
  {
    id: "03",
    title: "Authorize",
    summary: "Narrowest permission, explicit approval.",
    detail:
      "The agent requests the minimum scope it needs — specific tools, specific domains, a fixed time window. You approve or deny by name, and the grant never widens on its own.",
    artifact: [
      "request     browser.read · supplier-a.portal",
      "window      15 minutes",
      "approved    operator · A. VOSS · explicit",
    ],
  },
  {
    id: "04",
    title: "Execute",
    summary: "Tool gateway, enforced scope.",
    detail:
      "Every tool call passes the permission gateway, which checks the grant before the call reaches a real system. Out-of-scope attempts are blocked and surfaced.",
    artifact: [
      "gateway     allow · scope matched",
      "calls       12 reads · 0 writes",
      "blocked     1 out-of-scope navigation",
    ],
  },
  {
    id: "05",
    title: "Verify",
    summary: "Evidence against the criteria.",
    detail:
      "Outputs are checked against the stated success criteria before delivery. Failed checks stop the task and escalate with the exact evidence that did not reconcile.",
    artifact: [
      "checks      3 passed",
      "totals      reconciled to source",
      "anomalies   4 pricing drifts flagged",
    ],
  },
  {
    id: "06",
    title: "Report",
    summary: "Result plus a complete audit record.",
    detail:
      "The operator receives the result and the record behind it: every actor, scope, tool call, approval and verification, exportable and immutable.",
    artifact: [
      "report      delivered · 4 anomalies",
      "audit       27 entries · immutable",
      "export      JSON · CSV · signed",
    ],
  },
];

export const modules = [
  {
    icon: "terminal" as const,
    name: "Conversational workspace",
    description: "Text and voice objectives, plans and approvals in one thread.",
  },
  {
    icon: "users" as const,
    name: "Agent management",
    description: "Compose specialists, set mandates and narrow their tool scopes.",
  },
  {
    icon: "workflow" as const,
    name: "Workflow control",
    description: "Inspect, trigger and repair n8n automations from the command layer.",
  },
  {
    icon: "eye" as const,
    name: "Task monitor",
    description: "Live execution state, verification checks and escalation paths.",
  },
  {
    icon: "layers" as const,
    name: "Integration registry",
    description: "Connect, scope and revoke external systems per agent.",
  },
  {
    icon: "memory" as const,
    name: "Memory",
    description: "Operator-owned context with retention rules and clear provenance.",
  },
  {
    icon: "sliders" as const,
    name: "Policy & settings",
    description: "Approval thresholds, model routing and execution limits.",
  },
  {
    icon: "grid" as const,
    name: "Administration",
    description: "Roles, workspace boundaries and immutable audit export.",
  },
];

export const integrations = [
  { name: "n8n", note: "Workflow control", state: "Native" },
  { name: "Webhooks", note: "Inbound & outbound", state: "Native" },
  { name: "REST / GraphQL", note: "Any scoped API", state: "Supported" },
  { name: "S3-compatible", note: "Document stores", state: "Supported" },
  { name: "SMTP / IMAP", note: "Mail operations", state: "Supported" },
  { name: "Local filesystem", note: "Sandboxed paths", state: "Local agent" },
];

export const auditLog = [
  {
    time: "20:41:12",
    actor: "Master Agent",
    event: "plan.created",
    detail: "OBJ-2418 · 6 steps · 1 write path",
    result: "recorded",
  },
  {
    time: "20:41:19",
    actor: "Security",
    event: "permission.requested",
    detail: "browser.read · supplier-a.portal",
    result: "awaiting",
  },
  {
    time: "20:40:02",
    actor: "Data Agent",
    event: "task.verified",
    detail: "forecast.q4 · 3 checks passed",
    result: "passed",
  },
  {
    time: "20:38:47",
    actor: "File Agent",
    event: "fs.move",
    detail: "218 files → /clients · sandbox",
    result: "allowed",
  },
  {
    time: "20:36:10",
    actor: "Workflow Agent",
    event: "n8n.run",
    detail: "lead-routing · execution 1042",
    result: "completed",
  },
  {
    time: "20:33:58",
    actor: "Desktop Agent",
    event: "input.send",
    detail: "accounting.exe · no grant",
    result: "denied",
  },
];

export const objectiveSteps = [
  { label: "Interpret objective", meta: "constraints parsed", done: true },
  { label: "Compose execution plan", meta: "6 steps · 4 agents", done: true },
  { label: "Request permissions", meta: "1 scope awaiting operator", done: false, attention: true },
  { label: "Execute via gateway", meta: "read-only · 0 writes", done: false },
  { label: "Verify results", meta: "3 success criteria", done: false },
  { label: "Record & report", meta: "audit trail", done: false },
];

export const workflowRuns = [
  { name: "Lead intake · enrichment · routing", runs: "1,204", last: "1m ago", state: "success", progress: 100 },
  { name: "Invoice reconciliation", runs: "842", last: "14m ago", state: "success", progress: 100 },
  { name: "Weekly pipeline digest", runs: "96", last: "2h ago", state: "review", progress: 74 },
];

export const agentRoster = agents.map((a) => ({
  name: a.name,
  state: a.state,
  task: a.task,
  scope: a.scope,
}));
