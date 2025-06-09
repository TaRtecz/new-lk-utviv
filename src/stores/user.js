import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const sessionTimeout = ref(import.meta.env.VITE_SESSION_TIMEOUT || 3600)
  const lastActivity = ref(Date.now())

  const isAuthenticated = computed(() => !!token.value)
  const userName = computed(() => user.value?.name || 'Гость')

  const login = async (userData) => {
    user.value = userData
    token.value = userData.token
    localStorage.setItem('token', userData.token)
    lastActivity.value = Date.now()
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('rememberMe')
  }

  const updateSession = () => {
    lastActivity.value = Date.now()
  }

  const checkSession = () => {
    const now = Date.now()
    const timeSinceLastActivity = (now - lastActivity.value) / 1000

    if (timeSinceLastActivity > sessionTimeout.value) {
      logout()
      return false
    }

    return true
  }

  // Проверяем сохраненную сессию при инициализации
  if (token.value && localStorage.getItem('rememberMe') === 'true') {
    user.value = {
      email: import.meta.env.VITE_TEST_USER,
      name: 'Тестовый пользователь'
    }
  }

  const fetchBalance = async () => {
    try {
      const response = await axios.get('/api/balance')
      user.value.balance = response.data.balance
    } catch (error) {
      console.error('Ошибка при получении баланса:', error)
    }
  }

  const fetchCounters = async () => {
    try {
      const response = await axios.get('/api/counters')
      user.value.counters = response.data
    } catch (error) {
      console.error('Ошибка при получении счетчиков:', error)
    }
  }

  const submitCounterReading = async (counterId, value) => {
    try {
      await axios.post('/api/counters/reading', { counterId, value })
      await fetchCounters()
    } catch (error) {
      console.error('Ошибка при отправке показаний:', error)
    }
  }

  const fetchPaymentHistory = async () => {
    try {
      const response = await axios.get('/api/payments')
      user.value.paymentHistory = response.data
    } catch (error) {
      console.error('Ошибка при получении истории платежей:', error)
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    userName,
    login,
    logout,
    updateSession,
    checkSession,
    fetchBalance,
    fetchCounters,
    submitCounterReading,
    fetchPaymentHistory
  }
}) 