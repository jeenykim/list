import homeRoute from './homeRoute.js'
import todoRoute from './todoRoute.js'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  ...homeRoute, ...todoRoute
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
