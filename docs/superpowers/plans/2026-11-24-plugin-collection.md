# Pi plugin collection implementation plan

**Goal:** Install pstack and Thermos from one repository.

**Architecture:** The root exposes no plugins. Child manifests expose only their plugin. Skills and reviewer instructions use relative paths.

**Tech stack:** Pi package manifests, Markdown skills, Node test runner and Pi RPC.

**Spec:** [Plugin collection](../specs/2026-11-24-plugin-collection.md)

## Tasks

- [x] Rename the GitHub repository and checkout; move the existing package to `pstack/`. Update install instructions and verify all 59 skills and 22 playbooks.
- [x] Port the upstream Thermos license and three skills under `thermos/`. Adapt delegation and review scope to stock Pi. Document migration and single-plugin installs.
- [x] Use a fresh temporary Pi home for each install. Compare discovered commands with the expected sets: root 0, pstack 59, Thermos 3. Scan changed code before delivery.
