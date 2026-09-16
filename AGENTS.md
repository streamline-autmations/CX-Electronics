# AGENTS.md

Working instructions for AI coding agents (and new contributors) in this repository.
Read this alongside [CLAUDE.md](./CLAUDE.md), which is the canonical project context.

## Source of truth

Read these before making changes. Do not invent facts they already document.

- [CLAUDE.md](./CLAUDE.md) — architecture, business rules, integrations, data model
- [README.md](./README.md) — project overview and local setup
- [src/lib/siteConfig.ts](./src/lib/siteConfig.ts) — business identity and SEO constants
- [GROWTH-SPRINT-NOTES.md](./GROWTH-SPRINT-NOTES.md) — recent SEO/build decisions
- [n8n-workflows/README.md](./n8n-workflows/README.md) — workflow import/setup notes

If a rule is unclear, inspect the current implementation before deciding. Where docs
and code disagree, the code wins — then fix the doc in the same change.

## Tech stack

- Frontend: React 18, TypeScript, Vite 5, Tailwind CSS 3
- Routing: `react-router-dom` v7
- UI/state: React context, Framer Motion, Lucide React, Recharts
- Backend/data: Supabase (Postgres, Auth, Storage) with row-level security
- Output: static SPA deployed to Netlify; PWA via `vite-plugin-pwa`
- Automation: n8n webhooks (fire-and-forget)
- Integrations: Cloudinary, PayFast, Google Analytics
- Package manager: npm (`package-lock.json` is committed). Node 22+ (`.nvmrc`)

## Repository map

- `src/pages/store/` — public storefront routes
- `src/pages/account/` — customer auth and account routes
- `src/pages/admin/` — admin panel routes
- `src/pages/invoices/` — print-only invoice templates
- `src/components/` — reusable UI (`store/` and `admin/` variants)
- `src/lib/` — business logic, Supabase clients, pricing, payments, webhooks
- `src/context/`, `src/hooks/` — app state and data access
- `src/emails/` — email HTML generation used by the webhook flows
- `supabase/functions/payfast-itn/` — PayFast ITN edge function (currently dormant)
- `scripts/` — `generate-seo.mjs` (build step) and `seed-orders.ts` (dev seed)
- `n8n-workflows/` — exported n8n workflow JSON, for reference and re-import
- `public/` — static assets plus `_redirects`, `robots.txt`, `sitemap.xml`
- `dist/` — generated build output; never hand-edit

## Working rules

- Inspect existing code paths before editing; extend current patterns rather than
  inventing parallel systems.
- Preserve the split between storefront, customer account, admin, Supabase and n8n.
- Keep changes focused. Avoid unrelated refactors or broad renames.
- Never weaken auth, RLS assumptions, payment handling, or webhook safety.
- **Never hard-code secrets, API keys, webhook URLs, or private project IDs into
  tracked files.** `.env.local` is local-only; document variables by name in
  `.env.example` with placeholder values only.
- Remember that every `VITE_`-prefixed variable is inlined into the public browser
  bundle. Server-only secrets must never use that prefix.
- Business rules in `CLAUDE.md` section 8 (no VAT, no free shipping, wholesale
  minimum 6 units, trading hours, address) are load-bearing — confirm before changing.
- Keep comments sparse; explain non-obvious intent, not mechanics.

## Commands

```bash
npm install          # install dependencies
npm run dev          # Vite dev server (default port 5173)
npm run typecheck    # tsc -b across both project references
npm run lint         # ESLint (flat config)
npm run build        # typecheck + production build + SEO asset generation
npm run generate-seo # regenerate dist/sitemap.xml and dist/feed.xml only
npm run preview      # serve the production build locally
npm run seed         # seed sample orders into Supabase (development only)
```
