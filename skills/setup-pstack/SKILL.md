---
name: setup-pstack
description: Configure optional per-role Pi model preferences for pstack, or explain which model a role will use.
---

# Setup pstack

Setup is optional. Without an override, use the active Pi model. This skill records preferences for pstack; it does not change Pi's active model, enable agents, or configure providers.

1. Ask which role the user wants to change: feature/refactoring, bug-fix, perf-issue, hillclimb, judgment and prose, arena runners, arena cross-judge pool, swarm workers, or interrogate reviewers. For a question about defaults, answer without reading or writing personal files.
2. Use models detected by this Pi installation (`pi --list-models`, or the user's current Pi model picker). Offer exact `provider/model-id` pairs from that list, plus the option to inherit the active model. Don't inspect credentials, guess IDs, or encode thinking levels in model names. If discovery is unavailable, ask for the picker entries or leave the role unset.
3. Ask permission to read the existing per-user preferences at `${PI_CODING_AGENT_DIR:-~/.pi/agent}/pstack-models.md` (default `~/.pi/agent/pstack-models.md`). If declined, explain the choices without touching the file. Preserve unrelated choices. Use one Markdown bullet per override: `- <role>: <provider>/<model-id>`; for panel roles list the chosen IDs in preference order separated by commas. Removing a role restores the active-model default.
4. Show the resolved path and proposed changes. Write only after the user approves that write. Change only this file; if the result matches, do nothing. Report the changed roles. No setup step edits Pi settings, prompts, credentials, or project files.

A preference is not proof that another model ran. On a run with permission to read these preferences, apply a role override only if the model is still detected and an authorized runner can select it. Otherwise disclose the limitation. Use the active session for ordinary work; if a required independent role cannot run, report it as blocked.

If the user also wants project-specific proof, offer [a real-app verification skill](../create-verification-skill/SKILL.md) or [formal verification](../create-formal-verification-skill/SKILL.md). Don't generate either during model setup.
