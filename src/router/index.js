import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'blogmain',
      component:()=>import('@/view/blogmain/blogmain'),
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/Article/:id',
      name:'Article',
      component:()=>import('@/view/article/article'),
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(savedPosition){
          resolve(savedPosition);
        }else{
          resolve({ x: 0, y: 0 });
        }
      },300)
    })
  }
})


