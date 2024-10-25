interface TypingEffectProps {
  message: string;
}

const TypingEffect = ({ message }: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  if (!message) return null;

  console.log(message);
  useEffect(() => {
    setIsTyping(true);
    setDisplayedText("");

    const typeMessage = async () => {
      for (let i = 0; i < message.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 30));
        setDisplayedText((prev) => prev + message.charAt(i));
      }
      setIsTyping(false);
    };

    typeMessage();
  }, [message]);

  return (
    <p>
      {displayedText}
      {isTyping && <span className="typing-cursor">|</span>}
    </p>
  );
};

export default TypingEffect;
