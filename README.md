# Soloship — Solo Founder Command Center

A command center for solo founders building software and service businesses. Guides you from idea through launch and beyond, with structure that prevents common failure modes.

## Features

- **9-Phase Journey**: Intake → Research → Viability → Validation → Definition → Build → Beta → Launch → Operations
- **North Star Always Visible**: Problem, Solution, Audience displayed in sidebar
- **Decision Log**: Track important decisions and their reasoning
- **Evidence Collection**: Document what you learn from research and validation
- **Task Tracking**: Keep track of validation tasks per phase
- **Phase-Specific Tools**: Each phase has relevant tabs and guidance
- **Local Storage Persistence**: Your data stays on your machine

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Built files will be in the `dist/` folder.

## Project Structure

```
src/
├── components/
│   ├── layout/          # Sidebar, PhaseProgress, TabNav
│   └── phases/          # All tab components
├── data/
│   └── constants.js     # Phases, seed project, types
├── store/
│   └── useStore.js      # Zustand store with persistence
├── App.jsx              # Main app component
├── index.css            # Global styles
└── main.jsx             # Entry point
```

## Phases & Tabs

| Phase | Tabs |
|-------|------|
| Intake | Summary, Profile |
| Research | Summary, Profile, Evidence, Links |
| Viability | Summary, Go/No-Go, Evidence, Decisions |
| Validation | Summary, Tasks, Evidence, Resources, Decisions |
| Definition | Summary, Spec, Decisions, Links |
| Build | Summary, Progress, Spec, Links |
| Beta | Summary, Feedback, Tasks, Decisions, Links |
| Launch | Summary, Checklist, Links |
| Operations | Summary, Metrics, Decisions, Links |

## Tech Stack

- **React** + **Vite** for fast development
- **Zustand** for state management with localStorage persistence
- **Lucide React** for icons
- **date-fns** for date formatting
- Pure CSS (no framework) with CSS custom properties

## Data Persistence

All project data is stored in `localStorage` under the key `soloship-storage`. This means:
- Data persists across browser sessions
- Data is local to your browser/device
- No account or backend required
- Clear localStorage to reset

## Seed Project

The app comes pre-loaded with "Soloship" as the seed project, complete with:
- Full profile (problem, solution, audience)
- Spec definition (MVP features, tech stack)
- Initial decisions logged
- Sample tasks
- Links to resources

Use this as a reference or delete it and create your own projects.

## Customization

### Adding a New Project
Currently projects are defined in `src/data/constants.js`. Future versions will include a "New Project" button.

### Modifying Phases
Edit the `PHASES` array in `src/data/constants.js` to change phase names, descriptions, or tab configurations.

### Styling
All styles are in `src/index.css` using CSS custom properties. Modify the `:root` variables to change the color scheme.

---

Built for solo founders, by a solo founder. 🚀
