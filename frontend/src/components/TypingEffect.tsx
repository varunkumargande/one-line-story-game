// src/components/TypingEffect.tsx
import React, { useState, useEffect } from "react";

const TypingEffect = ({ messages }: { messages: string[] }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset currentMessage when currentIndex changes
    setCurrentMessage("");

    const typingInterval = setInterval(() => {
      if (currentIndex >= messages.length) {
        // Reset index and start over
        setCurrentIndex(0);
      } else {
        const current = messages[currentIndex];
        setCurrentMessage((prevMessage) => {
          return prevMessage.length === current.length
            ? prevMessage
            : current.slice(0, prevMessage.length + 1);
        });
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentIndex, messages]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 2000); // Time to display the complete message before moving to the next

    return () => clearTimeout(timeout);
  }, [currentMessage]);

  return (
    <>
      <span>{currentMessage}</span>
      <span className="animate-blink">|</span>
    </>
  );
};

export default TypingEffect;
