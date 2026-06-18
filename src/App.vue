<template>
  <div>
    <h1>Student Directory</h1>

    <StudentList
      :students="students"
      @view-detail="showDetail"
      @delete-student="deleteStudent"
    />
    
    <StudentDetail
      v-if="selectedStudent"
      :student="selectedStudent"
      @close="selectedStudent = null"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import StudentList from './components/StudentList.vue'
import StudentDetail from './components/StudentDetail.vue'

const students = ref([
  {
    id: 1,
    name: 'Phem Serey',
    age: 20,
    major: 'Web Development',
    image: "https://www.sereyhub.online/assets/sereyAbout-Dwkcuu4Q.png"
  },
  {
    id: 2,
    name: 'Phorn Ya',
    age: 22,
    major: 'Web Development',
    image: "https://previews.123rf.com/images/rokonuzzamnan61346/rokonuzzamnan613462108/rokonuzzamnan61346210800219/176654154-a-young-boy-is-standing-with-half-of-his-body-open-and-his-small-beard-and-his-behind-blur-the-green.jpg"
  },
  {
    id: 3,
    name: 'Sann Siv',
    age: 19,
    major: 'Web Development',
    image: "https://photoskart.com/wp-content/uploads/2020/11/a-handsome-young-indian-boy-showing-his-body-royalty-free-stock-image-scaled.jpg"
  },
]);

const selectedStudent = ref(null)

const showDetail = (student) => {
  selectedStudent.value = student
}

const deleteStudent = (id) => {
  students.value = students.value.filter(
    student => student.id !== id
  )

  if (selectedStudent.value?.id === id) {
    selectedStudent.value = null
  }
}
</script>

<style lang="scss" scoped>

</style>