<template>
  <div id="swiper">
    <carousel-3d
      :space="space"
      :height="height" 
      :width="width" 
      :autoplay="true"
      :perspective="perspective"
      :inverseScaling="scaling"
      :display="display"
      :border="0"
      >
      <slide :index="0"><img src="../../img/cover.jpg"></slide>
      <slide :index="1">第二张图</slide>
      <slide :index="2">第三张图</slide>
      
    </carousel-3d>
  </div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  data(){
    return{
      space:60,
      height:130,
      width:110,
      border:1,
      perspective:3,
      scaling:0,
      display:3,
      itemBox:[]
    }
  },
  components: {
    Carousel3d,
    Slide
  }
};
</script>

<style lang="scss" scoped>
img{
  width: 100%;
  height: 100%;
}
</style>
