<template>
  <div class="payment p-4">
    <h1 class="text-2xl font-bold mb-6">Оплата</h1>
    
    <!-- Форма оплаты -->
    <div class="card p-4 bg-white rounded-lg shadow mb-6">
      <h2 class="text-xl font-bold mb-4">Оплата услуг</h2>
      
      <!-- Выбор суммы -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Сумма оплаты</label>
        <InputNumber 
          v-model="amount" 
          :min="100" 
          :max="50000"
          class="w-full"
          prefix="₽"
        />
      </div>

      <!-- Выбор карты -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Выберите карту</label>
        <Dropdown
          v-model="selectedCard"
          :options="cards"
          optionLabel="name"
          placeholder="Выберите карту"
          class="w-full"
        />
      </div>

      <Button 
        label="Оплатить" 
        class="p-button-primary w-full" 
        @click="makePayment"
        :loading="loading"
      />
    </div>

    <!-- История платежей -->
    <div class="card p-4 bg-white rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">История платежей</h2>
      <DataTable 
        :value="paymentHistory" 
        :paginator="true" 
        :rows="5"
        class="p-datatable-sm"
      >
        <Column field="date" header="Дата" sortable></Column>
        <Column field="amount" header="Сумма" sortable>
          <template #body="slotProps">
            {{ slotProps.data.amount }} ₽
          </template>
        </Column>
        <Column field="status" header="Статус" sortable>
          <template #body="slotProps">
            <Tag 
              :value="slotProps.data.status" 
              :severity="getStatusSeverity(slotProps.data.status)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const amount = ref(1000)
const selectedCard = ref(null)
const loading = ref(false)

const cards = ref([
  { id: 1, name: '**** 1234 VISA' },
  { id: 2, name: '**** 5678 Mastercard' },
  { id: 3, name: '**** 9012 МИР' }
])

const paymentHistory = ref([])

const getStatusSeverity = (status) => {
  switch (status) {
    case 'Успешно': return 'success'
    case 'В обработке': return 'warning'
    case 'Ошибка': return 'danger'
    default: return 'info'
  }
}

const makePayment = async () => {
  if (!selectedCard.value || !amount.value) return
  
  loading.value = true
  try {
    // Здесь будет логика оплаты
    await new Promise(resolve => setTimeout(resolve, 1000))
    await userStore.fetchPaymentHistory()
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await userStore.fetchPaymentHistory()
  paymentHistory.value = userStore.paymentHistory
})
</script>

<style scoped>
.payment {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 