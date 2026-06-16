<template>
  <div class="contain w-60 bg-gray-200 p-4 rounded-sm shadow-gray-500 flex flex-col gap-2">
    <div class="bg-blue-400 w-16 text-center rounded-sm text-white">
      <slot name="badge"></slot>
    </div>

    <div class="card-body">
      <slot :liked="isLiked"></slot>
    </div>

    <div class="flex justify-between">
        <slot name="actions"></slot>
        <button @click="like" class="bg-green-400 w-18 text-white rounded-sm">Like</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLiked = ref(false);
const like = () => {
  isLiked.value = !isLiked.value
}
</script>

<style scoped>

</style>