import { useEffect } from "react";
import Header from "./components/Header/Header";
import VictoryModal from "./components/VictoryModal/VictoryModal";
import GameArea from "./components/GameArea/GameArea";
import Background from "./components/Background/Background";
import InstallPrompt from "./components/InstallPrompt/InstallPrompt";
import { formatTime } from "./helpers/gameLogic";
import { useTimer } from "./hooks/useTimer";
import { useGameState } from "./hooks/useGameState";
import { useWordSelection } from "./hooks/useWordSelection";
import { LEVELS } from "./constants/levels";
import styles from "./App.module.css";

function App() {
  // Timer hook
  const { elapsedTime, startTimer, pauseTimer, minutes, seconds } = useTimer();

  // Game state hook
  const {
    gameState,
    foundWords,
    isGameOver,
    startNewGame,
    handleNextLevel,
    addFoundWord,
    currentLevel,
    nextLevel,
    theme,
  } = useGameState(startTimer, pauseTimer);

  // Word selection hook
  const {
    handleSelectionStart,
    handleCellEnter,
    handleSelectionEnd,
    handleTouchMove,
    isCellSelected,
    foundCellsMap,
  } = useWordSelection(
    gameState.grid,
    gameState.words,
    foundWords,
    addFoundWord
  );

  // Apply theme to main element and update scrollbar colors
  useEffect(() => {
    const main = document.querySelector("main");
    const root = document.documentElement;
    const body = document.body;

    if (main && theme) {
      Object.entries(theme).forEach(([key, value]) => {
        // Skip themeColor as it's not a CSS variable
        if (key !== "themeColor") {
          main.style.setProperty(key, value);
        }
      });

      // Update html/body background to match theme (prevents white flash on desktop)
      if (theme["--color-bg-main"]) {
        root.style.setProperty("background-color", theme["--color-bg-main"]);
        body.style.setProperty("background-color", theme["--color-bg-main"]);
      }
      if (theme["--color-bg-main-gradient"]) {
        root.style.setProperty(
          "background-image",
          theme["--color-bg-main-gradient"]
        );
        body.style.setProperty(
          "background-image",
          theme["--color-bg-main-gradient"]
        );
      }

      // Update scrollbar colors from theme
      if (theme["--scrollbar-thumb"]) {
        root.style.setProperty("--scrollbar-thumb", theme["--scrollbar-thumb"]);
      }
      if (theme["--scrollbar-thumb-hover"]) {
        root.style.setProperty(
          "--scrollbar-thumb-hover",
          theme["--scrollbar-thumb-hover"]
        );
      }
      if (theme["--scrollbar-thumb-active"]) {
        root.style.setProperty(
          "--scrollbar-thumb-active",
          theme["--scrollbar-thumb-active"]
        );
      }

      // Update PWA theme-color meta tag dynamically
      if (theme.themeColor) {
        let themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (!themeColorMeta) {
          themeColorMeta = document.createElement("meta");
          themeColorMeta.setAttribute("name", "theme-color");
          document.head.appendChild(themeColorMeta);
        }
        themeColorMeta.setAttribute("content", theme.themeColor);
      }
    }
  }, [theme]);

  // Start timer on mount
  useEffect(() => {
    startTimer();
  }, [startTimer]);

  return (
    <main className={styles.container}>
      <Background />

      <div className={styles.content}>
        <Header minutes={minutes} seconds={seconds} onRestart={startNewGame} />
        <GameArea
          grid={gameState.grid}
          isCellSelected={isCellSelected}
          foundCellsMap={foundCellsMap}
          onMouseDown={handleSelectionStart}
          onMouseEnter={handleCellEnter}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleSelectionEnd}
          onMouseUp={handleSelectionEnd}
          onMouseLeave={handleSelectionEnd}
          words={gameState.words}
          foundWords={foundWords}
          currentThemeName={currentLevel?.name}
          currentLevelId={currentLevel?.id}
          allLevels={LEVELS}
          onLevelChange={startNewGame}
        />
      </div>

      {isGameOver && (
        <VictoryModal
          time={formatTime(elapsedTime)}
          onRestart={() => startNewGame()}
          onNextLevel={handleNextLevel}
          nextLevelTheme={nextLevel?.theme}
          currentTheme={theme}
        />
      )}

      <InstallPrompt />
    </main>
  );
}

export default App;
