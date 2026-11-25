# Statechart helper

## Running the helper tests

From the repository root:

```sh
cd skills/statechart/scripts
npm install --no-package-lock
npm test
```

Keep the skill layout intact: the tests run the adjacent `statechart` launcher and read `../references/render.md`. The render tests install pinned renderer and parser packages in the user cache. The replay tests use recorded TLC output; to also run the live TLC tests, install Java and set `TLA2TOOLS` to the absolute path to `tla2tools.jar`.

## Node 26 view errors

On Node 26.12.0, a view module that executes `throw null` during import still stops the command with exit 2 and no chart, but stderr includes a Node-internal code frame before `null`. This happens even without the helper:

```sh
node --input-type=module -e 'try { await import("data:text/javascript,throw null") } catch (e) { console.error(e) }'
```

If you see that extra diagnostic, use a patched runtime (tested with Node 26.13.1). The test for clean view-error output intentionally checks the entire diagnostic.
