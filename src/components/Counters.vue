<template>
  <div class="counters p-4">
    <h1 class="text-2xl font-bold mb-6">Показания счетчиков</h1>
    
    <!-- Форма ввода показаний -->
    <div class="card p-4 bg-white rounded-lg shadow mb-6">
      <h2 class="text-xl font-bold mb-4">Ввод показаний</h2>
      <div v-for="counter in counters" :key="counter.id" class="mb-4">
        <div class="flex items-center justify-between">
          <span class="font-medium">{{ counter.name }}</span>
          <InputNumber 
            v-model="counter.reading" 
            :min="counter.lastReading" 
            :max="counter.lastReading + 1000"
            class="w-32"
          />
        </div>
      </div>
      <Button 
        label="Отправить показания" 
        class="p-button-primary" 
        @click="submitReadings"
        :loading="loading"
      />
    </div>

    <!-- История показаний -->
    <div class="card p-4 bg-white rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">История показаний</h2>
      <div v-for="counter in counters" :key="counter.id" class="mb-6">
        <h3 class="font-medium mb-2">{{ counter.name }}</h3>
        <LineChart 
          :data="getChartData(counter)" 
          :options="chartOptions"
          height="200"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { Line as LineChart } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const userStore = useUserStore()
const counters = ref([])
const loading = ref(false)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  }
}

const getChartData = (counter) => ({
  labels: counter.history.map(h => h.date),
  datasets: [{
    label: counter.name,
    data: counter.history.map(h => h.value),
    borderColor: '#1976D2',
    tension: 0.4
  }]
})

const submitReadings = async () => {
  loading.value = true
  try {
    for (const counter of counters.value) {
      await userStore.submitCounterReading(counter.id, counter.reading)
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await userStore.fetchCounters()
  counters.value = userStore.counters
})
</script>

<style scoped>
.counters {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 