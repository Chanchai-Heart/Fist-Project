<script setup>
import { useAdminOrderStore } from '@/stores/admin/order';
import { RouterLink } from 'vue-router'

import AdminLayout from '@/layouts/AdminLayout.vue'

import Table from '@/admin/Table.vue'

const adminOrderStore = useAdminOrderStore()
console.log("Order list:", adminOrderStore.list);

</script>


<template>
    <AdminLayout>
        <div class="container mx-auto">
            <!-- Header -->
            <div class="shadow-xl p-8">
                <div class="text-2xl font-Pacifico font-bold">Order list</div>
                <div class="divider"></div>
                <Table :headers="['Customer Name', 'Price', 'Status', 'Updated At', '']">
                    <tr v-for="(orders, index) in adminOrderStore.list" :key="orders">
                        <td>{{ orders.customerName }}</td>
                        <td>{{ orders.totalPrice }}</td>
                        <td>{{ orders.status }}</td>
                        <td>{{ orders.updatedAt }}</td>
                        <td>
                            <RouterLink :to="{ name: 'admin-orders-detail', params: { id: index } }" class="btn">
                                See Detail</RouterLink>
                        </td>
                    </tr>
                </Table>
            </div>
        </div>
    </AdminLayout>
</template>
