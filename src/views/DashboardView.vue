<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Баланс -->
      <div class="card">
        <h3 class="text-lg font-medium text-gray-900">Баланс</h3>
        <p class="mt-2 text-3xl font-bold text-primary">{{ balance }} ₽</p>
        <button class="mt-4 btn btn-primary w-full">Оплатить</button>
      </div>

      <!-- РСО -->
      <div class="card">
        <h3 class="text-lg font-medium text-gray-900">Ваша РСО</h3>
        <p class="mt-2 text-gray-600">ООО "УТВИВ"</p>
        <p class="mt-1 text-sm text-gray-500">ИНН: 1234567890</p>
      </div>

      <!-- iДом -->
      <div class="card">
        <h3 class="text-lg font-medium text-gray-900">iДом</h3>
        <div class="mt-4 space-y-2">
          <button class="btn btn-secondary w-full">Получать</button>
          <button class="btn btn-secondary w-full">Вносить</button>
          <button class="btn btn-secondary w-full">Контролировать</button>
        </div>
      </div>
    </div>

    <!-- График расходов -->
    <div class="card">
      <h3 class="text-lg font-medium text-gray-900 mb-4">График расходов</h3>
      <div class="h-64">
        <canvas ref="chartRef"></canvas>
      </div>
    </div>

    <!-- Последние действия -->
    <div class="card">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Последние действия</h3>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Действие</th>
              <th>Сумма</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="action in recentActions" :key="action.id">
              <td>{{ action.date }}</td>
              <td>{{ action.type }}</td>
              <td>{{ action.amount }} ₽</td>
              <td>
                <span :class="getStatusClass(action.status)">
                  {{ action.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useUserStore } from '@/stores/user'

Chart.register(...registerables)

const userStore = useUserStore()
const balance = ref(0)
const chartRef = ref(null)
let chart = null

const recentActions = ref([
  {
    id: 1,
    date: '2024-03-15',
    type: 'Оплата',
    amount: 1500,
    status: 'Успешно'
  },
  {
    id: 2,
    date: '2024-03-14',
    type: 'Показания счетчиков',
    amount: 0,
    status: 'Выполнено'
  },
  {
    id: 3,
    date: '2024-03-13',
    type: 'Оплата',
    amount: 2000,
    status: 'В обработке'
  }
])

const getStatusClass = (status) => {
  const classes = {
    'Успешно': 'badge badge-success',
    'Выполнено': 'badge badge-success',
    'В обработке': 'badge badge-warning',
    'Ошибка': 'badge badge-error'
  }
  return classes[status] || 'badge'
}

onMounted(async () => {
  await userStore.fetchBalance()
  balance.value = userStore.user?.balance || 0

  // Инициализация графика
  const ctx = chartRef.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
      datasets: [{
        label: 'Расходы',
        data: [1200, 1900, 1500, 2100, 1800, 2000],
        borderColor: '#1976D2',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => `${value} ₽`
          }
        }
      }
    }
  })
})
</script> 