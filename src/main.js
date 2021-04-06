import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

// 全局引入：vant
import Vant from 'vant';
import 'vant/lib/index.css'

import toast from '@/components/common/toast'

createApp(App).use(store).use(router).use(Vant).use(toast).mount('#app')
