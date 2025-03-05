import { AppRouteRecordRaw } from '../types'
export const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue')

const RECORD: AppRouteRecordRaw = {
  name: 'Record',
  path: '/record',
  // component: () => import('@/views/record/table/index.vue'),
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
}

export default RECORD
