import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.ts'],
  target: 'node18',
  format: ['esm'],
  clean: true,
  shims: false,
});
