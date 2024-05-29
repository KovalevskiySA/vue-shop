<script setup>
import { ref, provide, watch } from 'vue'

import Head from './components/Head.vue'
import Status from './components/Status.vue'

/* Корзина (START) */
const cart = ref([])
const statusOpen = ref(false)

const closeStatus = () => {
  statusOpen.value = false
}

const openStatus = () => {
  statusOpen.value = true
}

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
  removeFromCart,
  closeStatus,
  openStatus
})

/* Корзина (END) */
</script>

<template>
  <Status v-if="statusOpen"/>
  <Head @open-status="openStatus"/>
  <div>
    <router-view></router-view>
  </div>
  
 
</template>

<style></style>
