<script setup>
import { onMounted } from 'vue'
import { useAdminUserStore } from '@/stores/admin/user'
import { RouterLink } from 'vue-router'

import AdminLayout from '@/layouts/AdminLayout.vue'

import Table from '@/admin/Table.vue'

const adminUserStore = useAdminUserStore()

onMounted(async () => {
    await adminUserStore.loadUser()
})

const changeStatus =async (index) => {
    let selectedUser = adminUserStore.list[index]
    selectedUser.status = selectedUser.status === 'Active' ? 'Inactive' : 'Active'
    await adminUserStore.updateUser(selectedUser.uid, selectedUser)
}

</script>


<template>
    <AdminLayout>
        <Table :headers="['Name', 'Role', 'Status', 'Updated At', '']">
            <tr v-for="(user, index) in adminUserStore.list" :key="user">
                <td>{{ user.fullname }} </td>
                <td>{{ user.role }} </td>
                <td>
                    <div class="badge" :class="user.status === 'Active' ? 'badge-success' : 'badge-error'">{{
                        user.status }} </div>
                </td>
                <td>{{ user.updateAt }} </td>
                <td>
                    <div class="flex gap-2">
                        <RouterLink :to="{ name: 'admin-user-update', params: { id: user.uid } }" class="btn">Edit
                        </RouterLink>
                        <button class="btn" @click="changeStatus(index)">
                            {{ user.status == 'Active' ? 'Disable' : 'Enable' }}
                        </button>
                    </div>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>
