# Kanban Client

React + Vite frontend for the Kanban task management app.

## Features
- Authentication flow (login/signup) with protected boards route
- Boards, columns, tasks, and subtasks UI
- Drag-and-drop tasks between columns
- Normalized client state in React Query cache

## Tech Stack
- React 19, Vite, React Router
- React Query, Zustand
- Tailwind CSS + DaisyUI

## Getting Started
1. Install dependencies:
   - `npm install`
2. Start the dev server:
   - `npm run dev`
3. Configure API base URL (optional):
   - `VITE_API_BASE_URL` in a `.env` file (defaults to `http://localhost:8000`)

## Scripts
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint source

## Project Structure
- `src/pages` - Feature pages and UI
- `src/store` - Zustand UI state + normalized entities helpers
- `src/common-components` - Shared UI components

## API Docs
When the server is running with Swagger UI enabled, API docs are at `/docs` on the server host.
