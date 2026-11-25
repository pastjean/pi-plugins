# Pi port of pstack

Publish a Git-installable skill package in `pastjean/pi-pstack`, separate from Fonte. The source of behavior is [pstack at 41e4009](https://github.com/cursor/plugins/tree/41e400932eca14f289e7db717a70455256b6d388/pstack). Keep Lauren Tan's MIT notice. Use its authoring-a-skill playbook: change instructions that affect decisions, validate frontmatter and cross-references, then exercise the resulting skills.

## Approaches

Use Pi's native skills and retain the 59 entry points, 22 router playbooks and bundled helpers. A single merged skill would load unrelated workflows together. A runtime extension adds installation privileges without helping Pi read Markdown. Do not register tools or launch anything at startup.

Use the active Pi session for work. Make optional tools and external services explicit. No fake agents, parallelism, independent reviews or persistent modes. If a required check cannot run, report the blocker; a skipped gate is not a pass.
