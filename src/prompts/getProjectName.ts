import enquirer from 'enquirer';

import { validateProjectName } from '@/utils';

export async function getProjectName(): Promise<string> {
  const response = await enquirer.prompt<{ projectName: string }>({
    type: 'input',
    name: 'projectName',
    message: 'Enter the project name:',
    initial: 'my-commencis-app',
    validate: (input: string) => validateProjectName(input),
  });

  return response.projectName;
}
