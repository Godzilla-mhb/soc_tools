export const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue')
import { AppRouteRecordRaw } from '../types'

const DASHBOARD: AppRouteRecordRaw = {
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
      path: 'ip',
      name: 'IP',
      component: () => import('@/views/dashboard/ip/index.vue'),
      meta: {
        locale: 'menu.dashboard.ip',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'iphone',
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
    }
  ],
}

export default DASHBOARD
