# pi-pstack

A Pi port of [Lauren Tan's pstack](https://github.com/cursor/plugins/tree/41e400932eca14f289e7db717a70455256b6d388/pstack). Give Pi an engineering task; the router picks a playbook, works through its steps, and reports the evidence. The package includes 59 skills and 22 playbooks. It registers no runtime extension.

```sh
pi install git:github.com/pastjean/pi-pstack
```

Start Pi or run `/reload` in an open session. No model setup is required. Try:

```text
/skill:poteto-mode Fix the stale count after deleting an item. Reproduce it first.
/skill:blast-radius What else could break if we change the cache key?
/skill:poteto-help Which skill should I use to explain a subsystem?
```

[Browse the skills](skills/) or [read the playbooks](skills/poteto-mode/playbooks/). To set model preferences, invoke `/skill:setup-pstack`. On stock Pi, the current session owns the work. Parallel attempts and independent review need an available, authorized delegation tool. The [Pi runtime notes](docs/pi.md) describe fallbacks and external-service limits.

To remove: `pi remove git:github.com/pastjean/pi-pstack`.

## Verify a checkout

```sh
npm test                 # package, playbooks, links and command references
npm run test:install     # install in temporary Pi state and query actual skill commands
```

Requires Node.js and, for the install test, `pi` on PATH. The install test does not send a model prompt. Individual skills can require other tools, such as Bun for the PR watcher or a Java runtime and TLC for model checking. Install only what your workflow needs. For statechart on Node 26, use 26.13.1 or later; 26.12.0 prints a spurious loader diagnostic for certain invalid views. See [statechart runtime notes](skills/statechart/scripts/README.md).

Derived from upstream commit `41e400932eca14f289e7db717a70455256b6d388`. Distributed under the [MIT license](LICENSE). This is an independent port, not an official Cursor plugin.
