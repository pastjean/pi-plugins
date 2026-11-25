---
name: thermo-nuclear-code-quality-review
description: Audit a diff for maintainability regressions, unjustified file growth, tangled branches and opportunities to simplify structure without changing behavior.
disable-model-invocation: true
---

# Code quality review

Use the [review scope](../../review-scope.md). Review structure, not formatting. Identify changes that would preserve behavior while removing concepts the next maintainer must understand.

1. Look for a structural simplification (upstream calls this “code judo”). Can an existing owner absorb the behavior, or a better state model eliminate whole branches, modes or wrappers? Explain what disappears and why behavior stays the same. Moving complexity into another file is not enough.
2. Trace new conditionals across the flow. Flag scattered checks, feature logic in a shared layer, one-off flags and duplicated policy. Name the canonical owner or helper when one already exists.
3. Inspect API and type boundaries for needless optionality, casts, identity wrappers and silent fallback. State the invariant the simpler contract would enforce.
4. Compare before/after sizes. Treat crossing from below 1,000 lines to above 1,000 as a presumptive blocker unless cohesion gives a strong reason to keep the file together. Identify a concrete extraction boundary, not just a line count.
5. Check coordination. Can related updates leave state half-applied? Is independent work serialized without cause? Recommend atomic updates or parallel execution only when they simplify the flow and preserve ordering guarantees.

Lead with structural regressions and missed substantial simplifications, then increased branching, boundary and type problems, file growth, modularity and legibility. For each finding give `file:line`, the maintenance cost and a behavior-preserving alternative. Do not turn a mere preference into a blocker. Skip cosmetic nits. If no change clears this bar, say so; do not implement the refactor.
