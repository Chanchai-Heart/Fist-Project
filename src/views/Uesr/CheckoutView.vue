<script setup>
import UserLayout from '@/layouts/UserLayout.vue'

import { reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const router = useRouter()

const FormData = [
  {
    name: 'Email address',
    field: 'email'
  },
  {
    name: 'Name',
    field: 'name'
  },
  {
    name: 'Address',
    field: 'address'
  },
  {
    name: 'Note',
    field: 'note'
  }
]

const userFormData = reactive({
  email: '',
  name: '',
  address: '',
  note: ''
})

const payment = () => {
  cartStore.placeorder(userFormData)
  router.push({ name: 'success' })
}

</script>

<template>
  <main>
    <UserLayout>
      <!-- Light -->
      <div class="container mx-auto my-4">
        <h1 class="text-3xl font-bold m-4 font-Pacifico">Checkout</h1>
        <div class="flex">
          <section class="flex-auto w-64 bg-base-300 p-8">
            <label v-for="form in FormData" :key="form.field" class="form-control w-full font-Inter">
              <div class="label">
                <span class="label-text">{{ form.name }}</span>
              </div>
              <input v-model="userFormData[form.field]" type="text" placeholder="Type here"
                class="input input-bordered w-full" />
            </label>
            <div class="mt-4">
              <button @click="payment" class="btn btn-neutral w-full font-thai">ยืนยันการชำระเงิน</button>
            </div>
          </section>
          <!-- Right -->
          <section class="flex-auto w-32 bg-slate-300 px-2">
            <div v-for="item in cartStore.items" :key="item" class="flex bg-base-100 m-5 py-4 rounded-sm">
              <div class="flex-1">
                <img class="w-full p-5" :src="item.imageUrl" alt="" />
              </div>
              <div class="flex-1">
                <div class="flex flex-col justify-between h-full">
                  <div>
                    <div><b>{{ item.name }}</b></div>
                    <div class="font-thai">จำนวน {{ item.quantity }}</div>
                  </div>
                  <RouterLink class="font-Inter" :to="{ name: 'cart' }">Edit</RouterLink>
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="p-4">
              <div class="font-Inter"><b>Order Summary</b></div>
              <div class="flex justify-between font-thai">
                <div>ราคาสินค้าทั้งหมด</div>
                <div>{{ cartStore.summaryPrice }}</div>
              </div>
              <div class="flex justify-between">
                <div class="font-thai">ค่าส่ง</div>
                <div>0</div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between p-4 mb-4">
              <div class="font-thai">ราคารวมทั้งหมด</div>
              <div>{{ cartStore.summaryPrice }}</div>
            </div>
          </section>
        </div>
      </div>
    </UserLayout>
  </main>
</template>
