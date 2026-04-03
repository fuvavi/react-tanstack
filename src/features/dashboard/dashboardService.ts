import axiosInstance from '@/lib/axios'
import type { ApiResponse } from '@/types'

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  revenue: number
  growth: number
}

export interface ActivityItem {
  id: string
  user: string
  action: string
  timestamp: string
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await axiosInstance.get<ApiResponse<DashboardStats>>('/dashboard/stats')
    return data.data
  },

  getRecentActivity: async (): Promise<ActivityItem[]> => {
    const { data } = await axiosInstance.get<ApiResponse<ActivityItem[]>>('/dashboard/activity')
    return data.data
  },
}
