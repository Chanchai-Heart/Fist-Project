<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useCartStore } from "@/stores/cart";
import { useAccountStore } from '@/stores/account';

const cartStore = useCartStore();
const accountStore = useAccountStore();

const searchText = ref('')
const router = useRouter()

onMounted(async () => {
    await accountStore.checkAuth()
})

/* ฟังก์ชันเข้าสู่ระบบระบบ */
const login = async () => {
    try {
        await accountStore.signInWithGoogle()
    } catch (error) {
        console.log('error', error)
    }
}

/* ฟังก์ชันออกจากระบบ */
const logout = async () => {
    try {
        await accountStore.logout()
        window.location.reload() // refresh เว็บ
    } catch (error) {
        console.log('error', error)
    }
}

/* ฟังก์ชันการค้นหา */
const handleSearch = (event) => {
    if (event.key === 'Enter') {
        router.push({
            name: 'search',
            query: {
                q: searchText.value
            }
        })
    }
}

</script>

<template>
    <main>
        <!-- Navbar -->
        <div class="container mx-auto">
            <div class="navbar bg-base-100 shadow-lg">
                <div class="flex-1">
                    <RouterLink to="/" class="btn btn-ghost text-xl font-Pacifico">It's My Shop </RouterLink>
                </div>
                <!-- Search -->
                <div class="flex-none gap-2">
                    <div class="form-control">
                        <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto font-Inter"
                            v-model="searchText" @keyup="handleSearch" />
                    </div>
                    <div class="flex-none">
                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                                <div class="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span class="badge badge-sm indicator-item">{{ cartStore.summaryQuantity }}</span>
                                </div>
                            </div>
                            <!-- card -->
                            <div tabindex="0"
                                class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow font-Inter">
                                <div class="card-body">
                                    <span class="text-lg font-bold">{{ cartStore.summaryQuantity }} Items</span>
                                    <span class="text-info">{{ cartStore.summaryPrice }} Baht</span>
                                    <div class="card-actions">
                                        <RouterLink to="/cart" class="btn btn-primary btn-block">View cart

                                        </RouterLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Login --> <!-- v-if เมื่อยังไม่เข้าสู่ระบบจะเเสดงหน้า login -->
                    <button @click="login" v-if="!accountStore.isLoggedIn" class="btn btn-secondary">LOGIN</button>
                    <!-- Profile --> <!-- v-else เมื่อเข้าสู่ระบบจะเเสดงหน้าโปรไฟล์ -->
                    <div v-else class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                            <div class="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component"
                                    src="https://cdn-icons-png.flaticon.com/128/6976/6976288.png" />
                            </div>
                        </div>
                        <ul tabindex="0"
                            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-Inter">
                            <li>
                                <RouterLink to="/profile"> Profile</RouterLink>
                            </li>
                            <li><a @click="logout">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Navbar -->

        <slot></slot>

        <!-- Footer -->
        <div class="container mx-auto">
            <footer class="footer footer-center bg-base-200 text-base-content rounded p-10 font-Inter">
                <nav class="grid grid-flow-col gap-4">
                    <a class="link link-hover">About us</a>
                    <a class="link link-hover">Contact</a>
                    <a class="link link-hover">Jobs</a>
                    <a class="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <div class="grid grid-flow-col gap-4">
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                class="fill-current">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z">
                                </path>
                            </svg>
                        </a>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                class="fill-current">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z">
                                </path>
                            </svg>
                        </a>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                class="fill-current">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z">
                                </path>
                            </svg>
                        </a>
                    </div>
                </nav>
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
                </aside>
            </footer>
        </div>
        <!-- End Footer -->
    </main>
</template>
