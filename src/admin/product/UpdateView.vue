<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAdminProductStore } from '@/stores/admin/product';
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const formData = [
    {
        name: 'Name',
        field: 'name'
    },
    {
        name: 'Image',
        field: 'imageUrl'
    },
    {
        name: 'Price',
        field: 'price'
    },
    {
        name: 'Quantity',
        field: 'quantity'
    },
    {
        name: 'About',
        field: 'about'
    },
]

const productData = reactive({
    name: '',
    imageUrl: '',
    price: 0,
    quantity: 0,
    about: '',
    status: ''
})

const updateProduct = async () => {
    try {
        if (mode.value === 'EDIT PRODUCT') {
            await adminProductStore.updateProduct(productIndex.value, productData)
        } else {
            await adminProductStore.addProduct(productData)
        }
        router.push({ name: 'admin-products-list' });
    } catch (error) {
        console.log("error", error);
    }
}

const adminProductStore = useAdminProductStore()
const router = useRouter()
const route = useRoute()
const productIndex = ref(-1)
const mode = ref('ADD PRODUCT')

onMounted(async () => {
    if (route.params.id) {
        productIndex.value = route.params.id
        mode.value = 'EDIT PRODUCT'

        const selectedProduct = await adminProductStore.getProduct(productIndex.value)

        productData.name = selectedProduct.name
        productData.imageUrl = selectedProduct.imageUrl
        productData.price = selectedProduct.price
        productData.quantity = selectedProduct.quantity
        productData.remainQuantity = selectedProduct.remainQuantity
        productData.about = selectedProduct.about
        productData.status = selectedProduct.status
    }
})

</script>


<template>
    <AdminLayout>
        <div class="container mx-auto">
            <div class="shadow-xl p-8">
                <div class="text-2xl font-Pacifico font-bold">{{ mode }}</div>
                <div class="divider"></div>
                <!-- form -->
                <div class="grid grid-cols-2 gap-2">
                    <label v-for="form in formData" :key="form.field" class="form-control w-full">
                        <div class="label">
                            <span class="label-text">{{ form.name }}</span>
                        </div>
                        <input type="text" class="input input-bordered w-full" v-model="productData[form.field]" />
                    </label>
                </div>
                <div class="divider"></div>
                <!-- form select -->
                <div class="grid grid-cols-2 gap-2">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Status</span>
                        </div>
                        <select v-model="productData.status" class="select select-bordered">
                            <option disabled selected>choose status</option>
                            <option value="open">Open</option>
                            <option value="closed">Close</option>
                        </select>
                    </label>
                </div>
                <div class="divider"></div>
                <div class="flex justify-end gap-2">
                    <button class="btn btn-ghost w-24" @click="router.back()">Back</button>
                    <button class="btn btn-neutral w-24" @click="updateProduct">{{ mode }}</button>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
