<script setup>
import { useAdminUserStore } from '@/stores/admin/user'
import { RouterLink } from 'vue-router'

import AdminLayout from '@/layouts/AdminLayout.vue'

import Table from '@/admin/Table.vue'
import Edit from '@/components/icons/Edit.vue'
import Trash from '@/components/icons/Trash.vue'

const adminUserStore = useAdminUserStore()

const changeStatus = (index) => {
    let selectedUser = adminUserStore.list[index]
    selectedUser.status = selectedUser.status === 'Active' ? 'Inactive' : 'Active'
    adminUserStore.changeStatus(selectedUser)
}

</script>


<template>
    <AdminLayout>
        <Table :headers="['Name', 'Role', 'Status', 'Updated At', '']">
            <tr v-for="(user, index) in adminUserStore.list" :key="user">
                <td>{{ user.fullName }} </td>
                <td>{{ user.role }} </td>
                <td>
                    <div class="badge" :class="user.status === 'Active' ? 'badge-success' : 'badge-error'">{{ user.status }} </div>
                </td>
                <td>{{ user.updatedAT }} </td>
                <td>
                    <div class="flex gap-2">
                        <RouterLink :to="{ name: 'admin-user-update', params: { id: index } }" class="btn">Edit</RouterLink>
                        <button class="btn" @click="changeStatus(index)">
                            {{ user.status == 'Active' ? 'Disable' : 'Enable' }}
                        </button>
                    </div>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>
