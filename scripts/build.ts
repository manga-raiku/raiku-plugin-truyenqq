// eslint-disable-next-line n/no-unsupported-features/node-builtins
import { copyFileSync, existsSync, mkdirSync, rmdirSync } from "fs"
import { join } from "path"

import { build } from "vite"

if (existsSync(join(__dirname, "../dist")))
  rmdirSync(join(__dirname, "../dist"), { recursive: true })

mkdirSync(join(__dirname, "../dist"))
copyFileSync(join(__dirname, "../README.md"), join(__dirname, "../dist/README.md"))

build({
  base: "./",
  build: {
    emptyOutDir: false,
    lib: {
      entry: ["./plugin.ts"],
      formats: ["iife"],
      name: "__DEFINE_API__",
      fileName: (_format, entry) => entry + ".mjs"
    },
    target: "es2017"
  }
})

build({
  base: "./",
  build: {
    emptyOutDir: false,
    lib: {
      entry: ["./package.ts"],
      formats: ["iife"],
      name: "__DEFINE_PACKAGE__",
      fileName: (_format, entry) => entry + ".mjs"
    },
    target: "es2017"
  }
})
