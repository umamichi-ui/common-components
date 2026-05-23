import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const entries = {
  index: resolve(__dirname, 'src/index.ts'),
  'presence/index': resolve(__dirname, 'src/presence/index.ts'),
  'overlay/index': resolve(__dirname, 'src/overlay/index.ts'),
  'icons/index': resolve(__dirname, 'src/icons/index.ts'),
  'menu/index': resolve(__dirname, 'src/menu/index.ts'),
  'dialog/index': resolve(__dirname, 'src/dialog/index.ts'),
};

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      rollupTypes: false,
      include: ['src'],
    }),
  ],
  build: {
    lib: {
      entry: entries,
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-dom/client',
        /^@umamichi-ui\/common-css/,
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
    sourcemap: true,
    minify: false,
  },
});
