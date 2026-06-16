import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/routes.js'
import "@/css/style.css"

createApp(App).use(router).mount('#app')
