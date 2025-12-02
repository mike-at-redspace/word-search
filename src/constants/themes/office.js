/**
 * Office Theme
 * Professional blue/teal gradient theme with modern corporate aesthetic
 *
 * Fonts: Orbitron (display), Fira Sans (sans)
 */
export const officeTheme = {
  "--color-bg-main": "color(display-p3 0.08 0.10 0.15)",
  "--color-bg-main-gradient":
    "linear-gradient(100deg, color(display-p3 0.15 0.45 0.75) 14%, color(display-p3 0.10 0.65 0.70) 98%)",
  "--font-display": '"Orbitron", sans-serif',
  "--font-sans": '"Fira Sans", sans-serif',
  "--color-bg-card": "color(display-p3 1 1 1 / 0.07)",
  "--color-bg-card-border": "color(display-p3 1 1 1 / 0.12)",
  "--color-shadow-card": "0 2px 16px color(display-p3 0 0 0 / 0.08)",
  "--color-bg-accent": "color(display-p3 0.20 0.70 0.85 / 0.4)",
  "--color-bg-gradient":
    "linear-gradient(to right, color(display-p3 0.20 0.55 0.80) 40%, color(display-p3 0.15 0.70 0.75) 100%)",
  "--color-bg-gradient2":
    "linear-gradient(to bottom right, color(display-p3 0.20 0.55 0.80), color(display-p3 0.25 0.65 0.85))",
  "--color-bg-gradient-top": "color(display-p3 0.20 0.55 0.80 / 0.3)",
  "--color-bg-gradient-bottom": "color(display-p3 0.15 0.70 0.75 / 0.3)",
  "--color-bg-progress":
    "linear-gradient(to right, color(display-p3 0.20 0.55 0.80), color(display-p3 0.15 0.70 0.75))",
  "--color-bg-progress-bar": "color(display-p3 0 0 0 / 0.3)",
  "--color-bg-found":
    "linear-gradient(to right, color(display-p3 0.00 0.85 0.95) 40%, color(display-p3 0.15 0.75 0.95) 100%)",
  "--color-bg-word-default": "color(display-p3 0 0 0 / 0.2)",
  "--color-bg-word-hover": "color(display-p3 0 0 0 / 0.3)",
  "--color-bg-indicator": "color(display-p3 0.00 0.85 0.95)",
  "--color-wordlist-indicator": "color(display-p3 0.00 0.85 0.95)",
  "--color-bg-cell-default": "color(display-p3 1 1 1 / 0.05)",
  "--color-bg-cell-hover": "color(display-p3 1 1 1 / 0.10)",
  "--color-bg-cell-selected": "color(display-p3 0.00 0.85 0.95 / 0.6)",
  "--color-shadow-cell-selected":
    "0 0 15px color(display-p3 0.00 0.85 0.95 / 0.6)",
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
  "--color-bg-modal-icon": "color(display-p3 0.20 0.70 0.85 / 0.2)",
  "--color-bg-modal-icon-border": "color(display-p3 0.20 0.70 0.85 / 0.3)",
  "--color-shadow-modal-icon": "0 2px 8px color(display-p3 0 0 0 / 0.12)",
  "--color-bg-modal-time":
    "linear-gradient(to right, color(display-p3 0.20 0.55 0.80), color(display-p3 0.15 0.70 0.75))",
  "--color-bg-modal-button": "color(display-p3 0.15 0.60 0.75)",
  "--color-bg-modal-button-hover": "color(display-p3 0.20 0.70 0.85)",
  "--color-bg-modal-button-border": "color(display-p3 1 1 1 / 0.2)",
  "--color-text-main": "color(display-p3 1 1 1)",
  "--color-text-found": "color(display-p3 1 1 1)",
  "--color-text-word-default": "color(display-p3 0.85 0.92 0.98)",
  "--color-text-title": "color(display-p3 1 1 1)",
  "--color-text-progress": "color(display-p3 1 1 1)",
  "--color-text-modal-icon": "color(display-p3 0.20 0.70 0.85)",
  "--color-text-modal-subtitle": "color(display-p3 0.82 0.84 0.87)",
  "--color-text-timer": "color(display-p3 1 1 1)",
  "--color-text-restart": "color(display-p3 1 1 1)",
  "--color-timer-icon": "color(display-p3 0.00 0.85 0.95)",
  "--color-ring-found": "color(display-p3 0.00 0.85 0.95)",
  "--color-shadow-found": "0 0 8px color(display-p3 0.00 0.85 0.95 / 0.8)",
  "--color-shadow-indicator": "0 0 8px color(display-p3 0.00 0.85 0.95 / 0.8)",
  "--color-dropdown-active-indicator": "color(display-p3 0.00 0.85 0.95)",
  "--scrollbar-thumb": "color(display-p3 0.00 0.85 0.95 / 0.4)",
  "--scrollbar-thumb-hover": "color(display-p3 0.00 0.85 0.95 / 0.6)",
  "--scrollbar-thumb-active": "color(display-p3 0.00 0.85 0.95 / 0.8)",
  // PWA theme color for title bar
  themeColor: "#00d9f5",
};
