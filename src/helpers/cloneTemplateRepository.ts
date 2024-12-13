import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

type CloneTemplateArgs = {
  url: string;
  version: string;
  tempDir: string;
};

export async function cloneTemplateRepository({
  url,
  version,
  tempDir,
}: CloneTemplateArgs): Promise<void> {
  await execAsync(
    `git clone --branch v${version} --single-branch ${url} ${tempDir}`
  );
}
