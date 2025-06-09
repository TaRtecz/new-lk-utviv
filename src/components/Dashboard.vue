<template>
  <div class="dashboard p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Баланс и график -->
      <div class="card p-4 bg-white rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-4">Баланс</h2>
        <div class="text-3xl font-bold text-primary mb-4">{{ balance }} ₽</div>
        <LineChart :data="chartData" :options="chartOptions" />
      </div>

      <!-- Быстрые действия -->
      <div class="card p-4 bg-white rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-4">Быстрые действия</h2>
        <Button label="Оплатить" icon="pi pi-wallet" class="p-button-primary w-full mb-4" @click="navigateToPayment" />
        <div class="text-sm text-gray-600">
          Сессия истекает через: {{ sessionTimeLeft }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Line as LineChart } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const router = useRouter()
const userStore = useUserStore()

const balance = computed(() => userStore.balance)
const sessionTimeLeft = ref('')

const chartData = {
  labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
  datasets: [
    {
      label: 'Расходы',
      data: [1200, 1900, 1500, 2100, 1800, 2000],
      borderColor: '#1976D2',
      tension: 0.4
    }
  ]
}

const chartOptions = {
  // responsive: true,
  // maintainAspectRatio: false
}

const navigateToPayment = () => {
  router.push('/payment')
}

const updateSessionTimer = () => {
  const endTime = new Date(userStore.sessionEndTime)
  const now = new Date()
  const diff = endTime - now
  
  if (diff <= 0) {
    sessionTimeLeft.value = 'Сессия истекла'
    return
  }

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  sessionTimeLeft.value = `${hours}:${minutes.toString().padStart(2, '0')}`
}

onMounted(async () => {
  await userStore.fetchBalance()
  setInterval(updateSessionTimer, 1000)
})
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 