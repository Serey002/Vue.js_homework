<template>
  <div class="bg-gray-200 w-40 ml-10">
    <h1>Number: {{ count }}</h1>
    <button @click="increment" class="bg-blue-400 hover:bg-blue-500 p-2 mb-2">
      Count
    </button>
  </div>

  <div class="bg-gray-400 w-40 p-3 flex flex-col gap-2">
    <h1>Product</h1>
    <p>Name: {{ product.name }}</p>
    <p>Price: ${{ product.price }}</p>

    <button @click="increasePrice" class="bg-blue-400 p-2 rounded-sm">
      Increase Price
    </button>
  </div>
  
</template>

<script setup>
import { reactive } from 'vue'
import { ref } from 'vue'

const count = ref(0)
function increment() {
  count.value++
}

///////////////////
const product = reactive({
  name: 'Laptop',
  price: 800
})

const increasePrice = () => {
  product.price += 50
}



</script>

<style lang="scss" scoped>

</style>