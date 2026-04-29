import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import hbs from 'handlebars';
import ora from 'ora';

import type { TemplateId } from '@/types';
import { getTemplateDataById } from '@/utils';

import { assertPnpmAvailable } from './assertPnpmAvailable';
import { cleanUpDirectory } from './cleanUpDirectory';
import { cleanUpTemplateFiles } from './cleanUpTemplateFiles';
import { cloneTemplateRepository } from './cloneTemplateRepository';
import { createMetaData } from './createMetaData';
import { syncLockfile } from './syncLockfile';
import { updatePackageData } from './updatePackageData';

export async function setupTemplate(
  templateId: TemplateId,
  projectName: string,
  targetPath: string = process.cwd()
): Promise<void> {
  const {
    name,
    url,
    version,
    filesToRemove,
    scriptsToRemove,
    dependenciesToRemove,
    devDependenciesToRemove,
  } = getTemplateDataById(templateId);
  const {
    name: mdExtensionName,
    url: mdExtensionUrl,
    version: mdExtensionVersion,
  } = getTemplateDataById('template-markdown');

  const hasPackagesToRemove =
    (dependenciesToRemove?.length ?? 0) > 0 ||
    (devDependenciesToRemove?.length ?? 0) > 0;

  if (hasPackagesToRemove) {
    await assertPnpmAvailable();
  }

  const targetDir = path.resolve(targetPath, projectName);
  const tempDir = path.join(
    os.tmpdir(),
    `commencis-tmp-${templateId}-${Date.now()}`
  );
  const mdTempDir = path.join(os.tmpdir(), `commencis-tmp-md-${Date.now()}`);

  const spinner = ora('Setting up template').start();

  try {
    await Promise.all([
      cloneTemplateRepository({
        repoPath: url,
        versionPrefix: 'v',
        version,
        localPath: tempDir,
      }),
      cloneTemplateRepository({
        repoPath: mdExtensionUrl,
        versionPrefix: `${mdExtensionName}@`,
        version: mdExtensionVersion,
        localPath: mdTempDir,
      }),
    ]);

    // Generate README.md
    const readmeTemplatePath = path.join(
      mdTempDir,
      'templates',
      'markdown',
      'readme.template.hbs'
    );
    const readmeTemplateSource = await fs.readFile(readmeTemplatePath, 'utf-8');
    const readmeTemplate = hbs.compile(readmeTemplateSource);
    const readmeMd = readmeTemplate({ projectName });

    // Remove unwanted files and folders
    await cleanUpTemplateFiles(tempDir, filesToRemove);

    // Write new README.md after clean-up
    await fs.writeFile(path.join(tempDir, 'README.md'), readmeMd);

    // Update package.json
    const { templateVersion } = await updatePackageData({
      directoryPath: tempDir,
      projectName,
      scriptsToRemove,
      dependenciesToRemove,
      devDependenciesToRemove,
    });

    await syncLockfile({
      directoryPath: tempDir,
      shouldSync: hasPackagesToRemove,
    });

    // Copy files to the target directory
    await fs.cp(tempDir, targetDir, { recursive: true, force: true });

    // Create metadata file
    await createMetaData(targetDir, { templateId, templateVersion });

    spinner.succeed(
      `Project created at ${targetDir} with ${name}: v${templateVersion}`
    );
  } catch (error) {
    spinner.fail(`Failed to set up template: ${error}`);
    throw error;
  } finally {
    await Promise.all([cleanUpDirectory(tempDir), cleanUpDirectory(mdTempDir)]);
  }
}
