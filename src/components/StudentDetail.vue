<template>
  <div class="detail">
    <h2>Student Information</h2>

    <p>
      <strong>Name:</strong>
      {{ student.name }}
    </p>

    <p>
      <strong>Age:</strong>
      {{ student.age }}
    </p>

    <p>
      <strong>Major:</strong>
      {{ student.major }}
    </p>

    <button @click="$emit('close')">
      Close
    </button>
  </div>
</template>

<script setup>
defineProps({
  student: Object
})

defineEmits(['close'])
</script>

<style scoped>
.detail {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 20px;
}
</style>