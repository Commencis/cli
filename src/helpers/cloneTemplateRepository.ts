import { git } from '@/lib';

type CloneTemplateArgs = {
  repoPath: string;
  localPath: string;
  versionPrefix?: string;
  version: string;
};

/* export async function cloneTemplateRepository({
  url,
  version,
  tempDir,
}: CloneTemplateArgs): Promise<void> {
  await execAsync(
    `git clone --branch v${version} --single-branch ${url} ${tempDir}`
  );
} */

export async function cloneTemplateRepository({
  repoPath,
  localPath,
  versionPrefix,
  version,
}: CloneTemplateArgs): Promise<void> {
  await git.clone(repoPath, localPath, [
    '--branch',
    `${versionPrefix}${version}`,
    '--single-branch',
  ]);
}
