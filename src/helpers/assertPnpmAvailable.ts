import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const PNPM_INSTALL_URL = 'https://pnpm.io/installation';

export async function assertPnpmAvailable(): Promise<void> {
  try {
    await execFileAsync('pnpm', ['--version'], { windowsHide: true });
  } catch {
    console.error(
      [
        'Error: pnpm is required to generate this template.',
        '',
        `Install pnpm: ${PNPM_INSTALL_URL}`,
        'Tip: with Node.js 16.13+, run: corepack enable',
      ].join('\n')
    );
    throw new Error('pnpm is not available on PATH');
  }
}
