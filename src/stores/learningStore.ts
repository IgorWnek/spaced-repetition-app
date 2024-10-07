import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { addDays, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns'

interface LearningSet {
  id: string
  name: string
  category: string
}

interface LearningSession {
  id: string
  setId: string
  startTime: Date
  duration: number
  comment: string
  enjoymentRating: number
}

export const useLearningStore = defineStore('learning', () => {
  const learningSets = ref<LearningSet[]>([])
  const learningSessions = ref<LearningSession[]>([])

  const addLearningSet = (set: LearningSet) => {
    learningSets.value.push(set)
  }

  const addLearningSession = (session: LearningSession) => {
    learningSessions.value.push(session)
  }

  const sessionsThisWeek = computed(() => {
    const now = new Date()
    const weekStart = startOfWeek(now)
    const weekEnd = endOfWeek(now)
    return learningSessions.value.filter(session => 
      isWithinInterval(session.startTime, { start: weekStart, end: weekEnd })
    )
  })

  const sessionsToday = computed(() => {
    const today = new Date()
    return learningSessions.value.filter(session => 
      session.startTime.toDateString() === today.toDateString()
    )
  })

  const upcomingSessions = computed(() => {
    const now = new Date()
    const nextWeek = addDays(now, 7)
    return learningSessions.value.filter(session => 
      session.startTime > now && session.startTime <= nextWeek
    )
  })

  return {
    learningSets,
    learningSessions,
    addLearningSet,
    addLearningSession,
    sessionsThisWeek,
    sessionsToday,
    upcomingSessions
  }
})