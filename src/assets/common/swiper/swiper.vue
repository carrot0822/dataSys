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
      <!-- <slide v-for="(item,index) of imgBox" :key="index" :index="index">
        <img :src="item.showImg"></slide> -->  
        <slide  :index="0">
        <img :src="imgBox[0].showImg">
        </slide>
        <slide  :index="1">
        <img :src="imgBox[1].showImg">
        </slide>
        <slide  :index="2">
        <img :src="imgBox[2].showImg">
        </slide>
    </carousel-3d>
  </div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  props: {
      imgBox:{
        type:Array,
      }
  },
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
