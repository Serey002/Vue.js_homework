import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../view/HomePage.vue'
import AboutPage from '../view/AboutPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/About',
    name: 'about',
    component: AboutPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router