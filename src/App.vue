<template>
  <div>
    <nav class="flex gap-3 bg-blue-500 text-amber-50 flex m-4 font-medium ">
      <router-link to="/" class="hover:to-blue-950">Home</router-link>
      <router-link to="/About">About</router-link>
    </nav>
  </div>
  <router-view/>
</template>

<script setup>


</script>

<style lang="scss" scoped>

</style>