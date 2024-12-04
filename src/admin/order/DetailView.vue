<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminOrderStore } from '@/stores/admin/order';
import AdminLayout from '@/layouts/AdminLayout.vue'

const adminOrderStore = useAdminOrderStore()
const route = useRoute()
const router = useRouter()
const orderIndex = ref(-1)
/* array ซ่อน array */
const orderData = ref({
    products: []
})

onMounted(() => {
    if (route.params.id) {
        orderIndex.value = parseInt(route.params.id)
        /* เมื่อมีการกด Edit ให้ทำการโหลดข้อมูล */
        const selectedOrder = adminOrderStore.getOrder(orderIndex.value)
        orderData.value = selectedOrder
    }
})

</script>


<template>
    <AdminLayout>
        <div class="container mx-auto">
            <!-- Header -->
            <div class="shadow-xl p-8">
                <div class="text-3xl font-Pacifico font-bold">Order Detail id {{ orderIndex }}</div>
                <div class="divider"></div>
                <!-- Detail -->
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <div class="font-bold">Updated At</div>
                        <div>{{ orderData.updatedAt }}</div>
                    </div>
                    <div>
                        <div class="font-bold">Customer Number</div>
                        <div>{{ orderData.no }}</div>
                    </div>
                    <div>
                        <div class="font-bold">Payment Method</div>
                        <div>{{ orderData.paymentMethod }}</div>
                    </div>
                    <div>
                        <div class="font-bold">Address</div>
                        <div>{{ orderData.address }}</div>
                    </div>
                </div>
                <div class="divider"></div>
                <div v-for="product in orderData.products" :key="product" class="grid grid-cols-4 gap-2 items-center">
                    <div class="mx-auto">
                        <img class="p-2 w-24" :src="product.imageUrl">
                    </div>
                    <div>
                        <div class="font-bold">{{ product.name }}</div>
                        <div>{{ product.description }}</div>
                    </div>
                    <div>
                        จำนวน: {{ product.quantity }} ชิ้น
                    </div>
                    <div>
                        ราคา: {{ product.price }} ฿
                    </div>
                </div>
                <div class="divider"></div>
                <div class="flex justify-between">
                    <div class="font-bold">ราคาสินค้าทั้งหมด</div>
                    <div>{{ orderData.totalPrice }} ฿</div>
                </div>
                <div class="divider"></div>
                <div class="flex justify-end">
                    <button class="btn w-24" @click="router.back()">Back</button>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
