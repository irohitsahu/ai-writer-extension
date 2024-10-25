import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    manifest_version: 3,
    name: "AI Writer for LinkedIn",
    version: "1.0.0",
    description: "Generates AI response for Linked Messages",
  },
});
