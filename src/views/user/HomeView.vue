<script setup>
import { useRouter } from 'vue-router';

import UserLayout from '@/layouts/UserLayout.vue'
import Product from '@/components/Product.vue'

import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart';

const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

/* ส่ง add to cart เข้าไปผ่าน props */
const addToCart = (product) => {
  cartStore.addToCart(product)
}
const buyNow = (product) => {
  cartStore.addToCart(product)
  router.push('/cart')
}

</script>

<template>
  <main>
    <UserLayout>
      <!-- hero section -->
      <div class="container mx-auto">
        <div class="hero min-h-screen">
          <img src="https://plus.unsplash.com/premium_photo-1671156854811-92d6bff8209b?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
          <div class="hero-overlay bg-opacity-70"></div>
          <div class="hero-content text-neutral-content text-center">
            <div class="max-w-md">
              <h1 class="mb-5 text-5xl font-bold font-Pacifico">It's My Shop</h1>
              <p class="mb-5 font-Inter">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- End hero section -->

      <!-- product -->
       <!-- ดึงข้อมูลจาก component Product.vue -->
      <Product :products="productStore.list"
      :addToCart="addToCart"
      :buyNow="buyNow"> 
      </Product>
    </UserLayout>
  </main>
</template>
