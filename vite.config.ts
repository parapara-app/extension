import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        background: "src/background/index.ts",
        popup: path.resolve(__dirname, "popup.html"), 
      },
      output: {
        entryFileNames: "assets/[name].js",
      },
    },
  },
});
