<script setup>
import { RouterLink } from 'vue-router'
import { useAdminProductStore } from '@/stores/admin/product'
import { onMounted, ref } from 'vue'

import AdminLayout from '@/layouts/AdminLayout.vue'
import Table from '@/admin/Table.vue'
import Edit from '@/components/icons/Edit.vue'
import Trash from '@/components/icons/Trash.vue'
import Pagination from '@/components/Pagination.vue'

const adminProduct = useAdminProductStore()
onMounted(async () => {
    await adminProduct.loadProduct()
})

const currentPage = ref(1)

const changePage = async (newPage) => {
    if (newPage < currentPage.value) {
        //ย้อนกลับ
        await adminProduct.loadNextProduct('previous')
    } else if (newPage > currentPage.value) {
        //ไปด้านหน้า
        await adminProduct.loadNextProduct('next')
    }
    console.log(newPage)
}

const searchProduct = async () => {
    await adminProduct.loadProduct()
}

const changeStatusFilter = async (newStatus) => {
    adminProduct.filter.status = newStatus
    await adminProduct.loadProduct()
}

const changeSortUpdatedAt = async (newSort) => {
    adminProduct.filter.sort.updatedAt = newSort
    await adminProduct.loadProduct()
}

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
            <div class="flex gap-4 items-center">
                <div class="flex-1">
                    <input v-model="adminProduct.filter.search" type="text" placeholder="Type here"
                        class="input w-full" />
                </div>
                <div class="flex-1">
                    <div>Update At</div>
                    <div class="join">
                        <button @click="changeSortUpdatedAt('asc')"
                            :class="adminProduct.filter.sort.updatedAt === 'asc' ? 'btn-active' : ''"
                            class="btn join-item">ASC</button>
                        <button @click="changeSortUpdatedAt('desc')"
                            :class="adminProduct.filter.sort.updatedAt === 'desc' ? 'btn-active' : ''"
                            class="btn join-item">DESC</button>
                    </div>
                </div>
                <div class="flex-1">
                    <div>Status</div>
                    <div class="join">
                        <button @click="changeStatusFilter('open')"
                            :class="adminProduct.filter.status === 'open' ? 'btn-active' : ''"
                            class="btn join-item">open</button>
                        <button @click="changeStatusFilter('closed')"
                            :class="adminProduct.filter.status === 'closed' ? 'btn-active' : ''"
                            class="btn join-item">close</button>
                    </div>
                </div>
                <div class="flex-1">
                    <button @click="searchProduct()" class="btn btn-neutral">search</button>
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
        <Pagination class="mt-4" :activePage="currentPage" maxPage="3" :changePage="changePage">
        </Pagination>
    </AdminLayout>
</template>
