import LinkedInAiLogo from "@/assets/icons/linkedin-ai-icon.svg";
import { useUIContext } from "@/context/context";

const GenerationButton = () => {
  const { isSuggestionModalVisible, setIsSuggestionModalVisible } =
    useUIContext();
  return (
    <button
      onClick={() => setIsSuggestionModalVisible(!isSuggestionModalVisible)}
      className="p-2 hover:bg-gray-100 rounded-full"
    >
      <img src={LinkedInAiLogo} alt="ai-logo" />
    </button>
  );
};

export default GenerationButton;
