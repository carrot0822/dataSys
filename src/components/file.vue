<template>
  <div id="file" class="fileGroup">
    <section class="header">
      <p class="title">智慧档案大数据平台</p>
    </section>
    <section class="content">
      <div class="first">
        <div class="countBox">
          <div class="top distance">
            <span class="title">人数统计</span>
          </div>
          <div class="substance">
            <div class="personIn person">
              <p class="part text">进入人数</p>
              <div class="dataBox">
                <span class="data">10000</span>
                <span class="text">人</span>
              </div>
            </div>
            <div class="personOut person">
              <p class="part text">进出人数</p>
              <div class="dataBox">
                <span class="data">10000</span>
                <span class="text">人</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 在架档案比 -->
        <div class="percentage">
          <div class="top distance">
            <span class="title distance">在架档案比</span>
          </div>
          <div class="substance">
            <div class="progressBox">
              <div class="progressItem">
                <div class="flyText">
                  <p>今日借出【{{borrowNow}}】</p>
                </div>
                <div class="leftText">
                  <p class="desText">已借出档案</p>
                  <p class="dataText">【{{borrowed}}】</p>
                </div>
                <div class="progressPos">
                  <div class="progress">
                    <div class="change borrow" :style="{width:borowPer}"></div>
                  </div>
                  <div class="per">{{borowPer}}</div>
                </div>
              </div>

              <div class="progressItem">
                <div class="flyText">
                  <p>今日归还【{{returnNow}}】</p>
                </div>
                <div class="leftText">
                  <p class="desText">未归还档案</p>
                  <p class="dataText">【{{unReturn}}】</p>
                </div>
                <div class="progressPos">
                  <div class="progress">
                    <div class="change return" :style="{width:borowPer}"></div>
                  </div>
                  <div class="per">{{borowPer}}</div>
                </div>
              </div>

              <div class="progressItem">
                <div class="flyText">
                  <p>今日上架【{{fileUp}}】</p>
                </div>
                <div class="leftText">
                  <p class="desText">在架档案</p>
                  <p class="dataText">【{{fileStay}}】</p>
                </div>
                <div class="progressPos">
                  <div class="progress">
                    <div class="change fileStay" :style="{width:borowPer}"></div>
                  </div>
                  <div class="per">{{borowPer}}</div>
                </div>
              </div>

              <div class="progressItem">
                <div class="flyText">
                  <p>今日归档【{{backNow}}】</p>
                </div>
                <div class="leftText">
                  <p class="desText">已归档档案</p>
                  <p class="dataText">【{{backFile}}】</p>
                </div>
                <div class="progressPos">
                  <div class="progress">
                    <div class="change fileOut" :style="{width:borowPer}"></div>
                  </div>
                  <div class="per">{{borowPer}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 第二块 -->
      <div class="secend">
        <div class="videoBox">
          <div class="videoSub">
            <video
              id="video"
              @playing="playNow"
              autoplay="true"
              muted="true"
              type="video/mp4"
              ref="video"
              @ended="end"
              @canplay="ready"
              src
              controls
              width="740"
              height="430"
            ></video>
            <img class="prevImg" :src="prevImg" width="740" height="430" />
          </div>
        </div>
        <div class="environmentBox">
          <div class="top distance">
            <span class="title">当前环境值</span>
          </div>
          <div class="selectBox"></div>
          <div class="substance">
            <div class="tempBox">
              <div class="ringBox">
                <div class="ring">
                  <span class="Num">30.5</span>
                </div>
                <p class="des">温度℃</p>
              </div>
              <div class="ringBox">
                <div class="ring">
                  <span class="Num">30.5</span>
                </div>
                <p class="des">湿度%RH</p>
              </div>
              <div class="ringBox">
                <div class="ring">
                  <span class="Num">30.5</span>
                </div>
                <p class="des">TVOC ug/m³</p>
              </div>
            </div>

            <div class="tempBox">
              <div class="ringBox">
                <div class="ring">
                  <span class="Num">30.5</span>
                </div>
                <p class="des">PM10 ug/m³</p>
              </div>
              <div class="ringBox">
                <div class="ring">
                  <span class="Num">30.5</span>
                </div>
                <p class="des">PM2.5 ug/m³</p>
              </div>
              <div class="ringBox">
                <div class="ring">
                  <span class="Num">30.5</span>
                </div>
                <p class="des">CO2 ppm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="thrid">
        <div class="borrowCount">
          <div class="top distance">
            <span class="title">档案借阅数</span>
          </div>
          <div class="substance">
            <div class="des">单位：&nbsp 本</div>
            <div class="barchart">
              <bar-chart :height="'280px'" :chartData="chartData"></bar-chart>
            </div>
          </div>
        </div>
        <div class="logBox">
          <div class="top distance">
            <span class="title">报警记录</span>
          </div>
          <div class="substance">
            <div class="tableHead">
              <span class="textH">报警信息</span>
              <!--
              <span class="textH">报警值</span>
              -->
              <span class="textH">报警时间</span>
            </div>
            <div class="tableData" v-if="logData.length">
              <div class="dataBox" v-for="(item,index) of logData" :key="index">
                <p class="message textB">{{item.alarmMsg}}</p>
                <!--
                <p class="value textB">5.0PM2.5</p>
                -->
                <P class="time textB">{{item.createTime}}</P>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import barChart from "./barChart";
import axios from "axios";
import $ from "jquery";
export default {
  data() {
    return {
      // 第一块
      // 进入人数
      personIn: 10000,
      personOut: 10000,
      // 在架档案比
      borrowed: 0,
      borrowNow: 0,
      unReturn: 0,
      returnNow: 0,
      fileStay: 0,
      fileUp: 0,
      backFile: 0,
      backNow: 0,
      // 第二块
      // 视频链接
      videoSrc: "",
      prevImg: "",
      // 温湿度 库房 区 温湿度数据 这里数据最多
      form: {
        store: "",

        region: ""
      },
      storeArr: [],
      regionArr: [],
      temperature: 0,
      humidity: 0,

      // 第三块
      chartData: [50, 100, 200, 100, 100, 200, 100],
      logData: []
    };
  },
  components: {
    barChart
  },
  methods: {
    playNow() {},
    end() {
      let length = this.videoArr.length;

      this.i++;
      if (this.i > this.videoArr.length - 1) {
        this.i = 0;
      }
      this.$refs.video.play();
    },
    ready() {
        console.log('准备完毕就把等待图去掉')
    },
    getPercent(num, total) {
      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
        return "-";
      }

      return total <= 0
        ? "0%"
        : parseInt(Math.round((num / total) * 10000) / 100.0) + "%";
    },
    // 可以整理成数组再渲染- -不过太麻烦了 算了
    _getFile() {
      axios.get(this.url + "countmodule/homePage/getTotleCount").then(res => {
        if (res.data.state) {
          let data = res.data.rows;
          this.borrowed = data[0].count;
          this.borrowNow = data[1].count;
          this.unReturn = data[2].count;
          this.returnNow = data[3].count;
          this.fileStay = data[4].count;
          this.fileUp = data[5].count;
          this.backFile = data[6].count;
          this.backNow = data[7].count;
        }
        console.log("在架档案比", res);
      });
    },
    _getLog() {
      axios
        .get(
          this.url + "environment/alarm/selectAlarms?currentPage=1&pageSize=10"
        )
        .then(res => {
          console.log(res, "报警信息");
          if (res.data.state) {
            this.logData = res.data.rows;
          }
        });
    },
    // 库房相关
    changeStore(val, index) {
      console.log(val, "库房改变");
      // 库房改变 区也改变为默认值第一个 库房IP绑定也得变
      console.log(this.selectStore, "被选中的库房");
      this._getRegin();
    },
    // 区改变后
    changeRegin(val) {
      console.log(this.selectRegin, "被选中的区");
      console.log(val, "区域改变");
      this._getHumiture();
    },
    _getStore() {
      axios
        .get(this.url + "storeroommodule/StoTbStore/selectIsNotDelete")
        .then(res => {
          if (res.data.state) {
            this.storeArr = res.data.rows;
            this.form.store = res.data.rows[0].id;
            this._getRegin();
          }
          console.log(res, "获取库房信息", this.storeArr);
        });
    },
    _getRegin() {
      let fkStoreId = this.form.store;
      axios
        .get(
          this.url +
            "storeroommodule/stoTbRegion/selectByBind?fkStoreId=" +
            fkStoreId
        )
        .then(res => {
          console.log(res, "查询区");

          if (res.data.state) {
            this.regionArr = res.data.rows;
            this.form.region = res.data.rows[0].regionNum;

            //this._getHumiture();
            console.log(this.regionArr, "区数据");
          }
        });
    },
    // 获取温湿度
    _getHumiture() {
      let item = this.selectRegin;
      console.log(item, "被选中的区");
      let data = {};
      let quIp = item.reqestIp + ":" + item.httpPort;
      console.log(quIp, "未定义？");
      data.Into = "gethumiture";
      data.qu_num = item.regionNum;
      axios.get(`http://${quIp}/GDL`, { params: data }).then(res => {
        console.log(res, "温湿度");
        /*
        this.temperature = res.temperature ? res.temperature : "0";
        this.humidity = res.humidity ? res.humidity : "0";
       
        console.log(this.temperature, this.humidity, "温湿度");
        */
        console.log(res, "查询温湿度");
      });
    },

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
  computed: {
    borowPer() {
      let num = this.borrowNow;
      let total = this.borrowed;
      let result = this.getPercent(num, total);
      return result;
    },
    returnPer() {
      let num = this.returnNow;
      let total = this.unReturn;
      let result = this.getPercent(num, total);
      return result;
    },
    filePer() {
      let num = this.fileUp;
      let total = this.fileStay;
      let result = this.getPercent(num, total);
      return result;
    },
    backPer() {
      let num = this.backNow;
      let total = this.backFile;
      let result = this.getPercent(num, total);
      return result;
    },
    selectStore() {
      var id = this.form.store;

      var result = this.storeArr.find(item => {
        return item.id == id;
      });
      console.log(id, result, "执行没啊");
      return result;
    },
    selectRegin() {
      var regionNum = this.form.region;
      var result = this.regionArr.find(item => {
        return item.regionNum == regionNum;
      });
      return result;
    }
  },
  created() {
    this.url = window.testUrl;
    console.log(window.testUrl);
    this._getStore();
    this._getLog();
    this._getFile();
    // 获取门禁人数
    // 获取视频播放
    // 获取档案借阅数
    // 在架档案比 http://192.168.2.88:8082/countmodule/homePage/getTotleCount
    // 获取库房
    // 获取区
    // 获取库房环境值
    // 获取报警记录
  },
  mounted() {
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
  }
};
</script>
<style lang="scss" scoped>
.borrow {
  background-color: #00ffae;
}
.return {
  background-color: #f6ff00;
}
.fileStay {
  background-color: #00deff;
}
.fileOut {
  background-color: #ff8400;
}
#file {
  overflow: hidden;
  height: 100vh;

  background-image: url("../assets/fileImg/bg.png");
  background-size: cover;

  background-repeat: no-repeat;
  background-color: #00111f;
  .header {
    height: 91px;
    position: relative;
    text-align: center;
    margin-bottom: 36px;
    .title {
      padding-top: 27px;
      font-size: 38px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(0, 255, 252, 1);
    }
  }

  .content {
    padding: 0 65px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: row;
    .first {
      margin-right: 40px;
      .countBox {
        background-image: url("../assets/fileImg/count.png");
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        width: 460px;
        height: 351px;
        position: relative;
        margin-bottom: 40px;
        .distance {
        }
        .substance {
          padding-top: 30px;

          .person {
            padding-left: 36px;
            padding-right: 78px;
            .text {
              font-family: Microsoft YaHei;
              font-weight: 400;
              font-size: 18px;
              color: rgba(138, 255, 254, 1);
            }
            .part {
              margin-bottom: 20px;
            }
            .dataBox {
              text-align: end;
              .data {
                font-size: 72px;
                font-family: UniDreamLED;
                font-weight: 400;
                letter-spacing: 10px;
                color: rgba(255, 255, 255, 1);
              }
            }
          }
        }
      }
      // 在架百分比
      .percentage {
        background-image: url("../assets/fileImg/percentage.png");
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        width: 460px;
        height: 510px;
        position: relative;
        .distance {
          margin-bottom: 40px;
        }
        .substance {
          padding: 0 24px;
          .progressBox {
            .progressItem {
              display: flex;
              flex-direction: row;
              position: relative;
              margin-bottom: 50px;
              .flyText {
                position: absolute;
                right: 40px;
                top: -10px;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(138, 255, 254, 1);
                line-height: 24px;
              }
              .leftText {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(138, 255, 254, 1);
                line-height: 24px;

                .desText {
                  width: 100px;
                  text-align: center;
                }
                .dataText {
                  text-align: center;
                }
              }
              .progressPos {
                display: flex;
                flex-direction: row;
                align-items: center;

                .progress {
                  width: 270px;
                  height: 15px;
                  background-color: #005e69;
                  position: relative;
                  border-radius: 8px;
                  overflow: hidden;
                  .change {
                    position: absolute;
                    top: 0;
                    left: 0;
                    border-radius: 8px;
                    z-index: 55;

                    height: 15px;
                  }
                }
                .per {
                  font-size: 16px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: rgba(138, 255, 254, 1);
                  line-height: 24px;
                  margin-left: 8px;
                }
              }
            }
          }
        }
      }
    }
    .secend {
      margin-right: 40px;
      .videoBox {
        background-image: url("../assets/fileImg/video.png");
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        width: 820px;
        height: 506px;
        box-sizing: border-box;
        padding: 40px;
        position: relative;
        margin-bottom: 50px;
        .videoSub {
          position: relative;
          .prevImg {
            display: block;
            position: absolute;
            top: 0;
          }
        }
      }
      .environmentBox {
        background-image: url("../assets/fileImg/environment.png");
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        width: 820px;
        height: 330px;
        position: relative;
        .distance {
          margin-bottom: 20px;
        }
        .substance {
          padding: 0 95px;
          .tempBox {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 24px;
            .ringBox {
              .ring {
                background-image: url("../assets/fileImg/watch.png");
                background-size: cover;
                background-position: 50% 50%;
                background-repeat: no-repeat;
                width: 150px;
                height: 84px;
                position: relative;
                margin-bottom: 5px;
                .Num {
                  font-size: 34px;
                  font-family: Microsoft YaHei;
                  font-weight: bold;
                  color: rgba(255, 255, 255, 1);
                  position: absolute;
                  top: 50%;
                  left: 26%;
                }
              }
              .des {
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(138, 255, 254, 1);
                text-align: center;
              }
            }
          }
        }
      }
    }
    .thrid {
      .borrowCount {
        background-image: url("../assets/fileImg/borrowCount.png");
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        width: 460px;
        height: 350px;
        position: relative;
        margin-bottom: 40px;
        .distance {
          margin-bottom: 20px;
        }
        .substance {
          .des {
            position: absolute;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(138, 255, 254, 1);
            top: 41px;
            left: 40px;
          }
        }
      }
      .logBox {
        background-image: url("../assets/fileImg/log.png");
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        width: 460px;
        height: 510px;
        position: relative;
        .distance {
          margin-bottom: 30px;
        }
        .substance {
          height: 390px;
          overflow: hidden;
          position: relative;

          .tableHead {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 0 36px;
            margin-bottom: 20px;
            .textH {
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(138, 255, 254, 1);
            }
          }
          .tableData {
            padding: 0 25px;
            .dataBox {
              display: flex;
              flex-direction: row;
              justify-content: space-between;

              .textB {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(138, 255, 254, 1);
                line-height: 36px;
              }
            }
          }
        }
      }
    }
  }

  .top {
    height: 45px;
    line-height: 46px;
    text-align: center;
    .title {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(0, 255, 252, 1);
    }
  }
}
</style>