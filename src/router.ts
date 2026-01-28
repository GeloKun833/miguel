import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Calculator from './views/Calculator.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/calculator',
    component: Calculator,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const user = localStorage.getItem('user')

  // If trying to access calculator without being logged in, go to login
  if (to.meta.requiresAuth && !user) {
    next('/login')
    return
  }

  // If already logged in, prevent going back to login/register
  if (user && (to.path === '/login' || to.path === '/register')) {
    next('/calculator')
    return
  }

  next()
})

export default router

