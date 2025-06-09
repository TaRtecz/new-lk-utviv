<template>
  <div class="settings p-4">
    <h1 class="text-2xl font-bold mb-6">Настройки</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Навигация по настройкам -->
      <div class="card p-4 bg-white rounded-lg shadow">
        <nav class="space-y-2">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            class="w-full text-left p-3 rounded hover:bg-gray-50"
            :class="{ 'bg-primary text-white hover:bg-primary-dark': activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <i :class="tab.icon" class="mr-2"></i>
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Содержимое настроек -->
      <div class="card p-4 bg-white rounded-lg shadow md:col-span-2">
        <!-- Личные данные -->
        <div v-if="activeTab === 'personal'">
          <h2 class="text-xl font-bold mb-4">Личные данные</h2>
          <div class="space-y-4">
            <div class="field">
              <label for="name">Имя</label>
              <InputText id="name" v-model="personalData.name" />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <InputText id="email" v-model="personalData.email" type="email" />
            </div>
            <div class="field">
              <label for="phone">Телефон</label>
              <InputText id="phone" v-model="personalData.phone" />
            </div>
            <Button label="Сохранить" @click="savePersonalData" />
          </div>
        </div>

        <!-- Уведомления -->
        <div v-if="activeTab === 'notifications'">
          <h2 class="text-xl font-bold mb-4">Уведомления</h2>
          <div class="space-y-4">
            <div v-for="setting in notificationSettings" :key="setting.id" class="flex items-center justify-between">
              <div>
                <h3 class="font-medium">{{ setting.name }}</h3>
                <p class="text-sm text-gray-600">{{ setting.description }}</p>
              </div>
              <InputSwitch v-model="setting.enabled" />
            </div>
          </div>
        </div>

        <!-- Безопасность -->
        <div v-if="activeTab === 'security'">
          <h2 class="text-xl font-bold mb-4">Безопасность</h2>
          <div class="space-y-4">
            <div class="field">
              <label for="currentPassword">Текущий пароль</label>
              <Password id="currentPassword" v-model="securityData.currentPassword" />
            </div>
            <div class="field">
              <label for="newPassword">Новый пароль</label>
              <Password id="newPassword" v-model="securityData.newPassword" />
            </div>
            <div class="field">
              <label for="confirmPassword">Подтвердите пароль</label>
              <Password id="confirmPassword" v-model="securityData.confirmPassword" />
            </div>
            <Button label="Изменить пароль" @click="changePassword" />
          </div>
        </div>

        <!-- Язык и тема -->
        <div v-if="activeTab === 'appearance'">
          <h2 class="text-xl font-bold mb-4">Внешний вид</h2>
          <div class="space-y-4">
            <div class="field">
              <label for="language">Язык</label>
              <Dropdown 
                id="language" 
                v-model="appearanceData.language" 
                :options="languages"
                optionLabel="name"
                optionValue="value"
              />
            </div>
            <div class="field">
              <label for="theme">Тема</label>
              <Dropdown 
                id="theme" 
                v-model="appearanceData.theme" 
                :options="themes"
                optionLabel="name"
                optionValue="value"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('personal')

const tabs = [
  { id: 'personal', name: 'Личные данные', icon: 'pi pi-user' },
  { id: 'notifications', name: 'Уведомления', icon: 'pi pi-bell' },
  { id: 'security', name: 'Безопасность', icon: 'pi pi-lock' },
  { id: 'appearance', name: 'Внешний вид', icon: 'pi pi-palette' }
]

const personalData = ref({
  name: 'Иван Иванов',
  email: 'ivan@example.com',
  phone: '+7 (999) 123-45-67'
})

const notificationSettings = ref([
  {
    id: 1,
    name: 'Email уведомления',
    description: 'Получать уведомления на email',
    enabled: true
  },
  {
    id: 2,
    name: 'SMS уведомления',
    description: 'Получать уведомления по SMS',
    enabled: false
  },
  {
    id: 3,
    name: 'Push уведомления',
    description: 'Получать push-уведомления',
    enabled: true
  }
])

const securityData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const appearanceData = ref({
  language: 'ru',
  theme: 'light'
})

const languages = [
  { name: 'Русский', value: 'ru' },
  { name: 'English', value: 'en' }
]

const themes = [
  { name: 'Светлая', value: 'light' },
  { name: 'Темная', value: 'dark' }
]

const savePersonalData = () => {
  // Здесь будет логика сохранения данных
  console.log('Сохранение личных данных:', personalData.value)
}

const changePassword = () => {
  // Здесь будет логика смены пароля
  console.log('Смена пароля:', securityData.value)
}
</script>

<style scoped>
.settings {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 