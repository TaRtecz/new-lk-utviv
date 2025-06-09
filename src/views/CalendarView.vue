<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Календарь событий</h2>
      <button class="btn btn-primary" @click="showAddEvent = true">
        <i class="pi pi-plus mr-2"></i>
        Добавить событие
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Календарь -->
      <div class="lg:col-span-2">
        <div class="card">
          <Calendar
            v-model="selectedDate"
            :events="events"
            :showWeek="true"
            :showButtonBar="true"
            class="w-full"
            @date-select="onDateSelect"
          />
        </div>
      </div>

      <!-- Список событий -->
      <div class="card">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          События на {{ formatDate(selectedDate) }}
        </h3>
        <div class="space-y-4">
          <div v-for="event in filteredEvents" :key="event.id" class="p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-medium text-gray-900">{{ event.title }}</h4>
                <p class="text-sm text-gray-500">{{ event.time }}</p>
              </div>
              <button class="text-gray-400 hover:text-gray-600" @click="deleteEvent(event)">
                <i class="pi pi-trash"></i>
              </button>
            </div>
            <p class="mt-2 text-gray-600">{{ event.description }}</p>
          </div>
          <div v-if="filteredEvents.length === 0" class="text-center text-gray-500 py-4">
            Нет событий на выбранную дату
          </div>
        </div>
      </div>
    </div>

    <!-- Форма добавления события -->
    <Dialog v-model:visible="showAddEvent" modal header="Добавить событие" :style="{ width: '450px' }">
      <div class="p-4">
        <div class="form-group">
          <label class="label">Название</label>
          <InputText v-model="newEvent.title" class="input" placeholder="Введите название события" />
        </div>
        <div class="form-group">
          <label class="label">Дата</label>
          <Calendar v-model="newEvent.date" dateFormat="dd.mm.yy" class="w-full" />
        </div>
        <div class="form-group">
          <label class="label">Время</label>
          <InputText v-model="newEvent.time" class="input" placeholder="Например: 14:30" />
        </div>
        <div class="form-group">
          <label class="label">Описание</label>
          <Textarea v-model="newEvent.description" class="input" rows="3" placeholder="Введите описание события" />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <button class="btn btn-secondary" @click="showAddEvent = false">Отмена</button>
          <button class="btn btn-primary" @click="addEvent" :disabled="!canAddEvent">
            Добавить
          </button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedDate = ref(new Date())
const showAddEvent = ref(false)
const events = ref([
  {
    id: 1,
    title: 'Отключение воды',
    date: '2024-03-20',
    time: '10:00',
    description: 'Плановое отключение холодной воды'
  },
  {
    id: 2,
    title: 'Проверка счетчиков',
    date: '2024-03-25',
    time: '14:00',
    description: 'Плановый осмотр счетчиков'
  }
])

const newEvent = ref({
  title: '',
  date: new Date(),
  time: '',
  description: ''
})

const filteredEvents = computed(() => {
  return events.value.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.toDateString() === selectedDate.value.toDateString()
  })
})

const canAddEvent = computed(() => {
  return newEvent.value.title && newEvent.value.time
})

const formatDate = (date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const onDateSelect = (date) => {
  selectedDate.value = date
}

const addEvent = () => {
  if (!canAddEvent.value) return

  events.value.push({
    id: Date.now(),
    ...newEvent.value,
    date: newEvent.value.date.toISOString().split('T')[0]
  })

  showAddEvent.value = false
  newEvent.value = {
    title: '',
    date: new Date(),
    time: '',
    description: ''
  }
}

const deleteEvent = (event) => {
  events.value = events.value.filter(e => e.id !== event.id)
}
</script> 