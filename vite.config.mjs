import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: './',
  build: {
    outDir: 'dist', 
    emptyOutDir: true,
    rollupOptions: {
      input: './index.jsx',
      output: {
        entryFileNames: 'ahoylove.js',
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name.includes('ahoylove')) {
            return 'assets/[name][extname]'; // no hash for logo
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
