import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'blogmain',
      component:()=>import('@/view/blogmain/blogmain')
    }
  ]
})
