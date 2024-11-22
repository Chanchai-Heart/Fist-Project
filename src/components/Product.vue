<script setup>
import { defineProps } from 'vue'

defineProps({
    products: Array,
    addToCart: Function,
    buyNow: Function
})
</script>

<template>
    <main>
        <!-- product -->
        <div class="container mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 m-4">
                <!-- v-for สำหรับการแสดงข้อมูลในไฟล์ store/product.js -->
                <section v-for="product in products" :key="product">
                    <div class="card card-compact bg-base-100 w-86 shadow-xl">
                        <figure>
                            <div class="w-full h-48 ">
                                <img :src="product.imageUrl" />
                            </div>
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title font-Inter">{{ product.name }}</h2>
                            <p class="font-thai">{{ product.about }}</p>
                            <div class="card-actions justify-between">
                                <button @click="addToCart(product)" class="btn btn-secondary font-Inter">Add to cart </button>
                                <button @click="buyNow(product)" class="btn btn-primary font-Inter">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </main>
</template>
