import { resolve } from 'path';
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/play-white/',
  plugins: [
    react(),
    tailwindcss(),
    mdx({
      jsxImportSource: 'react',
      include: /\.mdx$/,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
