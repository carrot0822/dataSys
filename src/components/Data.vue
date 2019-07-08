<template>
  <div id="data" class="main">
    <div id="particles-js"></div>

    <section class="header">
      <div class="imgBox">
        <img src="../assets/img/logo@2x.png" />
      </div>
      <p class="title">智 能 图 书 馆 实 时 大 数 据</p>
      <div class="usual">
        <span>2019年06月13日</span>
        <span>今日天气</span>
        <span>今日温度</span>
      </div>
    </section>
    <section class="content">
      <div class="contentBox">
        <section class="circulate">
          <div class="topImgBox">
            <img src="../assets/img/cir.png" >
          </div>
          <p class="title">文献流通</p>
          <div class="dataBase">
            <div class="dataBox">
              <div class="text">当前借出</div>
              <div class="number">{{borrowObj.todayborrow}}</div>
            </div>
            <div class="dataBox">
              <div class="text">当前还入</div>
              <div class="number">{{borrowObj.todayback}}</div>
            </div>
            <div class="dataBox">
              <div class="text">累计今年借阅量</div>
              <div class="number">{{borrowObj.yearborrow}}</div>
            </div>
          </div>
          <div class="circle-bottom">
            <div class="data-cicle">
              <div class="cicle-normal first">
                <div class="cicle-border"></div>
                <div class="cicle-boll">{{borrowObj.yestodayborrow}}</div>
              </div>
              <div class="cicle-text">昨日借出</div>
            </div>
            <div class="data-cicle">
              <div class="cicle-normal">
                <div class="cicle-border"></div>
                <div class="cicle-boll">{{borrowObj.yestodayback}}</div>
              </div>
              <span class="cicle-text">昨日还入</span>
            </div>
          </div>
        </section>
        <section class="arrive">
          <div class="topImgBox">
            <img src="../assets/img/cir.png" >
          </div>
          <p class="smallTitle arriveTitle">累计到馆人数</p>
          <div class="mb_60 commonNumber">
            <div v-for="(item,index) of arriveArr" :key="index">
              <div v-if="item !='dot'" class="com-numberBox">{{item}}</div>
              <div v-if="item == 'dot'" class="dot">
                <span class="dotNorm">,</span>
              </div>
            </div>
          </div>
          <div class="arrive-cicleBox">
            <div class="Ring-Box">
              <Ring :value="arrObj.previousMonthcount"></Ring>
              <p class="ring-text">上月到馆</p>
            </div>
            <div class="Ring-Box">
              <Ring
                :value="arrObj.tomonthcount"
                :gradientStart="'#54fffd'"
                :gradientEnd="'#0066ff'"
                :angelStart="1.5"
                :angelEnd="2"
              ></Ring>
              <p class="ring-text">本月到馆</p>
            </div>
            <div class="Ring-Box">
              <Ring
                :value="arrObj.yestodaycount"
                :gradientStart="'#63a1ff'"
                :gradientEnd="'#dd54ff'"
              ></Ring>
              <p class="ring-text">昨日到馆</p>
            </div>
            <div class="Ring-Box">
              <Ring
                :value="arrObj.todaycount"
                :gradientStart="'#ff5a00'"
                :gradientEnd="'#ffae00'"
                :angelStart="1.5"
                :angelEnd="2"
              ></Ring>
              <p class="ring-text">今日到馆</p>
            </div>
          </div>
        </section>
        <section class="dynamic">
          <div class="topImgBox">
            <img src="../assets/img/cir.png" >
          </div>
          <p class="smallTitle dynamicTitle">馆内动态</p>
          <div class="videoBox">
            <video
              id="video"
              @playing="playNow"
              autoplay="true"
              muted="true"
              type="video/mp4"
              ref="video"
              @ended="end"
              @canplay="ready"
              :src="videoArr[i]"
              controls
              width="400"
              height="240"
            ></video>
          </div>
          <div id="noticeInfo" class="noticeBox">
            <div id="info1" class="info1">
              <section v-for="(item,index) of noticeArr" :key="index" class="paragraph">
                <p class="title">【{{item.title}}】</p>
                <p class="notice-content">{{item.content}}</p>
              </section>
            </div>
            <div id="info2" class="info2">
              <section v-for="(item,index) of noticeArr" :key="index" class="paragraph">
                <p class="title">【{{item.title}}】</p>
                <p class="notice-content">{{item.content}}</p>
              </section>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section class="footer">
      <div class="footerBox">
        <div class="borrow backgrond">
           <div class="topImgBox">
            <img src="../assets/img/cir.png" >
          </div>
          <p class="smallTitle borrowTitle">本月借阅排行榜</p>
          <div v-if="!borrowRank.length" class="rank">
            <p style="color:#fff">暂无数据0.0</p>
          </div>
          <div v-if="borrowRank.length" class="rank">
            <p class="rankList" v-for="(item,index) of borrowRank" :key="index">
              <span v-if="index==0" class="imgBox">
                <img src="../assets/img/rank1.png" />
              </span>
              <span v-if="index==1" class="imgBox">
                <img src="../assets/img/rank2.png" />
              </span>
              <span v-if="index==2" class="imgBox">
                <img src="../assets/img/rank3.png" />
              </span>
              <span class="bookName">{{item.name}}</span>
              <span class="mr_15">作者</span>
              <span class="author">{{item.author}}</span>
              <span class="amount">借阅 {{item.count}}</span>
            </p>
          </div>
        </div>
        <div class="collect backgrond">
           <div class="topImgBox">
            <img src="../assets/img/cir.png" >
          </div>
          <p class="smallTitle collectTitle">馆藏总量</p>
          <div class="commonNumber">
            <div v-for="(item,index) of collectArr" :key="index">
              <div v-if="item !='dot'" class="com-numberBox">{{item}}</div>
              <div v-if="item == 'dot'" class="dot">
                <span class="dotNorm">,</span>
              </div>
            </div>
          </div>
        </div>
        <div class="recommand backgrond">
           <div class="topImgBox">
            <img src="../assets/img/cir.png" >
          </div>
          <p class="smallTitle recommandTitle">书籍推荐</p>

          <div class="recommandBox">
            <div class="sliderBox">
              <carousel :imgBox="propArr"></carousel>
            </div>
            <div class="bookList">
              <div class="textBox" v-for="(item,index) of bookArr" :key="index">
                <span class="rankNumber">{{index+1}}.</span>
                <div class="book-content">
                  <P>原作名:{{item.name}}</P>
                  <p>作者:{{item.author}}</p>
                  <p>出版社:{{item.press}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import particlesJs from "particles.js";
import particlesConfig from "../assets/js/particles.json";
import Ring from "../assets/common/circle/circle";
import carousel from "../assets/common/swiper/swiper";
import { dataInt, preFile } from "../Api/api";
import { setTimeout, clearTimeout, setInterval } from "timers";
import $ from "jquery";
import { win32 } from 'path';
var timer = null;
var borrowTimer = null
var totalTimer = null
var arriveTimer = null
export default {
  data() {
    return {
      borrowObj: {
        todayback: 0,
        todayborrow: 0,
        yearborrow: 0,
        yestodayback: 0,
        yestodayborrow: 0
      },
      defaultSrc: require("../assets/img/cover.jpg"),
      collectArr: [0, 0, 0,'dot', 0, 0], // 馆藏数据
      arriveArr: [0, 0, 0,'dot', 0, 0], // 到馆人数
      arrObj: {}, // 数组对象
      borrowRank: [], // 借书排行
      propArr: [], // 3d轮播图片
      bookArr: [], // 推荐书籍,
      noticeArr: [], // 公告
      videoArr: [],
      i: 0,
      count:0, // 定时器记数
    };
  },
  components: {
    Ring,
    carousel
  },
  methods: {
    init() {
      particlesJS("particles-js", particlesConfig);
    },
    scroll() {
      var c1 = document.getElementById("info1");

      var ca = document.getElementById("noticeInfo");

      var cas = null;
      window.onload = function() {
        if (ca.scrollTop >= c1.offsetHeight) {
          ca.scrollTop = 0; //归0会有一个明显的动作 而第二个框和第一个框一样是为了骗眼
        } else {
          ca.scrollTop++;
        }
      };
      cas = setInterval(() => {
        if (ca.scrollTop >= c1.offsetHeight) {
          ca.scrollTop = 0; //归0会有一个明显的动作 而第二个框和第一个框一样是为了骗眼
        } else {
          ca.scrollTop++;
        }
      }, 100);
    },

    /*--- 视频播放相关 ---*/

    ready() {},
    playNow() {
      //this.$refs.video.muted = false;
      //this.$refs.video
      console.log("???");
    },
    pauseNow() {
      this.$refs.video.play;
    },
    end() {
      this.i++;
      if (this.i > this.videoArr.length - 1) {
        this.i = 0;
        console.log("下一个");
      }
    },
    /*------ API接口 ------*/
    // 馆藏总数
    _collect() {
      let that = this
      window.clearTimeout(timer)
      dataInt.collect().then(res => {
        if (res.data.state) {
          if(res.data.row)
          this.collectArr = this._toFilter(res.data.row, 5);
          this.count++
          timer = window.setTimeout(this._collect,1000)
          console.log(this.count,timer)
        } else {
        }
      });
    },
    // 借阅排行
    _borrow() {
      window.clearTimeout(borrowTimer)
      dataInt.borrow().then(res => {
        this.borrowRank = res.data.row;
        borrowTimer = window.setTimeout(this._borrow,1000)
        console.log("借阅排行", res);
      });
    },
    // 借阅总数
    _borrowTotal() {
      window.clearTimeout(totalTimer)
      dataInt.borrowTotal().then(res => {
        if (res.data.state) {
          this.borrowObj = res.data.row;
        }
        totalTimer = window.setTimeout(this._borrowTotal,1000)
        console.log("借阅总数", res);
      });
    },
    // 到馆总数
    _arrive() {
      window.clearTimeout(arriveTimer)
      dataInt.arrive().then(res => {
        console.log("到馆总数", res);
        let arriveTotal = res.data.row.totle;
        this.arrObj = res.data.row;
        this.arriveArr = this._toFilter(arriveTotal, 5);
        arriveTimer = window.setTimeout(this._arrive,1000)
      });
    },
    // 书籍推荐书目
    _search() {
      dataInt.search().then(res => {
        this.bookArr = this._searchFilter(res.data.row);
        console.log("推荐书目", this.bookArr);
      });
    },
    // 公告搜索
    _notice() {
      dataInt.notice().then(res => {
        if (res.data.row == null) {
          return;
        }
        this.noticeArr = res.data.row;
        console.log("公告设置", res);
      });
    },
    _video() {
      dataInt.video().then(res => {
        this.videoArr = this._toVideoFilter(res.data.row);
      });
    },
    /*------ API数据过滤函数 ------*/
    _rankFilter(arr) {},
    _toFilter(value, number) {
      let str = String(value);
      let strArr = str.split("");
      let length = strArr.length;

      while (length < number) {
        strArr.unshift("0");

        length++;
      }
      strArr.splice(-3, 'dot', false);
      console.log("过滤后的数组", strArr, length, number);
      return strArr;
    },
    _searchFilter(arr) {
      if (arr == null) {
        return [];
      }
      let propArr = [];
      for (let item of arr) {
        let showImg = preFile + item.cover;
        item.showImg = showImg;

        propArr.push(showImg);
      }
      if (length < 3) {
        while (length < 3) {
          propArr.push(this.defaultSrc);
          length++;
        }
      }
      this.propArr = propArr;
      console.log("图片传递", this.propArr);
      return arr;
    },
    _toVideoFilter(arr) {
      if (arr == null) {
        return;
      }
      let middle = [];
      for (let item of arr) {
        let str = preFile + item.path;
        middle.push(str);
      }
      console.log("视频过滤后", middle, arr);
      return middle;
    },
    /*--- 轮询警告 ---*/
    loop() {
      var timer = setInterval(() => {
        this._collect();
        this._borrow();
        this._borrowTotal();
        this._arrive();
      }, 10*1000);
    },
    /*--- 分辨率兼容 ---*/
    resizeWidth() {
      var ratio =
        $(window).width() / 1920;
      $(".main").css({
        zoom:ratio,
        transformOrigin: "left top",
        
      });
      console.log(
        "ratio",
        ratio,
        $(window).width(),
        window.screen.width,
        $("body").width()
      );
    },
    resizeCenter() {
      if (!window.screen.height || !window.screen.width){
        return this.resizeCenterBak();
      }
      console.log('你还会执行吗')
      var ratio = $(window).height() / window.screen.height;
      $("body").css({
        transform: "scale(" + ratio + ")",
        transformOrigin: "left top",
        backgroundSize:
          100 * ((window.screen.width / $(window).width()) * ratio) +
          "%" +
          " 100%",
        backgroundPosition:
          ($(window).width() - $("body").width() * ratio) / 2 + "px top",
        marginLeft: ($(window).width() - $("body").width() * ratio) / 2
      });
      console.log(
        "ratio",
        ratio,
        $(window).width(),
        window.screen.width,
        $("body").width()
      );
    },
    resizeCenterBak() {
      var ratioX = $(window).width() / $("body").width();
      var ratioY = $(window).height() / $("body").height();
      console.log($(window).height(),$("body").height(),'为啥除不尽')
      var ratio = Math.min(ratioX, ratioY);
      console.log('第二种',ratioX,ratioY)
      $("body").css({
        transform: "scale(" + ratio + ")",
        transformOrigin: "left top",
        backgroundSize: (1 / ratioX) * 100 * ratio + "%",
        backgroundPosition: ($(window).width() - $('body').width() * ratio) / 2 + "px top",
        marginLeft: ($(window).width() - $('body').width() * ratio) / 2
      });
      console.log(
        "ratio",
        ratio,
        $(window).width(),
        window.screen.width,
        $("body").width()
      );
    },
    resizeFull() {
    if (!window.screen.height || !window.screen.width) return this.resizeFullBak();
    var ratioX = $(window).width() / window.screen.width;
    var ratioY = $(window).height() / window.screen.height;
    $('body').css({
      transform: "scale(" + ratioX + ", " + ratioY + ")",
      transformOrigin: "left top",
      backgroundSize: "100% 100%"
    });
  },
  resizeFullBak(){
    var ratioX = $(window).width() / $('body').width();
    var ratioY = $(window).height() / $('body').height();
    $('body').css({
      transform: "scale(" + ratioX + ", " + ratioY + ")",
      transformOrigin: "left top",
      backgroundSize: "100% " + ratioY * 100 + "%"
    });
  }
  },
  created() {
    /* this._collect();
    this._borrow();
    this._borrowTotal();
    this._arrive(); */
    
    this._search();
    this._video(), this._notice();
    console.log("cs", window.screen.display);
    console.log("jq？", $("body"));
    
  },
  mounted() {
    this.init();
    this.scroll();
    
    let that = this
    $(window, document).resize(function () {
    that.resizeWidth();
  }).on('load',function(){
    that.resizeWidth();
  })
  setTimeout(function () {
    that.resizeWidth();
  }, 10 * 1000);
  },
  beforeDestroy() {
    if (pJSDom && pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS();
      pJSDom = [];
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  .main {
    /*min-height: 100vh;*/

    .header {
      height: 91px;
      background-image: url("../assets/img/标题框@2x.png");
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: cover;
      position: relative;
      text-align: center;
      margin-bottom: 36px;

      .imgBox {
        position: absolute;
        z-index: 2;
        top: 22px;
        left: 46px;
      }
      .title {
        position: absolute;
        font-family: AliHYAiHei;
        font-size: 40px;
        color: #ffffff;
        width: 100%;
        padding-top: 18px;
      }
      .usual {
        font-family: MicrosoftYaHei;
        font-size: 22px;
        color: #ffffff;
        position: absolute;
        top: 35px;
        right: 38px;
      }
    }

    .content {
      padding: 0 65px;
      margin-bottom: 40px;

      .contentBox {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .circulate {
          background-image: url("../assets/img/方框01@2x.png");
          background-size: cover;
          background-position: 50% 50%;
          background-repeat: no-repeat;
          width: 519px;
          height: 585px;
          position: relative;

          .title {
            margin-left: 133px;
            margin-top: 37px;
            font-size: 24px;
            color: #ffffff;
            margin-bottom: 46px;
          }
          .dataBase {
            margin-bottom: 17px;
            .dataBox {
              height: 68px;
              margin-bottom: 25px;
              display: flex;
              flex-direction: row;
              align-items: center;
              &:last-child {
                margin-bottom: 0;
              }
              .text {
                font-size: 16px;

                font-weight: bold;
                color: #ffffff;
                margin-right: 34px;
                text-align: right;
                width: 175px;
                font-family: MicrosoftYaHei;
              }
              .number {
                font-family: AliHYAiHei;
                font-size: 36px;
                color: #ffffff;
                width: 260px;
                text-align: center;
                height: 68px;
                line-height: 68px;
                background-image: url("../assets/img/border.png");
                background-size: cover;
                background-position: 50% 50%;
                background-repeat: no-repeat;
              }
            }
          }
          .circle-bottom {
            display: flex;
            flex-direction: row;
            justify-content: center;
            .data-cicle {
              text-align: center;
              .cicle-normal {
                width: 140px;
                height: 140px;
                border-radius: 50%;

                position: relative;
                margin-bottom: 15px;
                .cicle-border {
                  width: 138px;
                  height: 138px;
                  border-radius: 50%;
                  border: 2px dashed #0fc8fd;
                  position: absolute;
                  animation: rotate 60s linear 0s infinite normal;
                }
                .cicle-boll {
                  width: 110px;
                  height: 110px;
                  line-height: 110px;
                  text-align: center;
                  border-radius: 50%;
                  background: linear-gradient(#0fc8fd, #6678ff);
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  font-size: 20px;
                  font-family: MicrosoftYaHei;
                  color: #ffffff;
                }
                &.first {
                  margin-right: 78px;
                }
              }
              .cicle-text {
                color: #ffffff;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: bold;
                width: 140px;

                text-align: center;
              }
            }
          }
        }

        .arrive {
          width: 673px;
          height: 591px;
          background-size: cover;
          background-position: 50% 50%;
          background-repeat: no-repeat;
          background-image: url("../assets/img/方框02@2x.png");
          position: relative;
          .arriveTitle {
            margin-left: 115px;
            margin-top: 44px;
            margin-bottom: 82px;
          }
          .arrive-cicleBox {
            display: flex;
            padding-left: 38px;

            .Ring-Box {
              margin-right: 20px;
              .ring-text {
                padding-top: 17px;
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                text-align: center;
              }
            }
          }
        }
        /*------ 中距第三层 ------*/
        .dynamic {
          background-image: url("../assets/img/方框01@2x.png");
          background-size: cover;
          background-position: 50% 50%;
          background-repeat: no-repeat;
          width: 519px;
          height: 585px;
          position: relative;
        }
        .dynamicTitle {
          margin-left: 134px;
          margin-top: 37px;
          margin-bottom: 57px;
        }
        .videoBox {
          width: 400px;
          height: 240px;
          margin: 0 auto;
          position: relative;
          z-index: 10;

          margin-bottom: 30px;
        }
        .noticeBox {
          width: 400px;
          height: 160px;
          overflow: hidden;
          margin: 0 auto;
          position: relative;
          .paragraph {
            font-family: MicrosoftYaHei;
            font-size: 16px;
            line-height: 24px;
            color: #ffffff;
            text-indent: 10px;
            text-align: justify;
            position: relative;

            .title {
            }
            &::before {
              content: "";
              background: #ff482a;
              width: 11px;
              height: 11px;
              border-radius: 50%;
              position: absolute;
              top: 6px;
              left:0;
            }
          }
        }
      }
    }

    .footer {
      padding: 0 65px;
      margin-bottom: 40px;
      .footerBox {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        /*--- 借阅排行 ---*/
        .borrow {
          width: 515px;
          height: 286px;
          position: relative;
          background-image: url("../assets/img/方框04@2x.png");
          .borrowTitle {
            margin-left: 121px;
            margin-top: 37px;
            margin-bottom: 50px;
          }
          .rank {
            width: 100%;
            padding-left: 44px;
            padding-right: 56px;
            .rankList {
              color: #ffffff;
              font-size: 16px;
              margin-bottom: 15px;
              .imgBox {
                img {
                  vertical-align: bottom;
                  margin-bottom: -2px;
                }
              }
              .bookName {
                width: 110px;
                color: #ffffff;
                font-size: 16px;
                display: inline-block;
                margin-right: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                vertical-align: bottom;
              }
              .amount {
                color: #08ebf2;
                font-size: 16px;
              }
              .author {
                width: 130px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: inline-block;
                margin-right: 5px;
                vertical-align: bottom;
              }
              .bookName {
                margin-right: 30px;
              }
            }
          }
        }
        /*--- 馆藏总量 ---*/
        .collect {
          position: relative;
          width: 682px;
          height: 284px;
          background-image: url("../assets/img/方框05@2x.png");
          .collectTitle {
            margin-top: 37px;
            margin-left: 127px;
            margin-bottom: 53px;
          }
        }
        /*--- 书籍推荐 ---*/
        .recommand {
          position: relative;
          width: 517px;
          height: 288px;
          background-image: url("../assets/img/方框6@2x.png");
          .recommandTitle {
            margin-top: 37px;
            margin-left: 127px;
            margin-bottom: 31px;
          }

          .recommandBox {
            padding: 0 36px;
            display: flex;
            flex-direction: row;
            .sliderBox {
              width: 250px;
              height: 120px;
              .imgBox {
                background-color: #00bf7b;
                width: 140px;
                height: 140px;
              }
              img {
                width: 130px;
                height: 110px;
              }
            }
            .bookList {
            }
            .textBox {
              font-size: 13px;
              line-height: 16px;
              color: #ffffff;
              display: flex;
              flex-direction: row;
              margin-bottom: 5px;
              .book-content {
                p {
                  max-width: 180px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
              .rankNumber {
                display: inline-block;
                text-align: center;

                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
.topImgBox{
  position: absolute;
  top: -5px;
  left: -10px;
}
.commonNumber {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .com-numberBox {
    width: 70px;
    height: 113px;
    border-radius: 6px;
    border: solid 2px #00bf7b;
    text-align: center;
    line-height: 113px;
    font-family: FZHZGBJW--GB1-0;
    font-size: 54.03px;
    color: #ffffff;
    margin-right: 20px;
  }
}
.dot {
  font-family: FZHZGBJW--GB1-0;
  font-size: 54.03px;
  color: #ffffff;
  margin-right: 14px;
  height: 113px;
  width: 11px;
  position: relative;
  .dotNorm {
    position: absolute;
    bottom: 17px;
  }
}
.backgrond {
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
.smallTitle {
  font-size: 24px;
  color: #ffffff;
}
#particles-js {
  position: absolute;
  z-index: 4;
  width: 100%;
  height: 100vh;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

