import { ref, computed } from 'vue'
import { gisService } from '@/services/gis.service'

export function useCounters(accountNumber) {
  const counters = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchCounters = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await gisService.getMeterReadings(accountNumber)
      counters.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const submitReadings = async (readings) => {
    loading.value = true
    error.value = null
    try {
      await gisService.submitMeterReadings(accountNumber, readings)
      await fetchCounters()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getConsumption = (current, previous) => {
    return current - previous
  }

  const getStatus = (current, previous) => {
    const consumption = getConsumption(current, previous)
    if (consumption < 0) return 'error'
    if (consumption > previous * 1.5) return 'warning'
    return 'success'
  }

  const sortedCounters = computed(() => {
    return [...counters.value].sort((a, b) => a.name.localeCompare(b.name))
  })

  return {
    counters,
    loading,
    error,
    fetchCounters,
    submitReadings,
    getConsumption,
    getStatus,
    sortedCounters
  }
} 