import { useState, useRef, useCallback } from "react";

/**
 * Custom hook for managing game timer
 * 
 * @returns {Object} Timer state and controls
 * @returns {number} elapsedTime - Elapsed time in seconds
 * @returns {Function} startTimer - Start/restart the timer
 * @returns {Function} pauseTimer - Pause the timer
 * @returns {number} minutes - Current minutes for display
 * @returns {number} seconds - Current seconds for display
 */
export const useTimer = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Reset elapsed time and start new timer
    setElapsedTime(0);
    const startTime = Date.now();
    
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
  }, []);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Calculate minutes and seconds for display
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return {
    elapsedTime,
    startTimer,
    pauseTimer,
    minutes,
    seconds,
  };
};

