export const generateResponse = (): { text: string } => {
  const responses = [
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
  ];

  const randomIndex = Math.floor(Math.random() * responses.length);
  return {
    text: responses[randomIndex],
  };
};
