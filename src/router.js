import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes:[
        
        {
            path:'/',
            component:()=>import('./components/Data.vue')
        },
        {
            path:'/fileData',
            component:()=>import('./components/file.vue')
        },
        
        
        {
            path:"/canvans",
            component:() =>import('./components/HelloWorld.vue')
        },
        {
            path:"/cube",
            component:() =>import('./assets/common/cube/cube.vue')
        },
        /*
        {
            path:'*',
            component:()=>import('./components/Data.vue')
        },
        */
    ]
})