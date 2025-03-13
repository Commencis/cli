import { ExtensionId, TemplateId } from '@/types';

type TemplateConfig = {
  name: string;
  url: string;
  filesToRemove?: string[];
  path?: string;
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
  'template-markdown': {
    name: '@commencis/template-markdown',
    url: 'https://github.com/Commencis/starter-extensions.git',
    path: 'templates/markdown',
  },
} as const satisfies Record<TemplateId | ExtensionId, TemplateConfig>;

export const extensionConfigMap = {};
