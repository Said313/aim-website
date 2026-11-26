import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: `${(process.env.PAGES_BASE_PATH ?? "").replace(/\/+$/, "")}/`,
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
      prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false },
      pages: [
        "/",
        "/en",
        "/ru",
        "/kz",
        "/sitemap.xml",
        "/aim-feedback/support",
        "/aim-feedback/privacy",
        "/aim-feedback/terms",
      ].map((path) => ({ path })),
    }),
    viteReact(),
  ],
});
