import PropTypes from "prop-types";
import GameGrid from "../GameGrid/GameGrid";
import WordList from "../WordList/WordList";
import styles from "./GameArea.module.css";

function GameArea({
  grid,
  isCellSelected,
  foundCellsMap,
  onMouseDown,
  onMouseEnter,
  onTouchMove,
  onTouchEnd,
  onMouseUp,
  onMouseLeave,
  words,
  foundWords,
  currentThemeName,
  currentLevelId,
  allLevels,
  onLevelChange,
}) {
  return (
    <div className={styles.gameArea}>
      <div
        className={styles.gridWrapper}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <GameGrid
          grid={grid}
          isCellSelected={isCellSelected}
          foundCellsMap={foundCellsMap}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
        />
      </div>
      <WordList
        words={words}
        foundWords={foundWords}
        currentThemeName={currentThemeName}
        currentLevelId={currentLevelId}
        allLevels={allLevels}
        onLevelChange={onLevelChange}
      />
    </div>
  );
}

GameArea.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  isCellSelected: PropTypes.func.isRequired,
  foundCellsMap: PropTypes.instanceOf(Map).isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onTouchMove: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
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

export default GameArea;
