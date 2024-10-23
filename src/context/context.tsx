import { createContext, ReactNode } from "react";

interface UIContextProps {
  isSuggestionModalVisible: boolean;
  setIsSuggestionModalVisible: (value: boolean) => void;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIContextProvider = ({ children }: { children: ReactNode }) => {
  const [isSuggestionModalVisible, setIsSuggestionModalVisible] =
    useState(false);

  const value = {
    isSuggestionModalVisible,
    setIsSuggestionModalVisible,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUIContext must be used within an AppProvider");
  }
  return context;
};
