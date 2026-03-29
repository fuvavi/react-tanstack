import axiosInstance from '@/lib/axios'
import type { ApiResponse, AuthTokens, LoginCredentials, User } from '@/types'

export interface LoginResponse {
  user: User
  tokens: AuthTokens
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      credentials,
    )
    return data.data
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout')
  },

  getProfile: async (): Promise<User> => {
    const { data } = await axiosInstance.get<ApiResponse<User>>('/auth/profile')
    return data.data
  },
}
