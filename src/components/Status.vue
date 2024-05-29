<script setup>
import { inject } from 'vue'

const { closeStatus } = inject('cart')
</script>

<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"></div>
    <div class="bg-white w-96 h-60 fixed   z-20 p-8 border-2 rounded-md">   
        <h2>Статус заказа</h2>
        <input type="text" placeholder="Введите статус заказа">
        <br>
        <button>Сохранить</button>
        <button>Отмена</button>
    </div>
</template>
