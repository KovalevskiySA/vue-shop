<script setup>
import Card from './Card.vue'

defineProps({
  items: Array,
  isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="flex-col w-4/5">
    <Card
      v-for="item in items"
      :key="item.id"
      :product="item"

      @onClickFavorite="emit('addToFavorite', item)"
      @onClickAdd="emit('addToCart', item)"
    />

    <!--
      <Card
        title ="17.3 Ноутбук GIGABYTE B12VFK-463XRU черный Ноутбук" 
        image-url="/products/image2.jpg" 
        :price = "178000"
        :isFavorite="true"
        :onClickAdd = "onClickAdd"
      />
      -->
  </div>
</template>
