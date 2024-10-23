import { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import type {
  ContentScriptContext,
  ShadowRootContentScriptUi,
} from "wxt/client";

interface ModalPortalProps {
  children: React.ReactNode;
  onClose: () => void;
}

let contentScriptContext: ContentScriptContext | null = null;
export const setContentScriptContext = (ctx: ContentScriptContext) => {
  contentScriptContext = ctx;
};

const ModalPortal = ({ children, onClose }: ModalPortalProps) => {
  const modalRoot = useRef<HTMLDivElement | null>(null);
  const reactRoot = useRef<Root | null>(null);
  const uiRef = useRef<ShadowRootContentScriptUi<void> | null>(null);

  useEffect(() => {
    const initializeModal = async () => {
      if (!modalRoot.current) {
        modalRoot.current = document.createElement("div");
        document.body.appendChild(modalRoot.current);
      }

      if (contentScriptContext && !uiRef.current) {
        const ui = await createShadowRootUi(contentScriptContext, {
          name: "linkedin-ai-modal",
          position: "inline",
          anchor: "body",
          append: "last",
          onMount: (container) => {
            reactRoot.current = createRoot(
              container.appendChild(document.createElement("div"))
            );
            reactRoot.current.render(children);
          },
          onRemove: () => {
            // Don't create a new root here, just cleanup if needed
            reactRoot.current?.unmount();
          },
        });

        uiRef.current = ui;
        await ui.mount();
      } else if (reactRoot.current) {
        // If we already have a root, just update the content
        reactRoot.current.render(children);
      }
    };

    initializeModal();

    // Cleanup function
    return () => {
      setTimeout(() => {
        uiRef.current?.remove();
        reactRoot.current?.unmount();
        if (modalRoot.current) document.body.removeChild(modalRoot.current);
        modalRoot.current = null;
        reactRoot.current = null;
        uiRef.current = null;
      }, 0);
    };
  }, [children]); // Empty dependency array as we handle updates via children prop

  // Effect for rendering updates
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return null;
};

export default ModalPortal;
