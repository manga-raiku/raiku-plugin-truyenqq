import { defineConfig } from "vitest/config"

import viteConfig from "./vite.config"
// vite.config.ts

// https://vitejs.dev/config/
export default defineConfig({
  ...viteConfig,
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: "./test/setup-file.ts",
    testTimeout: 60_000
  }
})
