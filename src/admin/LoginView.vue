<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAccountStore } from '@/stores/account';

const router = useRouter()
const accountStore = useAccountStore();

const email = ref('')
const password = ref('')

const login = async() => {
    console.log(email.value)
    console.log(password.value)
    try {
      await accountStore.signInAdmin(email.value, password.value)
      router.push({ name: 'admin-dashboard' })
    } catch (error) {
        console.log('error page =', error.message)
    }
}

</script>

<template>
    <main>
        <div class="h-screen flex items-center">
            <div class="max-w-2xl shadow-xl mx-auto p-8 flex-1">
                <div class="flex flex-col items-center">
                    <h1 class="text-3xl font-bold m-4 font-Pacifico">Login</h1>
                    <!-- Email -->
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Email</span>
                        </div>
                        <input v-model="email" type="text" placeholder="Your email" class="input input-bordered w-full" />
                    </label>
                    <!-- Password -->
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Password</span>
                        </div>
                        <input v-model="password" type="password" placeholder="Your password" class="input input-bordered w-full" />
                    </label>
                    <!-- Submit -->
                    <button @click="login" class="btn btn-neutral w-full mt-6 font-Inter">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>
