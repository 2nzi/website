import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Association from '@/views/Association.vue'
import Marches from '@/views/Marches.vue'
import Contact from '@/views/Contact.vue'
import Adherer from '@/views/Adherer.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/association',
    name: 'Association',
    component: Association
  },
  {
    path: '/marches',
    name: 'Marches',
    component: Marches
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/adherer',
    name: 'Adherer',
    component: Adherer
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router