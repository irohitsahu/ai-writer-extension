// 1. inject the button ui in message box when focused
// 2. remove the ui form box if focus looses
// 3. add event on click of button to open modal
import "@/styles/global.css";
import { createRoot, Root } from "react-dom/client";
import type { ContentScriptContext } from "wxt/client";
import GenerationButton from "@/components/Button/GenerationButton";
import Modal from "@/components/Modal/Modal";

type UiObject = {
  mount: () => void;
  remove: () => void;
};

let ui: UiObject | null | undefined = null;

export default defineContentScript({
  matches: ["https://www.linkedin.com/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    setupMessageBoxObserver(ctx);
  },
});

function setupMessageBoxObserver(ctx: ContentScriptContext) {
  const observer = new MutationObserver(() => {
    setupMessageBoxListener(ctx);
  });

  // observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function setupMessageBoxListener(ctx: ContentScriptContext) {
  const messageBoxes = document.querySelectorAll(
    "div.msg-form__contenteditable[contenteditable='true']"
  );

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

// focusin
async function handleFocus(ctx: ContentScriptContext, messageBox: Element) {
  handleBlur();
  // creating ui for the focused message box
  ui = await createIconUi(ctx, messageBox);
  ui.mount();
}

// focusout
function handleBlur() {
  ui?.remove();
  ui = null;
}

// injecting IconUI
async function createIconUi(ctx: ContentScriptContext, messageBox: Element) {
  const mainContainer = document.createElement("div");
  const root: Root = createRoot(mainContainer);

  const iconUI = await createShadowRootUi(ctx, {
    name: "linkedin-ai-icon",
    position: "inline",
    anchor: messageBox,
    append: "before",
    onMount: (uiContainer) => {
      mainContainer.setAttribute("id", "linkedin-ai-icon");
      uiContainer.appendChild(mainContainer);
      const aiIconButton = uiContainer.querySelector("#linkedin-ai-icon");
      aiIconButton?.addEventListener("click", async (event) => {
        event.preventDefault();
        ui = await createModalUi(ctx);
        ui?.mount();
      });
      root.render(<GenerationButton />);
    },
    onRemove: () => {
      root.unmount();
    },
  });

  return iconUI;
}

// injecting ModalUI
async function createModalUi(ctx: ContentScriptContext) {
  const mainContainer = document.createElement("div");
  const root: Root = createRoot(mainContainer);

  const modalUI = await createShadowRootUi(ctx, {
    name: "linkedin-ai-modal",
    position: "inline",
    anchor: "body",
    append: "last",
    onMount: (uiModalContainer) => {
      injectFonts();
      uiModalContainer.appendChild(mainContainer);

      root.render(<Modal closeModal={handleBlur} />);
    },
    onRemove: () => {
      root.unmount();
    },
  });
  return modalUI;
}

// injecting Font
const injectFonts = () => {
  const preconnect1 = document.createElement("link");
  preconnect1.rel = "preconnect";
  preconnect1.href = "https://fonts.googleapis.com";
  document.head.appendChild(preconnect1);

  const preconnect2 = document.createElement("link");
  preconnect2.rel = "preconnect";
  preconnect2.href = "https://fonts.gstatic.com";
  preconnect2.crossOrigin = "anonymous";
  document.head.appendChild(preconnect2);

  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap";
  document.head.appendChild(fontLink);
};
