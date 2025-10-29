import type { RouteRecordRaw } from 'vue-router'

import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/movie',
    name: 'Movie',
    component: () => import('../views/Movie.vue'),
  },
  {
    path: '/baseball',
    name: 'Baseball',
    component: () => import('../views/Baseball.vue'),
  },
  {
    path: '/mi',
    name: 'Mi',
    component: () => import('../views/Mi.vue'),
    redirect: { name: 'MiSport' },
    children: [
      {
        path: 'sport',
        name: 'MiSport',
        component: () => import('../views/MiSport.vue'),
      },
      {
        path: 'activity',
        name: 'MiActivity',
        component: () => import('../views/MiActivity.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
