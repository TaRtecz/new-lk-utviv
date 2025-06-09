<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <img class="h-8 w-auto" src="@/assets/logo.svg" alt="Logo" />
          <h1 class="ml-4 text-xl font-semibold text-gray-900 dark:text-white">Личный кабинет</h1>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-500 dark:text-gray-400">Сессия: {{ sessionTime }}</span>
          <button class="btn btn-secondary" @click="logout">
            <i class="pi pi-sign-out mr-2"></i>
            Выйти
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const sessionTime = ref('19:00')
let timer

onMounted(() => {
  timer = setInterval(() => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    sessionTime.value = `${hours}:${minutes}`
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script> 