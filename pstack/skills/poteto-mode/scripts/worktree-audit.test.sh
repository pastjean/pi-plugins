#!/usr/bin/env bash
set -euo pipefail

audit="$(cd "$(dirname "$0")" && pwd)/worktree-audit.sh"
root=$(mktemp -d)
trap 'rm -rf "$root"' EXIT
export HOME="$root/home" GIT_CONFIG_NOSYSTEM=1
mkdir -p "$HOME" "$root/bin"
for cli in gh origin; do
	printf '#!/bin/sh\nexit 1\n' > "$root/bin/$cli"
	chmod +x "$root/bin/$cli"
done
export PATH="$root/bin:$PATH"
git init -q "$root/repo"
git -C "$root/repo" -c user.name=test -c user.email=test@localhost commit -q --allow-empty -m base
wt="$root/tree with spaces"
git -C "$root/repo" worktree add -q -b topic "$wt"
report=$("$audit" -b HEAD "$root/repo")
grep -F $'YES\tclean\tno-remote\t-\tunknown\tverify-owner\t' <<< "$report"
touch "$wt/only copy"
report=$("$audit" -b HEAD "$root/repo")
grep -F $'YES\tuntracked:1\tno-remote\t-\tunknown\thold-changes\t' <<< "$report"
test -f "$wt/only copy"
