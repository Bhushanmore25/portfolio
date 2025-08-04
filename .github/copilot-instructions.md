# Copilot Instructions for Portfolio (React + Vite)

## Project Overview
- This is a React single-page portfolio app, bootstrapped with Vite for fast development and HMR.
- Main UI logic is in `src/`, with key components: `App.jsx`, `Home.jsx`, `Ribbons.jsx`, `TiltedCard.jsx`, and `SocialLinks.jsx`.
- Animations use GSAP (`gsap`), and custom interactive backgrounds (see `Ribbons.jsx`).
- Images and assets are in `public/` and `src/assets/`.

## Architecture & Patterns
- **Component Structure:**
  - `App.jsx` is the root; `Home.jsx` is the main landing page.
  - Components are function-based, using React hooks (`useEffect`, `useState`).
  - Animation and interactivity are handled via GSAP and custom event listeners (see mousemove logic in `Home.jsx`).
- **Styling:**
  - Uses Tailwind CSS utility classes directly in JSX for layout and effects.
  - Some custom CSS in `SocialLinks.css` and possibly others.
- **Assets:**
  - Images referenced by filename (e.g., `profile pic.jpg`) from `public/`.

## Developer Workflows
- **Start Dev Server:**
  - `npm run dev` (Vite hot-reload server)
- **Build for Production:**
  - `npm run build`
- **Preview Production Build:**
  - `npm run preview`
- **Linting:**
  - ESLint config in `eslint.config.js`; run with `npm run lint` if script exists.
- **No explicit test setup** detected; focus is on UI/UX and animation.

## Project-Specific Conventions
- **Animation:**
  - GSAP is used for mounting and mouse-driven animations (see `Home.jsx`).
  - Custom event listeners are attached to `.main` for interactive effects.
- **Background Effects:**
  - `Ribbons.jsx` renders animated backgrounds, controlled by props and state (see `showRibbons`).
- **Component Props:**
  - Components like `TiltedCard` accept detailed props for image, caption, and animation parameters.
- **File Naming:**
  - Mixed casing (`profile pic.jpg`, `loho.png`); reference assets carefully.

## Integration Points
- **External Libraries:**
  - `gsap` for animation
  - Vite for build/dev
  - Tailwind CSS for styling
- **No backend/API integration**; all data is static or local.

## Examples
- To add a new animated section, follow the pattern in `Home.jsx`:
  ```jsx
  useEffect(() => {
    gsap.to(".text", { scale: 1, rotate: 0, duration: 2 });
    // ...existing code...
  }, []);
  ```
- To add a new asset, place it in `public/` and reference by filename in JSX.

## Key Files
- `src/Home.jsx`: Main landing page, animation logic
- `src/Ribbons.jsx`: Animated background
- `src/TiltedCard.jsx`: Interactive image card
- `src/SocialLinks.jsx` & `.css`: Social media links
- `public/`: Static assets

---
**If unclear or missing details, ask the user for clarification or examples from their workflow.**
