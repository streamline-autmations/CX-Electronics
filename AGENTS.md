# Project Overview

CW Electronics is a South African electronics retailer and wholesaler with a React storefront, customer account area, admin panel, Supabase backend, and n8n-backed email/webhook automations.

- Primary audience: retail customers, wholesale buyers, and one small admin team.
- Current status: active Vite/React app with recent SEO work, customer reviews, feed generation, and existing n8n workflow JSONs for email/webhook flows.
- Business-critical rules: no VAT, no free shipping, wholesale minimum is 6 units, storefront address/hours/contact details must stay aligned with the current project docs.
- Main goal for agent work: extend the existing implementation safely, preserve current business rules, and avoid reintroducing older CXX-era assumptions.

# Source Of Truth

- Primary project context: [CLAUDE.md](/C:/Users/User/Desktop/CX%20Electronics/CX-Website/CLAUDE.md)
- Business identity and SEO-facing constants: [src/lib/siteConfig.ts](/C:/Users/User/Desktop/CX%20Electronics/CX-Website/src/lib/siteConfig.ts)
- Recent SEO/build decisions: [GROWTH-SPRINT-NOTES.md](/C:/Users/User/Desktop/CX%20Electronics/CX-Website/GROWTH-SPRINT-NOTES.md)
- n8n workflow import/setup notes: [n8n-workflows/README.md](/C:/Users/User/Desktop/CX%20Electronics/CX-Website/n8n-workflows/README.md)
- Existing n8n workflow JSONs: `n8n-workflows/new-order.json`, `n8n-workflows/status-change.json`, `workflows/cxx-signup.json`, `scripts/cxx_contact_workflow.json`

Use current code and config ahead of older notes when they disagree. Treat these files as historical or partially stale unless a task explicitly needs them:

- [STATUS.md](/C:/Users/User/Desktop/CX%20Electronics/CX-Website/STATUS.md)
- [CLAUDE (3).md](/C:/Users/User/Desktop/CX%20Electronics/CX-Website/CLAUDE%20%283%29.md)
- [BLOM_SYSTEM_CONTEXT.md](/C:/Users/User/Desktop/CX%20Electronics/CX-Website/BLOM_SYSTEM_CONTEXT.md)

Do not invent facts already documented in the files above. If a rule is unclear, inspect the current implementation before deciding.

# Tech Stack

- Frontend: React 18, TypeScript, Vite, Tailwind CSS 3
- Routing: `react-router-dom`
- State/UI: React context, Framer Motion, Lucide React, Recharts
- Backend/data: Supabase Postgres, Auth, Storage
- Hosting/build output: static SPA, Netlify-style redirects, PWA via `vite-plugin-pwa`
- Automation: n8n webhooks and local `n8nac` workspace tooling
- Assets/integrations: Cloudinary, PayFast, Google Analytics
- Package manager: npm (`package-lock.json` is present)
- Extra local tooling: Node scripts in `scripts/`, a few Python one-offs, n8n JSON workflow files

# Repository Map

- `src/`: application code
- `src/pages/store/`: storefront routes
- `src/pages/account/`: customer auth/account routes
- `src/pages/admin/`: admin routes
- `src/components/`: reusable UI
- `src/lib/`: business logic, Supabase clients, site config, payments, webhooks
- `src/context/`, `src/hooks/`: app state and data access
- `src/emails/`: email HTML generation used by webhook flows
- `supabase/functions/payfast-itn/`: edge function code
- `scripts/`: build helpers and many one-off data-maintenance scripts
- `n8n-workflows/`, `workflows/`, and `scripts/cxx_contact_workflow.json`: existing n8n workflow assets
- `public/`: static assets and redirect/sitemap/robots files
- `dist/`: generated build output; do not hand-edit
- `.agents/skills/`: project skills
- `.github/agents/`: generated workspace agent docs
- `docs/ai/`: Codex migration and AI-operational docs

# Working Rules

- Inspect existing code paths before editing; extend current patterns instead of inventing parallel systems.
- Preserve the current split between storefront, customer account, admin, Supabase, and n8n responsibilities.
- Keep changes focused. Avoid unrelated refactors or broad renames.
- Follow the existing TypeScript/Vite/Tailwind patterns already in the repo.
- Respect current business rules from `CLAUDE.md` and `src/lib/siteConfig.ts`.
- Do not weaken auth, RLS assumptions, payment handling, or webhook safety.
- Do not hard-code secrets, webhook URLs, API keys, or private IDs into tracked files.
- Treat `.env.local` as local-only secret storage. Document required variables by name only.
- Most files in `scripts/` are one-off maintenance tools and are gitignored by pattern. Do not casually revive or clean them up unless the task is explicitly about those flows.
- Do not hand-edit generated build output in `dist/`.
- Keep comments sparse and explain only non-obvious intent.
- For multi-step work, keep and update a task plan.

# How To Work

- Read the relevant source-of-truth files first.
- Inspect the current implementation before applying changes.
- Prefer small, auditable diffs.
- Preserve user changes and unrelated local work.
- Explain assumptions and note contradictions when docs and code disagree.
- Treat older docs as historical context unless current code or newer docs confirm them.

# Commands

Use only commands that are already present in the repo or generated n8n tooling.

- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- SEO generator only: `npm run generate-seo`
- Preview build: `npm run preview`
- Type-check: `npm run typecheck`
- Lint: `npm run lint`
- Seed local sample orders: `npm run seed`

n8n workspace commands from the repo root:

- Refresh generated n8n AI bootstrap: `npx --yes n8nac update-ai`
- Migration dry-run: `npx --yes n8nac workspace migrate --json`
- Workspace status: `npx --yes n8nac workspace status --json`
- Environment status: `npx --yes n8nac env status --json`
- Workflow inventory: `npx --yes n8nac list`
- Managed local runtime only: `npx --yes @n8n-as-code/n8n-manager ...`

Do not guess additional scripts or workflow commands. Read `package.json`, `n8n-workflows/README.md`, and the project skills first.

# Verification

After non-trivial changes, run the smallest relevant checks from this list:

- `npm run typecheck`
- `npm run build`
- `npm run lint` if ESLint is actually configured in the environment

When touching SEO/feed/output behavior:

- Confirm `dist/feed.xml` and `dist/sitemap.xml` are produced by the build
- Review `scripts/generate-seo.mjs` side effects rather than editing `dist/` directly

When touching n8n workflow assets or setup docs:

- Confirm every referenced workflow JSON file exists
- Keep credential names and secrets out of committed files
- Validate workflow/setup instructions against the current files before claiming they work

Always review the diff and confirm application source was not changed unintentionally.

# Forbidden Or High-Risk Actions

- Do not delete, rename, or weaken existing Claude files or generated n8n bootstrap files.
- Do not reset, force-push, or overwrite user work.
- Do not edit `dist/` by hand.
- Do not hand-edit `n8nac-config.json`, n8n-manager storage, or secret files.
- Do not run destructive database changes or production mutations without explicit user approval.
- Do not expose `.env.local` contents, SMTP credentials, Supabase keys, webhook URLs, or other secrets in tracked docs.
- Do not assume old docs are still correct when current code says otherwise.

# Skills

- `n8n-architect`: use for any `n8nac` workspace, workflow sync, validation, environment, or n8n troubleshooting task in this repo.
- `cw-n8n-webhook-workflows`: use when importing, documenting, validating, or updating the project’s email/webhook workflow JSON files and their required env vars/credentials.

# Additional Context

- Codex migration notes live in [docs/ai/CODEX_MIGRATION.md](/C:/Users/User/Desktop/CX%20Electronics/CX-Website/docs/ai/CODEX_MIGRATION.md).
- Detailed repository context remains in `CLAUDE.md`; this file is the concise operational guide Codex should load first.

<!-- n8n-as-code-start -->
<!-- n8nac-version: 2.2.0 -->

## n8n-as-code Context Root

This file is generated by `npx --yes n8nac update-ai`. It is bootstrap context only, not a configuration source of truth.

- Context root: `c:\Users\User\Desktop\CX Electronics\CX-Website`
- n8n version at generation time: Unknown
- n8nac command: `npx --yes n8nac`
- n8n-manager command: `npx --yes @n8n-as-code/n8n-manager`
- n8n knowledge command: `npx --yes n8nac skills`

Run workspace commands from this context root. Do not `cd` into the n8n-as-code source repository, n8n-manager source repository, plugin directory, or package directory to run `npx --yes n8nac workspace ...`, `npx --yes n8nac list`, `npx --yes n8nac pull`, `npx --yes n8nac push`, or `npx --yes n8nac update-ai`.

---

## Required Local Agent

A VS Code and GitHub Copilot-compatible agent is generated here:

- `.github/agents/n8n-architect.agent.md`

A portable skill fallback is also generated for runtimes that do not read `.github/agents`:

- `.agents/skills/n8n-architect/SKILL.md`

If your agent runtime supports workspace agents, use the `.github/agents/*.agent.md` file. If it supports skills instead, load the skill file. Otherwise, treat these files as mandatory instructions.

---

## Source Of Truth

Do not infer configuration from this file. It intentionally avoids storing the effective instance, project, sync folder, or workflow directory.

n8nac backend resolution remains the only source of effective workspace state.
- Workspace environments live in `n8nac-config.json` and are managed by `npx --yes n8nac env ...`.
- Managed local runtime state and secrets live in n8n-manager storage and are managed by `npx --yes @n8n-as-code/n8n-manager ...`.
- The effective context is resolved by the backend.

Before any n8n workflow command, run migration dry-run first, then workspace status only after migration is not required or has been applied:

```bash
cd c:\Users\User\Desktop\CX Electronics\CX-Website
npx --yes n8nac workspace migrate --json
npx --yes n8nac workspace status --json
```

Use the returned `workflowDir` exactly as provided. Treat it as an opaque backend-derived path that may contain generated or hashed segments.
`syncFolder` is only the user-configured sync root, not the workflow directory. Do not reconstruct `workflowDir` from `syncFolder`, environment name/id, instance identifier, instance user identifier, project id, or project name.

---

## Safe Commands

- Primary workspace, environment, sync, validation, push, and pull work: `npx --yes n8nac ...`
- Local managed runtime lifecycle and tunnels only: `npx --yes @n8n-as-code/n8n-manager ...`
- Workspace status and migration: `npx --yes n8nac workspace ...`
- Workflow sync and validation: `npx --yes n8nac ...`
- Node knowledge and schema lookup: `npx --yes n8nac skills ...`

Never write `n8nac-config.json`, `~/.n8n-manager`, or n8n-manager secret files by hand.
<!-- n8n-as-code-end -->
