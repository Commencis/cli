import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

import ora from 'ora';

import { TemplateId } from '@/types';
import { getTemplateDataById } from '@/utils';

import { cleanUpDirectory } from './cleanUpDirectory';
import { cleanUpTemplateFiles } from './cleanUpTemplateFiles';
import { createMetaData } from './createMetaData';
import { updatePackageData } from './updatePackageData';

const execAsync = promisify(exec);

export async function setupTemplate(
  templateId: TemplateId,
  projectName: string,
  targetPath: string = process.cwd()
): Promise<void> {
  const templateData = getTemplateDataById(templateId);

  const targetDir = path.resolve(targetPath, projectName);
  const tempDir = path.join(os.tmpdir(), `commencis-tmp-${Date.now()}`);

  const spinner = ora('Setting up template').start();

  try {
    await execAsync(`git clone ${templateData.url} ${tempDir}`);

    // Remove unwanted files and folders
    await cleanUpTemplateFiles(tempDir, templateData.filesToRemove);

    // Update package.json
    const { templateVersion } = await updatePackageData(tempDir, projectName);

    // Copy files to the target directory
    await fs.cp(tempDir, targetDir, { recursive: true, force: true });

    // Create metadata file
    await createMetaData(targetDir, { templateId, templateVersion });

    spinner.succeed(`Project created at ${targetDir}`);
  } catch (error) {
    spinner.fail(`Failed to set up template: ${error}`);
  } finally {
    await cleanUpDirectory(tempDir);
    spinner.succeed(`Ready to start!`);
  }
}
