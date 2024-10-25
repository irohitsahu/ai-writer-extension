type UiObject =
  | {
      uiContainer: HTMLElement;
      mount: () => void;
      remove: () => void;
    }
  | null
  | undefined;

interface TypingEffectProps {
  message: string;
  isTypingComplete: boolean;
  setIsTypingComplete: (value: boolean) => void;
}

interface Message {
  text: string;
  type: "user" | "ai";
}

interface ChatBoxProps {
  messages: { text: string; type: "user" | "ai" }[];
  isTypingComplete: boolean;
  setIsTypingComplete: (value: boolean) => void;
}

interface UIContextProps {
  isTypingComplete: boolean;
  setIsTypingComplete: (value: boolean) => void;
}
