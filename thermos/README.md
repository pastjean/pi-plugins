# Thermos for Pi

Review a change twice: once for bugs and security, once for maintainability. Get one report ordered by risk, with file and line evidence.

From the `pi-plugins` checkout run `pi install ./thermos`, then `/reload` in Pi. No pstack install, runtime extension or model setup specific to Thermos is required.

```text
/skill:thermos Review this branch against origin/main.
/skill:thermo-nuclear-review Check the staged changes for regressions.
/skill:thermo-nuclear-code-quality-review Can this diff preserve behavior with fewer special cases?
```

The [combined review](skills/thermos/SKILL.md) runs both passes inline on stock Pi. With an available delegation tool and user authorization it can run independent reviewers in parallel. Reviews do not edit files or post PR comments.

Port of [Cursor Thermos at 41e4009](https://github.com/cursor/plugins/tree/41e400932eca14f289e7db717a70455256b6d388/thermos), distributed under its [MIT license](LICENSE).
