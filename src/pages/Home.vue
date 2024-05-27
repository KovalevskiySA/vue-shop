<script setup>
import { onMounted, ref, reactive, watch, inject } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }

      item.isFavorite = true

      const { data } = await axios.post(`https://c2ec06be734ab5f9.mokky.dev/favorites`, obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://c2ec06be734ab5f9.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://c2ec06be734ab5f9.mokky.dev/favorites`)

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
        
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://c2ec06be734ab5f9.mokky.dev/items`, {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)
</script>

<template>
  <div class="flex justify-center ml-56 my-5">
    <div class="relative">
      <img class="absolute left-3 top-2.5" src="/search-blue.svg" />
      <input
        @input="onChangeSearchInput"
        type="text"
        class="h-12 mr-20 border-2 border-blue-700 rounded-md pl-12 pr-4 shadow-md outline-none focus:border-blue-800"
        size="50"
        placeholder="Поиск по названию..."
      />
    </div>
  </div>
  <div class="flex">
    <!--Фильтры START-->
    <div class="w-1/5 h-auto ml-8 border-r-2 border-blue-800">
      <div>
        <h2 class="font-bold mb-3">Цена:</h2>
        <!--
        <div class="flex items-center">
          <input type="text" class="h-10 mr-2 px-2 border-2 border-gray-300 rounded-md outline-none focus:border-blue-800" size="6" placeholder="ОТ " >
          <p class=" text-blue-800 font-bold">—</p>
          <input type="text" class="h-10 ml-2 px-2 border-2 border-gray-300 rounded-md outline-none focus:border-blue-800" size="6" placeholder="ДО " >
        </div>
        <div class="flex flex-col mt-2">
          <label>
            <input type="checkbox"/>
            По убыванию
          </label>
          <label>
            <input type="checkbox"/>
            По возрастанию
          </label>
        </div>
        -->
        <select
          @change="onChangeSelect"
          class="py-2 px-3 w-56 border-2 border-gray-300 focus:border-gray-400 rounded-md focus:outline-none"
        >
          <option value="price">По возрастанию</option>
          <option value="-price">По убыванию</option>
        </select>
      </div>
      <div class="mt-10">
        <h2 class="font-bold mb-3">Производители:</h2>
        <div class="relative">
          <img class="absolute left-2 top-2" src="/search-grey.svg" />
          <input
            @input="onChangeSearchInput"
            class="border-2 border-gray-300 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
            type="text"
            size="18"
            placeholder="Поиск..."
          />
        </div>
      </div>
    </div>
    <!--Фильтры END-->

    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
  </div>
</template>
