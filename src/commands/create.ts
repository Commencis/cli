import chalk from 'chalk';

import { printLogo, validateProjectName, validateTemplate } from '@/utils';

import { TemplateId } from '@/types';

import { setupTemplate } from '@/helpers/setupTemplate';
import { getProjectName, getSelectedTemplate } from '@/prompts';

export type CreateActionOptions = {
  projectNameFromOptions?: string;
  templateIdFromOptions?: string;
};

export async function create({
  projectNameFromOptions,
  templateIdFromOptions,
}: CreateActionOptions): Promise<void> {
  printLogo();

  try {
    const isProjectNameValid = validateProjectName(projectNameFromOptions);

    if (projectNameFromOptions && isProjectNameValid !== true) {
      console.error(`Error: ${isProjectNameValid}`);
      process.exit(1);
    }

    if (templateIdFromOptions && !validateTemplate(templateIdFromOptions)) {
      console.error(`Error: Invalid template. Please try again.`);
      process.exit(1);
    }

    const projectName = projectNameFromOptions ?? (await getProjectName());
    const templateId =
      (templateIdFromOptions as TemplateId | undefined) ??
      (await getSelectedTemplate());

    await setupTemplate(templateId, projectName);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log('For more info, run:');
    console.log(chalk.grey('$'), chalk.cyan('npx commencis --help'));
    process.exit(1);
  }
}
