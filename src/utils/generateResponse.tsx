const generateRandomText = () => {
  const randomWords = [
    "AI",
    "Machine Learning",
    "Automation",
    "React",
    "Next.js",
    "Technology",
  ];
  return randomWords[Math.floor(Math.random() * randomWords.length)];
};
