<template>
  <div class="learning-set-sessions">
    <h1>Sessions for {{ currentSet?.name }}</h1>
    <p>Category: {{ currentSet?.category }}</p>
    <ul>
      <li v-for="session in setSessions" :key="session.id">
        <p>Date: {{ formatDate(session.startTime) }}</p>
        <p>Duration: {{ session.duration }} minutes</p>
        <p>Enjoyment Rating: {{ session.enjoymentRating }}/5</p>
        <p>Comment: {{ session.comment }}</p>
      </li>
    </ul>
    <button @click="goBack">Back to Learning Sets</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLearningStore } from '../stores/learningStore'
import { format } from 'date-fns'

const route = useRoute()
const router = useRouter()
const store = useLearningStore()

const setId = route.params.id as string

const currentSet = computed(() => 
  store.learningSets.find(set => set.id === setId)
)

const setSessions = computed(() => 
  store.learningSessions.filter(session => session.setId === setId)
)

const formatDate = (date: Date) => {
  return format(new Date(date), 'PPp')
}

const goBack = () => {
  router.push('/learning-sets')
}
</script>