import {
  GRID_SIZE,
  NUM_WORDS_TO_FIND,
  MAX_RETRIES,
  STANDARD_ALPHABET,
  WEIGHTED_LETTER_FACTOR,
  DIRECTIONS,
} from "../constants/game";
import { getLevelById, getDefaultLevel } from "../constants/levels";

/**
 * Format seconds into MM:SS format
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

/**
 * Get all cells in a path from start to end
 * Supports horizontal, vertical, and diagonal lines
 * @param {Object} start - Starting cell with {row, col}
 * @param {Object} end - Ending cell with {row, col}
 * @returns {Array<Object>} Array of cell objects with {row, col}
 */
export const getCellsInPath = (start, end) => {
  const path = [];
  const dr = Math.sign(end.row - start.row);
  const dc = Math.sign(end.col - start.col);

  // Check if valid line (horizontal, vertical, or perfect diagonal)
  const isHorizontal = dr === 0 && dc !== 0;
  const isVertical = dr !== 0 && dc === 0;
  const isDiagonal =
    Math.abs(end.row - start.row) === Math.abs(end.col - start.col) &&
    dr !== 0 &&
    dc !== 0;

  // If not a valid straight line, return only the start cell
  if (!(isHorizontal || isVertical || isDiagonal)) return [start];

  let r = start.row;
  let c = start.col;

  // Safety break to prevent infinite loops (max 2x grid size)
  let steps = 0;
  while (steps < GRID_SIZE * 2) {
    path.push({ row: r, col: c });
    if (r === end.row && c === end.col) break;
    r += dr;
    c += dc;
    steps++;
  }
  return path;
};

/**
 * Check if a word can be placed at the given position and direction
 */
const canPlaceWord = (grid, word, row, col, dr, dc) => {
  for (let i = 0; i < word.length; i++) {
    const nr = row + i * dr;
    const nc = col + i * dc;
    if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE) return false;
    if (grid[nr][nc] !== "" && grid[nr][nc] !== word[i]) return false;
  }
  return true;
};

/**
 * Place a word on the grid at the specified position and direction
 */
const placeWord = (grid, word, row, col, dr, dc) => {
  for (let i = 0; i < word.length; i++) {
    grid[row + i * dr][col + i * dc] = word[i];
  }
};

/**
 * Attempt to place a single word on the grid
 * Returns true if successful, false otherwise
 */
const tryPlaceWord = (grid, word) => {
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    const useReverse = Math.random() < 0.5;
    const wordToPlace = useReverse ? word.split("").reverse().join("") : word;
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);
    const { dr, dc } =
      DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];

    if (canPlaceWord(grid, wordToPlace, row, col, dr, dc)) {
      placeWord(grid, wordToPlace, row, col, dr, dc);
      return true;
    }
    attempts++;
  }

  return false;
};

/**
 * Create a weighted alphabet favoring letters from placed words
 */
const createWeightedAlphabet = (placedWords) => {
  const placedLetters = placedWords.join("").toUpperCase().split("");
  const uniquePlacedLetters = [...new Set(placedLetters)].join("");

  let weightedAlphabet = uniquePlacedLetters.repeat(WEIGHTED_LETTER_FACTOR);

  // Add all other letters to ensure coverage
  for (const char of STANDARD_ALPHABET) {
    if (!uniquePlacedLetters.includes(char)) {
      weightedAlphabet += char;
    }
  }

  return weightedAlphabet;
};

/**
 * Fill empty cells with weighted random letters
 */
const fillEmptyCells = (grid, placedWords) => {
  const weightedAlphabet = createWeightedAlphabet(placedWords);

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === "") {
        const randomIndex = Math.floor(Math.random() * weightedAlphabet.length);
        grid[r][c] = weightedAlphabet[randomIndex];
      }
    }
  }
};

/**
 * Generate a complete word search puzzle
 * Returns { grid, words }
 */
/**
 * Generate a complete word search puzzle for a given level
 * @param {string} levelId - The level id (e.g., "tech", "office", "nature")
 * @returns {Object} Object with { grid: Array<Array<string>>, words: Array<string> }
 */
export const generateGameData = (levelId) => {
  let grid;
  let placedWords;
  let attempts = 0;

  // Get level config, fallback to default if not found
  const level = getLevelById(levelId) || getDefaultLevel();

  // Ensure we have a valid word pool array
  let pool = level?.wordPool;
  if (!Array.isArray(pool)) {
    pool = [];
  }

  // Filter out any invalid entries (non-strings, empty strings, etc.)
  pool = pool.filter((word) => typeof word === "string" && word.length > 0);

  if (pool.length === 0) {
    // Return a minimal valid game state as fallback
    return {
      grid: Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill("A")),
      words: [],
    };
  }

  // Determine how many words we can actually use
  const wordsToFind = Math.min(NUM_WORDS_TO_FIND, pool.length);
  const effectiveMaxRetries = Math.max(MAX_RETRIES * 4, 200);

  // Create a Set for fast lookup to ensure word pool integrity
  const poolSet = new Set(pool);

  do {
    // Select random words from pool - ensure we're using a fresh copy
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selectedWords = shuffled.slice(0, wordsToFind);

    // Strictly filter to ensure all selected words are in the pool
    const validSelectedWords = selectedWords.filter((word) =>
      poolSet.has(word)
    );

    // Initialize empty grid
    grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(""));
    placedWords = [];

    // Attempt to place each word on the grid
    validSelectedWords.forEach((word) => {
      if (tryPlaceWord(grid, word)) {
        placedWords.push(word);
      }
    });

    attempts++;

    // Only break if we've exceeded the retry limit
    // Keep trying until we get exactly wordsToFind words
    if (attempts >= effectiveMaxRetries && placedWords.length < wordsToFind) {
      break;
    }
  } while (placedWords.length < wordsToFind);

  // Final validation: ensure all placed words are from the correct pool
  placedWords = placedWords.filter((word) => poolSet.has(word));

  // Fill empty spaces with weighted random letters for better camouflage
  fillEmptyCells(grid, placedWords);

  return { grid, words: placedWords };
};

/**
 * Find all cell coordinates for a word starting at a given position and direction
 * @param {Array<Array<string>>} grid - The game grid
 * @param {string} word - The word to find
 * @param {number} startRow - Starting row position
 * @param {number} startCol - Starting column position
 * @param {number} dr - Row direction delta
 * @param {number} dc - Column direction delta
 * @returns {Array<string>|null} Array of cell coordinates "row,col" or null if no match
 */
const findWordCellsAtPosition = (grid, word, startRow, startCol, dr, dc) => {
  const coords = [];

  for (let i = 0; i < word.length; i++) {
    const nr = startRow + i * dr;
    const nc = startCol + i * dc;

    // Check bounds and character match
    if (
      nr < 0 ||
      nr >= GRID_SIZE ||
      nc < 0 ||
      nc >= GRID_SIZE ||
      grid[nr][nc] !== word[i]
    ) {
      return null;
    }
    coords.push(`${nr},${nc}`);
  }

  return coords;
};

/**
 * Find all cells in the grid that match a specific word in any direction
 * @param {Array<Array<string>>} grid - The game grid
 * @param {string} word - The word to find
 * @returns {Array<string>} Array of cell coordinates "row,col"
 */
const findWordCells = (grid, word) => {
  const allCells = [];

  // Check both forward and reversed versions of the word
  const variants = [word, word.split("").reverse().join("")];

  variants.forEach((wordToCheck) => {
    // Search through all starting positions
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        // Only check if first character matches
        if (grid[r][c] === wordToCheck[0]) {
          // Try all directions
          DIRECTIONS.forEach(({ dr, dc }) => {
            const coords = findWordCellsAtPosition(
              grid,
              wordToCheck,
              r,
              c,
              dr,
              dc
            );
            if (coords) {
              allCells.push(...coords);
            }
          });
        }
      }
    }
  });

  return allCells;
};

/**
 * Build a map of all cells that are part of found words
 * Returns Map with key "row,col" -> true
 */
export const buildFoundCellsMap = (foundWords, grid) => {
  const map = new Map();
  if (grid.length === 0) return map;

  foundWords.forEach((word) => {
    const cells = findWordCells(grid, word);
    cells.forEach((coord) => map.set(coord, true));
  });

  return map;
};
