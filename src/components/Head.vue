<script setup>

const emit = defineEmits(['openStatus'])
</script>

<template>
  <header class="flex justify-between bg-blue-100 shadow-lg border-slate-400 px-10 py-2">
    <router-link to="/">
      <div class="flex items-center gap-10">
        <img src="/logo.png" alt="Logo" class="w-20" />
        <div class="flex-col">
          <h1 class="text-xl text-blue-900 font-bold uppercase">Vue Kovshop</h1>
          <h2 class="text-sm text-slate-400">Интернет-магазин по продаже ноутбуков</h2>
        </div>
      </div>
    </router-link>
    <ul class="flex items-center gap-5">
      <li
        @click="() => emit('openStatus')"
        class="flex-col text-blue-800 font-bold cursor-pointer hover:text-black"
      >
        <img src="/status.svg" alt="Like-blue" class="mx-auto" />
        <span>Статус заказа</span>
      </li>

      <router-link to="/favorites">
        <li class="flex-col text-blue-800 font-bold cursor-pointer hover:text-black">
          <img src="/like-blue.svg" alt="Like-blue" class="mx-auto" />
          <span>Избранное</span>
        </li>
      </router-link>

      <router-link to="/cart">
        <li class="flex-col text-blue-800 font-bold cursor-pointer hover:text-black">
          <img src="/cart.svg" alt="Cart" class="mx-auto" />
          <span>Корзина</span>
        </li>
      </router-link>
      <li class="flex-col text-blue-800 font-bold cursor-pointer hover:text-black ml-10">
        <img src="/men.svg" alt="Profile" class="mx-auto" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>
