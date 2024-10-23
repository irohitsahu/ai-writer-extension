import "@/styles/global.scss";
import { createRoot, Root } from "react-dom/client";
import type { ContentScriptContext } from "wxt/client";
import App from "@/entrypoints/content/App";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createUi(ctx);
    ui.mount();
  },
});

function createUi(ctx: ContentScriptContext) {
  const messageBox = document.querySelector("#username");
  const appContainer = document.createElement("div");
  const root: Root = createRoot(appContainer);

  return createShadowRootUi(ctx, {
    name: "linkedin-ai-writer",
    position: "inline",
    anchor: messageBox,
    append: "before",
    onMount: (uiContainer) => {
      appContainer.setAttribute("id", "linkedin-ai-writer-container");
      uiContainer.appendChild(appContainer);
      root.render(<App />);
    },
    onRemove: () => {
      root.unmount();
    },
  });
}
