import api from './api'

export const gisService = {
  // Получение данных о лицевом счете
  async getAccountInfo(accountNumber) {
    const { data } = await api.get(`/gis/accounts/${accountNumber}`)
    return data
  },

  // Получение истории платежей
  async getPaymentHistory(accountNumber, params) {
    const { data } = await api.get(`/gis/accounts/${accountNumber}/payments`, { params })
    return data
  },

  // Получение показаний счетчиков
  async getMeterReadings(accountNumber, params) {
    const { data } = await api.get(`/gis/accounts/${accountNumber}/readings`, { params })
    return data
  },

  // Отправка показаний счетчиков
  async submitMeterReadings(accountNumber, readings) {
    const { data } = await api.post(`/gis/accounts/${accountNumber}/readings`, readings)
    return data
  },

  // Получение информации о начислениях
  async getCharges(accountNumber, params) {
    const { data } = await api.get(`/gis/accounts/${accountNumber}/charges`, { params })
    return data
  },

  // Получение информации о перерывах в предоставлении услуг
  async getServiceInterruptions(accountNumber) {
    const { data } = await api.get(`/gis/accounts/${accountNumber}/interruptions`)
    return data
  }
} 