# BetterU Developer Guide

## Commands
- Development: `npm run dev` (starts Next.js development server)
- Build: `npm run build` (creates production build)
- Start: `npm run start` (runs production build)
- Lint: `npm run lint` (checks code quality)
- Type Check: `npx tsc --noEmit` (validates TypeScript types)

## Code Style Guidelines
- **Components**: Use PascalCase for component files and function names (e.g., `Button.tsx`)
- **Organization**: Group related components in feature folders (auth/, header/, floating-btn/, etc.)
- **Imports**: Order as React → third-party libraries → local imports with @/ path aliases
- **TypeScript**: Use strict typing with interfaces for props, extend React types
- **Naming**: Use descriptive names for components, prefix hooks with `use`
- **UI Components**: Use shadcn/ui components with Tailwind CSS for styling
- **Error Handling**: Implement try/catch blocks for async operations with proper UI feedback
- **Files**: Mark client components with "use client" directive at top of file
- **State Management**: Use React hooks (useState, useEffect) for state management

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui (based on Radix UI)
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Form Handling**: react-hook-form with zod validation
- **Data Visualization**: Recharts
- **Animation**: Framer Motion

### Project Structure
- `/app`: Next.js App Router pages and layouts
- `/components`: Reusable UI components
  - `/auth`: Authentication components
  - `/floating-btn`: Floating chatbot button components
  - `/header`: Header and navigation components
  - `/profile`: User profile management components
  - `/ui`: shadcn/ui component library
  - `/widegets-grid`: Dashboard widgets
- `/hooks`: Custom React hooks
- `/lib`: Utility functions
- `/utils`: Helper functions and service connectors
- `/public`: Static assets

## Current Issues

### Authentication Issues
1. **Google Authentication**: Google OAuth integration is not working. 
   - Issue: 403 error when attempting to use "Continue with Google" button
   - OAuth client ID and secret have been created but require proper configuration in Supabase
   - Current client ID: `333734726666-9asght6ntl57rbo3olfjvrv8b7iqlg5n.apps.googleusercontent.com`
   - Missing auth callback route in the app

2. **Email Authentication**: Working correctly
   - Users can sign up and log in with email/password
   - Email verification is implemented

### Profile Management Issues
1. **Profile Update Error**: Error when saving profile changes
   - Issue: `invalid input syntax for type bigint: "76c49a10-8241-4dc8-be19-057af9482a7a"`
   - Despite the error message, profile updates still work correctly
   - Problem is likely with ID type mismatch in profiles table, which expects bigint rather than UUID

2. **Fixed Issues**:
   - Profile picture upload is working correctly
   - Cancel button in Edit Profile modal is implemented and working

## Feature Set

### User Management
- Authentication (email/password, Google OAuth)
- User profile management (username, avatar)
- Profile editing with image upload

### Habit Tracking
- Daily habit tracking with completion toggles
- Habit creation and configuration
- Statistics on completion rates
- Strike counter for habit consistency
- Date-based navigation to view historical data
- Challenge system for special/featured habits

### Todo Management
- Daily task management
- Task completion tracking
- Task prioritization

### Analytics Features
- Progress tracking over 7-day and 30-day periods
- Visualization of habit/task completion
- Charts and metrics for performance tracking
- Life balance wheel tool

### Additional Features
- Achievement badge system
- AI-powered check-in system
- Shop and courses section

## Development Workflow
1. **Setup Environment**:
   - Clone the repository
   - Run `npm install` to install dependencies
   - Create `.env.local` file with Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

2. **Local Development (local on the codespaces server, never local my actual machine)**:
   - Run `npm run dev` to start development server
   - Access the app at `https://supreme-space-fiesta-rjwp5wx9j9ghjw4-3000.app.github.dev` or whatever codespace url

3. **Deployment**:
   - The app deploys to Vercel
   - Set up proper environment variables in Vercel
   - For Google OAuth, ensure proper redirect URI configuration

## UI/UX Description
- **Design System**: Mobile-optimized dashboard with cards and widgets
- **Color Palette**: 
  - Primary: Orange gradient (#f04c23 to #f99f1c)
  - Background: White
  - Card backgrounds: White with rounded corners
  - Text: Dark gray for body, black for headings
- **Typography**: 
  - Font: Nunito (400, 700, 900 weights)
  - Headings: Bold (700) or Black (900)
  - Body text: Regular (400)
- **Components**:
  - Cards with consistent rounded corners (1.5rem border radius)
  - Orange gradient accents
  - Clean, minimal UI with ample whitespace
  - Interactive elements have hover/active states
- **Layout**:
  - Header with user profile
  - Sticky navigation bar
  - Widget grid for different app features
  - Modal-based full-screen interfaces for detailed views

## Database Schema

Based on the code, the database currently has the following structure:

### Supabase Tables

1. **profiles**
   - `id`: bigint (primary key, should be UUID linked to auth.users)
   - `username`: string
   - `avatar_url`: string
   - `created_at`: timestamp

### Supabase Storage

1. **profiles** bucket
   - `avatars/`: Directory for user avatar images

### Planned/Needed Tables
1. **habits**
   - `id`: UUID (primary key)
   - `user_id`: UUID (foreign key to users)
   - `title`: string
   - `description`: string (optional)
   - `icon`: string
   - `created_at`: timestamp
   - `is_active`: boolean

2. **habit_entries**
   - `id`: UUID (primary key)
   - `habit_id`: UUID (foreign key to habits)
   - `user_id`: UUID (foreign key to users)
   - `date`: date
   - `completed`: boolean
   - `notes`: string (optional)

3. **todos**
   - `id`: UUID (primary key)
   - `user_id`: UUID (foreign key to users)
   - `title`: string
   - `description`: string (optional)
   - `due_date`: date (optional)
   - `created_at`: timestamp
   - `completed`: boolean
   - `completed_at`: timestamp (optional)
   - `priority`: integer

4. **user_settings**
   - `user_id`: UUID (primary key, foreign key to users)
   - `theme`: string
   - `notification_preferences`: JSON

Note: This schema reflects the expected structure based on the current code implementation, and additional tables will be needed as features are implemented.
