import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

type SyncLockfileArgs = {
  directoryPath: string;
  shouldSync: boolean;
};

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function syncLockfile({
  directoryPath,
  shouldSync,
}: SyncLockfileArgs): Promise<void> {
  if (!shouldSync) {
    return;
  }

  const pnpmLock = path.join(directoryPath, 'pnpm-lock.yaml');

  if (await pathExists(pnpmLock)) {
    try {
      await execFileAsync(
        'pnpm',
        ['install', '--lockfile-only', '--no-frozen-lockfile'],
        {
          cwd: directoryPath,
          windowsHide: true,
        }
      );
    } catch (error) {
      const stderr =
        error && typeof error === 'object' && 'stderr' in error
          ? String((error as { stderr?: unknown }).stderr)
          : '';
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(
        `Failed to refresh pnpm-lock.yaml: ${message}${stderr ? `\n${stderr}` : ''}\nTry running "pnpm install" in the project directory.`
      );
    }
    return;
  }
}
