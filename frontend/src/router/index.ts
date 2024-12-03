import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Association from '@/views/Association.vue'
import Marches from '@/views/Marches.vue'
import Contact from '@/views/Contact.vue'
import Adherer from '@/views/Adherer.vue'
import Produits from '@/views/Produits.vue'  // Ajoutez cette ligne
import ArtisansView from '@/views/ArtisansView.vue'  // Add this line

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/artisans',
    name: 'Artisans',
    component: ArtisansView
  },
  {
    path: '/association',
    name: 'Association',
    component: Association
  },
  {
    path: '/produits',
    name: 'Produits',
    component: Produits
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