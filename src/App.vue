<template>
  <div class="p-5">
    <h1>Product Cards</h1>
      <ProductCard>
        <template #badge>
          <span class="new">NEW</span>
        </template>
  
        <template #default="{ liked }">
          <img src="https://www.smart.com.kh/_next/image?url=https%3A%2F%2Fsmartaxiata-website-prod-v2.s3.ap-southeast-1.amazonaws.com%2Fi_Phone_Device_List_Smart_Website_1280_x_853_i_Phone_17_Pro_1_c26420e4fa.png&w=3840&q=75" alt="">
          <p class="font-bold">Iphone 17 Promix</p>
          <p>Latest Apple smartphone.</p>
          <p v-if="liked">❤️</p>
        </template>
  
        <template #actions>
          <button class="bg-yellow-400 w-fit pl-2 pr-2 pt-0.5 pb-0.5 text-white rounded-sm">Add To Cart</button>
        </template>
      </ProductCard>
  </div>
</template>

<script setup>
import ProductCard from './components/ProductCard.vue'
</script>

<style>

</style>