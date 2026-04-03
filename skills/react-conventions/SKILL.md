# React Conventions

Reusable patterns and standards for this project's React codebase.

## File & Folder Structure

```
src/
  components/
    common/       # Shared layout components (Header, Layout, Sidebar)
    ui/           # Primitive UI components (button, input, card, dialog)
  features/
    <feature>/    # Co-located page + service + hook
      <Feature>Page.tsx
      <feature>Service.ts
      use<Feature>.ts
  hooks/          # Global reusable hooks
  stores/         # Zustand global state
  types/          # Shared TypeScript types
  utils/          # Utility functions (cn, etc.)
  routes/         # TanStack Router route files
```

## Naming Conventions

| Target         | Convention                   | Example                       |
| -------------- | ---------------------------- | ----------------------------- |
| Files          | kebab-case                   | `user-controller.ts`          |
| Components     | PascalCase                   | `LoginPage`, `LoadingSpinner` |
| Hooks          | camelCase prefixed `use`     | `useLogin`, `useDebounce`     |
| Services       | camelCase suffixed `Service` | `authService`                 |
| Constants      | UPPER_SNAKE_CASE             | `API_BASE_URL`                |
| Zustand stores | camelCase suffixed `Store`   | `useAuthStore`                |

## Component Patterns

### Page Component

```tsx
// features/auth/LoginPage.tsx
export function LoginPage() {
  const { t } = useTranslation()
  const { mutate: login, isPending } = useLogin()
  // ...
  return <div>...</div>
}
```

- Named export, not default export
- PascalCase function name matching file name
- Co-locate form schema (Zod) in same file

### Feature Hook (TanStack Query)

```tsx
// features/auth/useAuth.ts
export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      /* navigate, toast, update store */
    },
    onError: () => {
      /* toast error */
    },
  })
}
```

### Global Reusable Hook

```tsx
// hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}
```

## Forms

Use `react-hook-form` + `zod` + `@hookform/resolvers`:

```tsx
const schema = z.object({
  email: z.string().min(1, 'validation.required').email('validation.email'),
  password: z.string().min(6, 'validation.minLength'),
})
type FormValues = z.infer<typeof schema>

const form = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: { email: '', password: '' },
})
```

Use shadcn `Form`, `FormField`, `FormItem`, `FormControl`, `FormLabel`, `FormMessage` wrappers.

## State Management

- **Server state**: TanStack Query (`useQuery`, `useMutation`)
- **Global client state**: Zustand (`useAuthStore`, etc.)
- **Local component state**: `useState`

## Routing

TanStack Router — file-based routes in `src/routes/`. Route tree is auto-generated to `src/routeTree.gen.ts` (do not edit manually).

Navigation:

```tsx
const navigate = useNavigate()
navigate({ to: '/dashboard' })
```

## Internationalization

All user-facing strings go through `react-i18next`:

```tsx
const { t } = useTranslation()
t('auth.login') // key from locales/
```

## Imports

Use `@/` alias for `src/`:

```tsx
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'
import type { LoginCredentials } from '@/types'
```

Use `import type` for type-only imports.
