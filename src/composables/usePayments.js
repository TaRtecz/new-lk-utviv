import { ref, computed } from 'vue'
import { paymentService } from '@/services/payment.service'

export function usePayments() {
  const payments = ref([])
  const savedCards = ref([])
  const paymentMethods = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchPayments = async (params) => {
    loading.value = true
    error.value = null
    try {
      const data = await paymentService.getPaymentHistory(params)
      payments.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchPaymentMethods = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await paymentService.getPaymentMethods()
      paymentMethods.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchSavedCards = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await paymentService.getSavedCards()
      savedCards.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const createPayment = async (paymentData) => {
    loading.value = true
    error.value = null
    try {
      const data = await paymentService.createPayment(paymentData)
      await fetchPayments()
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const downloadReceipt = async (paymentId) => {
    loading.value = true
    error.value = null
    try {
      const blob = await paymentService.getReceipt(paymentId)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `receipt-${paymentId}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const saveCard = async (cardData) => {
    loading.value = true
    error.value = null
    try {
      await paymentService.saveCard(cardData)
      await fetchSavedCards()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const deleteCard = async (cardId) => {
    loading.value = true
    error.value = null
    try {
      await paymentService.deleteCard(cardId)
      await fetchSavedCards()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const sortedPayments = computed(() => {
    return [...payments.value].sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  return {
    payments,
    savedCards,
    paymentMethods,
    loading,
    error,
    fetchPayments,
    fetchPaymentMethods,
    fetchSavedCards,
    createPayment,
    downloadReceipt,
    saveCard,
    deleteCard,
    sortedPayments
  }
} 