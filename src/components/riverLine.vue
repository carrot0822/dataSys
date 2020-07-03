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
      type: Array,
      //required: true, // 必须吗
      default: function() {
        return ["20", "10", "10", "5", "16", "26", "-5"];
      }
    },
    xAxis: {
      type: Array,
      default: function() {
        return [
          "文书档案",
          "行政档案",
          "人事档案",
          "图文档案",
          "刑事档案",
          "刑事档案",
          "经济档案"
        ];
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
    setOptions(expectedData = {}) {
      let xData = this.xAxis;
      this.chart.setOption({
        color:['#F6FF00','#00DEFF','#00FFAE'], 
        legend: {
          data: ["温度", "湿度", "TVOC"],
          textStyle:{
              color:['#F6FF00','#00DEFF','#00FFAE']
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
            data: xData,
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
            boundaryGap: ["20%", "20%"],

           
          }
        ],
        series: [
          {
            name: "温度",
            type: "line",
            
            smooth: false,
            data: [11, 11, 15, 13, 12, 13, 10]
          },
          
          {
            name: "湿度",
            type: "line",
            smooth: false,
            data: [1, -2, 2, 5, 3, 2, 0]
          },
          {
            data: expectedData,
            name: "TVOC",
            type: "line",
            smooth: false,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>