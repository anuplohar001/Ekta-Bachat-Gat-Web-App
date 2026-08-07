import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "एकता युवा बचत गट (शो. सं . २०१९)",
        short_name: "एकता युवा बचत गट",
        description: "Self Help Group Financial Management",
        theme_color: "#1b4332",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",

        icons: [
          {
            src: "icon.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});