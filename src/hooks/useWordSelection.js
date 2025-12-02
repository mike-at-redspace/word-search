import { useState, useCallback, useMemo, useRef } from "react";
import { getCellsInPath, buildFoundCellsMap } from "../helpers/gameLogic";

/**
 * Custom hook for managing word selection (mouse/touch interactions)
 *
 * @param {Array<Array<string>>} grid - The game grid
 * @param {Array<string>} words - List of words to find
 * @param {Set<string>} foundWords - Set of already found words
 * @param {Function} onWordFound - Callback when a valid word is found
 * @returns {Object} Selection state and handlers
 */
export const useWordSelection = (grid, words, foundWords, onWordFound) => {
  const [selection, setSelection] = useState({
    active: false,
    start: null,
    current: null,
    cells: [],
  });

  // Track grid reference to detect changes
  const gridRef = useRef(grid);

  /**
   * Check if grid has changed and reset selection if needed
   * This avoids calling setState in an effect
   */
  const checkAndResetIfGridChanged = useCallback(() => {
    if (gridRef.current !== grid) {
      gridRef.current = grid;
      setSelection({
        active: false,
        start: null,
        current: null,
        cells: [],
      });
      return true; // Grid changed
    }
    return false; // Grid unchanged
  }, [grid]);

  /**
   * Reset selection state (used when switching levels/themes)
   */
  const resetSelection = useCallback(() => {
    setSelection({
      active: false,
      start: null,
      current: null,
      cells: [],
    });
  }, []);

  /**
   * Handle the start of a selection (mouse down or touch start)
   */
  const handleSelectionStart = useCallback(
    (e, row, col) => {
      if (e.type === "mousedown" || e.type === "touchstart") {
        e.preventDefault();
      }

      // Reset selection if grid has changed
      checkAndResetIfGridChanged();

      const startNode = { row, col };
      setSelection({
        active: true,
        start: startNode,
        current: startNode,
        cells: [startNode],
      });
    },
    [checkAndResetIfGridChanged]
  );

  /**
   * Handle hovering/entering a cell during selection
   */
  const handleCellEnter = useCallback(
    (row, col) => {
      // Reset selection if grid has changed
      if (checkAndResetIfGridChanged()) {
        return;
      }

      setSelection((prev) => {
        if (!prev.active) return prev;

        // Skip if we're already on this cell
        if (
          prev.current &&
          prev.current.row === row &&
          prev.current.col === col
        )
          return prev;

        const current = { row, col };
        const newCells = getCellsInPath(prev.start, current);

        return {
          ...prev,
          current,
          cells: newCells,
        };
      });
    },
    [checkAndResetIfGridChanged]
  );

  /**
   * Handle the end of a selection (mouse up or touch end)
   */
  const handleSelectionEnd = useCallback(() => {
    // Reset selection if grid has changed
    if (checkAndResetIfGridChanged()) {
      return;
    }

    setSelection((prev) => {
      if (!prev.active) return prev;

      // Build the selected word from cells
      const word = prev.cells.map((c) => grid[c.row][c.col]).join("");
      const reversedWord = word.split("").reverse().join("");

      // Check if it matches any word we're looking for
      const matchedWord = words.find((w) => w === word || w === reversedWord);

      if (matchedWord && !foundWords.has(matchedWord)) {
        onWordFound(matchedWord);
      }

      // Clear selection
      return { active: false, start: null, current: null, cells: [] };
    });
  }, [grid, words, foundWords, onWordFound, checkAndResetIfGridChanged]);

  /**
   * Handle touch move events for mobile
   */
  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault();

      // Reset selection if grid has changed
      if (checkAndResetIfGridChanged()) {
        return;
      }

      setSelection((prev) => {
        if (!prev.active) return prev;

        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);

        if (target && target.dataset.row) {
          const row = parseInt(target.dataset.row);
          const col = parseInt(target.dataset.col);

          // Skip if we're already on this cell
          if (
            prev.current &&
            prev.current.row === row &&
            prev.current.col === col
          )
            return prev;

          const current = { row, col };
          const newCells = getCellsInPath(prev.start, current);

          return {
            ...prev,
            current,
            cells: newCells,
          };
        }

        return prev;
      });
    },
    [checkAndResetIfGridChanged]
  );

  /**
   * Check if a specific cell is currently selected
   */
  const isCellSelected = useCallback(
    (r, c) => selection.cells.some((cell) => cell.row === r && cell.col === c),
    [selection.cells]
  );

  /**
   * Build a map of all cells that are part of found words
   */
  const foundCellsMap = useMemo(
    () => buildFoundCellsMap(foundWords, grid),
    [foundWords, grid]
  );

  return {
    selection,
    handleSelectionStart,
    handleCellEnter,
    handleSelectionEnd,
    handleTouchMove,
    isCellSelected,
    foundCellsMap,
    resetSelection,
  };
};
