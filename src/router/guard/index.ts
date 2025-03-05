import { setRouteEmitter } from '@/utils/route-listener'
import type { Router } from 'vue-router'

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // emit route change
    setRouteEmitter(to)
  })
}

export default function createRouteGuard(router: Router) {
  // 监听路由变化
  setupPageGuard(router)
}
