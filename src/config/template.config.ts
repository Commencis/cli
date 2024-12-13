import { TemplateId } from '@/types';

type TemplateConfig = {
  name: string;
  url: string;
  filesToRemove: string[];
};
export type TemplateData = TemplateConfig & { version: string };

export const templateConfigMap = {
  'react-vite': {
    name: '@commencis/starter-react-vite',
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
} as const satisfies Record<TemplateId, TemplateConfig>;
