import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const isAuthenticated = ref(!!token.value)

  const login = async (credentials) => {
    try {
      const { user: userData, token: newToken } = await authService.login(credentials)
      user.value = userData
      token.value = newToken
      isAuthenticated.value = true
      localStorage.setItem('token', newToken)
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      user.value = null
      token.value = null
      isAuthenticated.value = false
      localStorage.removeItem('token')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const checkAuth = async () => {
    if (!token.value) return false
    try {
      const userData = await authService.getCurrentUser()
      user.value = userData
      isAuthenticated.value = true
      return true
    } catch (error) {
      console.error('Auth check error:', error)
      logout()
      return false
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}) 