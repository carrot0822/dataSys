<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons");
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      //required: true, // 必须吗
      default: function() {
        return {
          tempData: ['9','12','8','15','10','-5','-18'], // 温度
          humidityData: ['11','-12','14','15','16','15','20'], // 湿度
          TvocData: ['11','12','14','15','16','17','18'], // Tvoc
          lineTime: ['1','2','3','4','5'] // X轴
        };
      }
    }
  },
  data() {
    return {
      chart: null //
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose(); // 销毁实例
    this.chart = null;
  },
  methods: {
    // 两条折线 多折线图
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      console.log(this.$el, "这个父节点肯定是这个父组件");
      this.setOptions(this.chartData); // 传入数据
    },
    /**
     * 双折线图
     */
    setOptions(val) {
      
      this.chart.setOption({
        color: ["#F6FF00", "#00DEFF", "#00FFAE"],
        legend: {
          data: ["温度", "湿度", "TVOC"],
          textStyle: {
            color: ["#F6FF00", "#00DEFF", "#00FFAE"]
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "6%",
          containLabel: true
        },

        xAxis: [
          {
            type: "category",
            data: val.lineTime,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            boundaryGap: ["20%", "20%"]
          }
        ],
        series: [
          {
            name: "温度",
            type: "line",

            smooth: false,
            data: val.tempData
          },

          {
            name: "湿度",
            type: "line",
            smooth: false,
            data: val.humidityData
          },
          {
            
            name: "TVOC",
            type: "line",
            smooth: false,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
            data: val.TvocData,
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>