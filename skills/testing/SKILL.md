# Testing

Standards and patterns for testing in this project.

## Stack

- **Jest** — unit and integration tests
- **Cypress** — end-to-end (E2E) tests
- **Minimum coverage**: 80% — all critical paths must be covered

## File Naming

```
*.test.ts    # unit tests
*.spec.ts    # integration / component tests
*.cy.ts      # Cypress E2E specs
```

Co-locate test files with the source file or under a `__tests__/` folder next to the module.

## Commands

```bash
npm test           # run all Jest tests
npm run lint       # check code style before committing
```

## Unit Tests (Jest)

### Testing a Hook

```ts
// features/auth/useAuth.test.ts
import { renderHook, act } from '@testing-library/react'
import { createWrapper } from '@/test-utils' // TanStack Query wrapper
import { useLogin } from './useAuth'

describe('useLogin', () => {
  it('calls authService.login with credentials', async () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() })

    await act(async () => {
      result.current.mutate({ email: 'user@example.com', password: 'secret' })
    })

    // assert mutation was called
  })
})
```

### Testing a Utility / Pure Function

```ts
// utils/cn.test.ts
import { cn } from '@/utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-4', 'px-2')).toBe('px-2') // tailwind-merge resolves conflict
  })
})
```

### Testing a Service

```ts
// features/auth/authService.test.ts
import { authService } from './authService'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('authService.login', () => {
  it('posts credentials and returns user + tokens', async () => {
    const mockResponse = {
      data: { user: {}, tokens: { accessToken: 'tok', refreshToken: 'rtok' } },
    }
    mockedAxios.post.mockResolvedValueOnce(mockResponse)

    const result = await authService.login({ email: 'a@b.com', password: '123456' })
    expect(result.tokens.accessToken).toBe('tok')
  })
})
```

## Component Tests

Use React Testing Library with jest-dom matchers:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  it('shows validation error when email is empty', async () => {
    render(<LoginPage />)

    await userEvent.click(screen.getByRole('button', { name: /login/i }))

    expect(screen.getByText(/required/i)).toBeInTheDocument()
  })
})
```

## E2E Tests (Cypress)

```ts
// cypress/e2e/auth/login.cy.ts
describe('Login', () => {
  it('redirects to dashboard on successful login', () => {
    cy.visit('/login')
    cy.findByLabelText(/email/i).type('user@example.com')
    cy.findByLabelText(/password/i).type('password123')
    cy.findByRole('button', { name: /login/i }).click()
    cy.url().should('include', '/dashboard')
  })
})
```

## What to Test

| Layer      | What                                  | Priority |
| ---------- | ------------------------------------- | -------- |
| Services   | API calls, error handling             | High     |
| Hooks      | Mutation/query state, side effects    | High     |
| Forms      | Validation logic, submission          | High     |
| Components | Render output, user interactions      | Medium   |
| Utils      | Pure functions                        | Medium   |
| E2E        | Critical user flows (login, checkout) | High     |

## What NOT to Test

- Implementation details (internal state, private methods)
- Third-party library internals (shadcn components, Radix primitives)
- Trivial pass-through code with no logic

## Mocking Guidelines

- **External API calls**: mock via `jest.mock` on the service module or axios
- **TanStack Query**: wrap tests in a `QueryClientProvider` with a fresh `QueryClient`
- **Zustand stores**: reset store state in `beforeEach` using `store.setState(initialState)`
- **TanStack Router**: use `createMemoryHistory` + `createRouter` for route-dependent tests

## Coverage

Run with `--coverage` flag. Target:

- Statements: ≥ 80%
- Branches: ≥ 80%
- Functions: ≥ 80%

CI will fail below threshold. Focus coverage on business logic, not boilerplate.
