<script setup>
import { useAdminUserStore } from '@/stores/admin/user'

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
                <td>{{ user.status }} </td>
                <td>{{ user.updatedAT }} </td>
                <td>
                    <div class="flex gap-2">
                        <button class="btn">Edit</button>
                        <button class="btn" @click="changeStatus(index)">
                            {{ user.status == 'Active' ? 'Disable' : 'Enable' }}
                        </button>
                    </div>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>
