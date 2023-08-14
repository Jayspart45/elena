// vite.config.js
import { defineConfig } from "file:///C:/Users/jayam/Desktop/html,css,js/React%20%20Websites/elena/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/jayam/Desktop/html,css,js/React%20%20Websites/elena/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
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
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqYXlhbVxcXFxEZXNrdG9wXFxcXGh0bWwsY3NzLGpzXFxcXFJlYWN0ICBXZWJzaXRlc1xcXFxlbGVuYVxcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcamF5YW1cXFxcRGVza3RvcFxcXFxodG1sLGNzcyxqc1xcXFxSZWFjdCAgV2Vic2l0ZXNcXFxcZWxlbmFcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2pheWFtL0Rlc2t0b3AvaHRtbCxjc3MsanMvUmVhY3QlMjAlMjBXZWJzaXRlcy9lbGVuYS9mcm9udGVuZC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHB1YmxpY0RpcjogXCIuL3B1YmxpY1wiLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXCJheGlvc1wiXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgIFxuICAgICAgICAvLyBTcGVjaWZ5IHRoZSBjb3JyZWN0IE1JTUUgdHlwZSBmb3IgSmF2YVNjcmlwdCBmaWxlc1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJbbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiBcImNodW5rcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bbmFtZV0tW2hhc2hdLltleHRdXCIsXG4gICAgICAgIC8vIFNldCB0aGUgY29ycmVjdCBNSU1FIHR5cGUgZm9yIENTUyBmaWxlc1xuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCIuY3NzXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gYGNzcy9bbmFtZV0tW2hhc2hdYDtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVksU0FBUyxvQkFBb0I7QUFDdGEsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixXQUFXO0FBQUEsRUFDWCxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsT0FBTztBQUFBLE1BQ2xCLFFBQVE7QUFBQTtBQUFBLFFBR04sZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUE7QUFBQSxRQUVoQixhQUFhLElBQUk7QUFDZixjQUFJLEdBQUcsU0FBUyxNQUFNLEdBQUc7QUFDdkIsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
