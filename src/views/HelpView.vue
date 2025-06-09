<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">Помощь</h2>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Поиск и категории -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Поиск -->
        <div class="card">
          <span class="p-input-icon-left w-full">
            <i class="pi pi-search" />
            <InputText
              v-model="searchQuery"
              placeholder="Поиск по вопросам"
              class="w-full"
            />
          </span>
        </div>

        <!-- Категории -->
        <div class="card">
          <Accordion>
            <AccordionTab
              v-for="category in categories"
              :key="category.id"
              :header="category.name"
            >
              <div class="space-y-2">
                <button
                  v-for="question in category.questions"
                  :key="question.id"
                  class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  :class="{ 'bg-gray-100': selectedQuestion?.id === question.id }"
                  @click="selectedQuestion = question"
                >
                  {{ question.title }}
                </button>
              </div>
            </AccordionTab>
          </Accordion>
        </div>
      </div>

      <!-- Контент вопроса -->
      <div class="lg:col-span-2">
        <div class="card">
          <div v-if="selectedQuestion" class="space-y-4">
            <h3 class="text-xl font-medium text-gray-900">
              {{ selectedQuestion.title }}
            </h3>
            <div class="prose max-w-none">
              <p>{{ selectedQuestion.content }}</p>
            </div>
            <div class="pt-4 border-t">
              <p class="text-sm text-gray-500">
                Была ли эта информация полезна?
              </p>
              <div class="flex gap-2 mt-2">
                <button class="btn btn-outline">
                  <i class="pi pi-thumbs-up mr-2"></i>
                  Да
                </button>
                <button class="btn btn-outline">
                  <i class="pi pi-thumbs-down mr-2"></i>
                  Нет
                </button>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12">
            <i class="pi pi-question-circle text-4xl text-gray-400 mb-4"></i>
            <p class="text-gray-500">Выберите вопрос из списка слева</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Форма обратной связи -->
    <div class="card">
      <h3 class="text-lg font-medium text-gray-900 mb-4">
        Не нашли ответ на свой вопрос?
      </h3>
      <form @submit.prevent="submitContactForm" class="space-y-4">
        <div class="form-group">
          <label class="label">Тема</label>
          <InputText v-model="contactForm.subject" class="input" />
        </div>
        <div class="form-group">
          <label class="label">Сообщение</label>
          <Textarea
            v-model="contactForm.message"
            class="input"
            rows="4"
            placeholder="Опишите ваш вопрос подробно"
          />
        </div>
        <div class="form-group">
          <label class="label">Email для ответа</label>
          <InputText v-model="contactForm.email" type="email" class="input" />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="btn btn-primary">Отправить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const selectedQuestion = ref(null)

const categories = [
  {
    id: 1,
    name: 'Общие вопросы',
    questions: [
      {
        id: 1,
        title: 'Как войти в личный кабинет?',
        content:
          'Для входа в личный кабинет используйте ваш email и пароль. Если вы забыли пароль, воспользуйтесь функцией восстановления пароля на странице входа.'
      },
      {
        id: 2,
        title: 'Как изменить личные данные?',
        content:
          'Для изменения личных данных перейдите в раздел "Настройки" -> "Личные данные". После внесения изменений не забудьте нажать кнопку "Сохранить".'
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
        content:
          'В личном кабинете доступны следующие способы оплаты: банковская карта, электронный кошелек, мобильный платеж. Выберите удобный для вас способ при оформлении платежа.'
      },
      {
        id: 4,
        title: 'Как получить квитанцию?',
        content:
          'После успешной оплаты вы можете скачать квитанцию в разделе "История платежей". Найдите нужный платеж и нажмите кнопку "Скачать квитанцию".'
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
        content:
          'Для передачи показаний перейдите в раздел "Счетчики". Выберите нужный счетчик, введите текущие показания и нажмите "Отправить".'
      },
      {
        id: 6,
        title: 'Когда нужно передавать показания?',
        content:
          'Показания счетчиков необходимо передавать до 25 числа каждого месяца. Рекомендуем настроить уведомления, чтобы не пропустить срок передачи показаний.'
      }
    ]
  }
]

const contactForm = ref({
  subject: '',
  message: '',
  email: ''
})

const submitContactForm = () => {
  // Здесь будет логика отправки формы обратной связи
  console.log('Отправка формы:', contactForm.value)
}
</script> 