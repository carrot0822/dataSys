<template>
  <div id="cubes">
    <div class="container">
      <div class="cube-warp">
        <input type="radio" name="cuber" class="controller" id="1" checked="true" />
        <input type="radio" name="cuber" class="controller" id="2" />
        <input type="radio" name="cuber" class="controller" id="3" />
        <input type="radio" name="cuber" class="controller" id="4" />
        <input type="radio" name="cuber" class="controller" id="5" />
        <input type="radio" name="cuber" class="controller" id="6" />
        <div class="cube">
          <div class="cube-face front">
            <img src="./1.jpg" />
          </div>
          <div class="cube-face back">
            <img src="./2.jpg" />
          </div>
          <div class="cube-face left">
            <img src="./3.jpg" />
          </div>
          <div class="cube-face right">
            <img src="./4.jpg" />
          </div>
          <div class="cube-face top">
            <img src="./5.jpg" />
          </div>
          <div class="cube-face bottom">
            <img src="./6.jpg" />
          </div>
        </div>
        <!-- 下方指示  -->
        <div class="indicators">
          <label for="1" class="indicator"></label>
          <label for="2" class="indicator"></label>
          <label for="3" class="indicator"></label>
          <label for="4" class="indicator"></label>
          <label for="5" class="indicator"></label>
          <label for="6" class="indicator"></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#cubes {
  padding-left: 300px;
  padding-top: 200px;
  .container {
    width: 600px;
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -300px;
    margin-left: -300px;
    transition: all 0.5s ease;
    transform: scale(0.25);
    .cube-warp {
      width: 300px;
      height: 300px;
      perspective: 1000px;
      position: relative;
      .cube {
        width: 100%;
        height: 100%;
        position: absolute;
        transform-style: preserve-3d; // 开启3D
        transition: all 0.5s ease;
        animation: spin 10s linear infinite;
        .cube-face {
          width: 100%;
          height: 100%;
          position: absolute;
          overflow: hidden;
          opacity: 0.9;
          border: 1px solid #ccc;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .front {
          transform: translateZ(150px);
        }
        .back {
          transform: rotateX(180deg) translateZ(150px);
        }
        .left {
          transform: rotateY(-90deg) translateZ(150px);
        }
        .right {
          transform: rotateY(90deg) translateZ(150px);
        }
        .top {
          transform: rotateX(90deg) translateZ(150px);
        }
        .bottom {
          transform: rotateX(-90deg) translateZ(150px);
        }
      }
      .indicators {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -150px;
        padding: 20px;
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s;
        .indicator {
          background-color: red;
          border-radius: 50%;
          cursor: pointer;
          display: inline-block;
          width: 14px;
          height: 14px;
          margin: 6px;
          opacity: 0.15;
        }
      }
    }
    &:hover {
      transform: scale(1);
      .cube{
          animation: entrance 1s ease;
      }
      .indicators{
          opacity: 1;
      }
    }
    .controller{
        display: none;
    }
  }
  @keyframes entrance {
      from{
          transform: rotateX(-255deg) rotateY(-225deg);
      }
  }
  @keyframes spin {
    from {
      transform: rotateX(45deg) rotateY(45deg);
    }
    to {
      transform: rotateX(405deg) rotateY(765deg);
    }
  }
}
</style>