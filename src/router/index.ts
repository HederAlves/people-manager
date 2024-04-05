import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import Login from '../pages/Login.vue'
import Users from '../pages/Users.vue'

const routes = setupLayouts([
  {
    path: '/',
    component: Login,
  },
  {
    path: '/users',
    component: Users,
  },
])

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
