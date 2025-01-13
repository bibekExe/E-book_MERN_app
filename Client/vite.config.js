import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://e-book-mern-app.onrender.com", // Your backend base URL
        changeOrigin: true,
        secure: false, // If the backend uses HTTPS but without a valid certificate, set to false
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Remove /api prefix
      },
    },
  },
});
