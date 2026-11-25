### Worktree and simulator cleanup

1. Record free space with `df -h`. From this skill’s directory, run `scripts/worktree-audit.sh [-b <base-ref>] [repo-path]`. The report compares local refs, not live remote state. Confirm the intended base and fetch separately if needed.
2. Every row has unknown usage. A clean status, merged commit, closed PR, old timestamp or missing session log cannot prove a worktree is idle. Check the actual path, branch, locks, owners, running jobs and linked work with the operator. Never scan private sessions to guess ownership.
3. Inspect tracked, untracked and ignored files before proposing removal. Hold missing paths, detached or unmerged work, locked trees, active branches and any state you cannot account for. List each proposed path and obtain explicit confirmation that it is unused and its contents can be discarded.
4. Recheck immediately before removal. For each confirmed clean path use `git worktree remove "$path"`, without force. If it refuses, stop. Do not delete branch refs or leftover directories. Re-list worktrees and measure free space again.
5. Inventory simulators or caches separately if requested. Present exact targets and obtain approval before deleting user state.

**Reply:** space before and after, paths removed, paths held and why.
