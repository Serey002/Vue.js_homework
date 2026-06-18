<template>
  <div>
    <StudentCard
      v-for="student in students"
      :key="student.id"
      :student="student"
      @view-detail="handleViewDetail"
      @delete-student="handleDelete"
    />
  </div>
</template>

<script setup>
import StudentCard from './StudentCard.vue'

defineProps({
  students: Array
})

const emit = defineEmits([
  'view-detail',
  'delete-student'
])

const handleViewDetail = (student) => {
  emit('view-detail', student)
}

const handleDelete = (id) => {
  emit('delete-student', id)
}
</script>