<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useCartStore } from './stores/cart';

const cartStore = useCartStore();

/* เมื่อเปิดหน้าเว็บ โหลดข้อมูลตะกร้า  */
onMounted(() => {
    cartStore.loadCart()
})

</script>

<template>
    <main>
        <RouterView />
    </main>
</template>

<style>

</style>