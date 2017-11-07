import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'

import utilities from './plugins/add_to_prototype.js'
import plugins from './plugins/global_plugins.js'
import { updateVuexSynth, updateVuexFilter, updateVuexEffect } from './utilities/update_vuex.js'

Vue.mixin(updateVuexSynth)
Vue.mixin(updateVuexFilter)
Vue.mixin(updateVuexEffect)

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

Vue.mixin

export { app, router, store }
