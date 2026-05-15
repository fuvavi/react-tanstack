import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Users, UserCheck, TrendingUp, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { useAuthStore } from '@/stores/authStore'
import { dashboardService } from './dashboardService'

const MOCK_STATS = {
  totalUsers: 1284,
  activeUsers: 847,
  revenue: 48295,
  growth: 12.5,
}

const MOCK_ACTIVITY = [
  { id: '1', user: 'Alice Nguyen', action: 'Created a new project', timestamp: '2 minutes ago' },
  { id: '2', user: 'Bob Tran', action: 'Updated profile settings', timestamp: '15 minutes ago' },
  { id: '3', user: 'Charlie Le', action: 'Invited 3 new members', timestamp: '1 hour ago' },
  { id: '4', user: 'Diana Pham', action: 'Deployed to production', timestamp: '3 hours ago' },
]

export function DashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuthStore()

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: dashboardService.getStats,
    // Use mock data when API is not available
    placeholderData: MOCK_STATS,
  })

  const { data: activity, isLoading: activityLoading } = useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: dashboardService.getRecentActivity,
    placeholderData: MOCK_ACTIVITY,
  })

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers.toLocaleString() ?? '-',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers.toLocaleString() ?? '-',
      icon: UserCheck,
      color: 'text-green-500',
    },
    {
      title: 'Revenue',
      value: stats ? `$${stats.revenue.toLocaleString()}` : '-',
      icon: DollarSign,
      color: 'text-yellow-500',
    },
    {
      title: 'Growth',
      value: stats ? `${stats.growth}%` : '-',
      icon: TrendingUp,
      color: 'text-purple-500',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">
          {t('dashboard.welcome', { name: user?.name ?? 'User' })}
        </p>
      </div>

      {/* Stats Grid */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">{t('dashboard.stats')}</h2>
        {statsLoading ? (
          <div className="flex h-32 items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card) => {
              const Icon = card.icon
              return (
                <Card key={card.title}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {card.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${card.color}`} />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{card.value}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">{t('dashboard.recentActivity')}</h2>
        <Card>
          <CardContent className="pt-6">
            {activityLoading ? (
              <div className="flex h-32 items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <ul className="space-y-4">
                {(activity ?? []).map((item) => (
                  <li key={item.id} className="flex items-start gap-4 text-sm">
                    <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <div className="flex-1">
                      <span className="font-medium">{item.user}</span>
                      <span className="text-muted-foreground"> — {item.action}</span>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{item.timestamp}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
