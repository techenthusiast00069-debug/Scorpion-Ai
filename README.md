# SCORPION AI

Premium marketing site for an autonomous AI agent platform. Built with Vite 7 + React 19 + TypeScript + Tailwind CSS v4.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build -> dist/
```

## Project layout

```
index.html              HTML shell (fonts, meta, favicon)
src/
  App.tsx               Page composition
  main.tsx              React entry
  components/           Nav, Hero, MasterConsole, Platform, Dashboard, Agents,
                        Lifecycle, BrandBand, Security, Workspaces, Integrations,
                        Access, Footer, OperatorDashboard, Logo, Icon, Reveal
  lib/content.ts        All copy and data (agents, lifecycle, modules, audit log)
  styles/global.css     Design system: tokens, sections, console, motion
public/
  brand/scorpion-mark.svg   Brand mark (silver metallic + crimson barb)
  brand/favicon.svg
api/worker.js           Cloudflare Worker API (Freebuff Sites deployment)
server.js               Self-hosted Node/Express server (same API shapes)
wrangler.jsonc          Wrangler config (local dev of the Worker)
sites.deploy.json       Freebuff Sites deploy manifest
```

## Two ways to run

### 1. Self-hosted (Node + Express)

```bash
npm run build
npm run server          # http://0.0.0.0:8787  (serves dist/ + API)
```

Environment:

| Variable         | Default                | Purpose                      |
| ---------------- | ---------------------- | ---------------------------- |
| `PORT`           | `8787`                 | HTTP port                    |
| `OPERATOR_TOKEN` | `operator-secret-2026` | Auth for `GET /api/access`   |

Data is stored in memory and mirrored to `access_data.json`. To use a real
database, replace the `requests` array in `server.js`; API shapes stay the same.

### 2. Freebuff Sites / Cloudflare Workers

The Worker (`api/worker.js`) stores signups in D1 (binding `DB`) with a
self-initializing schema. Deploy with the `sites.deploy.json` manifest.

`OPERATOR_TOKEN` must be set as a Sites **variable/secret**, not as a Wrangler
`vars` entry — Freebuff Sites does not deploy Wrangler vars.

## API

| Method | Path         | Notes                                                     |
| ------ | ------------ | --------------------------------------------------------- |
| GET    | `/api/health`| `{"ok":true,"service":"scorpion-access"}`                  |
| POST   | `/api/access`| Body `{email, company?, intent?}` → `{ok, reference}`      |
| GET    | `/api/access`| Requires `X-Operator-Token` → list of signups              |

## Deploy targets

- Production: `https://site-13fb7786215e41fbb22fbfd0238b13a0.freebuff.page`
- Preview: `https://site-3dc679e19f6041eb82ea9bad72df33a5.freebuff.page`
