### Autopilot-full

1. Record the operator’s queue, writable branches, publication and merge grants, and reserved decisions. A plan request is not a go. PRs outside the merge grant stop at merge-ready.
2. Carry each PR from build through **Opening a PR** and **Babysit**. Use the configured forge CLI. Record branch, base, tested head, check commands and outcomes in the **show-me-your-work** trail. Rebase only owned branches with authorization; stop on unexpected remote changes.
3. Branch independent PRs from trunk. On stock Pi, work through them serially. For authorized delegation, isolate owners by worktree and record each handoff and current head.
4. At the code-ready head, obtain independent verification per **swarm**: rerun checks, exercise the real user surface and inspect the diff. Audit receipts against the SHA. Without authorized independent reviewers, run what you can locally and stop at the missing gate. A changed behavior needs fresh proof; for a restack use **Shipping**’s patch comparison. Every new head needs green CI.
5. Before an authorized merge, fetch the base. Reconcile conflicts and overlapping changes and retest the merge result when callers or dependencies changed. Merge only after proof, current checks and forge approvals cover the landing patch. Read the PR back to confirm it landed.
6. Never disable a check to land the queue. A proposed gate relaxation needs independent evidence and the operator’s approval. While the session is active, inspect outstanding work at checkpoints, record stalled items and report their next action. No automatic wakeup is assumed.
7. On stop, halt writes and relay the hold to any authorized owners. Report each PR, tested SHA, verdict, merge state, evidence and unresolved operator gates per **ketchup**.
