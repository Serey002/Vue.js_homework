<template>
    <div class="mb-6">
        <div class="text-3xl font-bold text-slate-800">Task Tracking</div>
    </div>
    <div class="flex gap-5">
        <select v-model="newTaskPriority" name="" id="">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        </select>
        <input v-model="newTaskText" type="text" class="flex-1 px-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200" placeholder="Add a new task"/>
        <button @click="addTask" class="px-4 py-1 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600">Add</button>
    </div>
    <div v-for="task in tasks" :key="task.id" class="flex gap-2 items-center mt-4">
        <input type="checkbox" v-model="task.done" />
        <span class="px-2 py-1 text-xs font-bold rounded"
        :class="{
            'bg-blue-100 text-blue-800': task.priority === 'Low',
            'bg-yellow-100 text-yellow-800': task.priority === 'Medium',
            'bg-red-100 text-red-800': task.priority === 'High',
        }"
        >
        {{ task.priority }}
        </span>
        <span :class="{ 'line-through': task.done }">{{ task.text }}</span>
    </div>
    <h2 class="mt-6">Progress: {{ doneCount }}</h2>
</template>

<script setup>
import { ref, computed } from 'vue'

const newTaskText = ref('')
const newTaskPriority = ref('Low')
const tasks = ref([])

const addTask = () => {
    // If the input is empty, don't do anything
    if (newTaskText.value.trim() === '') return

    // Push a new task object into the tasks array
    tasks.value.push({
        id: Date.now(),
        text: newTaskText.value,
        priority: newTaskPriority.value,
        done: false,
    })

  // Clear the input after adding
  newTaskText.value = ''
}

const doneCount = computed(() => {
  const total = tasks.value.length
  const completed = tasks.value.filter((task) => task.done).length
  return `${completed} of ${total} done`
})
</script>

<style lang="scss" scoped></style>
