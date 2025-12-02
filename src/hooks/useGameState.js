import { useState, useCallback, useEffect } from "react";
import {
  getLevelById,
  getNextLevel,
  getDefaultLevel,
} from "../constants/levels";
import { generateGameData } from "../helpers/gameLogic";

/**
 * Custom hook for managing game state including levels, words, and game over status
 *
 * @param {Function} onGameStart - Callback when game starts (for timer)
 * @param {Function} onGameEnd - Callback when game ends (for timer)
 * @returns {Object} Game state and controls
 */
export const useGameState = (onGameStart, onGameEnd) => {
  // Level state
  const [levelId, setLevelId] = useState(() => getDefaultLevel()?.id || "tech");
  const currentLevel = getLevelById(levelId) || getDefaultLevel();
  const nextLevel = getNextLevel(levelId);
  const theme = currentLevel?.theme;

  // Game state
  const [gameState, setGameState] = useState(() => generateGameData(levelId));
  const [foundWords, setFoundWords] = useState(new Set());
  const [isGameOver, setIsGameOver] = useState(false);

  /**
   * Start a new game with optional level change
   * @param {string} [newLevelId] - Optional new level ID
   */
  const startNewGame = useCallback(
    (newLevelId) => {
      // Use newLevelId if provided and valid, otherwise use current levelId
      let targetLevelId = levelId;
      if (
        newLevelId !== undefined &&
        newLevelId !== null &&
        typeof newLevelId === "string"
      ) {
        const targetLevel = getLevelById(newLevelId);
        if (targetLevel) {
          targetLevelId = newLevelId;
        }
      }

      // Ensure we have a valid level
      const targetLevel = getLevelById(targetLevelId);
      if (!targetLevel) {
        const defaultLevel = getDefaultLevel();
        targetLevelId = defaultLevel?.id || "tech";
      }

      setLevelId(targetLevelId);
      const data = generateGameData(targetLevelId);
      setGameState(data);
      setFoundWords(new Set());
      setIsGameOver(false);

      // Notify parent to reset timer
      if (onGameStart) {
        onGameStart();
      }
    },
    [levelId, onGameStart]
  );

  /**
   * Advance to the next level
   */
  const handleNextLevel = useCallback(() => {
    if (nextLevel) {
      startNewGame(nextLevel.id);
    }
  }, [nextLevel, startNewGame]);

  /**
   * Add a found word to the collection
   * @param {string} word - The word that was found
   */
  const addFoundWord = useCallback((word) => {
    setFoundWords((prev) => new Set([...prev, word]));
  }, []);

  // Check victory condition
  useEffect(() => {
    if (
      gameState.words.length > 0 &&
      foundWords.size === gameState.words.length &&
      !isGameOver
    ) {
      // This setState is intentional and necessary for game logic
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsGameOver(true);
      if (onGameEnd) {
        onGameEnd();
      }
    }
  }, [foundWords, gameState.words, isGameOver, onGameEnd]);

  return {
    gameState,
    foundWords,
    isGameOver,
    startNewGame,
    handleNextLevel,
    addFoundWord,
    currentLevel,
    nextLevel,
    theme,
  };
};
