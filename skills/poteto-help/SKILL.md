---
name: poteto-help
description: Answer questions about installing pstack in Pi, starting a task, choosing a skill or playbook, and diagnosing a run.
disable-model-invocation: true
---

# Poteto help

For a help question, answer it without starting the work. Read the local skill or playbook that owns the answer. Give its path and at most one ready-to-send prompt. If the need is unclear, ask whether they want setup, task routing, troubleshooting or customization.

## Start here

Install with `pi install git:github.com/pastjean/pi-pstack`. Start Pi in the project (or `/reload` in the current Pi session). Type `/skill:poteto-mode` followed by the goal and how to check it. This loads instructions for a task, not a persistent mode. For a different task, invoke the skill again.

[Model setup](../setup-pstack/SKILL.md) is optional. The active Pi model is the default. To choose detected models for specific roles, run `/skill:setup-pstack`; saving personal preferences requires approval. A model list doesn't create workers. To keep cost down, narrow the task or ask for one local pass instead of a panel; don't call a single pass independent review.

## Choose a route

| Need | Start with |
|---|---|
| Implement or investigate under a repeatable playbook | [poteto-mode](../poteto-mode/SKILL.md) |
| Trace what code does, explain a design decision, or learn a subsystem | [how](../how/SKILL.md), [why](../why/SKILL.md), or [teach](../teach/SKILL.md) |
| Recover earlier workspace context vs. summarize this chat | [recall](../recall/SKILL.md) vs. [ketchup](../ketchup/SKILL.md) |
| Review a diff vs. check what else a change might break | [interrogate](../interrogate/SKILL.md) vs. [blast-radius](../blast-radius/SKILL.md) |
| Compare attempts at one brief vs. split independent checks | [arena](../arena/SKILL.md) vs. [swarm](../swarm/SKILL.md) |
| Prove a user flow or a hard invariant | [create-verification-skill](../create-verification-skill/SKILL.md) or [create-formal-verification-skill](../create-formal-verification-skill/SKILL.md) |
| Capture personal conventions vs. propose improvements after a task | [automate-me](../automate-me/SKILL.md) vs. [reflect](../reflect/SKILL.md) |

Other skills: use Pi's `/skill:` completion and read the matching description. Playbooks are files, not commands: ask `/skill:poteto-mode` to [plan a multi-phase change](../poteto-mode/playbooks/multi-phase-plan.md), [take over a branch](../poteto-mode/playbooks/session-pickup.md), or [author a skill](../poteto-mode/playbooks/authoring-a-skill.md). A `principle-*` skill names a decision rule: e.g. [prove it works](../principle-prove-it-works/SKILL.md) asks for observable evidence.

## Troubleshoot

- **Command missing:** confirm the package is installed in this Pi environment, skills and skill commands are enabled, then reload. Use `/skill:<name>`, not a bare skill name as a slash command.
- **Model or review didn't run:** check the model is available and that the session actually has an authorized runner for the role. Stock Pi doesn't supply a panel. Report a missing required check; don't simulate independent evidence.
- **Run drifting:** restate the boundary and a pass/fail check. A green build doesn't show the user flow works. See [prompting](references/prompting.md) for short steers and [recipes](references/recipes.md) for examples.
