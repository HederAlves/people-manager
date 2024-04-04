import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashbord.vue'

const routes = setupLayouts([
  {
    path: '/',
    component: Login,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
])

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
