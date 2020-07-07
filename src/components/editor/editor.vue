<template>
  <div class="editor">
    <!-- 搜索栏 内容添加-->
    <div class="headerBox">
      <div class="headerPos">
        <div class="header">
          <!--
          <div class="searchBox">
            <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          -->
          <div class="operateBox">
            <el-button type="primary" @click="addBtn" plain>添加</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容栏 -->
    <div class="content">
      <div class="tableBox">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="日期" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageBox">
          <pagation
            :allData="total"
            :pageSize="pageSize"
            :current="currentPage"
            @pageChange="pageChangeBtn"
          ></pagation>
        </div>
      </div>
    </div>
    <!-- 弹框存放 -->
    <section class="dialogBox">
      <el-dialog :title="title[i]" :visible.sync="change" width="40%" center>
        <el-form :rules="rules" ref="ruleForm" :model="form">
          <el-form-item prop="title" label="标题" :label-width="formLabelWidth">
            <el-input maxlength="20" show-word-limit v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容" :label-width="formLabelWidth">
            <el-input
              :rows="18"
              maxlength="300"
              show-word-limit
              resize="none"
              type="textarea"
              v-model="form.content"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="changeBtn">确 定</el-button>
          <el-button @click="change = false">取 消</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import pagation from "./pagation.vue";
export default {
  data() {
    return {
      search: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      // 分页数据
      total: 0,
      pageSize: 10,
      currentPage: 1,
      // 弹框
      change: false,
      i: 0,
      title: ["添加", "编辑"],
      formLabelWidth: "60px",
      form: {
        title: "",
        content: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ]
      },
      selectId:''
    };
  },
  methods: {
    changeBtn() {
      this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if(this.i){

            }else{
              this._addNotice()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    addBtn() {
      this.i = 0;
      this.form.title = "";
      this.form.content = "";
      this.change = true;
    },
    handleEdit(index, row) {
      // 查询单条数据
      this.form.title = row.title
      this.form.content = row.content
      this.i = 1;
      this.change = true;
      this.selectId = row.id
      console.log(index, row);
    },
    handleDelete(index, row) {
      
      this.$confirm("此操作将删除该内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let obj = {}
          obj.id = row.id
          console.log(row.id,'删除选')
          console.log("走删除接口");
        })
        .catch(() => {
          console.log("什么都不做");
        });

      console.log(index, row);
    },
    pageChangeBtn(val) {
      let obj = {};
      obj.currentPage = parseInt(val);
      console.log(val);
    },
    // API
    _getNotice(obj={pageSize:'10',currentPage:'1'}){
      let data = obj
      axios.get(this.url + 'archivemodule/arcTbLargeHome/getAllHomeFileInfo',{
        params:data
      }).then((res)=>{
        if(res.data.state){
          this.tableData = res.data.rows
        }else{

        }
        console.log(res)
      })
    },
    _addNotice(){
      let data = {}
          data = Object.assign({},this.form)
      //data.arcTbLargeHomeInfo =Object.assign({},this.form)
      
      axios.post(this.url + 'archivemodule/arcTbLargeHome/getAllHomeFileInfo',data).then((res)=>{
        console.log(res)
        
      })
    },
    _deleteNotice(obj){
      let data = obj
      
      axios.post(this.url + 'archivemodule/arcTbLargeHome/getAllHomeFileInfo',data).then((res)=>{
        console.log(res)
      })
    }
  },
  created(){
    
    this.url = window.testUrl;
    this._getNotice()
  },
  components: {
    pagation
  }
};
</script>

<style lang="scss" scoped>
.editor {
  .headerBox {
    padding-top: 50px;
    .headerPos {
      width: 1200px;
      margin: 0 auto;
      .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .searchBox {
          width: 90%;
        }
      }
    }
  }

  .content {
    padding-top: 30px;
    .tableBox {
      width: 1200px;
      margin: 0 auto;
      height: 900px;
      .pageBox {
        padding-top: 20px;
        display: flex;
        flex-direction: row-reverse;
      }
    }
  }
}
</style>