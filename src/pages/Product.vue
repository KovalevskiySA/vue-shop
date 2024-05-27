<script setup>

</script>

<template>
    <!--<div class="flex">
        <div class="w-2/5">
            <img src="" alt="Product">
        </div>
        <div>
            <h1>Название</h1>
            <p>Описание</p>
        </div>
        <div>
            <p>Цена</p>
            <button></button>
            <img>
        </div>
    </div>-->
    <div class="h-auto mt-10 mx-6 border-2 border-gray-300 rounded-md">
    <div class="flex justify-between gap-4">
      <img :src="imageUrl" alt="Photo product" class="w-64 h-64 border-2" />
      <div class="w-auto px-10">
        <p>{{ title }}</p>
      </div>
      <div class="flex-col w-1/5 my-auto">
        <p class="text-xl text-center text-blue-800 font-bold">{{ price }} ₽</p>
        <div class="flex justify-center">
          <button
            @click="onClickAdd"
            v-if="isAdded === false"
            class="bg-blue-800 hover:bg-blue-700 cursor-pointer text-white font-bold rounded-md mt-2 px-4 py-2">
            Купить
          </button>
          <button
            v-else-if="isAdded === true"
            class="bg-blue-800 hover:bg-blue-700 cursor-pointer text-white font-bold rounded-md mt-2 px-4 py-2">
            Добавлено
          </button>
        </div>
        <div class="flex justify-center gap-4 mt-1">
          <img
            
            :src="!isFavorite ? '/like-grey.svg' : '/like-blue.svg'"
            @click="onClickFavorite"
            class="cursor-pointer"
          />
          
        </div>
      </div>
    </div>
  </div>
</template>