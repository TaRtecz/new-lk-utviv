<template>
  <div class="calendar p-4">
    <h1 class="text-2xl font-bold mb-6">Календарь событий</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Календарь -->
      <div class="card p-4 bg-white rounded-lg shadow md:col-span-2">
        <Calendar 
          v-model="selectedDate" 
          :events="events"
          class="w-full"
          :showWeek="true"
          :showMonthNavigator="true"
          :showYearNavigator="true"
        />
      </div>

      <!-- Список событий -->
      <div class="card p-4 bg-white rounded-lg shadow">
        <h2 class="text-xl font-bold mb-4">События на {{ formatDate(selectedDate) }}</h2>
        
        <div class="space-y-4">
          <div v-for="event in dayEvents" :key="event.id" class="p-3 bg-gray-50 rounded">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium">{{ event.title }}</h3>
                <p class="text-sm text-gray-600">{{ event.time }}</p>
              </div>
              <Tag :value="event.type" :severity="getEventSeverity(event.type)" />
            </div>
          </div>
        </div>

        <!-- Добавление события -->
        <div class="mt-4">
          <Button 
            label="Добавить событие" 
            icon="pi pi-plus" 
            class="p-button-outlined w-full"
            @click="showAddEventDialog = true"
          />
        </div>
      </div>
    </div>

    <!-- Диалог добавления события -->
    <Dialog 
      v-model:visible="showAddEventDialog" 
      header="Новое событие" 
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="title">Название</label>
        <InputText id="title" v-model="newEvent.title" />
      </div>
      
      <div class="field">
        <label for="date">Дата</label>
        <Calendar id="date" v-model="newEvent.date" />
      </div>
      
      <div class="field">
        <label for="time">Время</label>
        <InputText id="time" v-model="newEvent.time" />
      </div>
      
      <div class="field">
        <label for="type">Тип события</label>
        <Dropdown 
          id="type" 
          v-model="newEvent.type" 
          :options="eventTypes"
          optionLabel="name"
          optionValue="value"
        />
      </div>

      <template #footer>
        <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="showAddEventDialog = false" />
        <Button label="Сохранить" icon="pi pi-check" @click="addEvent" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const selectedDate = ref(new Date())
const showAddEventDialog = ref(false)

const events = ref([
  {
    id: 1,
    title: 'Отключение воды',
    date: new Date(2024, 5, 7),
    time: '10:00 - 18:00',
    type: 'warning'
  },
  {
    id: 2,
    title: 'Плановый осмотр',
    date: new Date(2024, 5, 7),
    time: '14:00',
    type: 'info'
  }
])

const eventTypes = [
  { name: 'Отключение', value: 'warning' },
  { name: 'Осмотр', value: 'info' },
  { name: 'Оплата', value: 'success' }
]

const newEvent = ref({
  title: '',
  date: new Date(),
  time: '',
  type: ''
})

const dayEvents = computed(() => {
  return events.value.filter(event => 
    event.date.toDateString() === selectedDate.value.toDateString()
  )
})

const formatDate = (date) => {
  return format(date, 'd MMMM yyyy', { locale: ru })
}

const getEventSeverity = (type) => {
  switch (type) {
    case 'warning': return 'warning'
    case 'info': return 'info'
    case 'success': return 'success'
    default: return 'info'
  }
}

const addEvent = () => {
  events.value.push({
    id: events.value.length + 1,
    ...newEvent.value
  })
  showAddEventDialog.value = false
  newEvent.value = {
    title: '',
    date: new Date(),
    time: '',
    type: ''
  }
}
</script>

<style scoped>
.calendar {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 