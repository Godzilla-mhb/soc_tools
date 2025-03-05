import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
export const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue')

// 路由守卫
import createRouteGuard from './guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DEFAULT_LAYOUT,
    meta: {
      locale: 'menu.dashboard',
      requiresAuth: true,
      icon: 'icon-dashboard',
      order: 0,
    },
    children: [
      {
        path: '/dashboard/ip',
        name: 'IP',
        component: () => import('@/views/dashboard/ip/index.vue'),
        meta: {
          locale: 'menu.dashboard.ip',
          requiresAuth: true,
          roles: ['*'],
        },
      },
      {
        path: '/dashboard/iphone',
        name: 'Iphone',
        component: () => import('@/views/dashboard/iphone/index.vue'),
        meta: {
          locale: 'menu.dashboard.iphone',
          requiresAuth: true,
          roles: ['admin'],
        },
      },
      {
        path: 'bank',
        name: 'Bank',
        component: () => import('@/views/dashboard/bank/index.vue'),
        meta: {
          locale: 'menu.dashboard.bank',
          requiresAuth: true,
          roles: ['admin'],
        },
      },
      {
        path: 'weibo',
        name: 'Weibo',
        component: () => import('@/views/dashboard/weibo/index.vue'),
        meta: {
          locale: 'menu.dashboard.weibo',
          requiresAuth: true,
          roles: ['admin'],
        },
      },
      {
        path: 'id',
        name: 'Id',
        component: () => import('@/views/dashboard/id/index.vue'),
        meta: {
          locale: 'menu.dashboard.id',
          requiresAuth: true,
          roles: ['admin'],
        },
      },
    ],
  },
  {
    name: 'Record',
    path: '/record',
    component: DEFAULT_LAYOUT,
    meta: {
      locale: 'menu.record',
      requiresAuth: true,
      icon: 'icon-record',
      order: 0,
    },
    children: [
      {
        path: '/record/table',
        name: 'IP',
        component: () => import('@/views/record/table/index.vue'),
        meta: {
          locale: 'menu.record.table',
          requiresAuth: true,
          roles: ['*'],
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// 启动路由守卫
createRouteGuard(router)

export default router
