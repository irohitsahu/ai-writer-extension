import ExtensionSettings from "@/components/ExtensionSettings";
import NotSupported from "@/components/NotSupported";
import { useUIContext } from "@/context/context";

function App() {
  const { isExtensionSupported, setIsExtensionSupported } = useUIContext();
  return (
    <div className="popup-container">
      <NotSupported />
      <ExtensionSettings />
    </div>
  );
}

export default App;
