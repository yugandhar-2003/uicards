# Active/Inactive Cards UI (React + Custom CSS)

This small project implements the UI from the provided sketch: three person cards with **Active/Inactive** states, a **Mark All Inactive** checkbox, and interactive buttons.

### Features
- React component-based structure (single-file demo using React CDN + Babel).
- Each card shows:
  - Avatar placeholder
  - Status pill (ACTIVE / INACTIVE)
  - Name & Designation
  - Big check (✓) for active and cross (✗) for inactive
  - *Click Here* button enabled only when the card is active.
- "Mark All Inactive" checkbox: when checked, all cards become inactive and individual toggles are locked. When unchecked, you can toggle cards individually again.

### Run locally
No build step required. Open `index.html` in a browser:
1. Download/unzip the project.
2. Double-click `index.html` or serve the folder with a simple static server (`npx http-server .`).

### Deploy
You can deploy this to Vercel, Netlify, or GitHub Pages. For a proper production-ready React app consider converting this demo into a Vite or Create React App project.

### Files
- `index.html` — main page (uses React & Babel via CDN).
- `styles.css` — custom styling matching sketch.
- `app.jsx` — React components and application logic.
