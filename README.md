# Week 07: JavaScript Best Practice

## Author

- **Name:** Tracey Wanjiru
- **GitHub:** [@traceywanjiru](https://github.com/traceywanjiru)
- **Date:** November 13, 2026

## Project Description

A refactored, modular, and persistent To-Do List application alongside dedicated daily challenge mini-projects (Shopping Cart with Undo History, Notes App, Session Storage Form Auto-Save, Theme Persistence, and Recent Searches). Built to apply modern JavaScript best practices including ES6 module architecture, strict separation of pure business logic from DOM manipulation, centralized state management, automated code linting/formatting, and unit testing.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+ Modules)
- Web Storage API (`localStorage` and `sessionStorage`)
- Node.js & npm
- ESLint v9 & Prettier
- Vitest (Unit Testing)
- Git & GitHub

## Features

- **Modular To-Do List (`js/`):** Full CRUD operations (add, toggle, delete, double-click inline editing, clear completed) and dynamic status filtering (`All`, `Active`, `Completed`) backed by `localStorage` persistence.
- **Pure Logic & Centralized State:** Strict separation of pure data transformation functions (`todo-logic.js`) from UI rendering (`ui.js`) using a centralized `commit()` state pattern (`state.js`).
- **Shopping Cart (`cart/`):** Interactive e-commerce cart featuring item management, quantity updates, and state-snapshot undo history.
- **Storage & Daily Challenges (`daily-challenges/`):** Standalone mini-apps demonstrating `localStorage` vs. `sessionStorage`, including a Notes App (Task 13.1), Session Storage auto-save form (Task 13.3), Light/Dark Theme persistence (Day 1), Recent Search history dropdown (Day 2), and interval-based draft auto-save (Day 3).
- **Automated Tooling & Unit Tests:** Pre-configured ESLint v9 and Prettier workflows alongside a Vitest unit test suite (`tests/todo-logic.test.js`) verifying pure function immutability and edge cases.

## How to Run

1. Clone this repository:
    ```bash
    git clone [https://github.com/traceywanjiru/iyf-s12-week-07-traceywanjiru.git](https://github.com/traceywanjiru/iyf-s12-week-07-traceywanjiru.git)
    ```

## Lessons Learned

- **ES6 Module Architecture:** Learned how to split a monolithic script into focused, single-responsibility modules (`state.js`, `storage.js`, `todo-logic.js`, `ui.js`, `utils.js`) using `import`/`export` and `<script type="module">`.
- **Pure Functions & Immutability:** Understood why keeping data-transformation functions completely free of `document` and `localStorage` dependencies makes code predictable and easy to test in Node.js with Vitest.
- **Browser Storage Trade-offs:** Learned when to use `localStorage` (long-term user preferences, persistent tasks, search history) versus `sessionStorage` (temporary tab-scoped form backups).
- **Professional Tooling:** Gained hands-on experience configuring ESLint v9 flat config (`eslint.config.js`) and Prettier to enforce consistent code quality and catch errors before committing.

## Challenges Faced

- **ESLint v9 Flat Config & Rule Enforcement:** Encountered `curly`, `no-unused-vars`, and `prefer-const` violations when running the linter across existing and newly refactored files. Resolved them by using `npm run lint:fix` for auto-fixable rules and refactoring variable declarations and unused helper functions manually.
- **Package Configuration Syntax:** Fixed a `JSONParseError` in `package.json` and installed missing local dependencies so Prettier and Vitest executed cleanly from npm scripts.
- **Preserving Inline Editing During Refactoring:** Maintained the double-click-to-edit task feature while migrating from direct array mutation to immutable state updates routed through the centralized `commit()` function.

## Collaboration (required in Weeks 0, 3 and 7; omit on other solo weeks)

## Live Demo (if deployed)

[View Live Demo](https://traceywanjiru.github.io/iyf-s12-week-07-traceywanjiru/)
