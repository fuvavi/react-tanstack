export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  avatar?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface ApiError {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}

export type Theme = 'light' | 'dark' | 'system'

export type Language = 'en' | 'vi'
