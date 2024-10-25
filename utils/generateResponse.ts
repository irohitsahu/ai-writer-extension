export const generateResponse = (): { text: string } => {
  const responses = [
    "Thank you for your message! I understand your point and would love to help further.",
    "That's an interesting perspective. I'd be happy to explore this topic more with you.",
    "I appreciate you sharing that. Let me know if you'd like to discuss this in more detail.",
  ];

  const randomIndex = Math.floor(Math.random() * responses.length);
  return {
    text: responses[randomIndex],
  };
};
