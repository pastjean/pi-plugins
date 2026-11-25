import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';

const plugin = new URL('../thermos/', import.meta.url);
const read = url => readFileSync(url, 'utf8');
const names = ['thermo-nuclear-code-quality-review', 'thermo-nuclear-review', 'thermos'];

test('Thermos exposes exactly the three upstream review commands', () => {
  assert.deepEqual(JSON.parse(read(new URL('package.json', plugin))).pi, { skills: ['./skills'] });
  assert.deepEqual(readdirSync(new URL('skills/', plugin)).sort(), names);
  for (const name of names) {
    const skill = read(new URL(`skills/${name}/SKILL.md`, plugin));
    assert.ok(skill.startsWith(`---\nname: ${name}\ndescription: `), name);
  }
});

test('review rubrics and role briefs resolve within the standalone package', () => {
  const docs = ['README.md', ...names.map(name => `skills/${name}/SKILL.md`),
    ...readdirSync(new URL('agents/', plugin)).map(file => `agents/${file}`)];
  for (const doc of docs) {
    const url = new URL(doc, plugin);
    for (const [, href] of read(url).matchAll(/\]\(([^\s()]+)\)/g)) {
      if (href.startsWith('https://')) continue;
      const target = new URL(href, url);
      assert.ok(target.href.startsWith(plugin.href) && existsSync(target), `${doc}: ${href}`);
    }
  }
});
