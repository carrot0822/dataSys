<template>
  <div id="file" class="fileGroup">
    <section class="header">
      <p class="title">重庆两江新区（自贸区）人民法院</p>
      <p class="normal">库房大数据平台</p>
    </section>
    <section class="content">
      <div class="first">
        <div class="countBox">
          <!-- 库房 -->
          <section class="formBox">
            <el-form class="control" ref="form" :inline="true" :model="form" label-width="50px">
              <el-form-item label>
                <el-select
                  @change="changeStore"
                  v-if="storeArr.length"
                  v-model="form.store"
                  placeholder="请选择库房"
                >
                  <el-option
                    v-for="(item,index) in storeArr"
                    :key="index"
                    :label="item.storeName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="regionArr.length" label>
                <el-select @change="changeRegin" v-model="form.region" placeholder="请选择区">
                  <el-option
                    v-for="(item,index) in regionArr"
                    :key="index"
                    :label="item.regionName"
                    :value="item.regionNum"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </section>
          <!-- 环境温湿度 -->
          <div class="top distance">
            <span class="title">环境曲线图</span>
          </div>

          <div class="substance">
            <div class="tempBox">
              <div class="ringBox">
                <div class="ring">
                  <span class="Num">{{temperature}}</span>
                </div>
                <p class="des">温度℃</p>
              </div>
              <div class="ringBox">
                <div class="ring">
                  <span class="Num">{{humidity}}</span>
                </div>
                <p class="des">湿度%RH</p>
              </div>
              <div class="ringBox">
                <div class="ring">
                  <span class="Num">20.8</span>
                </div>
                <p class="des">TVOC ug/m³</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 在架档案比 -->
        <div class="percentage">
          <div class="top distance">
            <span class="title distance">环境曲线值</span>
          </div>
          <div class="substance">
            <div class="lineChart">
              <line-chart :chartData="lineChart" :height="'380px'"></line-chart>
            </div>
          </div>
        </div>
      </div>
      <!-- 第二块 -->
      <div class="secend">
        <div class="videoBox">
          <div class="top distance">
            <span class="title">档案管理制度</span>
          </div>
          <div class="substance">
            <div id="info" class="info">
             依据凭证性，是合同档案最突出也是重要的特点，意思是说依法订立的合同对当事人具有法律的约束力。合同的订立、生效、履行、变更以及权利义务的转让、终止、违约、责任等等，都必须完全地、唯一地依据合同档案，否则，就要承担由此产生的法律后果。由于具有这一作用，在市场经济体制下，合同档案是维护当事人合法权益的最直接、最有效的手段之一。这点特点需要引起广大经营者、管理部门以及档案工作者的重视。 合同要对当事人有法律的约束力，其自身必须具备法律规定的许可性，即对于合同本身是否具有法律效力，法律规定了特定的形式，不具备法律所要求的特定形式，该合同就不具有法律效力，视为无效合同。
              <!--
              <swipe
                v-if="noticeArr.length"
                v-model="index"
                :autoplayTime="5000"
                :pagination="false"
              >
                <swipe-item v-for="(item,index) of noticeArr" :key="index" class="paragraph">
                  <p class="title">【{{item.title}}】</p>
                  <p class="notice-content">{{item.content}}</p>
                </swipe-item>
              </swipe>
              -->
            </div>
          </div>
        </div>
        <div class="environmentBox">
          <div class="top distance">
            <span class="title">档案类型</span>
          </div>
          <div class="substance">
            <!-- <div class="des">单位：&nbsp 卷</div> -->
            <div class="barchart">
              <bar-chart :height="'290px'" :chartData="chartData"></bar-chart>
            </div>
          </div>
        </div>
      </div>
      <div class="thrid">
        <div class="borrowCount">
          <div class="top distance">
            <span class="title">设备运行状态</span>
          </div>
          <div class="equipBox">
            <div class="airBox mb_20" v-if="airArr.length">
              <!-- 懒得上伪类 这里写麻烦了 没有接口文档 数据格式估算错误 -->
              <div class="air" v-for="(item,index) of airArr" :key="index">
                <div class="circleBox">
                  <div class="outer"></div>
                  <div class="cut">
                    <div :class="['center',item.state == 'on'?'arcColor':'arcError']"></div>
                  </div>
                  <div :class="['inter',item.state == 'on'?'':'errorAdd']"></div>
                  <div class="iconBox">
                    <img :src="item.state == 'on'?airImg:airError" />
                  </div>
                </div>
                <div
                  :class="['textBox',item.state == 'on'?'':'errorText']"
                >{{item.equName}} {{item.state == 'on'?'':'(故障)'}}</div>
              </div>
            </div>
            <!-- 温湿度一体机 -->
            <div class="airBox" v-if="equipArr.length">
              <!-- 懒得上伪类 改起来麻烦 -->
              <div class="air" v-for="(item,index) of equipArr" :key="index">
                <div class="circleBox">
                  <div class="outer"></div>
                  <div class="cut">
                    <div :class="['center',item.state == 'on'?'arcColor':'arcError']"></div>
                  </div>
                  <div :class="['inter',item.state == 'on'?'':'errorAdd']"></div>
                  <div class="iconBoxE">
                    <img :src="item.state == 'on'?equipImg:equipErr" />
                  </div>
                </div>
                <div
                  :class="['textBox',item.state == 'on'?'':'errorText']"
                >{{item.equName}} {{item.state == 'on'?'':'(故障)'}}</div>
              </div>
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
            <div v-if="!logData.length" class="noData">暂无数据</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import barChart from "./riverChart";
import lineChart from "./riverLine";
import axios from "axios";
import { Swipe, SwipeItem } from "c-swipe";
import $ from "jquery";
export default {
  data() {
    return {
      // 第一块
      // 温湿度 库房 区 温湿度数据
      form: {
        store: "",

        region: ""
      },
      storeArr: [],
      regionArr: [],
      temperature: 0,
      humidity: 0,
      PM: 0,
      // 环境曲线
      equipNum: "",

      lineChart: {
        tempData: [], // 温度
        humidityData: [], // 湿度
        TvocData: [], // Tvoc
        lineTime: [] // X轴
      },
      // 第二块
      // 文章链接
      index: 0,
      noticeArr: [],
      // 档案类型
      chartData: [1000, 1000, 3200, 4200, 5220, 6220, 7220],
      xAxis: ["周一", "周二", "周三", "周三", "周五", "周六", "周日"], // X轴
      // 第三块
      // 设备状态
      airImg: require("../assets/riverImg/air.png"),
      airError: require("../assets/riverImg/airErr.png"),
      equipImg: require("../assets/riverImg/equipment.png"),
      equipErr: require("../assets/riverImg/equipErr.png"),
      airArr: [],
      equipArr: [],
      // 报警日志
      logData: []
    };
  },
  components: {
    barChart,
    lineChart,
    Swipe,
    SwipeItem
  },
  methods: {
    // 定时器 后期替换成websocket
    init() {
      this._getStore();
      this._getLog();
      this._getWeek();
      this._getState();
    },
    fileFilter(arr) {
      let result = {};
      let chart = [];
      let xAxis = [];
      let temp = arr.reverse();
      for (let item of temp) {
        chart.push(item.lendCount);
        xAxis.push(this.dateFilter(item.fileTime));
      }
      result.chart = chart;
      result.xAxis = xAxis;
      return result;
    },
    // 日期过滤函数
    dateFilter(date) {
      let result = date.slice(6, 11);
      return result;
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

            this._getHumiture();
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
        if (res.status) {
          this.temperature = res.temperature ? res.temperature : "0";
          this.humidity = res.humidity ? res.humidity : "0";
          this.PM = res.PM ? res.PM : "0";
          console.log(this.temperature, this.humidity, "温湿度");
        }
      });
    },
    // 获取区域控制器编号
    _getmonitor() {
      axios
        .get(this.url + "environment/equipment/selectEquipmentOfCjq")
        .then(res => {
          console.log(res, "区域控制器");
          if (res.data.state) {
            this.equipNum = res.data.rows[0].equNum;
            // 开启定时器
            setInterval(() => {
              this._getLine();
            }, 3000);
          }
        });
    },
    // 更新环境曲线
    _getLine() {
      let data = {};
      data.equNum = this.equipNum;
      axios
        .get(this.url + "environment/equipment/selectHistoryCjq", {
          params: data
        })
        .then(res => {
          console.log(res, "温湿度曲线");
          var len = this.lineChart.tempData.length;
          if (res.data.state) {
            // 极有可能出现数据不存在的情况
            if (res.data.row) {
              if (len < 100) {
                this.lineChart.tempData.push(res.data.row.wd);
                this.lineChart.humidityData.push(res.data.row.sd);
                this.lineChart.TvocData.push(res.data.row.tvoc);
                this.lineChart.lineTime.push(res.data.msg);
              } else {
                this.lineChart.tempData.shift();
                this.lineChart.humidityData.shift();
                this.lineChart.TvocData.shift();
                this.lineChart.lineTime.shift();
                //
                this.lineChart.tempData.push(res.data.row.wd);
                this.lineChart.humidityData.push(res.data.row.sd);
                this.lineChart.TvocData.push(res.data.row.tvoc);
                this.lineChart.lineTime.push(res.data.msg);
              }
            } else {
              console.log(res.data.msg);
            }
          } else {
            console.log("么得数据");
          }
        });
    },
    // 档案管理制度

    // 档案类型
    _getWeek() {
      axios
        .get(this.url + "archivesmodule/arcTbFile/getSevenDayInfo")
        .then(res => {
          console.log(res, "七天档案");
          if (res.data.state) {
            let obj = this.fileFilter(res.data.row.lendInfoList);
            this.chartData = obj.chart;
            //this.xAxis = obj.xAxis;
            console.log(obj, "过滤数据");
          }
        });
    },
    // 设备运行状态
    _getState() {
      axios
        .get(this.url + "environment/equipment/selectEquipments")
        .then(res => {
          console.log(res, "设备运行状态");
          if (res.data.state) {
            let data = res.data.rows;
            this.airArr = data.filter(item => item.fkTypeCode == "znkt");
            this.equipArr = data.filter(item => item.fkTypeCode == "wsdytj");

            console.log(this.airArr, this.equipArr, "过滤结果");
          }
        });
    },
    // 报警记录
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

    resizeWidth() {
      var ratio = $(window).width() / 1920;
      $("#file").css({
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

    this.init();
    this._getmonitor();

    /*
    setInterval(() => {
      this.init();
      console.log("1s定时器测试");
    }, 10000);*/
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
.arcColor {
  border: 4px solid #00fffc;
}
.arcError {
  border: 4px solid #ff0000;
}
.errorAdd {
  background-color: #ff0000;
  border: none !important;
}
.errorText {
  color: #ff0000 !important;
}
.mb_20 {
  margin-bottom: 20px;
}
#file {
  overflow: hidden;
  height: 100vh;

  background-image: url("../assets/riverImg/bg.png");
  background-size: cover;

  background-repeat: no-repeat;
  background-color: #00111f;
  .header {
    height: 91px;
    position: relative;
    text-align: center;
    margin-bottom: 60px;
    .title {
      padding-top: 20px;
      font-size: 36px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(0, 255, 252, 1);
    }
    .normal {
      padding-top: 15px;
      font-size: 32px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(0, 255, 252, 1);
    }
  }

  .content {
    padding: 0 20px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .first {
      margin-right: 20px;
      .countBox {
        background-image: url("../assets/riverImg/temp.png");
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        width: 571px;
        height: 351px;
        position: relative;
        margin-bottom: 20px;
        .formBox {
          position: absolute;
          top: 100px;
          left: 36px;
        }
        .distance {
          margin-bottom: 140px;
        }
        .substance {
          padding: 0 35px;
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
                  left: 50%;
                  transform: translateX(-50%);
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
      // 在架百分比
      .percentage {
        background-image: url("../assets/riverImg/templine.png");
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        width: 571px;
        height: 520px;
        position: relative;
        .distance {
          margin-bottom: 40px;
        }
        .substance {
          padding: 0 24px;
        }
      }
    }
    .secend {
      margin-right: 20px;
      .videoBox {
        background-image: url("../assets/riverImg/text.png");
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        width: 691px;
        height: 471px;
        box-sizing: border-box;

        position: relative;
        margin-bottom: 20px;
        .distance {
          margin-bottom: 20px;
        }
        .substance {
          .info {
            width: 640px;
            height: 380px;
            overflow: hidden;
            margin: 0 auto;
            position: relative;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(138, 255, 254, 1);
            line-height: 40px;
          }
        }
      }
      .environmentBox {
        background-image: url("../assets/riverImg/fileType.png");
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        width: 691px;
        height: 401px;
        position: relative;
        .barchart {
          padding-left: 10px;
        }
      }
    }
    .thrid {
      .borrowCount {
        background-image: url("../assets/riverImg/equip.png");
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        width: 571px;
        height: 351px;
        position: relative;
        margin-bottom: 20px;
        .distance {
          margin-bottom: 20px;
        }
        .equipBox {
          .airBox {
            position: relative;
            display: flex;
            flex-direction: row;
            padding: 0 40px;
            justify-content: space-between;
            .air {
              .circleBox {
                position: relative;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                border: 1px dotted #00fffc;
                .cut {
                  position: absolute;
                  width: 40px;
                  height: 40px;
                  top: 5%;
                  left: 5%;
                  overflow: hidden;
                }
                .center {
                  width: 60px;
                  height: 60px;
                  //position: absolute;
                  //top: 50%;
                  //left: 50%;
                  //transform: translate(-50%, -50%);
                  border-radius: 50%;
                }
                .inter {
                  position: absolute;
                  width: 50px;
                  height: 50px;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  border: 1px solid rgba(0, 255, 252, 1);
                  border-radius: 50%;
                }
                .iconBox {
                  width: 30px;
                  height: 22px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
                .iconBoxE {
                  width: 20px;
                  height: 26px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
            }
            .textBox {
              margin-top: 15px;
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(0, 255, 252, 1);
              text-align: center;
            }
          }
        }
      }
      .logBox {
        background-image: url("../assets/riverImg/log.png");
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        width: 571px;
        height: 521px;
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
          .noData {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 32px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(138, 255, 254, 1);
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

<style>
#file input.el-input__inner {
  background-color: rgba(0, 0, 0, 0);
  background-image: url("../assets/fileImg/input.png");
  background-size: cover;
  width: 120px;
  background-repeat: no-repeat;
  border: none;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(138, 255, 254, 1);
}
</style>