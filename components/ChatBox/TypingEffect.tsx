const TypingEffect = ({
  message,
  isTypingComplete,
  setIsTypingComplete,
}: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState("");

  if (!message) return null;

  console.log(message);
  useEffect(() => {
    setIsTypingComplete(false);
    setDisplayedText("");

    const typeMessage = async () => {
      for (let i = 0; i < message.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 30));
        setDisplayedText((prev) => prev + message.charAt(i));
      }
      setIsTypingComplete(true);
    };

    typeMessage();
  }, [message]);

  return (
    <p>
      {displayedText}
      {!isTypingComplete && <span className="typing-cursor">|</span>}
    </p>
  );
};

export default TypingEffect;
