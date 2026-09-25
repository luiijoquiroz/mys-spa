/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // base '/' => el sitio se sirve desde la raíz del bucket S3 / distribución CloudFront.
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Los assets llevan hash en el nombre => CloudFront los cachea un año como inmutables.
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: false,
  },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./src/test/setup.ts'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
});
