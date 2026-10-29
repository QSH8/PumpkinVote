import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/index.js"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/voting',
      children: [
        {
          path: '/voting',
          component: () => import('../layouts/VotingLayout.vue'),
          meta: { requiresAuth: true },
        },
        // {
        //   path: '/results',
        //   name: 'results',
        //   component: () => import('../views/ResultsView.vue'),
        //   meta: { requiresAuth: true }
        // },
        {
          path: '/:pathMatch(.*)*',
          redirect: '/voting'
        },
        {
          path: '/login',
          name: 'Login',
          meta: { translation: 'Авторизация' },
          component: () => import('../pages/login/index.vue')
        }
      ]
    },
    {
      path: '/total',
      component: () => import('../layouts/VotingTotal.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from) => {
  const token = sessionStorage.getItem('token')
  const user = sessionStorage.getItem('user')

  if (user) {
    store.dispatch('setCurrentUser', JSON.parse(user))
  }

  if (to.meta.requiresAuth && !token) {
    return '/login'
  } else if (to.path === '/login' && token) {
    return '/voting/1'
  }
})

export default router
