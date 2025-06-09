<template>
  <aside class="w-60 bg-white dark:bg-gray-800 shadow-sm h-[calc(100vh-4rem)] overflow-y-auto">
    <nav class="p-4 space-y-1">
      <router-link
        v-for="item in navigation"
        :key="item.path"
        :to="item.path"
        class="nav-link"
        :class="{ active: $route.path === item.path }"
      >
        <i :class="item.icon"></i>
        <span>{{ item.name }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
const navigation = [
  { name: 'Главная', path: '/', icon: 'pi pi-home' },
  { name: 'Счетчики', path: '/counters', icon: 'pi pi-chart-bar' },
  { name: 'Оплата', path: '/payment', icon: 'pi pi-credit-card' },
  { name: 'Календарь', path: '/calendar', icon: 'pi pi-calendar' },
  { name: 'Настройки', path: '/settings', icon: 'pi pi-cog' },
  { name: 'Помощь', path: '/help', icon: 'pi pi-question-circle' }
]
</script>

<style scoped>
.nav-link {
  @apply flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700;
}

.nav-link i {
  @apply mr-3 text-lg;
}

.nav-link.active {
  @apply bg-primary text-white hover:bg-primary-dark;
}
</style> 