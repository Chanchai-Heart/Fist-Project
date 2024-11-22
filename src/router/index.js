import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Uesr/HomeView.vue'
import CartView from '@/views/Uesr/CartView.vue'
import CheckoutView from '@/views/Uesr/CheckoutView.vue'
import ProfileView from '@/views/Uesr/ProfileView.vue'
import SearchView from '@/views/Uesr/SearchView.vue'
import SuccessView from '@/views/Uesr/SuccessView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessView,
      
    },
  ],
})

export default router
