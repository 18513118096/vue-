<template>
    <section class="main">
       <div class="topNav">
           <div class="titleBar">查询</div>
           <div class="searchBar" v-show="!screenChange">
                   <div class="list_line firstRight">
                       <div class="list_child">
                           <span>登录账号：</span>
                           <input type="text">
                       </div>
                       <div class="list_child">
                           <span>操作模块：</span>
                           <el-select v-model="selectvalue">
                                <el-option
                                        v-for="item in selectoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" style="height:28px">
                                </el-option>
                            </el-select>
                       </div>
                   </div>
                   <div class="list_line secondRight">
                         <div class="list_child">
                           <span>用户角色：</span>
                           <input type="text">
                       </div>
                       <div class="list_child">
                           <span>操作行为：</span>
                           <el-select v-model="selectvalue2">
                                <el-option
                                        v-for="item in selectoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" style="height:28px">
                                </el-option>
                            </el-select>
                       </div>
                   </div>
                   <div class="list_line">
                         <div class="list_child">
                           <span>IP地址：</span>
                           <input type="text">
                       </div>
                       <div class="list_line">
                           <div class="list_child">
                                 <span>操作时间：</span>
                                <input type="text" class="startTime">
                                <b>至</b>
                                <input type="text" class="endTime">
                           </div>
                       </div>
                   </div>
                    <div class="action_but">
                  <span class="resetting mr58">重置</span>
                  <span class="searching">查询</span>
            </div>
           </div>
           <div class="searchBar" v-show="screenChange">
                   <div class="list_line firstRight">
                       <div class="list_child">
                           <span>登录账号：</span>
                           <input type="text">
                       </div>
                       <div class="list_child">
                           <span>操作模块：</span>
                           <el-select v-model="selectvalue">
                                <el-option
                                        v-for="item in selectoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" style="height:28px">
                                </el-option>
                            </el-select>
                       </div>
                         <div class="list_child">
                           <span>操作行为：</span>
                           <el-select v-model="selectvalue2">
                                <el-option
                                        v-for="item in selectoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value" style="height:28px">
                                </el-option>
                            </el-select>
                       </div>
                   </div>
                   <div class="list_line secondRight">
                         <div class="list_child">
                           <span>用户角色：</span>
                           <input type="text">
                       </div>
                        <div class="list_line">
                            <div  class="list_child">
                                     <span>操作时间：</span>
                                    <input type="text" class="startTime">
                                    <b>至</b>
                                    <input type="text" class="endTime">
                            </div>
                       </div>
                   </div>
                   <div class="list_line thirdRight">
                         <div class="list_child">
                           <span>IP地址：</span>
                           <input type="text">
                       </div>
                   </div>
                    <div class="action_but">
                  <span class="resetting mr58">重置</span>
                  <span class="searching">查询</span>
            </div>
           </div>
       </div>
        <div class="container">
         <div class="titleBar">日志记录</div>
         <div class="rightAction_but">
             <span class="blueBgc outExcel pointer"><b>导出</b></span>
         </div>
        <table>
            <tr>
                <th>
                    <label class="checkBox">
                            <input type="checkbox" @change='checkedAll()'  :checked="selectArr.length == items.length">
                    </label>
                </th>
                <th>登录账号</th>
                <th>IP地址</th>
                <th>操作时间</th>
                <th>用户角色</th>
                <th>所属公司</th>
                <th>操作模块</th>
                <th>操作行为</th>
                <th>操作</th>
            </tr>
                  <tr v-for="(item,index) in items" :key="index">
                 <td>
                       <label class="checkBox">
                             <input type="checkbox"  :checked="selectArr.indexOf(item.id)>=0"  @click='checkedOne(item.id)'>
                         </label>     
                  </td>
                <td>{{item.value1}}</td>
                <td>{{item.value2}}</td>
                <td>2018-09-04 17:41:00</td>
                <td>{{item.value3}}</td>
                <td>{{item.value4}}</td>
                <td>{{item.value5}}</td>
                <td>{{item.value6}}</td>
                <td class="tableDetail">详情</td>
            </tr>
        </table>
        <H1> 
             已选择的ID {{selectArr}}
        </H1>
        <!-- <H1>当前页{{msg}}</H1>
        <H1>限制页{{pageSize}}</H1> -->
         <!-- 底部分页 -->
           <pagation
                    :totla="countTotal" 
                    v-on:limitPageSize="PageSize"
                    v-on:btnClick="listen">
            </pagation>
        </div>
    </section>
</template>

<script>
      import pagation from '../../common/pagation.vue'
    export default {
        name: 'commitLog',
        components:{
            pagation
        },
         data () {
            return {
                pageSize : "" , //每页显示条数,从子组件中获取
                currentPage : 1, //当前页码
                countTotal : 0, //总记录数
                items : [],//列表数据
                msg:1,
                 selectoptions: [{//下拉框数据
                      value: '5',
                      label: '5'
                    }, {
                      value: '10',
                      label: '10'
                    }, {
                      value: '15',
                      label: '15'
                    }, {
                      value: '20',
                      label: '20'
                    }],
                    selectvalue:"",//下拉选中的值1
                    selectvalue2:"",//下拉选中的值
                    screenChange:false,//屏幕是否大于1400，大于为false
                     selectArr: [],//选中的Checkbox，
                     all_cheched:false,//默认全选是不选中的
            }
        },
        methods : {
                PageSize: function (pageSize) {//初始化获取子组件中定义的每页显示条数
                        this.pageSize=pageSize;
                    },
                 listen: function (data) {//接收子组件分页中的当前页
                    this.msg = data,
                    this.currentPage=data
                },
            /**
             * 获取日志页面数据
             * params: pageSize  每页显示的条数 currentPage  当前页码
             */
            getList () {
                this.$axios.get('/static/data/page.json',
                            {
                                params:{
                                pageSize:this.pageSize,
                                currentPage:this.currentPage
                                }
                                })
                            .then(res=>{
                                 this.items=res.data.data;//l表格中的数据
                                //  this.countTotal=res.data.data.length;//数据总条数
                                    this.countTotal=100;//数据总条数
                                  })
                             .catch(error=>console.log(error));
                         },

            //从page组件传递过来的当前page
            pageChange (page) {
                this.currentPage = page
                this.getList()
            },
            // checkbox选择功能
            checkedOne (currentId) {
                let idIndex = this.selectArr.indexOf(currentId)
                if (idIndex >= 0) {
                       this.selectArr.splice(idIndex, 1)
                } else {
                     this.selectArr.push(currentId);

                }
            },
            checkedAll () {
            this.all_cheched = !this.all_cheched
                if (this.all_cheched) {// 全选时
                        this.selectArr = []
                        this.items.forEach(function (element) {
                        this.selectArr.push(element.id)
                    }, this)
                } else {
                    this.selectArr = []
                }
            },

        },
        watch:{
            currentPage(newValue, oldValue){//监听当前页码变化
                  this.getList();
            },
              pageSize(newValue, oldValue){//当前限制每页显示几条变化
                  this.getList();
                  this.doPage=""
            }
        },
        created(){
               if(document.body.clientWidth <=1440){//判断屏幕<=1400，日志查询布局变化
                this.screenChange=true;
            }
        },
        mounted() {
            //请求第一页数据
            this.getList();
         
        }
    }

</script>

<style scoped>
.topNav  .searchBar .list_line{
    display: inline-block;
    /* height: 96px; */
    text-align: left;
}
.topNav  .searchBar .list_line .list_child{
  margin-bottom: 20px;
}
.topNav  .searchBar .list_line .list_child span{
    width: 80px;
    text-align: right;
    margin-right: 2px;
}
.topNav  .searchBar .list_line input{
    width: 210px;
    border: 1px solid #dddddd;
    height: 26px;
    line-height: 26px;
    padding-left: 8px;
    border-radius: 2px;
}
.topNav  .searchBar .list_line b{
    margin:0px 5px;
    color: #333333;
    font-size: 16px;
    font-weight: normal;
}
.topNav  .searchBar .list_line input.startTime,.topNav  .searchBar .list_line input.endTime{
    width: 176px;
    border-radius: 2px;
}
@media (min-width: 1280px){/*>=1280的设备*/
      .list_line.secondRight{
          position: relative;
          top:-48px;
      }
      .list_line.thirdRight{
          position: relative;
          top:-96px;
      }
} 
@media (min-width: 1280px) {/*>=1366的设备*/
.main{
        padding: 20px 12px 196px 12px;
}
  .list_line.firstRight{
                margin-right: 28px;
            }
               .list_line.thirdRight{
                margin-left: -184px;
            }
            .topNav .action_but{
                margin-top: 8px;
            }
} 
@media (min-width: 1440px) {/*>=1440的设备*/
            .list_line.firstRight{
                margin-right: 72px;
            }
            .list_line.thirdRight{
                margin-left: -140px;
            }
} 
@media (min-width: 1600px) {/*>=1680的设备*/
    .firstRight,.secondRight{
            margin-right: 60px;
        }
         .topNav .action_but{
                margin-top: 16px;
            }
} 
@media (min-width: 1920px) {/*>=1920的设备*/
    .firstRight,.secondRight{
        margin-right: 120px;
    }
    .list_line.secondRight{
        top: 0px;
    }
    .main{
        padding: 20px 20px 196px 20px;
    }
} 
  
</style>
