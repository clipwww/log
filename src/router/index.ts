import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movie',
    name: 'Movie',
    component: () => import(/* webpackChunkName: "movie" */ '../views/Movie.vue')
  },
  {
    path: '/mi',
    name: 'Mi',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "mi" */ '../views/Mi.vue'),
    redirect: { name: 'MiSport' },
    children: [
      {
        path: 'sport',
        name: 'MiSport',
        component: () => import(/* webpackChunkName: "mi-sport" */ '../views/MiSport.vue'),
      },
      {
        path: 'activity',
        name: 'MiActivity',
        component: () => import(/* webpackChunkName: "mi-sport" */ '../views/MiActivity.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
