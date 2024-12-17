<script setup>
import { defineProps } from 'vue';

defineProps({
    activePage: Number,
    maxPage: Number,
    changePage: Function,
})

</script>

<template>
    <div class="join">
        <button @click="changePage(activePage - 1)" class="join-item btn">«</button>
        <button class="join-item btn">Page {{ activePage }} / {{ maxPage }}</button>
        <button @click="changePage(activePage + 1)" class="join-item btn">»</button>
    </div>
</template>