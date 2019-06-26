<template>
  <div id="metor">
    <canvas id="test"></canvas>
  </div>
</template>
<script>
import Stars from "./stars";
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
export default {
     data(){
        return{
            count:0,
            stars:{},
            canvas:null,
            ctx:null
        }
    },
    methods:{
        frame(){
            this.count++
            this.count % 10 == 0 && this.stars.blink()
            this.stars.draw()
            console.log('???')
            requestAnimationFrame(this.frame)
        }
    },
    mounted(){
        var canvas = document.getElementById('test')
        var ctx = canvas.getContext('2d')
        canvas.width = WIDTH - 100
        canvas.height = HEIGHT - 100
        this.stars = new Stars(ctx,WIDTH,HEIGHT,200)
        this.frame()
    } 
} 
</script>
<style lang="scss" scoped>
</style>
