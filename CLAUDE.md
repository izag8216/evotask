# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EvoTask is a browser-based task management application that applies evolution theory principles to task optimization. It's a pure client-side application with no build process or server dependencies.

## Running the Application

```bash
# Simply open in any modern browser
open index.html
```

The application runs entirely in the browser and persists data using localStorage.

## Architecture

### Core Components

**EvoTaskManager Class (`app.js`)**: The central application controller that manages the evolution simulation. Key responsibilities:
- Task lifecycle management (creation, mutation, elimination)
- Evolution algorithm execution (natural selection, mutations, adaptation scoring)
- UI rendering and event handling
- Data persistence via localStorage

**Three Evolution Environments**: Tasks are categorized into distinct environments that affect their survival and mutation patterns:
- `competitive`: High-pressure environment with aggressive selection
- `collaborative`: Mutual benefit environment encouraging cooperation
- `adaptive`: Innovation-focused environment promoting novel mutations

### Evolution Algorithm

The core evolution cycle (`runEvolutionCycle()`) implements:

1. **Natural Selection**: Calculates survival probability based on:
   - Adaptation score (40% weight)
   - Environment fitness (30% weight) 
   - Time to deadline (20% weight)
   - Priority level (10% weight)

2. **Mutation System**: Random mutations applied to active tasks:
   - Base mutation rate: 30%
   - Six mutation types: `strategy-pivot`, `tactical-enhancement`, `resource-optimization`, `market-expansion`, `efficiency-boost`, `innovation-leap`
   - Mutations affect adaptation scores by ±10 points

3. **Environment Simulation**: Random environment changes that impact task adaptation based on environment matching

### Data Model

Tasks follow this structure (see `data.txt` for full schema):
```javascript
{
  id, title, description, priority, environment, 
  adaptationScore, deadline, status, generation,
  mutations[], fitnessScore, createdAt, updatedAt
}
```

### UI Architecture

**Static HTML Structure** (`index.html`): Fixed layout with:
- Header with evolution stats and controls
- Dashboard with three environment zones
- Modal for task creation/editing
- Insights panel for analytics

**Dynamic Rendering**: The `EvoTaskManager` class dynamically populates:
- Task cards within environment zones
- Evolution statistics in header
- Insights and recommendations

**Styling** (`styles.css`): CSS-only design system with:
- CSS custom properties for theming
- Environment-specific color coding
- Responsive grid layouts
- Evolution-inspired animations

## Key Development Patterns

### Data Persistence
All data is stored in localStorage with the key `evoTaskManagerData`. The application auto-saves after each evolution cycle and user action.

### Evolution Automation
The system runs automatic evolution cycles every 5 minutes for active tasks, simulating continuous environmental pressure.

### UI Updates
All UI updates flow through dedicated render methods (`renderDashboard()`, `renderTasks()`, `renderEnvironmentTasks()`) that are called after state changes.

### Event Handling
Event listeners are bound once during initialization (`bindEvents()`) and use event delegation for dynamically created task elements.

## File Organization

- `index.html` - Application structure and modal forms
- `app.js` - Complete application logic (880+ lines)
- `styles.css` - Comprehensive styling system (1000+ lines) 
- `data.txt` - Data schema reference and configuration parameters
- `README.md` - Project documentation and features

## Important Constraints

- **No Build Process**: Pure HTML/CSS/JS application
- **No External Dependencies**: Only uses CDN resources (Font Awesome, Google Fonts)
- **Client-Side Only**: No server communication or APIs
- **localStorage Dependency**: Application state persists only in browser storage