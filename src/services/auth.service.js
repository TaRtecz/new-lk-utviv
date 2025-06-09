import api from './api'

export const authService = {
  async login(credentials) {
    const { data } = await api.post('/auth/login', credentials)
    return data
  },

  async logout() {
    await api.post('/auth/logout')
  },

  async getCurrentUser() {
    const { data } = await api.get('/auth/me')
    return data
  },

  async refreshToken() {
    const { data } = await api.post('/auth/refresh')
    return data
  }
} 