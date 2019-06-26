import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            component:()=>import('./assets/common/metor/metor.vue')
        },
        {
            path:'/index',
            component:()=>import('./components/Data.vue')
        }
    ]
})