# BetterU Developer Guide

## Commands
- Development: `npm run dev` (starts dev server)
- Build: `npm run build` (production build)
- Start: `npm run start` (runs production build)
- Lint: `npm run lint` (checks code quality)
- Type Check: `npm run typecheck` (validates TypeScript)

## Code Style Guidelines
- Use TypeScript with strict type checking
- React components use PascalCase (e.g., `Button.tsx`)
- Hooks use `use` prefix (e.g., `useAuth`)
- Variables/functions use camelCase
- Constants use UPPER_SNAKE_CASE

## Import Organization
1. React imports
2. External libraries
3. Internal components/hooks with absolute imports
4. Internal utilities
5. Types
6. CSS/asset imports

## Component Structure
- Use functional components with explicit return types
- Extract complex logic to custom hooks
- Props should have interface definitions
- Separate UI from business logic

## Error Handling
- Use try/catch for async operations
- Add descriptive error messages
- Implement error boundaries for component errors

## TypeScript Best Practices
- Avoid `any` type - use proper types or unknown
- Use interface for object types
- Create shared type definitions for reusable types
- Use TypeScript utility types (Pick, Omit, etc.)