import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import ora from 'ora';

import { TemplateId } from '@/types';
import { getTemplateDataById } from '@/utils';

import { cleanUpDirectory } from './cleanUpDirectory';
import { cleanUpTemplateFiles } from './cleanUpTemplateFiles';
import { cloneTemplateRepository } from './cloneTemplateRepository';
import { createMetaData } from './createMetaData';
import { updatePackageData } from './updatePackageData';

export async function setupTemplate(
  templateId: TemplateId,
  projectName: string,
  targetPath: string = process.cwd()
): Promise<void> {
  const { name, url, version, filesToRemove } = getTemplateDataById(templateId);

  const targetDir = path.resolve(targetPath, projectName);
  const tempDir = path.join(os.tmpdir(), `commencis-tmp-${Date.now()}`);

  const spinner = ora('Setting up template').start();

  try {
    await cloneTemplateRepository({ url, version, tempDir });

    // Remove unwanted files and folders
    await cleanUpTemplateFiles(tempDir, filesToRemove);

    // Update package.json
    const { templateVersion } = await updatePackageData(tempDir, projectName);

    // Copy files to the target directory
    await fs.cp(tempDir, targetDir, { recursive: true, force: true });

    // Create metadata file
    await createMetaData(targetDir, { templateId, templateVersion });

    spinner.succeed(
      `Project created at ${targetDir} with ${name}: v${templateVersion}`
    );
  } catch (error) {
    spinner.fail(`Failed to set up template: ${error}`);
  } finally {
    await cleanUpDirectory(tempDir);
  }
}
