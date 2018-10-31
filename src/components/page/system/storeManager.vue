<template>
     <section>
         <el-container>
                <el-aside class="left_aside">
                    <div class="titleBar">区域列表</div>
                    <div class="tips">提示：删除下属区域后才可以删除当前区域</div>
                    <ul id="treeDemo" class="ztree"></ul>
                </el-aside>
                <el-main class="right_aside">
                     <div class="container">
                          <div class="titleBar">门店列表</div>
                         <div class="left_ComName">{{currentStoreName}}</div>
                        <div class="rightAction_but storeRight_but">
                            <span class="blueBgc pointer newBuild"><b>新建</b></span>
                            <span class="blueBorder pointer delete"><b>删除</b></span>
                        </div>
                        <table>
                            <tr>
                                <th>
                                    <label class="checkBox">
                                            <input type="checkbox" @change='checkedAll()'  :checked="selectArr.length == items.length">
                                    </label>
                                </th>
                                <th >门店名称</th>
                                <th>负责人</th>
                                <th>联系电话</th>
                                <th>营业时间</th>
                                <th>打烊时间</th>
                                <th>门店地址</th>
                                <th>操作</th>
                            </tr>
                            <tr  v-for="(item,index) in items" :key="index">
                                <td>
                                    <label class="checkBox">
                                            <input type="checkbox"  :checked="selectArr.indexOf(item.id)>=0"  @click='checkedOne(item.id)'>
                                    </label>
                                </td>
                                <td>{{item.value1}}</td>
                                <td>{{item.value2}}</td>
                                <td>{{item.value3}}</td>
                                <td>{{item.value4}}</td>
                                <td>{{item.value5}}</td>
                                <td>{{item.value6}}</td>
                                <td class="editDetail">编辑</td>
                            </tr>
                        </table>
                        <H1> 
                            已选择的ID {{selectArr}}
                        </H1>
                        <!-- 底部分页 -->
                        <pagation  :totla="countTotal" v-on:limitPageSize="PageSize" v-on:btnClick="listen"></pagation>
                     </div>
                 </el-main>
        </el-container>
    </section>
</template>
<script>
    import  $ from 'jquery'
    import '../../../plugins/jquery.ztree.core.js'
    import '../../../plugins/jquery.ztree.exedit.js'
    import pagation from '../../common/pagation.vue'
    export default {
         name: 'storeManager',
         components:{
            pagation
        },
         data() {
            return {
                pageSize : "" , //每页显示条数,从子组件中获取
                currentPage : 1, //当前页码
                countTotal : 0, //总记录数
               items : [],//列表数据
                selectArr: [],//选中的Checkbox，
                all_cheched:false,//默认全选是不选中的
                currentStoreName:"",//当前数据门店列表的名称
                setting:{//zTree配置
                       view: {
                            // showIcon :false,
                            addHoverDom: this.addHoverDom,
                            removeHoverDom: this.removeHoverDom,
                            selectedMulti: true,
                    },
                     data:{
                         simpleData:{
                             enable:true
                         }
                     },
                     check:{
                         enable:true
                     },
                     edit: {
                          enable: true
                    },
                     callback: {
                            onClick: this.zTreeOnClick,
                            onRename: this.zTreeOnRename,
                            onRemove: this.zTreeOnRemove,
                            beforeRemove:this.beforeRemove
                }
                },
                zNode:[ ]//ztree数据
            }
        },
        methods:{
                PageSize: function (pageSize) {//初始化获取子组件中定义的每页显示条数
                        this.pageSize=pageSize;
                    },
                 listen: function (data) {//接收子组件分页中的当前页
                    this.msg = data,
                    this.currentPage=data
                },
                /**
             * 获取门店管理页面数据
             *       params: pageSize  每页显示的条数 currentPage  当前页码
             */
            getList () {
                this.$axios.get('/static/data/storeManager.json',
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
            addHoverDom(treeId, treeNode){
                     const sObj = $("#" + treeNode.tId + "_span");
                    if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
                    var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
                        + "' title='增加' onfocus='this.blur();' di></span>";
                    sObj.after(addStr);
                    var btn = $("#addBtn_"+treeNode.tId);
                    if (btn) btn.bind("click", function(){
                        console.log(treeNode.id+treeNode.name);//将父级的id和新增加的名字传给后台，同时返回当前后台的id,方便修改名称
                        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                        zTree.addNodes(treeNode, {pId:treeNode.id, name:"新增门店"});
                        return false;
                    });
            },
              // 树节点点击事件
            zTreeOnClick(event, treeId, treeNode) {
                 this.currentStoreName=treeNode.name;
            },
              // 树节点编辑名称回调
           zTreeOnRename(event, treeId, treeNode, isCancel) {
                 console.log("修改当前的Id:"+treeNode.id+"新的名称："+treeNode.name  +"新增的父级id："+treeNode.pId);
                //  当前id存在：修改接口
                //  当前id不存在：新增接口，需传入父级id
           },
           // 删除节点
           beforeRemove(treeId, treeNode) {
              if(treeNode.children&&treeNode.children.length>0){
                  alert("删除下属区域后才可以删除当前区域");
                  return false;
              }
            },
          zTreeOnRemove(event, treeId, treeNode) {
              console.log(treeNode.id);//如果底部没有子级，则将此Id传给后台删除
           },
             removeHoverDom(treeId, treeNode){
                $("#addBtn_"+treeNode.tId).unbind().remove();
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
        mounted(){
            var _this=this;
            let data;
            _this.$axios.get('/static/data/zNode.json',
                            {
                                params:{
                                  
                                }
                                })
                            .then(res=>{
                                 _this.zNode=res.data.data;
                                _this.currentStoreName=res.data.data[0].name;
                                $.fn.zTree.init($("#treeDemo"),_this.setting, _this.zNode)
                                  })
                             .catch(error=>console.log(error));
                         },
          
      
    }
</script>

<style>
.tree-box{
    height: 300px;
}
    .left_aside{
        width: 440px!important;
        height: 100%;
        background-color: #fff;
        position: fixed;
        padding: 20px 20px 155px 33px;
        text-align: left!important;
    }
    .right_aside{
         position: absolute;
        left: 474px;
        background-color: #fff;
        bottom: 0px;
        top: 136px;
        right: 20px;
        padding-top: 0px;
    }
    .left_aside .tips{
        font-size: 12px;
        color: #FF8E00;
        margin-top: -7px;
    }
    .left_aside .titleBar{
        padding-left: 0px;
    }
    .left_aside .titleBar::before{
        left:-12px;
    }
    #treeDemo{
        margin-top: 20px;
    }
    #treeDemo_1_remove{
        display: none!important;
    }
</style>

