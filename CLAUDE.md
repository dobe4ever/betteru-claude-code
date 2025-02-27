# BetterU Developer Guide

## Commands
- Development: `npm run dev` (starts dev server)
- Build: `npm run build` (production build)
- Start: `npm run start` (runs production build)
- Lint: `npm run lint` (checks code quality)
- Type Check: `npx tsc --noEmit` (validates TypeScript)

## Code Style Guidelines
- **Components**: Use PascalCase for component files and function names (e.g., `Button.tsx`)
- **Organization**: Group related components in feature folders (auth/, header/, floating-btn/)
- **Imports**: Order as React → third-party libraries → local imports with @/ path aliases
- **TypeScript**: Use strict typing with explicit interfaces for props, extend React types
- **Naming**: Use descriptive names for components, hooks prefixed with `use`
- **UI Components**: Prefer shadcn/ui components with Tailwind for styling
- **Error Handling**: Use try/catch blocks for async operations with proper UI feedback
- **Files**: Mark client components with "use client" directive at top of file
- **State Management**: Use React hooks (useState, useEffect) following React best practices

## Visual Description
The application is a mobile-optimized self-improvement dashboard with habit tracking, todo management, and analytics widgets. UI uses orange gradient accents on white cards with rounded corners and Nunito font.
