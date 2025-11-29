import enquirer from 'enquirer';

import type { TemplateId } from '@/types';

export async function getSelectedTemplate(): Promise<TemplateId> {
  const response = await enquirer.prompt<{ templateId: TemplateId }>({
    type: 'select',
    name: 'templateId',
    message: 'Choose a starter template for your project:',
    choices: [
      {
        message: 'React-Vite',
        name: 'react-vite',
      },
    ],
  });

  return response.templateId;
}
