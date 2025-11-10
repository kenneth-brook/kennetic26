import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist/assets', // we only want assets here
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/assets/js/main.js')
      },
    },
  },
  plugins: [
    {
      name: 'ignore-nunjucks',
      load(id) {
        if (id.endsWith('.njk')) {
          // Tell Vite/Rollup to skip processing these
          return ''
        }
      },
    },
  ],
  server: {
    open: '/pages/index.njk',
  },
})
