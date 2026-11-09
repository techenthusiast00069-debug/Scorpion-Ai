const MAX_EMAIL = 254;
const MAX_COMPANY = 120;
const MAX_INTENT = 500;

let schemaPromise;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function isValidEmail(value) {
  return typeof value === "string" && value.length <= MAX_EMAIL && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

async function ensureSchema(db) {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await db
        .prepare(
          `CREATE TABLE IF NOT EXISTS access_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
            email TEXT NOT NULL UNIQUE,
            company TEXT DEFAULT '',
            intent TEXT DEFAULT '',
            reference TEXT NOT NULL,
            created_at TEXT NOT NULL
          )`,
        )
        .run();
      await db
        .prepare("CREATE INDEX IF NOT EXISTS idx_access_requests_created ON access_requests(created_at)")
        .run();
    })().catch((error) => {
      schemaPromise = undefined;
      throw error;
    });
  }
  return schemaPromise;
}

function makeReference() {
  const bytes = crypto.getRandomValues(new Uint8Array(3));
  return "SC-" + Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function withOperatorAuth(request, operatorToken) {
  if (!operatorToken) return true; // open when no token is configured
  const header = request.headers.get("X-Operator-Token");
  if (!header) return json({ ok: false, error: "missing_token" }, 401);
  if (header !== operatorToken) return json({ ok: false, error: "invalid_token" }, 401);
  return true;
}

async function handleAccess(request, env) {
  if (!sameOrigin(request)) {
    return json({ ok: false, error: "cross_origin_rejected" }, 403);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
  const company = typeof payload?.company === "string" ? payload.company.trim().slice(0, MAX_COMPANY) : "";
  const intent = typeof payload?.intent === "string" ? payload.intent.trim().slice(0, MAX_INTENT) : "";

  if (!isValidEmail(email)) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  try {
    await ensureSchema(env.DB);
    const reference = makeReference();
    const createdAt = new Date().toISOString();

    const result = await env.DB.prepare(
      `INSERT OR IGNORE INTO access_requests (email, company, intent, reference, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
      .bind(email, company, intent, reference, createdAt)
      .run();

    const duplicate = (result?.meta?.changes ?? 0) === 0;

    if (duplicate) {
      const existing = await env.DB.prepare("SELECT reference FROM access_requests WHERE email = ?")
        .bind(email)
        .first();
      return json({ ok: true, duplicate: true, reference: existing?.reference ?? reference });
    }

    return json({ ok: true, duplicate: false, reference }, 201);
  } catch (error) {
    console.error("access_request_failed", error instanceof Error ? error.message : "unknown");
    return json({ ok: false, error: "storage_unavailable" }, 500);
  }
}

async function listAccessRequests(db) {
  try {
    await ensureSchema(db);
    const results = await db
      .prepare("SELECT id, email, company, intent, reference, created_at FROM access_requests ORDER BY created_at DESC")
      .all();
    return json({ ok: true, requests: results.results ?? [] });
  } catch (error) {
    console.error("list_access_requests_failed", error instanceof Error ? error.message : "unknown");
    return json({ ok: false, error: "storage_unavailable" }, 500);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/access") {
      if (request.method === "GET") {
        const auth = withOperatorAuth(request, env.OPERATOR_TOKEN);
        if (auth !== true) return auth;
        return listAccessRequests(env.DB);
      }
      if (request.method !== "POST") {
        return json({ ok: false, error: "method_not_allowed" }, 405);
      }
      return handleAccess(request, env);
    }

    if (url.pathname === "/api/health") {
      return json({ ok: true, service: "scorpion-access" });
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ ok: false, error: "not_found" }, 404);
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    return new Response(response.body, { status: response.status, headers });
  },
};
