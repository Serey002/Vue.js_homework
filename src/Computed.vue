<template>
    <div>
        <h1>Student score tracking</h1>
        <p>Total score is: {{ totalScore }}</p>
        <p>Average score is: {{ averageScore}} </p>
        <p>Hight score is: {{ highestScore}}</p>
        <p>Lowest score is: {{ lowestScore }}</p>
        <p>Student's Grage score is: {{ gradeScore }}</p>
        <p>Exam status is: {{ examStatus }}</p>
    </div>
</template>
                                                   
<script setup>
// Mean of all scores (return 0 if empty)
import { ref, computed } from 'vue'
const studentName = ref('Serey Phem')
const scores = ref([
    { subject: 'Math', score: 90 },
    { subject: 'English', score: 80 },
    { subject: 'Physics', score: 95 }
]);
const passMark = ref(50);
const totalScore = computed(() =>{
    let total = 0;
    scores.value.forEach(subject => {
        total += subject.score;
    });
    return total
})

const averageScore = computed(() => {
    return totalScore.value / scores.value.length
})

const highestScore = computed(() => {
    let hight = scores.value[0].score;
    scores.value.forEach(subject => {
        if(subject.score > hight){
            hight = subject.score
        }
    })
    return hight
})

const lowestScore = computed(() => {
    let low = scores.value[0].score;
    scores.value.forEach(subject => {
        if(subject.score < low){
            low = subject.score
        }
    })
    return low
})

const gradeScore = computed(() => {
    if(averageScore.value >= 90) return 'A'
    else if(averageScore.value >= 80) return 'B'
    else if(averageScore.value >= 70) return 'C'
    else if(averageScore.value >= 60) return 'D'
    else return 'F'
})

const examStatus = computed(() => {
    let status = 'Pass';
    scores.value.forEach(subject => {
        if(subject.score < passMark.value){
            status = 'Fail'
        }
    })
    return status
})

</script>

<style lang="scss" scoped>

</style>