import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        content: "src/content/index.ts",
      },
      output: {
        entryFileNames: "assets/content.js",
        format: "iife",
      },
    },
  },
});
