<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="p-4 bg-card text-card-foreground rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-2">This Week</h2>
        <p class="text-2xl font-bold">{{ sessionsThisWeek.length }} sessions</p>
      </div>
      <div class="p-4 bg-card text-card-foreground rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-2">Today</h2>
        <p class="text-2xl font-bold">{{ sessionsToday.length }} sessions</p>
      </div>
    </div>
    <h2 class="text-2xl font-semibold mb-4">Upcoming Sessions</h2>
    <ul class="space-y-2">
      <li v-for="session in upcomingSessions" :key="session.id" class="p-3 bg-secondary text-secondary-foreground rounded-md">
        {{ getLearningSetName(session.setId) }} - {{ formatDate(session.startTime) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLearningStore } from '../stores/learningStore'
import { format } from 'date-fns'

const store = useLearningStore()

const sessionsThisWeek = computed(() => store.sessionsThisWeek)
const sessionsToday = computed(() => store.sessionsToday)
const upcomingSessions = computed(() => store.upcomingSessions)

const getLearningSetName = (setId: string) => {
  const set = store.learningSets.find(set => set.id === setId)
  return set ? set.name : 'Unknown Set'
}

const formatDate = (date: Date) => {
  return format(date, 'PPp')
}
</script>