<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useAccountStore } from '@/stores/account';

const menus = [
    {
        name: 'Dashboard',
        routeName: 'admin-dashboard'
    },
    {
        name: 'User',
        routeName: 'admin-user-list'
    },
    {
        name: 'Product',
        routeName: 'admin-products-list'
    },
    {
        name: 'Order',
        routeName: 'admin-orders-list'
    },
]
const router = useRouter()
const route = useRoute()
const activeMenu = ref('')
const accountStore = useAccountStore()

const logout = async () => {
    try {
        await accountStore.logout()
        router.push({ name: 'login-to' })
    } catch (error) {
        console.log('error', error)
    }
}

/* เมื่อมีการเลื่อนไปแต่ละหน้า จะมีการ route change แล้วอัพเดทไปยัง activeMenu */
onMounted(() => {
    activeMenu.value = route.name
})

</script>


<template>
    <main>
        <!-- Header -->
        <div class="container mx-auto">
            <div class="drawer drawer-open">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content mx-4">

                    <!-- Page content here -->
                    <slot></slot>

                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <li class="text-4xl font-Pacifico font-bold text-center my-2">
                            Admin
                        </li>
                        <!-- Sidebar content here -->
                        <li class="my-2" v-for="menu in menus" :key="menu">
                            <RouterLink :class="menu.routeName == activeMenu ? 'active' : ''"
                                :to="{ name: menu.routeName }">{{ menu.name }}</RouterLink>
                        </li>
                        <li>
                            <a @click="logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- End Header -->
    </main>
</template>


<style></style>