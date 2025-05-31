import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // karena kita pakai React dan DOM
    setupFiles: './src/setupTests.js', // kalau ada setup file
  },
});
