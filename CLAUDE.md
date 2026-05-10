# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

No build step. Open `index.html` directly in a browser:

```bash
# Quick local server (Python)
python3 -m http.server 8080
# then visit http://localhost:8080
```

Changes to any file are reflected on the next page reload. There are no tests, linters, or package managers.

## Deployment

Push to `main` → GitHub Pages auto-deploys to `https://ycozco.github.io/malla_interactiva/`.

## Architecture

Four files, no framework, no bundler:

| File | Role |
|---|---|
| `index.html` | Static shell. All dynamic content is injected by `app.js`. |
| `style.css` | All styles. Uses CSS custom properties (`--bg-base`, `--primary`, etc.) for theming. Google Fonts (Inter + Playfair Display) loaded via `<link>`. |
| `data.js` | Pure data — `curriculumData` object with `semesters[]` and `prerequisites{}`. Loaded before `app.js`. |
| `app.js` | Single class `CurriculumApp`. Handles rendering, state, canvas drawing, and persistence. |

### Data shape (`data.js`)

```js
const curriculumData = {
  semesters: [
    { id: 1, name: "I SEMESTRE", courses: [
      { id: "c1", name: "Curso Nombre", credits: 4 }
    ]}
  ],
  prerequisites: {
    "c10": ["c5"],      // c10 requires c5 to be completed first
    "c16": ["c9","c10"] // multiple prerequisites use an array
  }
};
```

Course IDs (`c1`–`c70`) are the keys used throughout the app. Adding a new malla means providing a new `curriculumData` object in the same shape.

### State model (`app.js`)

`CurriculumApp` holds two `Set`s:
- `this.completedCourses` — courses marked as approved
- `this.selectedCourses` — courses planned for next semester

Both persist to `localStorage` under the key `curriculumProgress`.

`isLocked(courseId)` → `true` if any prerequisite is NOT in `completedCourses`.  
`getDependentCourses(courseId)` → recursive BFS to find all downstream courses (used for cascade-unlock on deselect).

### Canvas connections

`drawConnections()` redraws on every state change. It reads current element positions via `getBoundingClientRect()` and offsets by `window.scrollX/Y` and `container.getBoundingClientRect()` to convert to canvas coordinates. The canvas is `position:absolute` inside `.container` at `z-index:-1`. **Canvas is hidden on mobile** (`display:none` at ≤768px) because the single-column layout makes arrows redundant.

### Responsive breakpoints

| Breakpoint | Layout |
|---|---|
| ≥1400px | 5-column grid (2 rows of 5 semesters) |
| 769–1399px | `auto-fill, minmax(220px, 1fr)` |
| ≤1024px | Stats panel 2×2 |
| ≤768px | Single column, actions always visible, canvas hidden |
| ≤480px | Smaller font scale |

## Adding Multiple Mallas

To support multiple curricula, `data.js` needs to export an array of malla objects, and `CurriculumApp` needs a `currentMalla` reference. The prerequisite map and semester IDs must be scoped per-malla. Each malla should have a unique `id` and `label` for the selector UI.

## Key Behaviors to Preserve

- **Cascade unlock**: desmarking a course must remove all downstream completed/selected courses via `getDependentCourses`.
- **Semester bulk-complete**: clicking a semester header marks that semester AND all prior semesters; clicking again unmarked only that semester (and cascades forward).
- **prerequisite-highlight** (orange) / **dependent-highlight** (purple) classes are applied on `mouseenter` and cleared on `mouseleave`.
- `saveProgress()` writes to both `localStorage` AND triggers a JSON file download.
