<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">Настройки</h2>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Навигация -->
      <div class="lg:col-span-1">
        <div class="card">
          <nav class="space-y-1">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="w-full text-left px-4 py-2 rounded-lg transition-colors"
              :class="[
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              ]"
              @click="activeTab = tab.id"
            >
              <i :class="tab.icon" class="mr-2"></i>
              {{ tab.name }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Контент -->
      <div class="lg:col-span-3">
        <!-- Личные данные -->
        <div v-if="activeTab === 'personal'" class="card">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Личные данные</h3>
          <form @submit.prevent="savePersonalData" class="space-y-4">
            <div class="form-group">
              <label class="label">ФИО</label>
              <InputText v-model="personalData.name" class="input" />
            </div>
            <div class="form-group">
              <label class="label">Email</label>
              <InputText v-model="personalData.email" type="email" class="input" />
            </div>
            <div class="form-group">
              <label class="label">Телефон</label>
              <InputText v-model="personalData.phone" class="input" />
            </div>
            <div class="form-group">
              <label class="label">Адрес</label>
              <Textarea v-model="personalData.address" class="input" rows="3" />
            </div>
            <div class="flex justify-end">
              <button type="submit" class="btn btn-primary">Сохранить</button>
            </div>
          </form>
        </div>

        <!-- Уведомления -->
        <div v-if="activeTab === 'notifications'" class="card">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Уведомления</h3>
          <div class="space-y-4">
            <div v-for="notification in notifications" :key="notification.id" class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">{{ notification.title }}</h4>
                <p class="text-sm text-gray-500">{{ notification.description }}</p>
              </div>
              <InputSwitch v-model="notification.enabled" />
            </div>
          </div>
        </div>

        <!-- Безопасность -->
        <div v-if="activeTab === 'security'" class="card">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Безопасность</h3>
          <form @submit.prevent="changePassword" class="space-y-4">
            <div class="form-group">
              <label class="label">Текущий пароль</label>
              <Password v-model="password.current" class="input" toggleMask />
            </div>
            <div class="form-group">
              <label class="label">Новый пароль</label>
              <Password v-model="password.new" class="input" toggleMask />
            </div>
            <div class="form-group">
              <label class="label">Подтверждение пароля</label>
              <Password v-model="password.confirm" class="input" toggleMask />
            </div>
            <div class="flex justify-end">
              <button type="submit" class="btn btn-primary">Изменить пароль</button>
            </div>
          </form>
        </div>

        <!-- Внешний вид -->
        <div v-if="activeTab === 'appearance'" class="card">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Внешний вид</h3>
          <div class="space-y-4">
            <div class="form-group">
              <label class="label">Язык</label>
              <Dropdown
                v-model="appearance.language"
                :options="languages"
                optionLabel="name"
                class="w-full"
              />
            </div>
            <div class="form-group">
              <label class="label">Тема</label>
              <div class="flex gap-4">
                <button
                  class="p-4 border rounded-lg"
                  :class="appearance.theme === 'light' ? 'border-primary' : 'border-gray-200'"
                  @click="toggleTheme('light')"
                >
                  <i class="pi pi-sun text-2xl"></i>
                  <span class="block mt-2">Светлая</span>
                </button>
                <button
                  class="p-4 border rounded-lg"
                  :class="appearance.theme === 'dark' ? 'border-primary' : 'border-gray-200'"
                  @click="toggleTheme('dark')"
                >
                  <i class="pi pi-moon text-2xl"></i>
                  <span class="block mt-2">Темная</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const activeTab = ref('personal')

const tabs = [
  { id: 'personal', name: 'Личные данные', icon: 'pi pi-user' },
  { id: 'notifications', name: 'Уведомления', icon: 'pi pi-bell' },
  { id: 'security', name: 'Безопасность', icon: 'pi pi-lock' },
  { id: 'appearance', name: 'Внешний вид', icon: 'pi pi-palette' }
]

const personalData = ref({
  name: 'Иванов Иван Иванович',
  email: 'ivanov@example.com',
  phone: '+7 (999) 123-45-67',
  address: 'г. Москва, ул. Примерная, д. 1, кв. 1'
})

const notifications = ref([
  {
    id: 1,
    title: 'Оплата',
    description: 'Уведомления о платежах и квитанциях',
    enabled: true
  },
  {
    id: 2,
    title: 'Счетчики',
    description: 'Напоминания о передаче показаний',
    enabled: true
  },
  {
    id: 3,
    title: 'Новости',
    description: 'Обновления и новости от РСО',
    enabled: false
  }
])

const password = ref({
  current: '',
  new: '',
  confirm: ''
})

const appearance = ref({
  language: { code: 'ru', name: 'Русский' },
  theme: themeStore.theme
})

const languages = [
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' }
]

const savePersonalData = () => {
  // Здесь будет логика сохранения личных данных
  console.log('Сохранение личных данных:', personalData.value)
}

const changePassword = () => {
  if (password.value.new !== password.value.confirm) {
    alert('Пароли не совпадают')
    return
  }
  // Здесь будет логика смены пароля
  console.log('Смена пароля:', password.value)
}

const toggleTheme = (newTheme) => {
  themeStore.theme = newTheme
  appearance.value.theme = newTheme
}
</script> 