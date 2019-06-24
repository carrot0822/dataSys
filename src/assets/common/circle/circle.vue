<template>
  <div class="arrive-circle">
    <div class="mb_15 canvasBox">
      <canvas id="canvas"></canvas>
      <p class="canvas-text">3000</p>
    </div>
    <p class="arrive-text">上月到馆</p>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    draw() {
      var canvas = document.getElementById("canvas");
      canvas.width = 132;
      canvas.height = 132;

      var context = canvas.getContext("2d");
      context.lineCap = "round";
      var gradient = context.createLinearGradient(0, 100, 100, 200);
      gradient.addColorStop(0, "#00ffd8");
      gradient.addColorStop(1, "#0066ff");
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


