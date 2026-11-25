# Review scope

1. Identify the requested target before reviewing. For a PR use its actual base and head; for a branch compare the merge base to the tip (`git diff <base>...HEAD`). Resolve the target from local refs or the supplied PR; ask if ambiguous. Do not assume `main`.
2. For staged changes use `git diff --cached`; for unstaged changes use `git diff`. For all local changes inspect both and relevant untracked files from `git status --short`. Keep local edits separate from a committed branch review unless requested.
3. Read the diff, the surrounding changed files and relevant callers, tests and contracts. For a deletion, inspect the base version. For a rename, distinguish moved code from a behavior change. If the scope is empty, report that and stop.
4. Report only issues introduced or exposed by the diff. Cite the changed location, triggering condition and consequence. Check accessible evidence yourself. Name any missing evidence as a limit, not a finding. Do not edit files or post comments.
