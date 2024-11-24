<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

import UserLayout from '@/layouts/UserLayout.vue'
import Product from '@/components/Product.vue'

import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'

const productStore = useProductStore()
const cartStore = useCartStore()

const router = useRouter()
const route = useRoute()

const searchText = ref('')

/* ฟังก์ชันโหลดข้อมูล */
watch(() => route.query.q, (newSearchText) => {
    searchText.value = newSearchText
}, { immediate: true })

/* ฟังก์ชันการค้นหา */
const filterProduct =computed(() => {
    return productStore.filterProduct(searchText.value)
})

/* copy มาจาก HomeView */
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
            <div class="container mx-auto">
                <div class="text-3xl m-4">Search: <b>{{ searchText }}</b> </div>
            </div>
            <Product :products="filterProduct"
            :addToCart="addToCart"
            :buyNow="buyNow"
            ></Product>
        </UserLayout>
    </main>
</template>
