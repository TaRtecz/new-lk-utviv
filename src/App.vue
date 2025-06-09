<template>
  <div class="min-h-screen" :class="{ 'dark': themeStore.theme === 'dark' }">
    <TheHeader />
    <div class="flex">
      <TheSidebar />
      <main class="flex-1 p-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheSidebar from '@/components/layout/TheSidebar.vue'

const themeStore = useThemeStore()

const navigation = [
  { name: 'Главная', path: '/' },
  { name: 'Счетчики', path: '/counters' },
  { name: 'Оплата', path: '/payment' },
  { name: 'Календарь', path: '/calendar' },
  { name: 'Настройки', path: '/settings' },
  { name: 'Помощь', path: '/help' }
]
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dark {
  @apply bg-gray-900 text-white;
}

.dark .card {
  @apply bg-gray-800 border-gray-700;
}

.dark .input {
  @apply bg-gray-700 border-gray-600 text-white;
}

.dark .label {
  @apply text-gray-300;
}

.dark .btn {
  @apply bg-gray-700 text-white hover:bg-gray-600;
}

.dark .btn-primary {
  @apply bg-primary hover:bg-primary-dark;
}

.dark .btn-outline {
  @apply border-gray-600 text-gray-300 hover:bg-gray-700;
}
</style>
