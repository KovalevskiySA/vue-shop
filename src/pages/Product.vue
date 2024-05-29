<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import axios from 'axios'

const emit = defineEmits(['onClickAdd', 'onClickFavorite'])

const route = useRoute()
const productList = ref([])
const currentProduct = ref(null)

onMounted(() => {
  fetchFavorites()
})

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get(`https://c2ec06be734ab5f9.mokky.dev/items`)

    productList.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
    getCurrentProduct()
  } catch (err) {
    console.error(err)
  }
}

const getCurrentProduct = () => {
  currentProduct.value = productList.value.find((product) => +product.id === +route.params.id)
}

const onClickAdd = () => emit('onClickAdd')
const onClickFavorite = () => emit('onClickFavorite')
</script>

<template>
  <div class="h-auto mt-10 mx-6 border-2 border-gray-300 rounded-md">
    <div class="flex justify-between gap-4">
      <img :src="currentProduct?.imageUrl" alt="Photo product" class="w-64 h-64 border-2" />
      <div class="w-auto px-10">
        <p>{{ currentProduct?.title }}</p>
      </div>
      <div class="flex-col w-1/5 my-auto">
        <p class="text-xl text-center text-blue-800 font-bold">{{ currentProduct?.price }} ₽</p>
        <div class="flex justify-center">
          <button
            v-if="currentProduct?.isAdded === false"
            class="bg-blue-800 hover:bg-blue-700 cursor-pointer text-white font-bold rounded-md mt-2 px-4 py-2"
            @click="onClickAdd"
          >
            Купить
          </button>
          <button
            v-else-if="currentProduct?.isAdded === true"
            class="bg-blue-800 hover:bg-blue-700 cursor-pointer text-white font-bold rounded-md mt-2 px-4 py-2"
          >
            Добавлено
          </button>
        </div>
        <div class="flex justify-center gap-4 mt-1">
          <img
            :src="!currentProduct?.isFavorite ? '/like-grey.svg' : '/like-blue.svg'"
            class="cursor-pointer"
            @click="onClickFavorite"
          />
        </div>
      </div>
    </div>
  </div>
</template>
