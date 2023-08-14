import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "./public",
  build: {
    rollupOptions: {
      external: ["axios"],
      output: {
       
        // Specify the correct MIME type for JavaScript files
        entryFileNames: "[name]-[hash].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        // Set the correct MIME type for CSS files
        manualChunks(id) {
          if (id.includes(".css")) {
            return `css/[name]-[hash]`;
          }
        },
      },
    },
  },
});
