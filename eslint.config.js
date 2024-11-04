import {
  commencisBaseConfig,
  commencisPrettierConfig,
  commencisTypescriptConfig,
  defineConfig,
} from '@commencis/eslint-config';

export default defineConfig(
  ...commencisBaseConfig,
  ...commencisTypescriptConfig,
  ...commencisPrettierConfig,
  {
    rules: {
      'no-console': 'off',
    },
  },
  {
    ignores: ['**/dist/', 'coverage'],
  }
);
