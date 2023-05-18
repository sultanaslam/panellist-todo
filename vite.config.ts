import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  define: { 'process.env': {} },
  envDir: '.',
  plugins: [react(), eslint(), tsconfigPaths()],
  server: { open: true, port: 3000 }
});
