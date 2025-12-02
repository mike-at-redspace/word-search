import * as themes from "./themes/index";
import * as wordPools from "./wordPools/index";

/**
 * Level Configuration
 *
 * Define levels here with their id and display name.
 * The system will automatically load the matching theme and word pool files.
 *
 * To add a new level:
 * 1. Create a word pool file in constants/wordPools/{id}.js (export { idWords })
 * 2. Create a theme file in constants/themes/{id}.js (export { idTheme })
 * 3. Add an entry to this array
 *
 * To remove a level: remove it from this array
 */
const LEVEL_CONFIG = [
  { id: "tech", name: "Tech" },
  { id: "office", name: "Office" },
  { id: "nature", name: "Nature" },
  { id: "house", name: "Home" },
  { id: "pets", name: "Pets" },
  { id: "xmas", name: "Christmas" },
];

/**
 * Helper function to get theme by id
 * @param {string} id - The level id
 * @returns {Object|undefined} Theme object or undefined
 */
const getThemeById = (id) => {
  const themeKey = `${id}Theme`;
  return themes[themeKey];
};

/**
 * Helper function to get word pool by id
 * @param {string} id - The level id
 * @returns {Array|undefined} Word pool array or undefined
 */
const getWordPoolById = (id) => {
  const wordPoolKey = `${id}Words`;
  return wordPools[wordPoolKey];
};

/**
 * Dynamically build LEVELS array from configuration
 */
export const LEVELS = LEVEL_CONFIG.map((config) => {
  const theme = getThemeById(config.id);
  const wordPool = getWordPoolById(config.id);

  if (!theme) {
    console.warn(`Theme not found for level: ${config.id}`);
  }
  if (!wordPool) {
    console.warn(`Word pool not found for level: ${config.id}`);
  }

  return {
    id: config.id,
    name: config.name,
    theme: theme || {},
    wordPool: wordPool || [],
  };
});

/**
 * Get a level by its id
 * @param {string} id - The level id
 * @returns {Object|undefined} The level object or undefined if not found
 */
export const getLevelById = (id) => {
  return LEVELS.find((level) => level.id === id);
};

/**
 * Get the next level in the array (wraps around)
 * @param {string} currentId - The current level id
 * @returns {Object|undefined} The next level object or undefined if no levels exist
 */
export const getNextLevel = (currentId) => {
  const currentIndex = LEVELS.findIndex((level) => level.id === currentId);
  if (currentIndex === -1) return LEVELS[0];
  const nextIndex = (currentIndex + 1) % LEVELS.length;
  return LEVELS[nextIndex];
};

/**
 * Get all level ids
 * @returns {string[]} Array of all level ids
 */
export const getAllLevelIds = () => {
  return LEVELS.map((level) => level.id);
};

/**
 * Get the default level (first in array)
 * @returns {Object|undefined} The default level object
 */
export const getDefaultLevel = () => {
  return LEVELS[0];
};
