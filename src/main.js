import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// bootstrap, css
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// veevalidate
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import ko from 'vee-validate/dist/locale/ko.json'

// navermap
import naver from 'vue-naver-maps'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(naver, {
  clientID: process.env.VUE_APP_CLIENT_ID,
  useGovAPI: false,
  subModules: ''
})

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
localize('ko', ko)

Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
