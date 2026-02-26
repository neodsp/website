// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://neodsp.com",
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      langs: ["rust", "toml", "bash"],
    },
  },
  build: {
    inlineStylesheets: "always",
  },
});
