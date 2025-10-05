import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    // Configuración del servidor de desarrollo
    server: {
      port: 5173,
      host: true, // Necesario para Docker
      strictPort: true,
    },

    // Configuración de preview
    preview: {
      port: 4003,
      host: true,
      strictPort: true,
    },

    // ⚠️ CRÍTICO: Configuración de build
    build: {
      // ✅ DEBE ser 'dist' para que GitHub Actions lo encuentre
      outDir: 'dist',

      // Limpiar el directorio de salida antes de cada build
      emptyOutDir: true,

      // Source maps solo en desarrollo
      sourcemap: mode === 'development',

      // Optimizaciones para producción
      minify: 'esbuild',
      target: 'esnext',

      // Configuración de chunks para mejor caching
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
          // ✅ Assets irán a dist/assets/
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },

      // Configuración de assets
      assetsDir: 'assets',

      // Límite de inline para assets (en bytes)
      assetsInlineLimit: 4096,
    },

    // Configuración de path aliases (opcional pero recomendado)
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@services': path.resolve(__dirname, './src/services'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@types': path.resolve(__dirname, './src/types'),
      },
    },

    // Variables de entorno disponibles en el cliente
    define: {
      'import.meta.env.VITE_BFF_URL': JSON.stringify(env.VITE_BFF_URL || 'http://localhost:4002'),
      'import.meta.env.VITE_NODE_ENV': JSON.stringify(env.VITE_NODE_ENV || mode),
    },
  };
});
