---
name: thermo-nuclear-review
description: Audit a branch, PR or local diff for correctness, security, broken developer workflows and feature-gate leaks.
disable-model-invocation: true
---

# Correctness and security review

Establish the [review scope](../../review-scope.md). If a parent supplied a diff and scope, use them. Review the change before looking at anyone else's findings.

- Trace behavior across callers and package boundaries. Check both sides of changed contracts, including stored data, error handling and compatibility with existing clients.
- Inspect trust boundaries: validation, permissions, data exposure and handling of secrets. Verify the path from changed code to the affected operation by reading the implementation; recommend the smallest defensive fix.
- Check the existing local build, run and test workflows. Look for renamed environment variables, changed secret sources, ports or new mandatory manual steps. A new optional workflow alone is not a regression.
- Trace gated features from entry points to enforcement. Check flag-off, internal-only and fallback paths, not just the visible UI.
- Distinguish intended, contained breakage from unexpected impact. Report collateral damage or a material risk the author may have missed. Calibrate priority to likelihood and impact.

After your own audit, if there are medium-or-higher findings and a PR or MR is available, read its existing discussion with an available authorized read-only tool. Validate, deduplicate and attribute any incorporated bot or human findings. Do not start another review service. If discussion is inaccessible, note that limit.

Return findings first, ordered by risk. For each give priority, `file:line`, the failing condition, impact and a concrete fix. If there are no supported findings, say so and note material verification gaps.
