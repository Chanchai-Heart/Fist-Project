import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/user/HomeView.vue'
import CartView from '@/views/user/CartView.vue'
import CheckoutView from '@/views/user/CheckoutView.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import SearchView from '@/views/user/SearchView.vue'
import SuccessView from '@/views/user/SuccessView.vue'

import AdminLogin from '@/admin/LoginView.vue'
import AdminDashboard from '@/admin/DashboardView.vue'

import AdminProductList from '@/admin/product/ListView.vue'
import AdminProductUpdate from '@/admin/product/UpdateView.vue'

import AdminUserList from '@/admin/user/ListView.vue'
import AdminUserUpdate from '@/admin/user/UpdateView.vue'

import AdminOrderList from '@/admin/order/ListView.vue'
import AdminOrderDetail from '@/admin/order/DetailView.vue'

import { useAccountStore } from '@/stores/account';

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
    /* Admin side */
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin,
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard,
    },
    {
      path: '/admin/products',
      name: 'admin-products-list',
      component: AdminProductList,
    },
    {
      path: '/admin/products/create',
      name: 'admin-products-create',
      component: AdminProductUpdate,
    },
    {
      path: '/admin/products/update/:id',
      name: 'admin-products-update',
      component: AdminProductUpdate,
    },
    {
      path: '/admin/users',
      name: 'admin-user-list',
      component: AdminUserList,
    },
    {
      path: '/admin/users/update/:id',
      name: 'admin-user-update',
      component: AdminUserUpdate,
    },
    {
      path: '/admin/orders',
      name: 'admin-orders-list',
      component: AdminOrderList,
    },
    {
      path: '/admin/orders/detail/:id',
      name: 'admin-orders-detail',
      component: AdminOrderDetail,
    },
  ],
})

router.beforeEach(async(to, from, next) => {
  const accountStore = useAccountStore()
  await accountStore.checkAuth()
  next()
})

export default router
