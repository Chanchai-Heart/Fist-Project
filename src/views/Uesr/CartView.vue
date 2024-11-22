<script setup>
import UserLayout from "@/layouts/UserLayout.vue";
import Close from "@/components/icons/Close.vue";
import { RouterLink } from "vue-router";

import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();

const changeQuantity = (index, event) => {
  const newQuantity = parseInt(event.target.value);
  cartStore.updateQuantity(index, newQuantity);
}

</script>

<template>
  <main>
    <UserLayout>
      <!-- Header -->
      <div class="container mx-auto">
        <div class="m-4">
          <h1 class="text-3xl font-bold m-4 font-Pacifico">Shopping Cart</h1>
          <div class="flex">
            <div class="flex-auto w-64 bg-base-300 p-4">
              <!-- ถ้าไม่มีสินค้าในตะกร้า ให้แสดงว่า Cart is empty -->
              <div v-if="cartStore.items.length === 0">
                Cart is empty
              </div>
              <!-- ถ้ามีสินค้าในตะกร้า -->
              <div v-else class="flex" v-for="(item, index) in cartStore.items" :key="item">
                <div class="flex-1">
                  <img class="w-full p-5" :src="item.imageUrl" alt="" />
                </div>
                <div class="flex-1">
                  <div class="flex flex-col justify-between h-full">
                    <div>
                      <div class="relative grid grid-cols-2 font-Inter">
                        <div>
                          <div><b>{{ item.name }}</b></div>
                          <div>{{ item.about }}</div>
                          <div>{{ item.price }}</div>
                        </div>
                        <div>
                          <select v-model="item.quantity" @change="changeQuantity(index, $event)"
                            class="select select-bordered w-1/2">
                            <option v-for="quantity in [1, 2, 3, 4]" :key="quantity">
                              {{ quantity }}
                            </option>
                          </select>
                        </div>
                        <div @click="cartStore.removeItemInCart(index)" class="absolute top-0 right-0 w-4">
                          <Close></Close>
                        </div>
                      </div>
                    </div>
                    <div class="font-inter"><b>In stock</b></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Summary -->
            <div class="flex-auto w-32 bg-slate-200 p-4">
              <div class="text-2xl font-bold font-Inter">Order Summary</div>
              <div class="my-4 divide-y divide-slate-400">
                <div class="flex justify-between py-3 font-thai">
                  <div>ราคาสินค้าทั้งหมด</div>
                  <div>{{ cartStore.summaryPrice }}</div>
                </div>
                <div class="flex justify-between py-3 font-thai">
                  <div>ค่าส่ง</div>
                  <div>0</div>
                </div>
                <div class="flex justify-between py-3 font-thai">
                  <div>ราคารวมทั้งหมด</div>
                  <div>{{ cartStore.summaryPrice }}</div>
                </div>
                <RouterLink :to="{ name: 'checkout' }">
                  <button class="btn btn-active btn-neutral w-full mt-4 font-thai">ชำระสินค้า</button>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  </main>
</template>
