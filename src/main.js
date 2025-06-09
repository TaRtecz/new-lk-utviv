import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'

// PrimeVue компоненты
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Calendar from 'primevue/calendar'
import Dialog from 'primevue/dialog'
import Password from 'primevue/password'
import InputSwitch from 'primevue/inputswitch'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Textarea from 'primevue/textarea'

// Стили
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css'
import './assets/main.css'

const app = createApp(App)

// Регистрация компонентов
app.component('Button', Button)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Dropdown', Dropdown)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Tag', Tag)
app.component('Calendar', Calendar)
app.component('Dialog', Dialog)
app.component('Password', Password)
app.component('InputSwitch', InputSwitch)
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('Textarea', Textarea)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true })

app.mount('#app')
