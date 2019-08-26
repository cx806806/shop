import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(ElementUi)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    }
  ]
})
