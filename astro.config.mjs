import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://drackthor.me",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        // devenv/direnv place symlinks into the Nix store here. Chokidar
        // follows symlinks by default and would recursively stat the whole
        // store closure, pinning the CPU. Exclude them from the watcher.
        ignored: [
          "**/.devenv/**",
          "**/.direnv/**",
          "**/dist/**",
          "**/node_modules/**",
          "**/.claude/**",
        ],
      },
    },
  },
});
