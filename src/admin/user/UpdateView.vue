<script setup>
import { reactive, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAdminUserStore } from '@/stores/admin/user'
import { useEventStore } from '@/stores/event';

const formData = [
    {
        name: 'Name',
        field: 'fullname',
        type: 'text'
    },
    {
        name: 'Role',
        field: 'role',
        type: 'select',
        dropdown: ['admin', 'user', 'Guest']
    },
    {
        name: 'Status',
        field: 'status',
        type: 'select',
        dropdown: ['Active', 'Inactive']
    },
]

const adminUserStore = useAdminUserStore();
const route = useRoute();
const router = useRouter();
const userIndex = ref(-1);
const eventStore = useEventStore();

const userData = reactive({
    fullname: '',
    role: '',
    status: '',
})

onMounted(async () => {
    if (route.params.id) {
        userIndex.value = route.params.id
        const selectedUser = await adminUserStore.getUser(userIndex.value)
        
        userData.fullname = selectedUser.fullname
        userData.role = selectedUser.role
        userData.status = selectedUser.status
    }
})

const updateUser = async () => {
    await adminUserStore.updateUser(userIndex.value, userData)
    eventStore.popupMessage('info', 'Update user successfully')
    router.push({ name: 'admin-user-list' })
}

</script>


<template>
    <AdminLayout>
        <div class="container mx-auto">
            <!-- Header -->
            <div class="shadow-xl p-8">
                <div class="text-2xl font-Pacifico font-bold">Update User</div>
                <div class="divider"></div>
                <!-- form -->
                <div class="grid grid-cols-1 gap-2">
                    <label v-for="form in formData" :key="form.field" class="form-control w-full">
                        <div class="label">
                            <span class="label-text">{{ form.name }}</span>
                        </div>
                    
                        <input v-if="form.type === 'text'" v-model="userData[form.field]" type="text" class="input input-bordered w-full" />
                        <select v-if="form.type === 'select'" v-model="userData[form.field]" type="text" class="input input-bordered w-full">
                            <option v-for="item in form.dropdown" :key="item">
                                {{ item }}
                            </option>
                        </select>
                    </label>
                </div>
                <!-- Footer -->
                <div class="flex justify-end gap-2 mt-4">
                    <button class="btn btn-ghost w-24" @click="router.back()">Back</button>
                    <button class="btn btn-neutral w-24" @click="updateUser">Update</button>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
