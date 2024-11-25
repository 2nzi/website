import { createApp } from 'vue'
import { type Router } from 'vue-router'  // Ajout de cet import
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')