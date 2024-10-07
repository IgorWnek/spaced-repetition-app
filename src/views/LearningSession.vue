<template>
  <div class="learning-session">
    <h1>Learning Session</h1>
    <p>Set: {{ currentSet?.name }}</p>
    <p>Category: {{ currentSet?.category }}</p>
    <form @submit.prevent="endSession">
      <label>
        Start Time:
        <input type="datetime-local" v-model="session.startTime" required>
      </label>
      <label>
        Duration (minutes):
        <input type="number" v-model="session.duration" required>
      </label>
      <label>
        Comment:
        <textarea v-model="session.comment"></textarea>
      </label>
      <label>
        Enjoyment Rating (1-5):
        <input type="number" v-model="session.enjoymentRating" min="1" max="5" required>
      </label>
      <button type="submit">End Session</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLearningStore } from '../stores/learningStore'

const route = useRoute()
const router = useRouter()
const store = useLearningStore()

const setId = route.params.id as string

const currentSet = computed(() => 
  store.learningSets.find(set => set.id === setId)
)

const session = ref({
  startTime: new Date().toISOString().slice(0, 16),
  duration: 0,
  comment: '',
  enjoymentRating: 3
})

const endSession = () => {
  store.addLearningSession({
    id: Date.now().toString(),
    setId: setId,
    startTime: new Date(session.value.startTime),
    duration: session.value.duration,
    comment: session.value.comment,
    enjoymentRating: session.value.enjoymentRating
  })
  router.push('/')
}
</script>