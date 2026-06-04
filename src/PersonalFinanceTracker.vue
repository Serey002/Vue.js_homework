<template>
    <div class="max-w-md mx-auto my-6 p-4 bg-white border rounded shadow-sm font-sans text-sm text-gray-700">
        
        <h1 class="text-xl font-bold text-center text-gray-900 mb-4">Personal Finance Tracker</h1>

        <div class="flex justify-between items-center mb-3">
        <div>
            <label class="mr-2 font-medium">Monthly Limit:</label>
            <input type="number" v-model.number="budgetLimit" class="w-24 p-1 border rounded text-center" />
        </div>
        <p class="font-bold">
            Status: 
            <span :class="isOverBudget ? 'text-red-500' : 'text-green-600'">
            {{ budgetStatus }}
            </span>
        </p>
        </div>

        <div class="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div 
            class="h-full transition-all duration-300" 
            :class="isOverBudget ? 'bg-red-500' : 'bg-green-500'"
            :style="{ width: expensePercentage + '%' }"
        ></div>
        </div>
        <p class="text-xs text-gray-400 text-right mt-1 mb-4">{{ expensePercentage.toFixed(0) }}% Spent</p>

        <div class="grid grid-cols-3 gap-2 text-center font-bold mb-4">
        <div class="p-2 bg-green-50 rounded border border-green-100">
            <span class="block text-xs text-green-600 font-normal">Income</span>
            <span class="text-green-700">${{ totalIncome }}</span>
        </div>
        
        <div class="p-2 bg-red-50 rounded border border-red-100">
            <span class="block text-xs text-red-600 font-normal">Expenses</span>
            <span class="text-red-700">${{ totalExpenses }}</span>
        </div>
        
        <div class="p-2 rounded border" :class="balance < 0 ? 'bg-rose-100 border-rose-200 text-rose-800' : 'bg-blue-50 border-blue-100 text-blue-700'">
            <span class="block text-xs font-normal" :class="balance < 0 ? 'text-rose-600' : 'text-blue-600'">Balance</span>
            <span>${{ balance }}</span>
        </div>
        </div>

        <div class="mb-4 p-2 bg-gray-50 rounded border text-xs">
        <p class="font-bold mb-1 text-gray-500">Net Totals by Category:</p>
        <div class="grid grid-cols-2 gap-x-4">
            <div v-for="cat in categories" :key="cat" class="flex justify-between border-b border-gray-100 py-0.5">
            <span class="text-gray-500">{{ cat }}:</span>
            <span class="font-semibold" :class="categorySummary[cat] < 0 ? 'text-red-500' : 'text-green-600'">
                ${{ categorySummary[cat] }}
            </span>
            </div>
        </div>
        </div>

        <form @submit.prevent="addTransaction" class="p-2 bg-gray-50 rounded border mb-4 space-y-2">
        <p class="font-bold text-xs text-gray-600">Add Transaction</p>
        
        <div class="flex gap-2">
            <input type="text" v-model="newDesc" placeholder="Item details (e.g. Rice)" required class="flex-1 p-1 border rounded" />
            <input type="number" v-model.number="newAmount" placeholder="Price $" required class="w-20 p-1 border rounded" />
        </div>

        <div class="flex gap-2">
            <select v-model="newType" class="flex-1 p-1 border rounded bg-white">
            <option value="income">Income (+)</option>
            <option value="expense">Expense (-)</option>
            </select>
            
            <select v-model="newCategory" class="flex-1 p-1 border rounded bg-white">
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>

            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded font-medium">
            Add
            </button>
        </div>
        </form>

        <div class="flex justify-between items-center mb-2 border-b pb-1">
        <div class="flex gap-3 font-medium">
            <button @click="filterType = 'all'" :class="filterType === 'all' ? 'text-blue-600 font-bold' : 'text-gray-400'">All</button>
            <button @click="filterType = 'income'" :class="filterType === 'income' ? 'text-blue-600 font-bold' : 'text-gray-400'">Incomes</button>
            <button @click="filterType = 'expense'" :class="filterType === 'expense' ? 'text-blue-600 font-bold' : 'text-gray-400'">Expenses</button>
        </div>
        <button @click="clearAll" type="button" class="text-xs text-red-400 hover:underline">Clear History</button>
        </div>

        <ul class="divide-y max-h-48 overflow-y-auto pr-1">
        <li v-for="item in filteredTransactions" :key="item.id" class="flex justify-between items-center py-2 text-xs">
            <div>
            <span class="font-medium text-gray-900 mr-2">{{ item.desc }}</span>
            <span class="text-[10px] bg-gray-200 text-gray-600 px-1 rounded mr-2">{{ item.category }}</span>
            <span class="text-gray-400 text-[10px]">{{ item.date }}</span>
            </div>
            <div class="flex items-center gap-3">
            <span :class="item.type === 'income' ? 'text-green-600 font-bold' : 'text-red-500 font-bold'">
                {{ item.type === 'income' ? '+' : '-' }}${{ item.amount }}
            </span>
            <button @click="deleteTransaction(item.id)" type="button" class="text-gray-300 hover:text-red-500 font-bold text-sm">×</button>
            </div>
        </li>
        <li v-if="filteredTransactions.length === 0" class="text-center py-4 text-gray-400 italic">No transactions listed.</li>
        </ul>

        <div v-if="notificationLog.length > 0" class="mt-4 p-2 bg-amber-50 border border-amber-100 rounded text-xs text-amber-800">
        <p class="font-bold mb-1">Alert Logs:</p>
        <ul class="max-h-16 overflow-y-auto space-y-0.5">
            <li v-for="(log, idx) in notificationLog" :key="idx" class="font-mono">{{ log }}</li>
        </ul>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

// This defines what a single Transaction looks like
interface Transaction {
  id: number;
  desc: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

const transactions = ref<Transaction[]>([]);
const filterType = ref<'all' | 'income' | 'expense'>('all');
const budgetLimit = ref<number>(1000);

// Form Inputs (What the user types into the input boxes)
const newDesc = ref('');
const newAmount = ref<number | null>(null);
const newType = ref<'income' | 'expense'>('expense');
const newCategory = ref('Food');

// budget alerts
const notificationLog = ref<string[]>([]);

// List of categories for dropdown box
const categories = ['Food', 'Utilities', 'Entertainment', 'Salary', 'Other'];

// 1. Filtered Transactions list based on what tab is clicked
const filteredTransactions = computed(() => {
  if (filterType.value === 'all') {
    return transactions.value;
  }
  
  // Create a new list with only matching items
  const result: Transaction[] = [];
  for (const t of transactions.value) {
    if (t.type === filterType.value) {
      result.push(t);
    }
  }
  return result;
});

// Total Income adds up all income amounts
const totalIncome = computed(() => {
  let total = 0;
  for (const t of transactions.value) {
    if (t.type === 'income') {
      total = total + t.amount;
    }
  }
  return total;
});

// 3. Total Expenses adds up all expense amounts
const totalExpenses = computed(() => {
  let total = 0;
  for (const t of transactions.value) {
    if (t.type === 'expense') {
      total = total + t.amount;
    }
  }
  return total;
});

// Income minus Expenses
const balance = computed(() => {
  return totalIncome.value - totalExpenses.value;
});

// Is Over Budget (True if total expenses are bigger than your limit)
const isOverBudget = computed(() => {
  return totalExpenses.value > budgetLimit.value;
});

// How close to the limit, up to 100%
const expensePercentage = computed(() => {
  if (budgetLimit.value <= 0) return 0;
  
  const percentage = (totalExpenses.value / budgetLimit.value) * 100;
  
  if (percentage > 100) {
    return 100; 
  }
  return percentage;
});

// Category Summary (Groups totals by Category)
const categorySummary = computed(() => {
  const summary: Record<string, number> = {
    Food: 0,
    Utilities: 0,
    Entertainment: 0,
    Salary: 0,
    Other: 0
  };

  // Loop through every transaction and update its category total
  for (const t of transactions.value) {
    if (t.type === 'income') {
      summary[t.category] = summary[t.category] + t.amount;
    } else {
      summary[t.category] = summary[t.category] - t.amount;
    }
  }
  return summary;
});

// helpe property to show text status based on budget rules
const budgetStatus = computed(() => {
  if (isOverBudget.value) return 'Over Budget!';
  if (expensePercentage.value >= 80) return 'Approaching Limit!';
  return 'Safe';
});

// Adds new item to transactions list
function addTransaction() {
  // validation to make sure boxes not empty
  if (!newDesc.value || !newAmount.value || newAmount.value <= 0) {
    alert('Please enter a description and positive amount.');
    return;
  }

  // Create the transaction object
  const newItem: Transaction = {
    id: Date.now(),
    desc: newDesc.value,
    amount: newAmount.value,
    type: newType.value,
    category: newCategory.value,
    date: new Date().toLocaleDateString()
  };

  // Add it to reactive array
  transactions.value.push(newItem);

  // Reset the form input fields to blank
  newDesc.value = '';
  newAmount.value = null;
}

// Deletes one single item when click the 'X' button
function deleteTransaction(id: number) {
  transactions.value = transactions.value.filter(t => t.id !== id);
}

// Clears the entire tracker application
function clearAll() {
  if (confirm('Are you sure you want to delete everything?')) {
    transactions.value = [];
  }
}

// Saves the list to LocalStorage every time an item changes
watch(transactions, (newVal) => {
  localStorage.setItem('my_finance_data', JSON.stringify(newVal));
}, { deep: true }); // 'deep' lets Vue look inside the array items

// Shows console warning if bank balance goes negative
watch(balance, (newBalance) => {
  if (newBalance < 0) {
    console.warn('Warning: Balance is below zero!');
  }
});

// Adds a message to the UI logs if go over budget
watch(isOverBudget, (exceeded) => {
  if (exceeded) {
    const time = new Date().toLocaleTimeString();
    notificationLog.value.unshift(`[${time}] You went over budget!`);
  }
});

// saved items when refresh the browser
onMounted(() => {
  const savedData = localStorage.getItem('my_finance_data');
  if (savedData) {
    transactions.value = JSON.parse(savedData);
  }
});
</script>

<style scoped>

</style>