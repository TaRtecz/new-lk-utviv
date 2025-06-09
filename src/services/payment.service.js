import api from './api'

export const paymentService = {
  // Получение доступных способов оплаты
  async getPaymentMethods() {
    const { data } = await api.get('/payments/methods')
    return data
  },

  // Создание платежа
  async createPayment(paymentData) {
    const { data } = await api.post('/payments', paymentData)
    return data
  },

  // Получение статуса платежа
  async getPaymentStatus(paymentId) {
    const { data } = await api.get(`/payments/${paymentId}/status`)
    return data
  },

  // Получение истории платежей
  async getPaymentHistory(params) {
    const { data } = await api.get('/payments/history', { params })
    return data
  },

  // Получение квитанции
  async getReceipt(paymentId) {
    const { data } = await api.get(`/payments/${paymentId}/receipt`, {
      responseType: 'blob'
    })
    return data
  },

  // Сохранение карты
  async saveCard(cardData) {
    const { data } = await api.post('/payments/cards', cardData)
    return data
  },

  // Получение сохраненных карт
  async getSavedCards() {
    const { data } = await api.get('/payments/cards')
    return data
  },

  // Удаление карты
  async deleteCard(cardId) {
    await api.delete(`/payments/cards/${cardId}`)
  }
} 