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
  
  background-image: url("./assets/img/bg1.jpg");
    background-size: cover;
    
    background-repeat: no-repeat;
    
}
</style>
