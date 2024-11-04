import { TemplateData, TemplateId } from '@/types';

export const TEMPLATE_DATA: Record<TemplateId, TemplateData> = {
  'react-vite': {
    id: 'react-vite',
    url: 'https://github.com/Commencis/starter-react-vite.git',
    filesToRemove: [
      '.git/',
      '.github/',
      '.changeset/',
      'assets/',
      'CHANGELOG.md',
      'README.md',
      'LICENSE',
      'renovate.json',
    ],
  },
} as const;

export const TEMPLATE_IDS: TemplateId[] = Object.values(TEMPLATE_DATA).map(
  (template) => template.id
);
