<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { RouterLink } from 'vue-router'
import { useAdminProductStore } from '@/stores/admin/product'
import { onMounted } from 'vue'

import Table from '@/admin/Table.vue'
import Edit from '@/components/icons/Edit.vue'
import Trash from '@/components/icons/Trash.vue'

const adminProduct = useAdminProductStore()
onMounted(async () => {
    await adminProduct.loadProduct()
})

const removeProduct = async (index) => {
    await adminProduct.removeProduct(index)
    await adminProduct.loadProduct()
}


</script>


<template>
    <AdminLayout>
        <div class="container mx-auto">
            <div class="flex items-center justify-between mt-6">
                <div class="text-2xl font-bold font-Pacifico">Product List</div>
                <div>
                    <RouterLink :to="{ name: 'admin-products-create' }" class="btn btn-neutral">Add Product</RouterLink>
                </div>
            </div>
            <div class="overflow-x-auto">
                <div class="divider"></div>
                <!-- header เรียใช้จาก component Table -->
                <Table :headers="['Name', 'Image', 'Price', 'Quantity', 'Status', 'Updated At', '']">
                    <!-- row 1 -->
                    <tr v-for="(product) in adminProduct.list" :key="product">
                        <th>{{ product.name }}</th>
                        <td><img :src="product.imageUrl" class="w-24"></td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                        <td>
                            <div class="badge" :class="product.status === 'open' ? 'badge-success' : 'badge-error'">
                                {{ product.status }}</div>
                        </td>
                        <td>{{ product.updatedAt }}</td>
                        <td>
                            <div class="flex gap-4">
                                <RouterLink :to="{ name: 'admin-products-update', params: { id: product.productId } }"
                                    class="btn btn-ghost">
                                    <Edit class="w-6 h-6"></Edit>
                                </RouterLink>
                                <div @click="removeProduct(product.productId)" class="btn btn-ghost">
                                    <Trash class="w-6 h-6"></Trash>
                                </div>
                            </div>
                        </td>
                    </tr>
                </Table>
            </div>
        </div>
    </AdminLayout>
</template>
