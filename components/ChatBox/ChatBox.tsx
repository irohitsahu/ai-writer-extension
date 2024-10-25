import { useEffect, useState } from "react";
import TypingEffect from "./TypingEffect";

const ChatBox = ({
  messages,
  isTypingComplete,
  setIsTypingComplete,
}: ChatBoxProps) => {
  return (
    <div className="w-full overflow-y-auto flex flex-col justify-start items-start gap-5 chat-wrapper">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`max-w-[70%] px-4 py-2 rounded-lg ${
            message.type === "user"
              ? "ml-auto chatbox user"
              : "mr-auto chatbox ai"
          }`}
        >
          {message.type === "ai" ? (
            <TypingEffect
              message={message.text}
              isTypingComplete={isTypingComplete}
              setIsTypingComplete={setIsTypingComplete}
            />
          ) : (
            <p>{message.text}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
