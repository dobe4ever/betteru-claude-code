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

Issues:

1. 'continue with google' button gives error: 
403. That’s an error.

We're sorry, but you do not have access to this page. That’s all we know.

2. login with email and password was already working for some time, creating and saving the user info in the 'users' table in supabase with some default configs. The logout button works, I can logout and login to my existing account.

3. Edit profile: I can edit the username & upload profile pic but when i click 'save' I get this error: ```invalid input syntax for type bigint: "76c49a10-8241-4dc8-be19-057af9482a7a"```

even tho it updates the info and it works and i can see the png's added in my suppabase account in the 'profiles' related stuff we created earlier.

4. We need a 'cancel' button in addition to the 'save changes' button, so that the edit profile pop up goes away and the user is back to wherever screen it needs to be seeing. Just implement whatever is the standard behaviour for everything always.

First time ever using supabase, or any of these technologies really. My background is only in python so you need to take charge as the lead dev here based on my requests in english. Im logged in to supabase and I have other variables and secrets also handy, but you need to be very specific in your instructions if i need to check or do anything.

___


1. When clicking 'continue with google' button:
"Google authentication is currently unavailable. Please use email and password to sign in."

2. can login with email ok

3. I can update pic and username and see 'success' message upon saving and redirects me back to the home screen. The 'cancel' button also redirects back to home as expected.

How can we make the google login work?

For additional info, this is a repo I just cloned from the original repo of this app just to edit with claude code (you). The original repo is deploying to vercel with one click but this one is not deployed anywhere yet, just pushing changes to the github repo but nothing else.

___


this url: `https://console.cloud.google.com/apis/credentials/consent` redirects me to `https://console.cloud.google.com/auth/overview?project=better-u-app-452215`

No "External" user type → "CREATE" option, only a sidebar with: overview, branding, audience, clients, data access, verification center. 



OAuth client created
The client ID and secret can always be accessed from Credentials in APIs & Services

OAuth access is restricted to the test users  listed on your OAuth consent screen
Client ID
333734726666-9asght6ntl57rbo3olfjvrv8b7iqlg5n.apps.googleusercontent.com
Client secret
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
Creation date
February 27, 2025 at 11:00:52 PM GMT+7
Status
 Enabled

 