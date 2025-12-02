/**
 * Nature Theme
 * Fresh greens and earth tones with natural aesthetic
 *
 * Fonts: Unbounded (display), Quicksand (sans)
 */
export const natureTheme = {
  "--color-bg-main": "color(display-p3 0.09 0.18 0.10)",
  "--color-bg-main-gradient":
    "linear-gradient(100deg, color(display-p3 0.32 0.67 0.36) 14%, color(display-p3 0.13 0.38 0.18) 98%)",

  "--font-display": '"Unbounded", cursive',
  "--font-sans": '"Quicksand", sans-serif',

  "--color-bg-card": "color(display-p3 1 1 1 / 0.07)",
  "--color-bg-card-border": "color(display-p3 1 1 1 / 0.12)",
  "--color-shadow-card": "0 2px 16px color(display-p3 0 0 0 / 0.08)",

  "--color-bg-accent": "color(display-p3 0.36 0.72 0.40 / 0.45)",

  "--color-bg-gradient":
    "linear-gradient(to right, color(display-p3 0.32 0.67 0.36) 40%, color(display-p3 0.13 0.38 0.18) 100%)",

  "--color-bg-gradient2":
    "linear-gradient(to bottom right, color(display-p3 0.32 0.67 0.36), color(display-p3 0.13 0.38 0.18))",

  "--color-bg-gradient-top": "color(display-p3 0.32 0.67 0.36 / 0.3)",
  "--color-bg-gradient-bottom": "color(display-p3 0.13 0.38 0.18 / 0.3)",

  "--color-bg-progress":
    "linear-gradient(to right, color(display-p3 0.32 0.67 0.36), color(display-p3 0.13 0.38 0.18))",

  "--color-bg-progress-bar": "color(display-p3 0 0 0 / 0.3)",

  /* ---------------------------------------------------------
     IMPROVED STATES
     - Found: bright, high-contrast yellow-green
     - Selected: deeper teal-green, far from background color
     --------------------------------------------------------- */

  "--color-bg-found":
    "linear-gradient(to right, color(display-p3 0.68 0.89 0.28) 40%, color(display-p3 0.46 0.78 0.32) 100%)",

  "--color-bg-cell-selected": "color(display-p3 0.68 0.89 0.28 / 0.8)",

  "--color-shadow-cell-selected":
    "0 0 15px color(display-p3 0.68 0.89 0.28 / 0.8)",

  "--color-bg-word-default": "color(display-p3 0 0 0 / 0.2)",
  "--color-bg-word-hover": "color(display-p3 0 0 0 / 0.3)",

  "--color-bg-indicator": "color(display-p3 0.36 0.72 0.40)",
  "--color-wordlist-indicator": "color(display-p3 0.68 0.89 0.28)",

  "--color-bg-cell-default": "color(display-p3 1 1 1 / 0.05)",
  "--color-bg-cell-hover": "color(display-p3 1 1 1 / 0.10)",

  "--color-shadow-found": "0 0 8px color(display-p3 0.68 0.89 0.28 / 0.75)",

  "--color-bg-controls": "color(display-p3 1 1 1 / 0.10)",
  "--color-bg-controls-border": "color(display-p3 1 1 1 / 0.12)",
  "--color-shadow-controls": "0 2px 16px color(display-p3 0 0 0 / 0.08)",

  "--color-bg-timer": "color(display-p3 0 0 0 / 0.20)",
  "--color-bg-restart": "color(display-p3 1 1 1 / 0.10)",
  "--color-bg-restart-hover": "color(display-p3 1 1 1 / 0.20)",

  "--color-bg-modal-overlay": "color(display-p3 0 0 0 / 0.35)",
  "--color-bg-modal": "color(display-p3 0 0 0 / 0.3)",
  "--color-bg-modal-border": "color(display-p3 1 1 1 / 0.8)",
  "--color-shadow-modal": "0 8px 32px color(display-p3 0 0 0 / 0.25)",

  "--color-bg-modal-icon": "color(display-p3 0.36 0.72 0.40 / 0.2)",
  "--color-bg-modal-icon-border": "color(display-p3 0.36 0.72 0.40 / 0.3)",
  "--color-shadow-modal-icon": "0 2px 8px color(display-p3 0 0 0 / 0.12)",

  "--color-bg-modal-time":
    "linear-gradient(to right, color(display-p3 0.32 0.67 0.36), color(display-p3 0.13 0.38 0.18))",

  "--color-bg-modal-button": "color(display-p3 0.18 0.55 0.22)",
  "--color-bg-modal-button-hover": "color(display-p3 0.32 0.67 0.36)",
  "--color-bg-modal-button-border": "color(display-p3 1 1 1 / 0.2)",

  "--color-text-main": "color(display-p3 1 1 1)",

  "--color-text-found": "color(display-p3 0.10 0.20 0.05)",

  "--color-text-word-default": "color(display-p3 0.80 0.99 0.80)",

  "--color-text-title": "color(display-p3 1 1 1)",
  "--color-text-progress": "color(display-p3 1 1 1)",
  "--color-text-modal-icon": "color(display-p3 0.36 0.72 0.40)",
  "--color-text-modal-subtitle": "color(display-p3 0.82 0.84 0.87)",
  "--color-text-timer": "color(display-p3 1 1 1)",
  "--color-text-restart": "color(display-p3 1 1 1)",

  "--color-timer-icon": "color(display-p3 0.36 0.72 0.40)",

  "--color-ring-found": "color(display-p3 0.68 0.89 0.28)",
  "--color-dropdown-active-indicator": "color(display-p3 0.32 0.67 0.36)",
  "--scrollbar-thumb": "color(display-p3 0.36 0.72 0.40 / 0.4)",
  "--scrollbar-thumb-hover": "color(display-p3 0.36 0.72 0.40 / 0.6)",
  "--scrollbar-thumb-active": "color(display-p3 0.36 0.72 0.40 / 0.8)",
  // PWA theme color for title bar
  themeColor: "#52ab5a",
};
