import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/dashscope-api': {
        target: 'https://dashscope.aliyuncs.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dashscope-api/, ''),
        secure: true
      },
      '/claude-api': {
        target: process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/claude-api/, ''),
        secure: true,
        headers: {
          'x-api-key': process.env.ANTHROPIC_AUTH_TOKEN || '',
          'anthropic-version': '2023-06-01',
        }
      }
    }
  }
})
