<template>
      <section class="main">
       <div class="topNav">
           <div class="titleBar">查询</div>
           <div class="searchBar pl40">
                           <span class="spanStyle">用户名：</span>
                           <input type="text" class="inputStyle">
                           <div class="action_but sameLine">
                                     <span class="searching">查询</span>
                           </div>
           </div>
       </div>
        <div class="container">
         <div class="titleBar">账户列表</div>
         <div class="rightAction_but">
             <span class="blueBgc pointer addUser"><b>公司用户</b></span>
             <span class="blueBorder pointer delete"><b>删除</b></span>
         </div>
        <table>
            <tr>
                <th>
                     <label class="checkBox">
                             <input type="checkbox" @change='checkedAll()'  :checked="selectArr.length == items.length">
                    </label>
                </th>
                <th >登录账号</th>
                <th>用户名</th>
                <th>用户类型</th>
                <th>所属机构</th>
                <th>用户角色</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            <tr  v-for="(item,index) in items" :key="index">
                <td>
                     <label class="checkBox">
                             <input type="checkbox"  :checked="selectArr.indexOf(item.id)>=0"  @click='checkedOne(item.id)'>
                    </label>
                </td>
                <td>{{item.value1}}</td>
                <td>{{item.value1}}</td>
                <td>{{item.value1}}</td>
                <td>{{item.value1}}</td>
                  <td>{{item.value1}}</td>
                <td :class="{orangeColor:item.status}">{{item.value1}}</td>
                <td>
                    <el-switch
                           style="display: block"
                           :width="30"
                            v-model="item.status"
                            @change="statueChange(item.status,item.id)"
                            active-color="#0b74b9"
                            inactive-color="#999999"
                            :active-text="initActive_text">
                    </el-switch>
                </td>
            </tr>
        </table>
         <H1> 
             已选择的ID {{selectArr}}
        </H1>
         <!-- 底部分页 -->
           <pagation 
                    :totla="countTotal" 
                    v-on:limitPageSize="PageSize"
                    v-on:btnClick="listen"></pagation>
        </div>
    </section>
</template>

<script>
     import pagation from '../../common/pagation.vue'
    export default {
         name: 'accountManage',
         components:{
            pagation
        },
        data() {
            return {
                  initSwtch: true,//开关
                  initActive_text:"锁定",
                  pageSize : "" , //每页显示条数,从子组件中获取
                currentPage : 1, //当前页码
                countTotal : 0, //总记录数
                  items : [],//列表数据
                selectArr: [],//选中的Checkbox，
                all_cheched:false,//默认全选是不选中的
            }
        },
        methods:{
            statueChange:function(value,id){

                value?this.initActive_text="锁定":this.initActive_text="解锁";
                console.log("状态："+value)
                console.log("选中的id："+id)
            },
            PageSize: function (pageSize) {//初始化获取子组件中定义的每页显示条数
                        this.pageSize=pageSize;
                    },
                 listen: function (data) {//接收子组件分页中的当前页
                    this.msg = data,
                    this.currentPage=data
                },
                /**
             * 获取账户页面数据
             *       params: pageSize  每页显示的条数 currentPage  当前页码
             */
            getList () {
                this.$axios.get('/static/data/accountManager.json',
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
    }

</script>

<style scoped>
 .searchBar.pl40{
     padding-left: 40px;
     text-align: left;
 }
 .action_but.sameLine{
     display: inline;
     position: relative;
     left:45px; 
     margin-left: 0px;
}

</style>
