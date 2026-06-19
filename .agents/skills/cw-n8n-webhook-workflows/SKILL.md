---
name: cw-n8n-webhook-workflows
description: Use when working with this repository's packaged n8n email and webhook workflows, including import/setup instructions, credential/env-var mapping, and safe validation. Do not use for general app coding or for arbitrary n8n authoring outside these existing workflow assets.
---

# CW n8n Webhook Workflows

This skill covers the repo's existing n8n workflow JSON assets and their documented setup.

## Use This Skill When

- The task is about the packaged CW Electronics workflows under `n8n-workflows/`, `workflows/`, or `scripts/cxx_contact_workflow.json`.
- You need to document, validate, or update how the app talks to n8n.
- You need to map webhook URLs, SMTP credentials, or env vars without exposing secrets.

Do not use this skill for generic React/Supabase coding or for unrelated `n8nac` workspace operations. Use `n8n-architect` for broader `n8nac` tasks.

## Workflow Inventory

- `n8n-workflows/new-order.json`
  Purpose: receives new-order payloads and sends customer/store emails.
- `n8n-workflows/status-change.json`
  Purpose: receives order-status payloads and sends status emails.
- `workflows/cxx-signup.json`
  Purpose: sends welcome emails on customer signup.
- `scripts/cxx_contact_workflow.json`
  Purpose: sends an internal notification for contact-form submissions.

## Source Of Truth

- Read [n8n-workflows/README.md](/C:/Users/User/Desktop/CX%20Electronics/CX-Website/n8n-workflows/README.md) for the documented import flow.
- Read [CLAUDE.md](/C:/Users/User/Desktop/CX%20Electronics/CX-Website/CLAUDE.md) for the current env-var names and business context.
- Inspect the JSON workflow files directly before describing node behavior.

## Required Env Vars And Inputs

Document names only. Never print or commit values.

- `VITE_N8N_NEW_ORDER`
- `VITE_N8N_STATUS_CHANGE`
- `VITE_N8N_SIGNUP`
- `VITE_N8N_CONTACT`

Credential/setup dependencies discovered in repo docs/files:

- SMTP credential for `emailSend` nodes
- Zoho SMTP account details
- PayFast ITN notification URL when that integration is live

## Working Procedure

1. Identify which workflow file the task affects.
2. Read the JSON file and confirm the webhook path, node types, and credential references.
3. Cross-check the app-side caller:
   - `src/lib/webhooks.ts` for order/status/signup events
   - `src/pages/store/About.tsx` for contact webhook usage
4. Preserve secret hygiene:
   - do not commit real webhook URLs
   - do not copy SMTP passwords or API keys into docs
   - replace any secret with an env-var reference if you have to rewrite instructions
5. If updating docs, keep them aligned with the actual filenames and env vars in the repo.

## Expected Outputs

- Updated documentation or migration notes describing the workflow purpose and setup
- Safe mapping from workflow asset to app env var / trigger path
- Clear list of manual setup still required in n8n

## Validation

- Confirm every referenced JSON file exists.
- Confirm each documented env var is referenced by current code.
- Confirm setup instructions do not expose secrets.
- If you changed instructions, review the diff for accidental credential leakage or stale filenames.
