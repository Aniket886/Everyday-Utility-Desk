import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const projectRoot = process.cwd();
const isWindows = process.platform === 'win32';
const npmCommand = isWindows ? (process.env.ComSpec || 'cmd.exe') : 'npm';
const force = process.argv.includes('--force');
const packageJson = join(projectRoot, 'package.json');
const packageLock = join(projectRoot, 'package-lock.json');
const nodeModules = join(projectRoot, 'node_modules');
const stampFile = join(nodeModules, '.eud-update-check');
const oneDay = 24 * 60 * 60 * 1000;

function run(args, options = {}) {
  const commandArgs = isWindows
    ? ['/d', '/s', '/c', ['npm', ...args].map(value => `"${String(value).replaceAll('"', '""')}"`).join(' ')]
    : args;
  return spawnSync(npmCommand, commandArgs, {
    cwd: projectRoot,
    stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    encoding: 'utf8',
    shell: false,
  });
}

function installRequired() {
  if (!existsSync(nodeModules) || !existsSync(packageLock)) return true;
  return statSync(packageJson).mtimeMs > statSync(packageLock).mtimeMs;
}

console.log('\n[Everyday Utility Desk] Preparing local dependencies…');

if (installRequired()) {
  console.log('[setup] Installing declared packages…');
  const install = run(['install', '--no-audit', '--no-fund']);
  if (install.status !== 0) {
    console.error('[setup] Dependency installation failed. Check Node.js, npm, and your internet connection.');
    process.exit(install.status || 1);
  }
}

const checkedRecently = existsSync(stampFile) && Date.now() - Number(readFileSync(stampFile, 'utf8') || 0) < oneDay;
if (!force && checkedRecently) {
  console.log('[update] Dependency update check already completed in the last 24 hours.');
  process.exit(0);
}

console.log('[update] Checking for compatible dependency updates…');
const outdated = run(['outdated', '--json'], { capture: true });
let outdatedPackages = {};
try { outdatedPackages = JSON.parse(outdated.stdout || '{}'); } catch { outdatedPackages = {}; }

if (Object.keys(outdatedPackages).length > 0) {
  console.log(`[update] Updating ${Object.keys(outdatedPackages).length} package(s) within approved version ranges…`);
  const update = run(['update', '--no-audit', '--no-fund']);
  if (update.status !== 0) {
    console.warn('[update] Update could not complete. Existing installed dependencies will be used.');
  }
} else if (outdated.status === 0 || outdated.status === 1) {
  console.log('[update] Dependencies are current.');
} else {
  console.warn('[update] Online update check was unavailable. Existing installed dependencies will be used.');
}

if (existsSync(nodeModules)) writeFileSync(stampFile, String(Date.now()), 'utf8');
