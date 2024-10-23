import ModalPortal from "@/components/Modal/ModalPortal";
import { useUIContext } from "@/context/context";
import generateIcon from "@/assets/icons/generate-icon.svg";
import { ChangeEvent } from "react";

const Modal = () => {
  const { isSuggestionModalVisible, setIsSuggestionModalVisible } =
    useUIContext();
  const [inputValue, setInputValue] = useState<string>("");
  const [generatedText, setGeneratedText] = useState<string>("");
  const onClose = () => setIsSuggestionModalVisible(false);

  if (!isSuggestionModalVisible) return null;

  const handleGenerate = (): void => {
    if (inputValue.trim()) {
      const randomText = generateRandomText();
      setGeneratedText(randomText); // Set the generated random text
    }
  };

  const handleInsert = (): void => {
    if (inputValue.trim() && generatedText) {
      setInputValue((prev) => `${prev} ${generatedText}`); // Append generated text to input value
      setGeneratedText(""); // Clear generated text after insertion
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const modalContent = (
    <div className="cs-modal">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="cs-modal-body relative w-full max-w-lg shadow-xl">
        <input
          className="primary-input"
          placeholder="Your prompt"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        {generatedText && (
          <div className="flex items-center gap-2 mt-4">
            <span>{generatedText}</span>
            <button className="primary-btn" onClick={handleInsert}>
              Insert
            </button>
          </div>
        )}
        <button className="primary-btn ml-auto" onClick={handleGenerate}>
          <img src={generateIcon} alt="generate-logo" className="w-5 h-5" />
          <span className="font-semibold">Generate</span>
        </button>
      </div>
    </div>
  );

  return <ModalPortal onClose={onClose}>{modalContent}</ModalPortal>;
};

export default Modal;
