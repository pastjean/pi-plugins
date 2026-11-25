# pi-plugins

Independent skill packages for [Pi](https://pi.dev). The repository root is a catalog; installing it does not load any plugins.

- [pstack](pstack/): 59 engineering skills and 22 playbooks. Start with `/skill:poteto-mode`.
- [Thermos](thermos/): correctness, security and maintainability reviews. Start with `/skill:thermos`.

## Install

```sh
git clone https://github.com/pastjean/pi-plugins.git
cd pi-plugins
pi install ./pstack    # pstack only
pi install ./thermos   # Thermos only
```

Run only the install commands you want, then restart Pi or run `/reload`. Keep the checkout: Pi loads local packages from disk. To update, run `git pull --ff-only` and `/reload`. To uninstall, run `pi remove ./pstack` or `pi remove ./thermos` from the same checkout.

**Migrating from pi-pstack:** Remove the old Git package with `pi remove git:github.com/pastjean/pi-pstack`, then install `./pstack` as above. Use the same install scope (`--local` for a project install). Skill names are unchanged.

## Verify

`npm test` checks the packages. `npm run test:install` checks actual Pi skill discovery for the root and each plugin in separate temporary homes. Requires Node.js and `pi` on PATH; no API key is needed.
