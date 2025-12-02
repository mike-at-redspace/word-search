/**
 * Game Configuration Constants
 */
export const GRID_SIZE = 10;
export const NUM_WORDS_TO_FIND = 12;
export const MAX_RETRIES = 50;
export const STANDARD_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const WEIGHTED_LETTER_FACTOR = 4;

/**
 * Direction Vectors for Word Placement
 * Each direction defined by delta-row (dr) and delta-column (dc)
 */
export const DIRECTIONS = [
  { dr: 0, dc: 1 }, // Horizontal Right
  { dr: 1, dc: 0 }, // Vertical Down
  { dr: 1, dc: 1 }, // Diagonal Down-Right
  { dr: 1, dc: -1 }, // Diagonal Down-Left
  { dr: 0, dc: -1 }, // Horizontal Left
  { dr: -1, dc: 0 }, // Vertical Up
  { dr: -1, dc: -1 }, // Diagonal Up-Left
  { dr: -1, dc: 1 }, // Diagonal Up-Right
];
