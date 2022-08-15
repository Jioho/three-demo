// https://vitejs.dev/config/
import { resolve } from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'

const getEntry = () => {
  let paths = fs.readdirSync(resolve(__dirname, 'pages'))
  let result = {}
  paths.forEach(item => {
    result[item] = resolve(__dirname, 'pages', item, 'index.html')
  })
  return result
}

export default defineConfig({
  base: '/three-demo/dist/',
  build: {
    rollupOptions: {
      input: getEntry()
    }
  },
  plugins: []
})
