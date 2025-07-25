# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Lint the codebase
npm run lint

# Preview production build
npm run preview

# Type checking
npm run build  # TypeScript compilation is integrated into the build process
```

## Architecture Overview

This is a React + TypeScript CV/Portfolio website built with Vite, featuring:

### Tech Stack
- React 18 with TypeScript
- Vite as build tool with Lightning CSS transformer
- React Router for routing
- SCSS modules for styling
- ESLint with Airbnb TypeScript configuration
- Framer Motion for animations
- Bootstrap and React Bootstrap for UI components
- FontAwesome for icons
- Vercel Analytics and Speed Insights

### Project Structure

```
src/
├── components/           # Reusable components, each with module SCSS
│   ├── background-code/  # Background code display with type switching
│   ├── card/            # Generic card component
│   ├── contact/         # Contact information section
│   ├── experiences/     # Work experience display
│   ├── header/          # Page header
│   ├── hobbies/         # Hobbies section
│   ├── my-info/         # Personal info display
│   ├── projects/        # Projects showcase with filtering
│   ├── section/         # Generic section wrapper
│   ├── skills/          # Skills display with filtering
│   └── top-button/      # Back to top button
├── pages/               # Route pages
│   ├── home.tsx         # Main page combining all sections
│   ├── changelog.tsx    # Changelog page
│   ├── project.tsx      # Individual project page
│   └── layout.tsx       # Common layout wrapper
└── assets/              # JSON data files
```

### Key Architectural Patterns

1. **Component Organization**: Each component has its own directory with TypeScript component file and SCSS module file. SCSS files are compiled to CSS with source maps.

2. **Data Management**: Static data is stored in JSON files (experiences.json, projects.json, skills.json) and imported directly into components.

3. **State Management**: Uses React hooks for local state. The Home component manages shared state for code type display and skill filtering, passing down to child components.

4. **Routing**: Uses React Router v6 with data loaders. Project pages use dynamic routes with slug parameters.

5. **Styling**: SCSS modules with CSS-in-JS support through Lightning CSS. Each component has isolated styles with module.scss files.

6. **Build Optimization**: Vite configuration includes vendor chunk splitting and manual chunks for React libraries to optimize bundle size.

### Important Configuration

- **TypeScript**: Strict mode enabled with bundler module resolution
- **ESLint**: Extended from Airbnb TypeScript config with React hooks rules
- **CSS**: Lightning CSS transformer for modern CSS features
- **Build**: Empty output directory on build, chunk size warning at 1500KB