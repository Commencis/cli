import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/cli.ts'],
  target: 'es2020',
  format: ['esm'],
  clean: true,
});
