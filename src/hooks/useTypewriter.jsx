import { useState, useEffect, useRef } from 'react';

// Custom hook for typewriter effect
const useTypewriter = (texts, options = {}) => {
  const {
    typeSpeed = 100,
    deleteSpeed = 50,
    pauseTime = 2000,
    loop = true,
    startDelay = 0
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const startTimeout = setTimeout(() => {
      setIsStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [texts, startDelay]);

  useEffect(() => {
    if (!isStarted || !texts || texts.length === 0) return;

    const currentText = texts[currentIndex];
    
    if (isTyping) {
      // Typing phase
      if (displayText.length < currentText.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        // Finished typing, pause before deleting
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, pauseTime);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
      } else {
        // Finished deleting, move to next text
        const nextIndex = (currentIndex + 1) % texts.length;
        if (nextIndex === 0 && !loop) {
          // If not looping and we've gone through all texts, stop
          return;
        }
        setCurrentIndex(nextIndex);
        setIsTyping(true);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, currentIndex, isTyping, isStarted, texts, typeSpeed, deleteSpeed, pauseTime, loop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return displayText;
};

export default useTypewriter;