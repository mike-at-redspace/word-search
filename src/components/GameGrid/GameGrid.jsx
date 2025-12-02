import PropTypes from "prop-types";
import GridCell from "../GridCell/GridCell";
import styles from "./GameGrid.module.css";

function GameGrid({
  grid,
  isCellSelected,
  foundCellsMap,
  onMouseDown,
  onMouseEnter,
}) {
  return (
    <div className={styles.grid}>
      {grid.map((row, r) =>
        row.map((char, c) => (
          <GridCell
            key={`${r}-${c}`}
            row={r}
            col={c}
            char={char}
            isSelected={isCellSelected(r, c)}
            isFound={foundCellsMap.get(`${r},${c}`)}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
          />
        ))
      )}
    </div>
  );
}

GameGrid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  isCellSelected: PropTypes.func.isRequired,
  foundCellsMap: PropTypes.instanceOf(Map).isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
};

export default GameGrid;
