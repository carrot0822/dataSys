<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import DataPage from './components/Data.vue'

export default {
  name: 'app',
  components: {
    DataPage
  }
}
</script>

<style>
#app{
  
}
body{
  overflow: hidden;
  height: 100vh;
  
  background-image: url("./assets/fileImg/bg.png");
  background-size: cover;
  
  background-repeat: no-repeat;
  background-color: #00111f;
  
  
    
}
</style>
