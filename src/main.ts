import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import i18n from './locale'
import globalComponents from '@/components'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

import '@/api/interceptor'
import '@/assets/style/global.less'
import '@arco-design/web-vue/dist/arco.css'

createApp(App)
  .use(globalComponents)
  .use(ArcoVue, {})
  .use(ArcoVueIcon)
  .use(i18n)
  .use(i18n)
  .use(store)
  .use(router)
  .mount('#app')
