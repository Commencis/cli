import { typescriptConfig } from '@commencis/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig(typescriptConfig, {
  rules: {
    'no-console': 'off',
  },
});
