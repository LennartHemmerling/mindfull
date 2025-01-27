import './assets/main.css'
import './assets/fontawesome'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { KeepAwake } from '@capacitor-community/keep-awake'
import { ScreenOrientation } from '@capacitor/screen-orientation'

KeepAwake.keepAwake()
ScreenOrientation.lock({ orientation: 'portrait' })

const app = createApp(App)

app.use(router)

app.mount('#app')
