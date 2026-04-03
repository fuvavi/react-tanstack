# Styling

Conventions for styling in this project using Tailwind CSS v4 + shadcn/ui patterns.

## Stack

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **shadcn/ui** component primitives (Radix UI + CVA)
- **class-variance-authority (CVA)** for variant-based component styles
- **clsx + tailwind-merge** via `cn()` utility

## The `cn()` Utility

Always use `cn()` from `@/utils` to merge class names:

```tsx
import { cn } from '@/utils'

;<div className={cn('base-classes', condition && 'conditional-class', className)} />
```

`cn` = `clsx` + `tailwind-merge` — resolves Tailwind conflicts correctly.

## Variant-Based Components (CVA)

Use CVA for components with multiple visual variants:

```tsx
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  // base classes
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  ),
)
```

## Design Tokens (CSS Variables)

Use semantic token classes, not raw colors:

| Token                                            | Usage                               |
| ------------------------------------------------ | ----------------------------------- |
| `bg-primary` / `text-primary-foreground`         | Primary action surfaces             |
| `bg-secondary` / `text-secondary-foreground`     | Secondary surfaces                  |
| `bg-destructive` / `text-destructive-foreground` | Danger/error states                 |
| `bg-muted` / `text-muted-foreground`             | Subtle backgrounds / secondary text |
| `bg-accent` / `text-accent-foreground`           | Hover highlights                    |
| `bg-background`                                  | Page background                     |
| `border-input`                                   | Form input borders                  |
| `ring-ring`                                      | Focus rings                         |

Avoid hardcoded colors like `bg-blue-500` — prefer semantic tokens so theme changes propagate.

## Layout Patterns

```tsx
// Centered page layout (e.g., login page)
<div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">

// Card container
<Card className="w-full max-w-sm">

// Form spacing
<form className="space-y-4">

// Full-width button
<Button className="w-full">
```

## shadcn/ui Component Usage

Components live in `src/components/ui/`. Use them as building blocks:

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
```

Do not modify shadcn primitive files unless intentionally diverging from upstream — extend by wrapping instead.

## Line Length

Max 100 characters per line (matches project ESLint/Prettier config). For long `className` strings, break into multi-line with template literals or `cn()`.

## Responsive Design

Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`). Mobile-first by default.

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```
