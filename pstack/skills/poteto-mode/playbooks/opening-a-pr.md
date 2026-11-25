### Opening a PR

Use when publication is in scope. Otherwise stop after local verification.

When a PR is authorized, use the agreed branch or worktree and base. Keep unrelated work out, organize changes into landable commits, and inspect the diff for accidental churn before commit.

Title: `type(scope): subject`, naming a real symbol when one carries the change. Body: a one-minute briefing under 40 lines with these `##` headings in order, dropping empty ones: `## Why`, `## What changed`, `## Scope`, `## Tradeoffs` (only rejected alternatives a reviewer would otherwise ask about), `## Blast Radius`, `## Verification`.

Stack follow-ups by base branch. Open PRs ready. Use `gh pr create` without `--draft`, or `origin pr create --status open` when Origin's CLI resolves the repository. If neither authenticated CLI is available, prepare the title and body locally and report that the PR is not open. Opening a PR does not start a babysit.
