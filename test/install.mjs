import assert from 'node:assert/strict';
import { execFileSync, spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const repo = fileURLToPath(new URL('../', import.meta.url));
const plugin = process.argv[2];
assert.ok(['root', 'pstack', 'thermos'].includes(plugin), 'expected root, pstack or thermos');
const source = plugin === 'root' ? repo : join(repo, plugin);
const home = mkdtempSync(join(tmpdir(), 'pi-plugins-install-'));
const cwd = join(home, 'workspace');
mkdirSync(cwd);
const env = { ...process.env, HOME: home, PI_CODING_AGENT_DIR: join(home, 'agent') };
try {
  execFileSync('pi', ['install', source], { cwd, env, stdio: 'inherit', timeout: 90000 });
  const child = spawn('pi', ['--mode', 'rpc', '--no-session'], { cwd, env, stdio: ['pipe', 'pipe', 'inherit'] });
  const done = new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('close', code => code === 0 ? resolve() : reject(Error(`Pi exit: ${code}`)));
  });
  const timeout = setTimeout(() => child.kill('SIGKILL'), 45000);
  let reply;
  try {
    createInterface({ input: child.stdout }).on('line', line => {
      const event = JSON.parse(line);
      if (event.type === 'response' && event.id === 'skills') {
        reply = event;
        child.stdin.end();
      }
    });
    child.stdin.write(JSON.stringify({ type: 'get_commands', id: 'skills' }) + '\n');
    await done;
    assert.ok(reply?.success, JSON.stringify(reply));
    const names = reply.data.commands.filter(c => c.source === 'skill' && c.sourceInfo.origin === 'package').map(c => c.name).sort();
    const skills = plugin === 'root' ? [] : plugin === 'pstack'
      ? readFileSync(join(repo, 'pstack/test/upstream-skills.txt'), 'utf8').trim().split('\n')
      : ['thermos', 'thermo-nuclear-review', 'thermo-nuclear-code-quality-review'];
    const expected = skills.map(name => `skill:${name}`).sort();
    assert.deepEqual(names, expected);
    console.log(`Pi loaded ${names.length} package skills from ${source}`);
  } finally {
    clearTimeout(timeout);
    if (child.exitCode === null && child.signalCode === null) child.kill();
  }
} finally {
  rmSync(home, { recursive: true, force: true });
}
