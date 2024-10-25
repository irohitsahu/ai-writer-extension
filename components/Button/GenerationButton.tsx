import LinkedInAiLogo from "@/assets/icons/linkedin-ai-icon.svg";

const GenerationButton = () => {
  return (
    <button className="p-0 rounded-full shadow-lg">
      <img src={LinkedInAiLogo} alt="ai-logo" className="w-10 h-10" />
    </button>
  );
};

export default GenerationButton;
