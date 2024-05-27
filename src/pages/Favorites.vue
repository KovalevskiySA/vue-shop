<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://c2ec06be734ab5f9.mokky.dev/favorites?_relations=items'
    )

    favorites.value = data.map((obj) => obj.item)
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <div class="flex justify-center">
    <h2 class="text-2xl text-blue-800 font-bold my-8">Мои закладки</h2>
  </div>
  <div class="flex justify-center">
    <CardList :items="favorites" is-favorites />
  </div>
</template>
