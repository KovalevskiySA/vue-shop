<script setup>
import { ref, provide, watch } from 'vue'

import Head from './components/Head.vue'

/* Корзина (START) */
const cart = ref([])

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  addToCart,
  removeFromCart
})

/* Корзина (END) */
</script>

<template>
  <Head />
  <div>
    <router-view></router-view>
  </div>
  
 
</template>

<style></style>
