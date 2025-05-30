/// <reference types="vitest" />
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
  plugins: [
    tailwindcss(),
    !process.env.VITEST && reactRouter(),
    tsconfigPaths(),
    devtoolsJson(),
  ],
  test: {
    globals: true,
    environment: 'jsdom', // default is Node.js, jsdom is a browser-like environment
    setupFiles: './setupTests.ts',
  },
});
