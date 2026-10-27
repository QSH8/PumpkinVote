import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vueClickOutside from './utils/vue-click-outside'
const app = createApp(App)

app.use(router)
app.use(store)
app.directive('click-outside', vueClickOutside)
app.mount('#app')
