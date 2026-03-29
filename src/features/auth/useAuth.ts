import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { authService } from './authService'
import { useAuthStore } from '@/stores/authStore'
import { toast } from '@/hooks/useToast'
import type { LoginCredentials } from '@/types'

export function useLogin() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login } = useAuthStore()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      login(data.user, data.tokens.accessToken, data.tokens.refreshToken)
      toast({ title: t('auth.loginSuccess') })
      navigate({ to: '/dashboard' })
    },
    onError: () => {
      toast({
        title: t('auth.loginError'),
        variant: 'destructive',
      })
    },
  })
}

export function useLogout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      logout()
      toast({ title: t('auth.logoutSuccess') })
      navigate({ to: '/login' })
    },
  })
}
