import { createApp } from 'vue'
import App from './app'
import router from '../router'
import store from '../store'
import { Components } from './plugin/v-easy-components'
import GlobalComponent from '@/components-global/index'
import { errorHandle } from '@/components/error-boundary/index'
import { registerIPC } from './ipc'
import { Platform } from '@/config/build'
import '@/iconfont/index'

const { VUE_APP_PLATFORM } = process.env

const app = createApp(App)
  .use(store)
  .use(router)
  .use(Components)
  .use(GlobalComponent)

errorHandle(app)

if (VUE_APP_PLATFORM === Platform.ELECTRON) {
  registerIPC(app)
}

app.mount('#app')
