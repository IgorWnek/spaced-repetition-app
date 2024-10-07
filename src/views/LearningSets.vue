<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Learning Sets</h1>
    <form @submit.prevent="addSet" class="mb-6">
      <div class="space-y-4">
        <div>
          <label for="setName" class="block text-sm font-medium mb-1">Set Name</label>
          <input id="setName" v-model="newSet.name" placeholder="Set Name" required
                 class="w-full px-3 py-2 border rounded-md" />
        </div>
        <div>
          <label for="setCategory" class="block text-sm font-medium mb-1">Category</label>
          <input id="setCategory" v-model="newSet.category" placeholder="Category" required
                 class="w-full px-3 py-2 border rounded-md" />
        </div>
        <button type="submit" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Add Set
        </button>
      </div>
    </form>
    <ul class="space-y-4">
      <li v-for="set in learningSets" :key="set.id" class="p-4 border rounded-md">
        <div class="flex justify-between items-center">
          <span class="text-lg font-medium">{{ set.name }} ({{ set.category }})</span>
          <div class="space-x-2">
            <button @click="startSession(set.id)" class="px-3 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90">
              Start Session
            </button>
            <button @click="viewSessions(set.id)" class="px-3 py-1 bg-accent text-accent-foreground rounded-md hover:bg-accent/90">
              View Sessions
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLearningStore } from '../stores/learningStore'
import { useRouter } from 'vue-router'

const store = useLearningStore()
const router = useRouter()

const learningSets = computed(() => store.learningSets)

const newSet = ref({ name: '', category: '' })

const addSet = () => {
  store.addLearningSet({
    id: Date.now().toString(),
    name: newSet.value.name,
    category: newSet.value.category
  })
  newSet.value = { name: '', category: '' }
}

const startSession = (setId: string) => {
  router.push(`/learning-session/${setId}`)
}

const viewSessions = (setId: string) => {
  router.push(`/learning-set-sessions/${setId}`)
}
</script>