<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
      <table class="w-full table-fixed border-collapse text-left text-sm text-slate-600">
        <thead class="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-700 border-b border-slate-200">
          <tr>
            <th class="w-1/3 px-6 py-4">Student</th>
            <th class="w-1/3 px-6 py-4">Subject</th>
            <th class="w-1/3 px-6 py-4">Score</th>
          </tr>
        </thead>
        
        <tbody class="divide-y divide-slate-100">
          <template v-for="record in scoreRecords" :key="record.student">
            <tr 
              v-for="(subject, index) in record.score" 
              :key="subject.subject"
              class="hover:bg-slate-50/70 transition-colors"
            >
              <td 
                v-if="index === 0" 
                :rowspan="record.score.length" 
                class="px-6 py-4 font-semibold text-slate-900 border-r border-slate-100 align-top bg-white"
              >
                {{ record.student }}
              </td>
              
              <td class="px-6 py-4 text-slate-600">{{ subject.subject }}</td>
              <td class="px-6 py-4">
                <span 
                  class="inline-inline-block px-2.5 py-1 rounded-full font-medium text-xs"
                  :class="subject.score >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'"
                >
                  {{ subject.score }}
                </span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const scoreRecords = [
  {
    student: "him", score: [
      { subject: "Python", score: 95 },
      { subject: "English", score: 55 },
      { subject: "PL", score: 90 },
      { subject: "Logic", score: 80 }
    ]
  },
  {
    student: "yon", score: [
      { subject: "Python", score: 95 },
      { subject: "English", score: 55 },
      { subject: "PL", score: 90 },
      { subject: "Logic", score: 80 }
    ]
  },
  {
    student: "rady", score: [
      { subject: "Python", score: 95 },
      { subject: "English", score: 55 },
      { subject: "PL", score: 90 },
      { subject: "Logic", score: 80 }
    ]
  },
]

</script>

<style lang="scss" scoped>
</style>




<!-- <template>
  <div class="task-manager">
    <header class="app-header">
      <h1>Task Manager</h1>
      <button 
        v-show="!isFormOpen" 
        @click="isFormOpen = true" 
        class="btn btn-primary"
      >
        <span class="icon">+</span> Create Task
      </button>
    </header>

    <transition name="fade">
      <form v-show="isFormOpen" @submit.prevent="addTask" class="task-form">
        <h2>Add New Task</h2>
        <div class="form-group">
          <label for="task-title">Task Title</label>
          <input 
            type="text" 
            v-model="newTaskTitle" 
            id="task-title" 
            placeholder="What needs to be done?"
            required
          >
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-success">Add Task</button>
          <button type="button" @click="isFormOpen = false" class="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </transition>

    <main class="task-list-container">
      <h2>Task List</h2>
      <ul v-if="tasks.length > 0" class="task-list">
        <li v-for="(task, index) in tasks" :key="index" class="task-item">
          <span class="task-dot"></span>
          <span class="task-text">{{ task }}</span>
        </li>
      </ul>
      
      <div v-else class="empty-state">
        <p>🎉 You don't have any tasks to do!</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isFormOpen = ref(false);
const newTaskTitle = ref('');

// Fixed: Wrapped in ref() to ensure reactivity works when pushing new tasks
const tasks = ref([
  'Go to school',
  'Buy products',
  'Visit a doctor'
]);

// Handles form submission cleanly
const addTask = () => {
  if (newTaskTitle.value.trim()) {
    tasks.value.push(newTaskTitle.value.trim());
    newTaskTitle.value = ''; // Reset input field
    isFormOpen.value = false; // Close form
  }
};
</script>

<style scoped>
/* Main Container Styling */
.task-manager {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  color: #1e293b;
}

/* Header Styling */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 1rem;
}

.app-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

/* Modern Form Styling */
.task-form {
  background-color: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
}

.task-form h2 {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #334155;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
}

.form-group input {
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  outline: none;
}

.form-group input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.form-actions {
  display: flex;
  gap: 0.75rem;
}

/* Button Component Utilities */
.btn {
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background-color: #6366f1;
  color: white;
}

.btn-primary:hover {
  background-color: #4f46e5;
}

.btn-success {
  background-color: #10b981;
  color: white;
}

.btn-success:hover {
  background-color: #059669;
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #475569;
}

.btn-secondary:hover {
  background-color: #cbd5e1;
}

/* Task List Setup */
.task-list-container h2 {
  font-size: 1.1rem;
  color: #475569;
  margin-bottom: 1rem;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.task-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border-color: #cbd5e1;
}

.task-dot {
  width: 8px;
  height: 8px;
  background-color: #6366f1;
  border-radius: 50%;
  flex-shrink: 0;
}

.task-text {
  font-size: 0.95rem;
  color: #334155;
}

/* Empty State Wrapper */
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #64748b;
  background-color: #f8fafc;
  border-radius: 12px;
  border: 2px dashed #e2e8f0;
}

/* Smooth Form Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style> -->