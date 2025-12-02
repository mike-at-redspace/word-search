# Word Search PWA

[![Netlify Status](https://api.netlify.com/api/v1/badges/ae9e8797-96a9-4701-b674-0046111e9153/deploy-status)](https://app.netlify.com/projects/js-wordsearch/deploys)

**Live Demo:** [https://js-wordsearch.netlify.app/](https://js-wordsearch.netlify.app/)

A progressive web app word search puzzle game with multiple themed levels. Find hidden words in a grid by selecting letters horizontally, vertically, or diagonally.

## Features

- Multiple themed levels (Tech, Office, Nature, Home, Pets)
- Touch and mouse support for word selection
- Timer tracking
- Victory modal with completion time
- Installable PWA with offline support
- Responsive design optimized for mobile and desktop

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Play

1. Look at the word list to see which words you need to find
2. Click and drag (or touch and drag on mobile) to select letters in the grid
3. Words can be found horizontally, vertically, or diagonally in any direction
4. Found words will be highlighted and marked as complete
5. Complete all words to finish the level
6. Try to beat your best time!

## Technology Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **PWA Plugin** - Progressive Web App capabilities

## Third-Party Credits

This project uses the following open-source libraries and resources:

### Core Dependencies

- **[React](https://react.dev/)** (MIT) - A JavaScript library for building user interfaces
- **[React DOM](https://react.dev/)** (MIT) - React renderer for the web
- **[Vite](https://vitejs.dev/)** (MIT) - Next generation frontend tooling
- **[Tailwind CSS](https://tailwindcss.com/)** (MIT) - A utility-first CSS framework
- **[@tailwindcss/vite](https://tailwindcss.com/)** (MIT) - Tailwind CSS Vite plugin

### UI & Icons

- **[Lucide React](https://lucide.dev/)** (ISC) - Beautiful & consistent icon toolkit
- **[@number-flow/react](https://number-flow.dev/)** - Smooth number animations

### PWA & Build Tools

- **[vite-plugin-pwa](https://vite-pwa-org.netlify.app/)** (MIT) - PWA plugin for Vite
- **[Workbox](https://developers.google.com/web/tools/workbox)** (Apache-2.0) - JavaScript libraries for adding offline support to web apps (used by vite-plugin-pwa)

### Development Tools

- **[ESLint](https://eslint.org/)** (MIT) - Pluggable JavaScript linter
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)** (MIT) - Official React plugin for Vite

### Fonts

- **[Google Fonts](https://fonts.google.com/)** - Font families used:
  - Space Grotesk
  - Bebas Neue
  - Orbitron
  - Fira Sans
  - Unbounded
  - Quicksand
  - Comfortaa
  - Nunito
  - Fredoka
  - Poppins

## License

This project is private and not licensed for public use.
