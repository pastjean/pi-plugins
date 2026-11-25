---
name: automate-me
description: Draft or update a personal Pi mode skill from the user's stated working preferences and optional workspace-scoped session evidence.
disable-model-invocation: true
---

# Automate me

Turn the user's working conventions into a `<handle>-mode` skill. For one narrow workflow, skip habit mining and use the [skill authoring playbook](../poteto-mode/playbooks/authoring-a-skill.md) directly.

1. Confirm the handle and destination. Default to `.pi/skills/<handle>-mode/SKILL.md` in the authorized project. A personal skill at `${PI_CODING_AGENT_DIR:-~/.pi/agent}/skills/<handle>-mode/SKILL.md` needs explicit permission. If Pi already lists their skill, ask whether to update it; preserve its location and uncontradicted rules. Don't edit a package-installed copy in place.
2. Ask what the agent should do differently. Offer concrete choices about answer length, decisions that need approval, and what counts as proof. Ask one or two questions at a time in chat. For updates, ask what's changed.
3. If the user wants evidence from past chats, agree on a time window (for updates, since the last edit) and use the workspace and header checks in [recall](../recall/SKILL.md). If a workspace-specific source isn't available, use their answers. Don't mine other workspaces. Look for repeated corrections across separate conversations, not one-off requests. Ask about conflicting signals. Keep transcripts, identifiers and sensitive details out of the draft.
4. Follow the [authoring playbook](../poteto-mode/playbooks/authoring-a-skill.md). Give the skill a `name` matching its directory, a short single-scalar `description` specific to this person's working style, and `disable-model-invocation: true` for explicit use. Show how to start a task with `/skill:<handle>-mode`. Don't promise a persistent mode.
5. Use only rules that change a decision. “Show before and after timings on the same fixture” tells an agent more than “verify thoroughly.” Link the skills the user relies on instead of copying their procedures. Apply [unslop](../unslop/SKILL.md) and show the draft for correction.
6. After approval, write at the agreed destination. Check frontmatter, links, and that the approved examples still match the rules. Ask the user to try it on one real task. Don't publish personal preferences or open a PR unless requested.
