import { memo } from "react";
import PropTypes from "prop-types";
import styles from "./GridCell.module.css";

const GridCell = memo(
  ({ char, row, col, isSelected, isFound, onMouseDown, onMouseEnter }) => {
    const cellClasses = [
      styles.cell,
      isFound
        ? styles.cellFound
        : isSelected
          ? styles.cellSelected
          : styles.cellDefault,
    ].join(" ");

    return (
      <div
        data-row={row}
        data-col={col}
        onMouseDown={(e) => onMouseDown(e, row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onTouchStart={(e) => onMouseDown(e, row, col)}
        className={cellClasses}
      >
        {char}
      </div>
    );
  }
);

GridCell.displayName = "GridCell";

GridCell.propTypes = {
  char: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isFound: PropTypes.bool,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
};

export default GridCell;
