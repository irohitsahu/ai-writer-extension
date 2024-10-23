// 1. inject the button ui in message box when focused
// 2. remove the ui form box if focus looses
// 3.

import "@/styles/global.css";
import { createRoot, Root } from "react-dom/client";
import type { ContentScriptContext } from "wxt/client";
import App from "@/entrypoints/content/App";

import { setContentScriptContext } from "@/components/Modal/ModalPortal";
import { UIContextProvider } from "@/context/context";

type UiObject = {
  mount: () => void;
  remove: () => void;
};

let ui: UiObject | null = null;
let activeMessageBox: Element | null = null;

export default defineContentScript({
  matches: ["https://www.linkedin.com/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    // initial check
    setupMessageBoxListener(ctx);

    setContentScriptContext(ctx);

    // watching for dynamic changes
    const observer = new MutationObserver(() => {
      setupMessageBoxListener(ctx);
    });

    // observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
});

function setupMessageBoxListener(ctx: ContentScriptContext) {
  const messageBoxes = document.querySelectorAll(
    "div.msg-form__contenteditable[contenteditable='true']"
  );

  // event listeners for each message box
  messageBoxes.forEach((messageBox) => {
    // avoiding multiple listeners to the same box
    if (!messageBox.hasAttribute("data-listener-attached")) {
      messageBox.setAttribute("data-listener-attached", "true");

      messageBox.addEventListener("focusin", () =>
        handleFocus(ctx, messageBox)
      );
      // messageBox.addEventListener("focusout", () => handleBlur());
    }
  });
}
async function handleFocus(ctx: ContentScriptContext, messageBox: Element) {
  if (activeMessageBox !== messageBox) {
    if (ui) {
      ui.remove(); // button removal from the previously focused box
      ui = null;
    }
    activeMessageBox = messageBox; // focusd box is active

    // creating ui for the focused message box
    ui = await createUi(ctx, messageBox);
    ui.mount();
  }
}

function handleBlur() {
  if (ui) {
    ui.remove();
    ui = null;
  }
}

// create ui fucution using shadowroot
function createUi(ctx: ContentScriptContext, messageBox: Element) {
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
      root.render(
        <UIContextProvider>
          <App />
        </UIContextProvider>
      );
    },
    onRemove: () => {
      root.unmount();
    },
  });
}
