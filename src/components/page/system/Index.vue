<template>
  <el-container>
    <el-aside width="200px">
      <el-card class="box-card">
        <div slot="header">
          <span>区域列表</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </el-aside>
    <el-container>
      <el-main>
        <!-- 顶部操作按钮 -->
        <div>
          <el-button type="success" @click="openNewBuild">新建</el-button>
          <el-button type="info" @click="openDelet">删除</el-button>
        </div>
        <!-- 表格部分 -->
        <el-table ref="multipleTable"  :data="tableData3"  style="width: 100%"  @selection-change="handleSelectionChange" border size="mini">
          <el-table-column type="selection" ></el-table-column>
          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="address" label="地址" ></el-table-column>
        </el-table>
        <!-- 底部分页 -->
        <div class="block">
           <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]"  :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400"  :pager-count="11" next-text="下一页" prev-text="上一页"></el-pagination>
        </div>
        <!-- 新建弹窗 -->
        <dialog-bar v-model="newBuild" type2="save" title="门店信息管理" @save="SaveBuild()" selfWidth="500px">
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
            <el-form-item label="门店名称：">
              <el-input v-model="ruleForm.storeName"></el-input>
            </el-form-item>
            <el-form-item label="门店地址：">
              <el-input v-model="ruleForm.storeAdress"></el-input>
            </el-form-item>
            <el-form-item label="交通路线：">
              <el-input v-model="ruleForm.CarRoute"></el-input>
            </el-form-item>
            <el-form-item label="营业时间：">
              <el-col :span="9">
                <el-form-item>
                  <el-time-select style="width: 100%;" placeholder="起始时间" v-model="ruleForm.date1" :picker-options="{start: '08:30', step: '00:30',end: '18:30'}">
                  </el-time-select>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="6">到：</el-col>
              <el-col :span="9">
                <el-form-item>
                  <el-time-select style="width: 100%;" placeholder="结束时间" v-model="ruleForm.date2" :picker-options="{ start: '08:30',step: '00:30',end: '18:30',minTime: ruleForm.date1 }"></el-time-select>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="负责人：">
              <el-col :span="9">
                <el-form-item>
                  <el-input v-model="ruleForm.leaderPerson"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="6">联系电话：</el-col>
              <el-col :span="9">
                <el-form-item>
                  <el-input v-model="ruleForm.linkPhone"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="门店坐标：">
              <el-col :span="9">
                <el-form-item>
                  <el-input v-model="ruleForm.storeLocation"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form>
        </dialog-bar>
        <!-- 删除弹窗 -->
        <dialog-bar v-model="DeleteNewBuild" type2="sure" type1="cancel"  selfWidth="400px" title="提示"  @confirm="sureDelete()">
            <p>确定要删除吗？</p>
        </dialog-bar>
        <dialog-bar v-model="NullTips" type2="sure"   selfWidth="400px" title="提示">
            <p>请选择要删除的门店</p>
        </dialog-bar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import dialogBar from '../../common/dialog.vue'
  export default {
    name: 'comManage',
    components: {
      'dialog-bar': dialogBar,
    },
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        newBuild: false,//控制新建弹窗显示
        DeleteNewBuild: false,//控制删除弹窗显示
        NullTips:false,//未选择删除项提示
       currentPage: 1,//分页的当前页码
        ruleForm: {},   // 新建门店弹窗提交数据
        multipleSelection: [],//当选择项checkbox发生变化时会触发该事件
      }
    },
    methods: {
          openNewBuild() {//打开新建弹窗
                  this.newBuild = true;
                },
           SaveBuild() {
                  console.log("提交新建的内容");
                  console.log(this.ruleForm);
                  this.$api.get('topics', this.ruleForm, r => {
                    console.log(r)
                       })
                 },
           openDelet() {//删除弹窗
                   console.log(this.multipleSelection);
                   if(this.multipleSelection.length==0){
                     this.NullTips=true;
                   }else{
                        this.DeleteNewBuild=true;
                   }
                },      
            sureDelete(){//确定删除
                 console.log("删除新建的内容");
            },
            handleCurrentChange(val) {// 分页
                console.log(`当前页: ${val}`);
            },
              handleSelectionChange(val) {//当选择项checkbox发生变化时会触发该事件
                  this.multipleSelection = val;
            },
    },
    created() {

     }
  }
</script>
<style>
  .el-input__inner {
    height: 32px;
  }

  .line {
    text-align: right;
  }
.el-pagination{
  float:right;
}
  .el-form .el-form-item {
    margin-bottom: 5px;
  }

  .el-aside {
    width: 200px;
    color: #333;
    text-align: center;
  }

  .el-picker-panel.time-select.el-popper {
    z-index: 9999 !important;
  }

  .el-main {
    color: #333;
    padding: 0px 20px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
</style>