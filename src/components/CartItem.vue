
<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number
})
</script>

<template>
  <div class="h-auto mx-4 px-4 mb-2 py-4 bg-white border-2 border-gray-300 rounded-md">
    <div class="flex justify-between gap-4">
      <img :src="imageUrl" alt="Photo product" class="w-40" />
      <div class="w-auto pr-10">
        <p>{{ title }}</p>
      </div>
      <div class="flex-col w-1/5 my-auto">
        <p class="text-xl text-center text-blue-800 font-bold">{{ price }} ₽</p>
        <div class="flex justify-center">
          <button
            @click="emit('onClickRemove')"
            class="bg-blue-800 hover:bg-blue-700 cursor-pointer text-white font-bold rounded-md mt-2 px-4 py-2">
            Удалить
          </button>
          
        </div>
      </div>
    </div>
  </div>
</template>
