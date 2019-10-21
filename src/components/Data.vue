<template>
  <div id="data" class="main">
    <div id="particles-js"></div>

    <section class="header">
      <div class="imgBox">
        <img src="../assets/img/logo@2x.png" />
      </div>
      <p class="title">智 能 图 书 馆 实 时 大 数 据</p>
      <div class="usual">
        <!--  <p>测试websocket连接使用数据,请忽略{{time}}</p>  -->
        <!-- <span>2019年06月13日</span>
        <span>今日天气</span>
        <span>今日温度</span>-->
      </div>
    </section>
    <section class="content">
      <div class="contentBox">
        <section class="circulate">
          <div class="topImgBox">
            <img src="../assets/img/cir.png" />
          </div>
          <p class="title">文献流通</p>
          <div class="dataBase">
            <div class="dataBox">
              <div class="text">当前借出</div>
              <div class="number">{{_borrow.todayborrow}}</div>
            </div>
            <div class="dataBox">
              <div class="text">当前还入</div>
              <div class="number">{{_borrow.todayback}}</div>
            </div>
            <div class="dataBox">
              <div class="text">累计今年借阅量</div>
              <div class="number">{{_borrow.yearborrow}}</div>
            </div>
          </div>
          <div class="circle-bottom">
            <div class="data-cicle">
              <div class="cicle-normal first">
                <div class="cicle-border"></div>
                <div class="cicle-boll">{{_borrow.yestodayborrow}}</div>
              </div>
              <div class="cicle-text">昨日借出</div>
            </div>
            <div class="data-cicle">
              <div class="cicle-normal">
                <div class="cicle-border"></div>
                <div class="cicle-boll">{{_borrow.yestodayback}}</div>
              </div>
              <span class="cicle-text">昨日还入</span>
            </div>
          </div>
        </section>
        <section class="arrive">
          <div class="topImgBox">
            <img src="../assets/img/cir.png" />
          </div>
          <p class="smallTitle arriveTitle">累计到馆人数</p>
          <div class="mb_60 commonNumber">
            <div v-for="(item,index) of _allArive" :key="index">
              <div v-if="item !='dot'" class="com-numberBox">{{item}}</div>
              <div v-if="item == 'dot'" class="dot">
                <span class="dotNorm">,</span>
              </div>
            </div>
          </div>
          <div class="arrive-cicleBox">
            <div class="Ring-Box">
              <Ring :value="_arriveObj.previousMonthcount" :rotate="true"></Ring>
              <p class="ring-text">上月到馆</p>
            </div>
            <div class="Ring-Box">
              <Ring
                :value="_arriveObj.tomonthcount"
                :gradientStart="'#54fffd'"
                :gradientEnd="'#0066ff'"
                :angelStart="1.0"
                :angelEnd="1.5"
                :rotate="false"
              ></Ring>
              <p class="ring-text">本月到馆</p>
            </div>
            <div class="Ring-Box">
              <Ring
                :value="_arriveObj.yestodaycount"
                :gradientStart="'#63a1ff'"
                :gradientEnd="'#dd54ff'"
                :angelStart="1.0"
                :angelEnd="1.5"
              ></Ring>
              <p class="ring-text">昨日到馆</p>
            </div>
            <div class="Ring-Box">
              <Ring
                :value="_arriveObj.todaycount"
                :gradientStart="'#ff5a00'"
                :gradientEnd="'#ffae00'"
                :angelStart="2.0"
                :angelEnd="2.5"
                :rotate="false"
              ></Ring>
              <p class="ring-text">今日到馆</p>
            </div>
          </div>
        </section>
        <section class="dynamic">
          <div class="topImgBox">
            <img src="../assets/img/cir.png" />
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
							v-if="videoArr.length"
              controls
              width="400"
              height="240"
            ></video>
          </div>
          <div id="noticeInfo" class="noticeBox">
            <div id="info1" class="info1">
              <swipe
                v-if="noticeArr.length"
                v-model="index"
                :autoplayTime="5000"
                :pagination ="false"
                
              >
                <swipe-item v-for="(item,index) of noticeArr" :key="index" class="paragraph">
                  <p class="title">【{{item.title}}】</p>
                  <p class="notice-content">{{item.content}}</p>
                </swipe-item>
                
              </swipe>
            </div>
          </div>
          <!-- <div ref="ca" id="noticeInfo" class="noticeBox">
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
          </div>-->
        </section>
      </div>
    </section>
    <section class="footer">
      <div class="footerBox">
        <div class="borrow backgrond">
          <div class="topImgBox">
            <img src="../assets/img/cir.png" />
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
            <img src="../assets/img/cir.png" />
          </div>
          <p class="smallTitle collectTitle">馆藏总量</p>
          <div class="commonNumber">
            <div v-for="(item,index) of _collect" :key="index">
              <div v-if="item !='dot'" class="com-numberBox">{{item}}</div>
              <div v-if="item == 'dot'" class="dot">
                <span class="dotNorm">,</span>
              </div>
            </div>
          </div>
        </div>
        <div class="recommand backgrond">
          <div class="topImgBox">
            <img src="../assets/img/cir.png" />
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
import { dataInt, preFile, wsUrl } from "../Api/api";
import { setTimeout, clearTimeout, setInterval } from "timers";
import "c-swipe/dist/swipe.css";
import { Swipe, SwipeItem } from "c-swipe";
import $ from "jquery";

var timer = null;
var borrowTimer = null;
var totalTimer = null;
var arriveTimer = null;
export default {
  data() {
    return {
      index: 0,
      borrowObj: {
        todayback: 0,
        todayborrow: 0,
        yearborrow: 0,
        yestodayback: 0,
        yestodayborrow: 0
      },
      // 累计到馆人数默认值
      allObj: {
        previousMonthcount: 0,
        tomonthcount: 0,
        yestodaycount: 0,
        todaycount: 0
      },
      defaultSrc: require("../assets/img/cover.jpg"),
      circleObj: null, // 文献流通
      totel: null, // 总到馆人数数组
      arriveObj: null, // 累计到馆人数
      collectArr: null, // 馆藏数据
      borrowRank: [], // 本月借阅排行
      libAll: null, // 馆藏总量
      defaultArr: [0, 0, 0, "dot", 0, 0], // 默认数据
      propArr: [], // 3d轮播图片
      bookArr: [], // 推荐书籍,
      noticeArr: [], // 公告
      videoArr: [],
      i: 0,
      count: 0, // 定时器记数
      /*websocket */
      wsValue: null, // webSocket对象
      heartValue: null,
      sendTime: 10 * 1000, // 发送ping包时间
      timeout: 10 * 1000, // 连接超时时间
      timeoutObj: null, // 发送ping包定时器
      serverTimeOutObj: null, // 服务器检测定时器 在规定时间内未被清除则执行
      timeoutNum: null, // 重连定时器
      reconnectStatus: false, // 重连状态
      reconnectTime: 5 * 1000,
      limit: 0, // 重连次数限制
      time: null
    };
  },
  components: {
    Ring,
    carousel,
    Swipe,
    SwipeItem
  },
  computed: {
    // 馆藏总量
    _collect() {
      if (this.libAll != null && this.libAll != "") {
        let arr = this._toFilter(this.libAll, 5);
        return arr;
      } else {
        return this.defaultArr;
      }
      console.log(this._collect);
    },
    // 文献流通
    _borrow() {
      if (this.circleObj != null && this.circleObj != "") {
        return this.circleObj;
      } else {
        return this.borrowObj;
      }
    },
    _allArive() {
      if (this.totel != null && this.totel != "") {
        let arr = this._toFilter(this.totel, 5);
        return arr;
      } else {
        return this.defaultArr;
      }
    },
    // 其他数据
    _arriveObj() {
      if (this.arriveObj != null && this.arriveObj != "") {
        return this.arriveObj;
      } else {
        return this.allObj;
      }
    }
  },
  methods: {
    init() {
      particlesJS("particles-js", particlesConfig);
    },
    /* scroll() {
      var c1 = document.getElementById("info1");

      var ca = this.$refs.ca;

      var cas = null;
      clearInterval(cas);

      if (ca.scrollTop >= c1.offsetHeight) {
        ca.scrollTop = 0; //归0会有一个明显的动作 而第二个框和第一个框一样是为了骗眼
      } else {
        ca.scrollTop++;
      }

      cas = setInterval(() => {
        if (ca.scrollTop >= c1.offsetHeight) {
          ca.scrollTop = 0; //归0会有一个明显的动作 而第二个框和第一个框一样是为了骗眼
          //console.log("这里不会执行了吧")
        } else {
          ++ca.scrollTop;
          console.log(ca.scrollTop, c1.offsetHeight, "高度检测");
        }
      }, 100);
    }, */

    /*--- 视频播放相关 ---*/
    ready() {},
    playNow() {
      console.log("???");
    },
    pauseNow() {
      this.$refs.video.play;
    },
    end() {
      this.i++;
			let length = this.videoArr.length
      if (this.i > this.videoArr.length - 1) {
        this.i = 0;
        
      }
			console.log("下一个",this.i);
    },
    /*------ websocket接口 ------*/
    wsInit(url) {
      var ws = new WebSocket(url);
      let that = this;
      ws.onopen = e => {
        ws.send("connect");
        console.log("连接成功");
        that.webstart();
      };
      ws.onmessage = e => {
        console.log("再次接收", e);
        that.time = Date();
        if (e.data == "heartcheck" && e.data != null) {
          that.webstart();
        } else {
          let data = JSON.parse(e.data);
          // 检测信息来源
          //  文献流通
          if (data.borrowCount != "") {
            that.circleObj = data.borrowCount.row;
            console.log("文献流通", that.circleObj);
          }
          // 累计到馆人数
          if (data.inoutCount != "") {
            that.arriveObj = data.inoutCount.row;
            that.totel = data.inoutCount.row.totel;
          }
          // 借阅排行
          if (data.nowMonthBorrowCount != "") {
            that.borrowRank = data.nowMonthBorrowCount.row;
          }
          // 馆藏总量
          if (data.libraryTotleCount != "") {
            that.libAll = data.libraryTotleCount.row;
          }
        }

        console.log("接收数据", data);
      };
      ws.onclose = e => {
        console.log("连接关闭");
        this.reconnect();
      };
      ws.onerror = e => {
        console.log("出错情况");
        this.reconnectStatus = true;
        this.reconnect();
      };
      return ws;
    },
    // 重新连接
    reconnect() {
      var that = this;
      console.log("尝试重连");
      if (this.reconnectStatus) {
        return;
      }
      that.reconnectStatus = true;
      if (that.timeoutnum) {
        clearTimeout(that.timeoutnum);
      }
      that.timeoutNum = setTimeout(() => {
        that.wsValue = that.wsInit(wsUrl);
        that.reconnectStatus = false;
      }, 5000);
      //that.timeoutnum && clearTimeout(that.timeoutnum);可读性极差
    },
    // 心跳开始
    webstart() {
      var self = this;
      console.log("连接状态", self.wsValue.readyState);
      // 检测定时器是否存在 清除定时器
      self.timeoutObj && clearTimeout(self.timeoutObj);
      self.serverTimeOutObj && clearTimeout(self.serverTimeOutObj);
      console.log("定时器", self.timeoutObj, self.serverTimeOutObj);
      self.timeoutObj = setTimeout(res => {
        if (self.wsValue.readyState == 1) {
          self.wsValue.send("heartcheck");
        } else {
          self.reconnect();
        }
        console.log("心跳时间");
        // 超时关闭
        self.serverTimeOutObj = setTimeout(res => {
          self.wsValue.close();
        }, self.timeout);
      }, self.timeout);
    },
    // 心跳重置
    webreset() {
      var that = this;
      clearTimeout(that.timeoutObj);
      clearTimeout(that.serverTimeOutObj);
      that.start();
    },
    /*------ API接口 ------*/
    // 文献流通
    _borrowTotal() {
      dataInt.borrowTotal().then(res => {
        if (res.data.state) {
          this.circleObj = res.data.row;
        }

        console.log("文献流通", res);
      });
    },
    // 累计到馆人数
    _arriveAll() {
      dataInt.arrive().then(res => {
        let that = this;
        console.log("到馆总数", res);
        that.totel = res.data.row.totle;
        that.arriveObj = res.data.row;
      });
    },
    // 借阅排行
    _borrowRank() {
      dataInt.borrow().then(res => {
        this.borrowRank = res.data.row;
        console.log("借阅排行", res);
      });
    },
    // 馆藏总量
    _collectAll() {
      dataInt.collect().then(res => {
        if (res.data.state) {
          this.libAll = res.data.row;
        }
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
				console.log(this.videoArr,'这里的视频数组')
      });
    },
    /*------ API数据过滤函数 ------*/
    _toFilter(value, number) {
      let str = String(value);
      let strArr = str.split("");
      let length = strArr.length;

      while (length < number) {
        strArr.unshift("0");

        length++;
      }
      strArr.splice(-3, 0, "dot");
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
			let middle = [];
      if (arr == null) {
        return middle
      }
      
      for (let item of arr) {
        let str = preFile + item.path;
        middle.push(str);
      }
      console.log("视频过滤后", middle, arr);
      return middle;
    },
    /*--- 轮询警告 ---*/
    /*--- 分辨率兼容 ---*/
    resizeWidth() {
      var ratio = $(window).width() / 1920;
      $(".main").css({
        zoom: ratio,
        transformOrigin: "left top"
      });

      console.log(
        "ratio",
        ratio,
        $(window).width(),
        window.screen.width,
        $("body").width()
      );
    }
  },
  created() {
    this.wsValue = this.wsInit(wsUrl);
    this._borrowTotal();
    this._borrowRank();
    this._arriveAll();
    this._collectAll();
    this._search();
    this._video();
    this._notice();
  },
  mounted() {
    this.init();
    //this.scroll();

    let that = this;
    $(window, document)
      .resize(function() {
        that.resizeWidth();
        $("body").height = $(window).height();
        
      })
      .on("load", function() {
        that.resizeWidth();
      });
    setTimeout(function() {
      that.resizeWidth();
    }, 10 * 1000);
  },
  beforeDestroy() {
    if (pJSDom && pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS();
      pJSDom = [];
    }
  },
  destroyed() {
    this.wsValue.close();
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
          height: 120px;
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
              left: 0;
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
.topImgBox {
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

