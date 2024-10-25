import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    manifest_version: 3,
    name: "Your Extension Name",
    version: "1.0.0",
    description: "A brief description of your extension.",
  },
});
