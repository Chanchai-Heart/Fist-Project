<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { RouterLink } from 'vue-router'
import { useAdminProductStore } from '@/stores/admin/product'
import Edit from '@/components/icons/Edit.vue'
import Trash from '@/components/icons/Trash.vue'

const adminProduct = useAdminProductStore()



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
                <table class="table">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr v-for="product in adminProduct.list" :key="product">
                            <th>{{ product.name }}</th>
                            <td><img :src="product.image" class="w-24"></td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                            <td>
                                <div class="badge badge-success">{{ product.status }}</div>
                            </td>
                            <td>{{ product.updatedAT }}</td>
                            <td>
                                <div class="flex gap-4">
                                    <div class="btn btn-ghost">
                                        <Edit class="w-6 h-6"></Edit>
                                    </div>
                                    <div class="btn btn-ghost">
                                        <Trash class="w-6 h-6"></Trash>
                                    </div>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AdminLayout>
</template>
