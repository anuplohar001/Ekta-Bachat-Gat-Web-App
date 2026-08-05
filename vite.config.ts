import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "SHG Finance",
        short_name: "SHG",
        description: "Self Help Group Financial Management",
        theme_color: "#2563eb",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",

        icons: [
          {
            src: "icon.jpeg",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icon.jpeg",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});