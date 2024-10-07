import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import LearningSets from '../views/LearningSets.vue'
import LearningSession from '../views/LearningSession.vue'
import LearningSetSessions from '../views/LearningSetSessions.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/learning-sets', component: LearningSets },
    { path: '/learning-session/:id', component: LearningSession },
    { path: '/learning-set-sessions/:id', component: LearningSetSessions },
  ]
})

export default router