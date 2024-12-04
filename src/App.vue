<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useCartStore } from './stores/cart';
import { useProductStore } from './stores/product';
import { useEventStore } from './stores/event';

const cartStore = useCartStore();
const productStore = useProductStore();
const eventStore = useEventStore();

/* เมื่อเปิดหน้าเว็บ โหลดข้อมูลตะกร้า  */
onMounted(() => {
    cartStore.loadCart()
    productStore.loadProduct()
    // eventStore.popupMessage('info', 'test message')
})

</script>

<template>
    <main>
        <div v-if="eventStore.alert" class="toast">
            <div class="alert" :class="`alert-${eventStore.data.status}`">
                <span>{{ eventStore.data.message }}</span>
            </div>
        </div>
        <RouterView />
    </main>
</template>

<style></style>