import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// bootstrap, css
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// navermap
import naver from 'vue-naver-maps'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(naver, {
  clientID: process.env.VUE_APP_CLIENT_ID,
  useGovAPI: false,
  subModules: ''
})

Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
