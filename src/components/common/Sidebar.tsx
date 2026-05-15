import { LayoutDashboard } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils'
import { useUIStore } from '@/stores/uiStore'

const navItems = [{ icon: LayoutDashboard, labelKey: 'nav.dashboard', to: '/dashboard' as const }]

export function Sidebar() {
  const { t } = useTranslation()
  const { sidebarOpen } = useUIStore()

  return (
    <aside
      className={cn(
        'fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] border-r bg-background transition-all duration-300',
        sidebarOpen ? 'w-56' : 'w-0 overflow-hidden',
      )}
    >
      <nav className="flex flex-col gap-1 p-2">
        {navItems.map(({ icon: Icon, labelKey, to }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground"
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{t(labelKey)}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
