import assert from 'node:assert/strict';
import { execFileSync, spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const repo = fileURLToPath(new URL('../', import.meta.url));
const source = process.argv[2] ?? repo;
const home = mkdtempSync(join(tmpdir(), 'pi-pstack-install-'));
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
    const expected = readdirSync(join(repo, 'skills')).map(n => `skill:${n}`).sort();
    assert.deepEqual(names, expected);
    console.log(`Pi loaded ${names.length} package skills from ${source}`);
  } finally {
    clearTimeout(timeout);
    if (child.exitCode === null && child.signalCode === null) child.kill();
  }
} finally {
  rmSync(home, { recursive: true, force: true });
}
