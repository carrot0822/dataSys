<template>
  <div class="arrive-circle">
    <div class="canvasBox">
      <canvas ref="canvas" id="canvas"></canvas>
      <p class="canvas-text">{{value}}</p>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    value:{
      default:13000
    },
    gradientStart:{
      type:String,
      default:"#00ffd8"
    },
    gradientEnd:{
      type:String,
      default:"#0066ff"
    },
    radius:{
      default:128
    },
    angelStart:{
      default:0
    },
    angelEnd:{
      default:Math.PI * 0.5
    }
  },
  data() {
    return {};
  },
  methods: {
    draw() {
      /* var canvas = document.getElementById("canvas");
      canvas.width = 132;
      canvas.height = 132;

      var context = canvas.getContext("2d"); */
      this.$refs.canvas.width=132
      this.$refs.canvas.height=132
      var context = this.$refs.canvas.getContext("2d")
      context.lineCap = "round";
      var gradient = context.createLinearGradient(0, 100, 100, 200);
      gradient.addColorStop(0, this.gradientStart);
      gradient.addColorStop(1, this.gradientEnd);
      context.lineWidth = 5;
      context.strokeStyle = gradient;

      context.beginPath(); //重新规划 不一定要一起出现
      context.arc(64, 64, 60, 0, 2 * Math.PI, true);
      //context.closePath();//如果不是封闭的线条 则会自动帮你封闭
      context.stroke();
      //
      context.beginPath();
      context.lineWidth = 15;
      context.arc(64, 64, 60, 0, Math.PI * 0.5, false);
      context.stroke();
    }
  },
  mounted(){
    this.draw()
  }
};
</script>

<style lang="scss" scoped>
.arrive-cicleBox {
  display: flex;
  padding-left: 38px;
}
.arrive-text {
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
}
.canvasBox {
  position: relative;
  display: inline-block;
}
.canvas-text {
  font-size: 20px;
  font-family: AliHYAiHei;
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>


