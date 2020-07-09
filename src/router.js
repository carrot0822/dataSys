import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes:[
        
       /*
        {
            path:'/',
            component:()=>import('./components/file.vue')
        },*/
		/*
        {
            path:'/fileData',
            component:()=>import('./components/file.vue')
        },
        
        {
            path:'/',
            component:()=>import('./components/Data.vue')
        },
        {
            path:"/canvans",
            component:() =>import('./components/HelloWorld.vue')
        },
        
        {
            path:"/cube",
            component:() =>import('./assets/common/cube/cube.vue')
        },
        {
            path:'/riverLine',
            component:()=>import('./components/riverLine.vue')
        },
        {
            path:'/test',
            component:()=>import('./components/test.vue')
        },*/
		{
			path:'/',
			component:()=>import('./components/river.vue')
		},
		{
		    path:'/river',
		    component:()=>import('./components/river.vue')
		},
        {
            path:'/editor',
            component:()=>import('./components/editor/editor.vue')
        },
        {
            path:'*',
            component:()=>import('./components/river.vue')
        },
        
        
    ]
})