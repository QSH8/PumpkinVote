import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/vote',
      children: [
        {
          path: '/vote',
          name: 'VotePage',
          meta: {
            translation: 'Страница голосования',
            requiresAuth: true,
          },
          component: () => import('../pages/vote/index.vue'),
          // beforeEnter: async () => {
          //   await store.dispatch('setInactiveCreate')
          // } 
        },
        // {
        //   path: '/order/:id',
        //   name: 'TheOrder',
        //   meta: {
        //     translation: 'Заказ',
        //     requiresAuth: true,
        //   },
        //   component: () => import('../pages/order/index.vue'),
        //   beforeEnter: async () => {
        //     await store.dispatch('setInactiveCreate')
        //   } 
        // },
        // {
        //   path: '/order/create',
        //   name: 'OrderCreate',
        //   meta: {
        //     translation: 'Создание заказа',
        //     requiresAuth: true,
        //   },
        //   component: () => import('../pages/order/components/OrderCreate.vue'),
        //   beforeEnter: async () => {
        //     await store.dispatch('setActiveCreate')
        //   } 
        // },
        // {
        //   path: '/orders-history',
        //   name: 'OrdersHistory',
        //   meta: {
        //     translation: 'История заказов',
        //     requiresAuth: true,
        //   },
        //   component: () => import('../pages/orders-history/index.vue'),
        //   beforeEnter: async () => {
        //     await store.dispatch('setInactiveCreate')
        //   } 
        // },
        // {
        //   path: '/menu',
        //   name: 'Menu',
        //   meta: {
        //     translation: 'Меню',
        //     requiresAuth: true,
        //   },
        //   component: () => import('../pages/menu/index.vue'),
        // },
        // {
        //   path: '/warehouse',
        //   name: 'Warehouse',
        //   meta: {
        //     translation: 'Склад',
        //     requiresAuth: true,
        //   },
        //   component: () => import('../pages/warehouse/index.vue'),
        //   beforeEnter: async () => {
        //     await store.dispatch('setInactiveCreate')
        //   } 
        // },
        {
          path: '/login',
          name: 'Login',
          meta: {
            translation: 'Авторизация',
          },
          component: () => import('../pages/login/index.vue'),
          // beforeEnter: async () => {
          //   await store.dispatch('setInactiveCreate')
          // } 
        },
      ],
    },
  ],
})

router.beforeEach((to, from) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    // Если страница требует авторизации, а токена нет — отправляем на /login
    return '/login'
  } else if (to.path === '/login' && token) {
    // Если пользователь уже авторизован, но пытается зайти на /login — пускаем на главную
    return '/'
  }
});

export default router
