import { useAppStore } from '@/store'
import { computed, onMounted, onUnmounted } from 'vue'

export default function useResponsive(initState = false) {
  const appStore = useAppStore()
  const WIDTH = {
    XS: 480,
    SM: 576,
    MD: 768,
    LG: 992,
    XL: 1200,
    XXL: 1600,
  }

  function getClientWidth() {
    return document.body.clientWidth
  }

  function setSidebarCollapse(width: number) {
    const shouldCollapse = width < WIDTH.LG
    if (shouldCollapse !== appStore.menuCollapse) {
      appStore.updateSettings({ menuCollapse: shouldCollapse })
    }
  }

  function setDevice(width: number) {
    let device = 'desktop'
    if (width < WIDTH.MD) {
      device = 'mobile'
    } else if (width < WIDTH.LG) {
      device = 'tablet'
    }
    if (device !== appStore.device) {
      appStore.updateSettings({ device })
    }
  }

  function watchWidth() {
    const width = getClientWidth()
    setSidebarCollapse(width)
    setDevice(width)
  }

  onMounted(() => {
    if (initState) {
      watchWidth()
    }
    window.addEventListener('resize', watchWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', watchWidth)
  })

  return {
    WIDTH,
    watchWidth,
  }
} 