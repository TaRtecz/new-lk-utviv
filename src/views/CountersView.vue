<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Счетчики</h2>
      <button class="btn btn-primary" @click="showAddCounter = true">
        <i class="pi pi-plus mr-2"></i>
        Добавить счетчик
      </button>
    </div>

    <!-- Список счетчиков -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="counter in counters" :key="counter.id" class="card">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-medium text-gray-900">{{ counter.name }}</h3>
            <p class="text-sm text-gray-500">Номер: {{ counter.number }}</p>
          </div>
          <span :class="getStatusClass(counter.status)">
            {{ counter.status }}
          </span>
        </div>

        <div class="mt-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-gray-600">Текущие показания</span>
            <span class="text-lg font-semibold">{{ counter.currentReading }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600">Предыдущие показания</span>
            <span class="text-gray-900">{{ counter.previousReading }}</span>
          </div>
        </div>

        <div class="mt-4">
          <button class="btn btn-secondary w-full" @click="showReadingForm(counter)">
            Внести показания
          </button>
        </div>
      </div>
    </div>

    <!-- Форма внесения показаний -->
    <Dialog v-model:visible="showReadingDialog" modal header="Внести показания" :style="{ width: '450px' }">
      <div class="p-4">
        <div class="form-group">
          <label class="label">Текущие показания</label>
          <InputNumber v-model="newReading" class="input" :min="selectedCounter?.previousReading || 0" />
        </div>
        <div class="form-group">
          <label class="label">Дата снятия показаний</label>
          <Calendar v-model="readingDate" dateFormat="dd.mm.yy" class="w-full" />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <button class="btn btn-secondary" @click="showReadingDialog = false">Отмена</button>
          <button class="btn btn-primary" @click="submitReading" :disabled="!newReading">
            Сохранить
          </button>
        </div>
      </template>
    </Dialog>

    <!-- История показаний -->
    <div class="card">
      <h3 class="text-lg font-medium text-gray-900 mb-4">История показаний</h3>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Счетчик</th>
              <th>Показания</th>
              <th>Расход</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reading in readingHistory" :key="reading.id">
              <td>{{ reading.date }}</td>
              <td>{{ reading.counterName }}</td>
              <td>{{ reading.value }}</td>
              <td>{{ reading.consumption }}</td>
              <td>
                <span :class="getStatusClass(reading.status)">
                  {{ reading.status }}
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
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const counters = ref([])
const showReadingDialog = ref(false)
const showAddCounter = ref(false)
const selectedCounter = ref(null)
const newReading = ref(null)
const readingDate = ref(new Date())

const readingHistory = ref([
  {
    id: 1,
    date: '2024-03-15',
    counterName: 'Холодная вода',
    value: 123.5,
    consumption: 2.3,
    status: 'Подтверждено'
  },
  {
    id: 2,
    date: '2024-03-14',
    counterName: 'Горячая вода',
    value: 89.2,
    consumption: 1.8,
    status: 'В обработке'
  }
])

const getStatusClass = (status) => {
  const classes = {
    'Подтверждено': 'badge badge-success',
    'В обработке': 'badge badge-warning',
    'Отклонено': 'badge badge-error'
  }
  return classes[status] || 'badge'
}

const showReadingForm = (counter) => {
  selectedCounter.value = counter
  newReading.value = null
  readingDate.value = new Date()
  showReadingDialog.value = true
}

const submitReading = async () => {
  if (!selectedCounter.value || !newReading.value) return

  try {
    await userStore.submitCounterReading(selectedCounter.value.id, newReading.value)
    showReadingDialog.value = false
    await userStore.fetchCounters()
  } catch (error) {
    console.error('Ошибка при отправке показаний:', error)
  }
}

onMounted(async () => {
  await userStore.fetchCounters()
  counters.value = userStore.user?.counters || []
})
</script> 