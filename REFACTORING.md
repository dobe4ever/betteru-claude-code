# BetterU Refactoring Guide

This document outlines the refactoring patterns and architecture decisions for the BetterU application.

## File Naming Convention

- **Components**: PascalCase with UI type suffix
  - Examples: `HabitsWidget`, `HabitsDialog`, `HabitsDropdown`
  
- **Files**: kebab-case matching component names
  - Examples: `habits-widget.tsx`, `habits-dialog.tsx`, `habits-dropdown.tsx`

## Directory Structure

- `/components/widgets-grid/` - Home screen widgets
  - Each feature has its own directory (e.g., `/habits/`, `/todos/`)
  - Each feature directory contains its specific components

## Architecture Pattern

1. **Home Screen**
   - Grid of widget components (`WidgetsGrid`)
   - Each widget provides overview of its feature

2. **Full Screen Modals**
   - Each widget expands to a full-screen modal
   - Use `ModalFull` component for this expansion

3. **Feature-specific Components**
   - Dialogs and dropdowns within full-screen views
   - Use shadcn UI components where possible

## State Management

- Use React Context for feature-specific state
- Pattern established in `habits-context.tsx`:
  ```tsx
  // Context definition
  const SomeFeatureContext = createContext<ContextType | undefined>(undefined)
  
  // Provider component
  export const SomeFeatureProvider = ({ children }) => {
    // State and handlers
    return (
      <SomeFeatureContext.Provider value={value}>
        {children}
      </SomeFeatureContext.Provider>
    )
  }
  
  // Custom hook for consuming context
  export const useSomeFeature = () => {
    const context = useContext(SomeFeatureContext)
    if (context === undefined) {
      throw new Error("useSomeFeature must be used within a SomeFeatureProvider")
    }
    return context
  }
  ```

## Component Hierarchy

For each feature (e.g., Habits):

1. **Widget Component** (`habits-widget.tsx`)
   - Small summary component in home grid
   - Uses context for data

2. **Full Component** (`habits-full.tsx`)
   - Expanded view when widget is clicked
   - Contains feature-specific UI
   - Wraps child components in context provider

3. **Feature-specific Components**
   - List components
   - Card components
   - Dialog components for settings/details

## UI Component Usage

- Use shadcn UI components for all standard UI elements
- Custom components only when absolutely necessary
- Maintain consistent styling across the application

## Next Steps

1. Continue renaming files to follow convention
2. Complete context implementation for each feature
3. Standardize UI components across features
4. Refactor remaining components to use shadcn UI
