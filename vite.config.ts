import { join } from "path"

import { defineConfig } from "vite"

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      package: join(__dirname, "package.ts"),
      plugin: join(__dirname, "plugin.ts"),
      "package.json": join(__dirname, "package.json"),
      src: join(__dirname, "src")
    }
  },
  define: {
    __NOW__: Date.now()
  }
})
