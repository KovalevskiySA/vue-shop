<script setup>
import axios from 'axios'
import { ref, computed, inject} from 'vue'

import CartItemList from '../components/CartItemList.vue'
import InfoBlock from '../components/InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const { cart } = inject('cart')

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const isCreating = ref(false)
const orderId = ref(null)

const createOrder = async () => {
  try {
    isCreating.value = true

    const { data } = await axios.post(`https://c2ec06be734ab5f9.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: props.totalPrice
    })

    cart.value = []

    orderId.value = data.id
  } catch (err) {
    console.log(err)
  } finally {
    isCreating.value = false
  }
}

const cartIsEmpty = computed(() => cart.value.length === 0)
const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>

<template>
  <div class="flex justify-center">
    <h2 class="text-2xl text-blue-800 font-bold my-8">Моя корзина</h2>
  </div>
  <div class="flex ">
    <div class="w-4/6">
      <div v-if="!totalPrice || orderId" class="flex  items-center">
        <InfoBlock
          v-if="!totalPrice && !orderId"
          title="Корзина пустая"
          description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
          image-url="/package-icon.png"
        />
        <InfoBlock
          v-if="orderId"
          title="Заказ оформлен!"
          :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
          image-url="/order-success-icon.png"
        />
      </div>

      <div v-else>
        <CartItemList />
      </div>
    </div>  

      <div class=" border-l-2 border-blue-800 flex items-center">

        <div class="flex flex-col gap-4 ml-10 mr-6 w-80 border-blue-800 text-blue-800">
          <h2 class="text-xl font-bold">Оформление заказа:</h2>
          <div class="flex pt-2 gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ totalPrice }} ₽</b>
          </div>

          <div class="flex gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b>{{ vatPrice }} ₽</b>
          </div>

          <button
            :disabled="buttonDisabled"
            @click="createOrder"
            class="mt-8 transition bg-blue-800 w-full rounded-xl py-3 text-white font-bold disabled:bg-slate-300 hover:bg-blue-700 active:bg-blue-800 cursor-pointer"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    
  </div>
</template>
