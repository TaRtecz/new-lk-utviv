<template>
  <div class="help p-4">
    <h1 class="text-2xl font-bold mb-6">Помощь</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Поиск и навигация -->
      <div class="card p-4 bg-white rounded-lg shadow">
        <div class="mb-4">
          <span class="p-input-icon-left w-full">
            <i class="pi pi-search" />
            <InputText 
              v-model="searchQuery" 
              placeholder="Поиск по вопросам" 
              class="w-full"
            />
          </span>
        </div>

        <Accordion>
          <AccordionTab v-for="category in categories" :key="category.id" :header="category.name">
            <div class="space-y-2">
              <button 
                v-for="question in category.questions" 
                :key="question.id"
                class="w-full text-left p-2 rounded hover:bg-gray-50"
                :class="{ 'bg-primary text-white hover:bg-primary-dark': selectedQuestion?.id === question.id }"
                @click="selectQuestion(question)"
              >
                {{ question.title }}
              </button>
            </div>
          </AccordionTab>
        </Accordion>

        <div class="mt-4">
          <Button 
            label="Связаться с поддержкой" 
            icon="pi pi-envelope" 
            class="p-button-outlined w-full"
            @click="showContactForm = true"
          />
        </div>
      </div>

      <!-- Содержимое вопроса -->
      <div class="card p-4 bg-white rounded-lg shadow md:col-span-2">
        <template v-if="selectedQuestion">
          <h2 class="text-xl font-bold mb-4">{{ selectedQuestion.title }}</h2>
          <div class="prose max-w-none">
            <p>{{ selectedQuestion.content }}</p>
          </div>
        </template>
        <template v-else>
          <div class="text-center py-8">
            <i class="pi pi-question-circle text-4xl text-gray-400 mb-4"></i>
            <p class="text-gray-600">Выберите вопрос из списка слева</p>
          </div>
        </template>
      </div>
    </div>

    <!-- Форма обратной связи -->
    <Dialog 
      v-model:visible="showContactForm" 
      header="Связаться с поддержкой" 
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="subject">Тема</label>
        <InputText id="subject" v-model="contactForm.subject" />
      </div>
      
      <div class="field">
        <label for="message">Сообщение</label>
        <Textarea 
          id="message" 
          v-model="contactForm.message" 
          rows="5"
          autoResize
        />
      </div>
      
      <div class="field">
        <label for="email">Email для ответа</label>
        <InputText id="email" v-model="contactForm.email" type="email" />
      </div>

      <template #footer>
        <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="showContactForm = false" />
        <Button label="Отправить" icon="pi pi-send" @click="sendContactForm" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedQuestion = ref(null)
const showContactForm = ref(false)

const contactForm = ref({
  subject: '',
  message: '',
  email: ''
})

const categories = [
  {
    id: 1,
    name: 'Общие вопросы',
    questions: [
      {
        id: 1,
        title: 'Как войти в личный кабинет?',
        content: 'Для входа в личный кабинет используйте ваш логин и пароль. Если вы забыли пароль, воспользуйтесь функцией восстановления.'
      },
      {
        id: 2,
        title: 'Как изменить пароль?',
        content: 'Для изменения пароля перейдите в раздел "Настройки" -> "Безопасность" и следуйте инструкциям.'
      }
    ]
  },
  {
    id: 2,
    name: 'Оплата',
    questions: [
      {
        id: 3,
        title: 'Какие способы оплаты доступны?',
        content: 'Мы принимаем оплату банковскими картами VISA, Mastercard, МИР, а также через электронные кошельки.'
      },
      {
        id: 4,
        title: 'Как получить квитанцию?',
        content: 'После успешной оплаты вы можете скачать квитанцию в формате PDF или получить её на email.'
      }
    ]
  },
  {
    id: 3,
    name: 'Счетчики',
    questions: [
      {
        id: 5,
        title: 'Как передать показания счетчиков?',
        content: 'Передавать показания можно через раздел "Счетчики". Выберите нужный счетчик и введите текущие показания.'
      },
      {
        id: 6,
        title: 'Когда нужно передавать показания?',
        content: 'Показания необходимо передавать до 25 числа каждого месяца.'
      }
    ]
  }
]

const selectQuestion = (question) => {
  selectedQuestion.value = question
}

const sendContactForm = () => {
  // Здесь будет логика отправки формы
  console.log('Отправка формы:', contactForm.value)
  showContactForm.value = false
  contactForm.value = {
    subject: '',
    message: '',
    email: ''
  }
}
</script>

<style scoped>
.help {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 