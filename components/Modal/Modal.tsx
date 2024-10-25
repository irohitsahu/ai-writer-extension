// 1. check input for empty value error
// 2. no error then send the input value to generation utility
// 3. get generation value and send to type effect component
// 4 get the message box from dom and insert the generated value to message box

import generateIcon from "@/assets/icons/generate-icon.svg";
import { ChangeEvent } from "react";
import ChatBox from "../ChatBox/ChatBox";

interface Message {
  text: string;
  type: "user" | "ai";
}

const Modal = ({ closeModal }: { closeModal: () => void }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<boolean>(false);

  const handleGenerate = (): void => {
    if (inputValue === "") {
      setError(true);
      return;
    }

    const { text } = generateResponse();

    const userMessage: Message = {
      text: inputValue,
      type: "user",
    };

    const generatedMessage: Message = {
      text,
      type: "ai",
    };

    setMessages([userMessage, generatedMessage]);
    setInputValue("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    setError(false);
  };

  const handleInsert = () => {
    const messageBoxes = document.querySelectorAll<HTMLDivElement>(
      "div.msg-form__contenteditable[contenteditable='true']"
    );

    const lastBox = messageBoxes[messageBoxes.length - 1];
    const InputPlaceholder = lastBox.parentElement?.querySelector(
      ".msg-form__placeholder"
    );

    if (lastBox) {
      lastBox.setAttribute;
      const generatedMessage =
        messages.find((msg) => msg.type === "ai")?.text || "";

      lastBox.children[0].innerHTML = generatedMessage;

      InputPlaceholder?.classList.remove("msg-form__placeholder");
      lastBox.innerHTML = `<p>${generatedMessage}</p>`;
      const inputEvent = new Event("input", { bubbles: true });
      lastBox.dispatchEvent(inputEvent);

      lastBox.focus();

      setInputValue("");
      closeModal();
    }
  };

  return (
    <div className="cs-modal">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={closeModal}
      />
      <div className="cs-modal-body relative w-full max-w-lg shadow-xl">
        {messages.length !== 0 ? <ChatBox messages={messages} /> : null}

        <div className="input-btn-wrapper">
          <input
            className={`w-full px-4 py-2 rounded-lg ${
              error ? "error-input" : "primary-input "
            }`}
            placeholder={
              error ? "Please Enter a Prompt" : "Type your message..."
            }
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="flex justify-end items-center w-full gap-5">
            {messages.length > 0 && (
              <button className="secondary-btn" onClick={handleInsert}>
                Insert
              </button>
            )}

            <button className="primary-btn" onClick={handleGenerate}>
              <img src={generateIcon} alt="generate-logo" className="w-5 h-5" />
              <span className="font-semibold">Generate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
