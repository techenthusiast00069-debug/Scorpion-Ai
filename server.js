const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8787;

// --- In-memory "database" (replace with your own DB later) ---
// This replicates the D1 schema: access_requests table
// Fields: id, email, company, intent, reference, created_at
let requests = [];
let idCounter = 1;

// simulate duplicate reference check (same logic as original)
function referenceExists(ref) {
  return requests.some(r => r.reference === ref);
}

function generateReference() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const parts = [];
  for (let i = 0; i < 3; i++) {
    let part = "";
    for (let j = 0; j < 4; j++) part += chars[Math.floor(Math.random() * chars.length)];
    parts.push(part);
  }
  return "SC-" + parts.join("-");
}

// --- API Endpoints (exact shapes from original api/worker.js) ---

app.use(express.json({ limit: "1mb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "scorpion-access" });
});

// POST /api/access — signup form (exact same validation/logic as original)
app.post("/api/access", (req, res) => {
  const { email, company, intent } = req.body;

  // Validation (from original worker.js)
  const MAX_EMAIL = 254;
  const MAX_COMPANY = 120;
  const MAX_INTENT = 500;

  function isValidEmail(value) {
    return typeof value === "string" && value.length <= MAX_EMAIL && /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(value);
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: "invalid_email" });
  }
  if (company && company.length > MAX_COMPANY) {
    return res.status(400).json({ ok: false, error: "company_too_long" });
  }
  if (intent && intent.length > MAX_INTENT) {
    return res.status(400).json({ ok: false, error: "intent_too_long" });
  }

  // Generate reference (like original: INSERT OR IGNORE with duplicate check)
  let reference;
  let duplicate = false;
  do {
    reference = generateReference();
    duplicate = referenceExists(reference);
    if (duplicate) continue; // generate new
    break;
  } while (true);

  const created_at = new Date().toISOString();
  const requestEntry = {
    id: idCounter++,
    email,
    company: company || "",
    intent: intent || "",
    reference,
    created_at
  };
  requests.push(requestEntry);

  // Persist to disk so it survives server restarts (optional simple JSON persistence)
  try {
    const dataPath = path.resolve(process.cwd(), "access_data.json");
    const existing = fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath, "utf8")) : [];
    existing.push(requestEntry);
    fs.writeFileSync(dataPath, JSON.stringify(existing));
  } catch (e) {
    // persist failure is non-critical
  }

  res.json({ ok: true, duplicate: false, reference });
});

// GET /api/access — operator list (with X-Operator-Token auth, same as original)
app.get("/api/access", (req, res) => {
  const authHeader = req.headers["x-operator-token"] || req.headers["X-Operator-Token"];
  // Operator token from env, defaulting to the original value
  const expectedToken = process.env.OPERATOR_TOKEN || "operator-secret-2026";

  if (!authHeader || authHeader !== expectedToken) {
    return res.status(401).json({ ok: false, error: "missing_or_invalid_token" });
  }

  // Sort by created_at DESC (same as original D1 ORDER BY created_at DESC)
  const sorted = [...requests].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json({ ok: true, requests: sorted });
});

// --- Serve static files from Vite dist (production) ---
const distPath = path.resolve("./dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // SPA fallback: redirect any non-API route to index.html
  app.use((req, res) => {
    if (req.path.startsWith("/api/")) return;
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  // If dist doesn't exist yet, just run the API routes
  app.get("/", (req, res) => res.send("Scorpion AI API running. Build the Vite dist first."));
}

// --- Start server ---

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Scorpion AI self-hosted server running at http://0.0.0.0:${PORT}`);
  console.log(`   API:    http://0.0.0.0:${PORT}/api/health`);
  console.log(`   API:    http://0.0.0.0:${PORT}/api/access (POST signup, GET operator list)`);
  console.log(`   Mode:   In-memory store (set OPERATOR_TOKEN env var or it defaults to operator-secret-2026)`);
  console.log(`   To persist data: write access_data.json in the project root`);
  console.log(`   Press Ctrl+C to stop`);
});