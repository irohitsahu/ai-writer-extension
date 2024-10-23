import { useState } from "react";
import LinkedInAiLogo from "@/assets/linkedin-ai-icon.svg";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <button
      onClick={() => setIsModalOpen(true)}
      className="p-2 hover:bg-gray-100 rounded-full"
    >
      <img src={LinkedInAiLogo} alt="ai-logo" />
    </button>
  );
};

export default App;
