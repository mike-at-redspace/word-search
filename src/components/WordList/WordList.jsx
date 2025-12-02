import { useState } from "react";
import PropTypes from "prop-types";
import { ChevronDown, List } from "lucide-react";
import styles from "./WordList.module.css";

const WordList = ({
  words,
  foundWords,
  currentThemeName,
  currentLevelId,
  allLevels,
  onLevelChange,
}) => {
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const progress =
    words.length > 0 ? (foundWords.size / words.length) * 100 : 0;

  const handleLevelSelect = (levelId) => {
    if (onLevelChange && levelId !== currentLevelId) {
      onLevelChange(levelId);
    }
    setShowLevelSelector(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <List className={styles.titleIcon} />
          <h3 className={styles.title}>
            WORDS ({foundWords.size}/{words.length})
          </h3>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className={styles.wordGrid}>
        {words.map((word) => {
          const found = foundWords.has(word);
          const wordClasses = [
            styles.wordItem,
            found ? styles.wordFound : styles.wordDefault,
          ].join(" ");

          return (
            <div key={word} className={wordClasses}>
              <span>{word}</span>
              {found && <div className={styles.indicator} />}
            </div>
          );
        })}
      </div>

      {currentThemeName && (
        <div className={styles.themeSection}>
          <div className={styles.themeName}>{currentThemeName}</div>
          {allLevels && allLevels.length > 1 && (
            <div className={styles.levelSelector}>
              <button
                className={styles.levelButton}
                onClick={() => setShowLevelSelector(!showLevelSelector)}
                aria-label="Switch level"
                title="Switch level"
              >
                <ChevronDown size={16} />
              </button>
              {showLevelSelector && (
                <div className={styles.levelDropdown}>
                  {allLevels.map((level) => (
                    <button
                      key={level.id}
                      className={`${styles.levelOption} ${
                        level.id === currentLevelId
                          ? styles.levelOptionActive
                          : ""
                      }`}
                      onClick={() => handleLevelSelect(level.id)}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

WordList.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  foundWords: PropTypes.instanceOf(Set).isRequired,
  currentThemeName: PropTypes.string,
  currentLevelId: PropTypes.string,
  allLevels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onLevelChange: PropTypes.func,
};

export default WordList;
