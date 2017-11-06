import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Make from '../views/Make'
import All from '../views/All'
import Single from '../views/Single'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
    	path: '/make',
    	component: Make
    },
    {
      path: '/all',
      component: All
    },
    {
      path: '/musicboxes',
      component: Single
    }
  ]
})
