import { createPinia } from 'pinia'
import useIpStore from './modules/IP'
import useTabBarStore from './modules/top-bar'
import useAppStore from './modules/app'

const pinia = createPinia()

export { useIpStore, useTabBarStore, useAppStore }
export default pinia
