<template>
  <div class="hello">
    <canvas width="300" height="300" id="canvas"></canvas>
  </div>
</template>

<script>
var sun = new Image();
var moon = new Image();
var earth = new Image();
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  methods: {
    init() {
      sun.src = "https://mdn.mozillademos.org/files/1456/Canvas_sun.png";
      moon.src = "https://mdn.mozillademos.org/files/1443/Canvas_moon.png";
      earth.src = "https://mdn.mozillademos.org/files/1429/Canvas_earth.png";
      window.requestAnimationFrame(this.draw);
      console.log("???")
    },
    draw() {
      var ctx = document.getElementById("canvas").getContext("2d");
      ctx.globalCompositeOperation = "destination-over"; // ?
      ctx.clearRect(0, 0, 300, 300); // 清空 x y为左上角原点的 矩形像素 后两位参数是宽高
      ctx.fillStyle = "rgba(10,0,0,0.4)"; // 这个填充颜色？ // 画布的填充颜色
      ctx.strokeStyle = "rgba(0,153,255,0.4)"; // 笔触绘制风格
      ctx.save(); // 存储现在？
      ctx.translate(150, 150); // 改变原点

      // Earth
      var time = new Date();
      ctx.rotate(
        ((2 * Math.PI) / 60) * time.getSeconds() +
          ((2 * Math.PI) / 60000) * time.getMilliseconds()
      );
      ctx.translate(105, 0);// 原点位置更改
      ctx.fillRect(0, -12, 50, 24); // Shadow 绘制已填色的矩形
      ctx.drawImage(earth, -12, -12); // 这里的x，y代表的是位置 参考系是原点
       // Moon
      ctx.save();
      ctx.rotate(
        ((2 * Math.PI) / 6) * time.getSeconds() +
          ((2 * Math.PI) / 6000) * time.getMilliseconds()
      );
      ctx.translate(0, 28.5);
      ctx.drawImage(moon, -3.5, -3.5);
      ctx.restore();

      ctx.restore();

      ctx.beginPath();
      ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
      ctx.stroke();

      ctx.drawImage(sun, 0, 0, 300, 300); 

      window.requestAnimationFrame(this.draw);
    }
  },
  created() {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .hello{
  background: black;
} */
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
