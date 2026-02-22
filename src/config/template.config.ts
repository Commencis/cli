import type { ExtensionId, TemplateId } from '@/types';

type TemplateConfig = {
  name: string;
  url: string;
  filesToRemove?: string[];
  scriptsToRemove?: string[];
  dependenciesToRemove?: string[];
  devDependenciesToRemove?: string[];
  path?: string;
};
export type TemplateData = TemplateConfig & { version: string };

export const templateConfigMap = {
  nextjs: {
    name: '@commencis/starter-nextjs',
    url: 'https://github.com/Commencis/starter-nextjs.git',
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
    scriptsToRemove: ['changeset', 'changeset:version'],
    dependenciesToRemove: [],
    devDependenciesToRemove: [
      '@changesets/cli',
      '@svitejs/changesets-changelog-github-compact',
    ],
  },
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
    scriptsToRemove: ['changeset', 'version'],
    dependenciesToRemove: [],
    devDependenciesToRemove: [
      '@changesets/cli',
      '@svitejs/changesets-changelog-github-compact',
    ],
  },
  'template-markdown': {
    name: '@commencis/template-markdown',
    url: 'https://github.com/Commencis/starter-extensions.git',
    path: 'templates/markdown',
  },
} as const satisfies Record<TemplateId | ExtensionId, TemplateConfig>;

export const extensionConfigMap = {};
