import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const skills = readdirSync(join(root, 'skills')).sort();
const read = path => readFileSync(path, 'utf8');
function* markdown(dir) {
  for (const file of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, file.name);
    if (file.isDirectory() && !['node_modules', 'test', '.git'].includes(file.name)) yield* markdown(path);
    else if (file.name.endsWith('.md')) yield path;
  }
}

test('manifest exposes the skill collection only', () => {
  const manifest = JSON.parse(read(join(root, 'package.json')));
  assert.deepEqual(manifest.pi, { skills: ['./skills'] });
  assert.equal(manifest.license, 'MIT');
  assert.match(read(join(root, 'LICENSE')), /Copyright \(c\) 2026 Lauren Tan/);
});

test('all 59 skill definitions have portable names and routing descriptions', () => {
  assert.equal(skills.length, 59);
  for (const name of skills) {
    assert.match(name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    const doc = read(join(root, 'skills', name, 'SKILL.md'));
    const header = doc.match(/^---\n([\s\S]+?)\n---\n/)?.[1];
    assert.ok(header, name);
    assert.equal(header.match(/^name: (.+)$/m)?.[1], name);
    assert.match(header, /^description: .+/m, name);
    assert.doesNotMatch(doc, /(?:~\/|`|\s)\.(?:cursor|claude)\/|\bsubagent_type\s*:/, name);
  }
});

test('router names all 22 bundled playbooks', () => {
  const dir = join(root, 'skills/poteto-mode');
  const router = read(join(dir, 'SKILL.md'));
  const playbooks = readdirSync(join(dir, 'playbooks')).filter(f => f.endsWith('.md'));
  assert.equal(playbooks.length, 22);
  for (const name of playbooks) assert.ok(router.includes(`](playbooks/${name})`), name);
});

test('relative Markdown links and Pi skill commands resolve', () => {
  const problems = [];
  for (const path of [join(root, 'README.md'), ...['skills', 'agents', 'docs'].flatMap(dir => [...markdown(join(root, dir))])]) {
    const text = read(path);
    for (const [, name] of text.matchAll(/\/skill:([a-z0-9-]+)/g)) {
      if (!skills.includes(name)) problems.push(`${path}: /skill:${name}`);
    }
    // Ignore fenced examples: these often describe files in the user's project.
    const prose = text.replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[ \t]*$/gm, '');
    for (const [, href] of prose.matchAll(/\]\(([^\s()]+)\)/g)) {
      if (/^(?:[a-z][a-z\d+.-]*:|#|\/)/i.test(href)) continue;
      if (!existsSync(resolve(dirname(path), href.split('#')[0]))) problems.push(`${path}: ${href}`);
    }
  }
  assert.deepEqual(problems, []);
});
