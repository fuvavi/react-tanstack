# React Boilerplate

A production-ready React boilerplate with modern technologies.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI Framework |
| TypeScript | 5.x | Type safety |
| Vite | 6 | Build tool |
| TanStack Router | v1 | File-based routing |
| TanStack Query | v5 | Server state management |
| Zustand | v5 | Client state management |
| React Hook Form | v7 | Form handling |
| Zod | v3 | Schema validation |
| i18next | v24 | Internationalization (EN/VI) |
| Tailwind CSS | v4 | Styling |
| shadcn/ui | - | UI Components |
| Axios | v1 | HTTP client |

## Installation

```bash
# Install dependencies
npm install

# Copy env file
cp .env.example .env

# Start development server
npm run dev
```

## Project Structure

```
src/
├── assets/              # Static files
├── components/
│   ├── ui/              # shadcn/ui components
│   └── common/          # Shared components (Layout, Header, Sidebar, ...)
├── features/
│   ├── auth/            # Login page, auth hooks, auth service
│   └── dashboard/       # Dashboard page and service
├── hooks/               # Shared custom hooks
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   └── useToast.ts
├── lib/
│   ├── axios.ts         # Axios instance with JWT interceptor
│   ├── i18n.ts          # i18next configuration
│   └── queryClient.ts   # TanStack Query client
├── locales/
│   ├── en/common.json   # English translations
│   └── vi/common.json   # Vietnamese translations
├── routes/              # TanStack Router routes
│   ├── __root.tsx       # Root route (theme, toaster)
│   ├── index.tsx        # Redirect to /dashboard
│   ├── login.tsx        # Login page
│   ├── _authenticated.tsx      # Protected layout (requires login)
│   └── _authenticated.dashboard.tsx
├── stores/
│   ├── authStore.ts     # Zustand store: user, token, login, logout
│   └── uiStore.ts       # Zustand store: theme, sidebar, language
├── types/index.ts       # Global TypeScript types
├── utils/index.ts       # Helper functions
├── App.tsx              # Router + QueryClient provider
└── main.tsx             # Entry point
```

## Features

### Authentication
- Login form with React Hook Form + Zod validation
- JWT token automatically attached to every request
- Automatic token refresh on expiry (401 interceptor)
- Protected routes — auto-redirect to `/login` if unauthenticated
- Token persisted to localStorage via Zustand persist

### UI
- Dark mode / Light mode / System (saved to localStorage)
- Collapsible sidebar
- Responsive layout

### Internationalization
- English and Vietnamese support
- Language switcher in header
- Automatic browser language detection
- Language preference saved to localStorage

### Dashboard
- Stats display with useQuery
- Recent activity list
- Placeholder data when API is not available

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint errors
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=React Boilerplate
```

## Adding a New Route

1. Create a file in `src/routes/`, e.g. `_authenticated.settings.tsx`
2. TanStack Router automatically generates `routeTree.gen.ts` when running `npm run dev`

## Adding a New Language

1. Add a JSON file in `src/locales/<lang>/common.json`
2. Add the import in `src/lib/i18n.ts`
3. Add the option to the language switcher in `Header.tsx`

## State Management Architecture

- **Zustand** (`authStore`, `uiStore`): Client state persisted to localStorage
- **TanStack Query**: Server state, 5-minute auto-cache, smart retry
- No Redux — Zustand is lightweight and simple enough for most use cases
