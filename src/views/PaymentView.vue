<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Оплата</h2>
      <button class="btn btn-primary" @click="showPaymentForm = true">
        <i class="pi pi-plus mr-2"></i>
        Новая оплата
      </button>
    </div>

    <!-- Форма оплаты -->
    <Dialog v-model:visible="showPaymentForm" modal header="Оплата" :style="{ width: '450px' }">
      <div class="p-4">
        <div class="form-group">
          <label class="label">Сумма оплаты</label>
          <InputNumber v-model="paymentAmount" class="input" :min="100" :step="100" />
        </div>
        <div class="form-group">
          <label class="label">Способ оплаты</label>
          <Dropdown
            v-model="selectedPaymentMethod"
            :options="paymentMethods"
            optionLabel="name"
            placeholder="Выберите способ оплаты"
            class="w-full"
          />
        </div>
        <div v-if="selectedPaymentMethod?.type === 'card'" class="form-group">
          <label class="label">Карта</label>
          <Dropdown
            v-model="selectedCard"
            :options="savedCards"
            optionLabel="number"
            placeholder="Выберите карту"
            class="w-full"
          />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <button class="btn btn-secondary" @click="showPaymentForm = false">Отмена</button>
          <button class="btn btn-primary" @click="processPayment" :disabled="!canProcessPayment">
            Оплатить
          </button>
        </div>
      </template>
    </Dialog>

    <!-- История платежей -->
    <div class="card">
      <h3 class="text-lg font-medium text-gray-900 mb-4">История платежей</h3>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Сумма</th>
              <th>Способ оплаты</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in paymentHistory" :key="payment.id">
              <td>{{ payment.date }}</td>
              <td>{{ payment.amount }} ₽</td>
              <td>{{ payment.method }}</td>
              <td>
                <span :class="getStatusClass(payment.status)">
                  {{ payment.status }}
                </span>
              </td>
              <td>
                <button class="text-primary hover:text-primary-dark" @click="downloadReceipt(payment)">
                  <i class="pi pi-download"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const showPaymentForm = ref(false)
const paymentAmount = ref(null)
const selectedPaymentMethod = ref(null)
const selectedCard = ref(null)

const paymentMethods = [
  { id: 1, name: 'Банковская карта', type: 'card' },
  { id: 2, name: 'Электронный кошелек', type: 'wallet' },
  { id: 3, name: 'Мобильный платеж', type: 'mobile' }
]

const savedCards = [
  { id: 1, number: '**** **** **** 1234', type: 'VISA' },
  { id: 2, number: '**** **** **** 5678', type: 'Mastercard' }
]

const paymentHistory = ref([
  {
    id: 1,
    date: '2024-03-15',
    amount: 1500,
    method: 'VISA **** 1234',
    status: 'Успешно'
  },
  {
    id: 2,
    date: '2024-03-14',
    amount: 2000,
    method: 'Mastercard **** 5678',
    status: 'В обработке'
  }
])

const canProcessPayment = computed(() => {
  if (!paymentAmount.value || !selectedPaymentMethod.value) return false
  if (selectedPaymentMethod.value.type === 'card' && !selectedCard.value) return false
  return true
})

const getStatusClass = (status) => {
  const classes = {
    'Успешно': 'badge badge-success',
    'В обработке': 'badge badge-warning',
    'Ошибка': 'badge badge-error'
  }
  return classes[status] || 'badge'
}

const processPayment = async () => {
  if (!canProcessPayment.value) return

  try {
    // Здесь будет логика обработки платежа
    showPaymentForm.value = false
    await userStore.fetchPaymentHistory()
  } catch (error) {
    console.error('Ошибка при обработке платежа:', error)
  }
}

const downloadReceipt = (payment) => {
  // Здесь будет логика скачивания квитанции
  console.log('Скачивание квитанции для платежа:', payment.id)
}

onMounted(async () => {
  await userStore.fetchPaymentHistory()
  paymentHistory.value = userStore.user?.paymentHistory || []
})
</script> 