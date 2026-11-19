import { resolve } from "node:path";
import pandacss from "@pandacss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [pandacss(), react()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "Purple Planet",
      formats: ["es"],
      fileName: "purple-planet",
    },
    rollupOptions: {
      external: ["react", "react-dom", "@ark-ui/react"],
    },
  },
});
