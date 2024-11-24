<script setup>
import { RouterLink } from 'vue-router';

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
                        <input type="text" placeholder="Your email" class="input input-bordered w-full" />
                    </label>
                    <!-- Password -->
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Password</span>
                        </div>
                        <input type="password" placeholder="Your password" class="input input-bordered w-full" />
                    </label>
                    <!-- Submit -->
                    <RouterLink :to="{ name: 'admin-dashboard' }" class="btn btn-neutral w-full mt-6 font-Inter">
                        Login
                    </RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>
