<script setup>
import { onMounted, ref } from 'vue'
import UserLayout from '@/layouts/UserLayout.vue'

import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const orderData = ref({})


onMounted(() => {
  cartStore.loadCheckout() /* ถ้ามาการเปิดหน้า success ทำการ run คำสั่ง loadCheckout */
  if (cartStore.checkout.orderNumber) {
    orderData.value = cartStore.checkout
  }
})

</script>

<template>
  <main>
    <UserLayout>
      <div class="container mx-auto">
        <div class="border border-base-300 shadow-xl max-w-2xl mx-auto p-8 my-4">
          <div>
            <div class="text-2xl font-bold font-Inter">Your order is successful !</div>
            <div class="font-Inter">Hi {{ orderData.name }}</div>
            <div class="font-thai">เตรียมรอรับสินค้าได้เลย</div>
          </div>
          <div class="divider"></div>
          <div class="grid grid-cols-4 gap-2 font-Inter">
            <div>
              <div class="font-bold">Order Date</div>
              <div>{{ orderData.createdDate }}</div>
            </div>
            <div>
              <div class="font-bold">Order Number</div>
              <div>{{ orderData.orderNumber }}</div>
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
          <div v-for="product in orderData.product" :key="product" class="grid grid-cols-4 gap-2 mb-4 items-center">
            <div>
              <img :src="product.imageUrl" class="w-full">
            </div>
            <div class="font-Inter font-bold">{{ product.name }}</div>
            <div class="font-thai">จำนวน: {{ product.quantity }}</div>
            <div class="font-thai">ราคารวม: {{ product.price * product.quantity }}</div>
          </div>
          <div class="divider"></div>
          <div class="flex justify-between font-thai">
            <div>ราคาสินค้าทั้งหมด</div>
            <div>{{ orderData.totalPrice }}</div>
          </div>
          <div class="flex justify-between mt-4 font-thai">
            <div>ค่าจัดส่ง</div>
            <div>0</div>
          </div>
          <div class="divider"></div>
          <div class="flex justify-between font-thai">
            <div>ราคารวมทั้งสิ้น</div>
            <div>{{ orderData.totalPrice }}</div>
          </div>
          <div class="divider"></div>
          <div class="text-xl font-bold font-thai">ขอบคุณที่ใช้บริการ</div>
        </div>
      </div>
    </UserLayout>
  </main>
</template>
