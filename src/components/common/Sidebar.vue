<template>
    <div  :class="['sidebar',{'width200':!collapse}]">
        <div class="topLogo">
            <img  :class="{'changedLogo':collapse}" src="@/assets/logo.svg" alt="">
            <span  v-show="!collapse">分时租赁平台</span>
        </div>
        <el-menu class="sidebar-el-menu" :collapse="collapse"  >
            <template v-for="(item,indexs) in items" >
                        <el-menu-item :index="item.index" :key="indexs" :class="{'LeftBorder':active == indexs||selectedFirst== item.title,'is-active':selectedFirst== item.title,' notActive':selectedFirst!= item.title}"   @mouseover.native="overShow(indexs)" @mouseout.native="outShow">
                              <img class="leftIcon" :src="item.icon" alt=""><span class="navTitle">{{ item.title }}</span>
                             <img  class="rightArrow"    src="@/assets/leftArrow.svg" alt="" v-show="active == indexs" v-if="!collapse">
                             <img  class="rightArrow"    src="@/assets/rightArrow.svg" alt=""   v-show="active!== indexs"  v-if="!collapse">
                             <div class="box" v-show="active == indexs">
                                <div v-for="(secondSub,i) in item.secondSub" :key="i" >
                                         <router-link :to="{name:secondSub.name}"   slot="title" >{{secondSub.title}}</router-link>
                                </div>
                             </div>
                       </el-menu-item>
                </template>
        </el-menu>
    </div>
</template>
<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                 collapse: false,//是否折叠
                 selectedFirst:"",//当前选中的一级导航栏
                active: -1,
                ceshi:false,
                items: [
                    {
                        title: '系统管理',
                        index:"1",
                        icon:require("../../assets/system.svg"),
                        secondSub:[
                            {
                                title:"公司管理",
                                name:"comManage",
                            },
                              {
                                title:"公司门店管理",
                                name:"storeManager"
                            },
                             {
                                title:"公司账户管理",
                                name:"accountManage"
                            },
                                 {
                                title:"操作日志",
                                name:"commitLog"
                            },
                            {
                                title:"修改密码",
                                name:"modifyPw"
                            },
                             {
                                title:"用户协议",
                                name:"userProtocol"
                            }
                        ]
                    },
                    {
                        title: '车辆管理',
                        index:"2",
                        icon:require("../../assets/system.svg"),
                        secondSub:[
                            {
                                title:"车辆录入",
                                name: 'carsEntering',
                            }
                        ]
                    },
                     {
                        title: '发布管理',
                        index:"3",
                        icon:require("../../assets/system.svg"),
                        secondSub:[
                        
                        ]
                    },
                     {
                        title: '客户管理',
                        index:"4",
                        icon:require("../../assets/system.svg"),
                        secondSub:[
                         
                        ]
                    },
                     {
                        title: '订单管理',
                        index:"5",
                        icon:require("../../assets/system.svg"),
                        secondSub:[
                          
                        ]
                    },
                     {
                        title: '数据统计',
                        index:"6",
                        icon:require("../../assets/system.svg"),
                        secondSub:[
                         
                        ]
                    },
                     {
                        title: '财务管理',
                        index:"7",
                        icon:require("../../assets/system.svg"),
                        secondSub:[
                          
                        ]
                    },
                     {
                        title: '营销管理',
                        index:"8",
                        icon:require("../../assets/system.svg"),
                        secondSub:[
                           
                        ]
                    }
                ]
}
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },

        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
           bus.$on("routeName",routeName=>{
               this.selectedFirst=routeName;
           })
        },
        methods:{
            overShow(indexs){
                this.active = indexs;
            },
            outShow(){
                this.active=-1;
            }
        }
    }
</script>

<style scoped>
    .sidebar{
            /* width: 200px; */
            position: fixed;
            left: 0;
            top: 0px;
            bottom: 0;
            background: #373E58;
            z-index: 999;
    }
     .width200{
        width: 200px;
    }
     .sidebar .topLogo{
            height: 60px;
            line-height: 60px;
             padding-left: 23px;
            background: #373E58;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
             margin-bottom: 2px;
     }
    .sidebar .topLogo img{
        display:inline-block;
        width: 36px;
        height: 28px;
        margin-right: 1px;
        position: relative;
        top: -2px;
    }
    .changedLogo{
        left: -13px;;
    }
     .sidebar .topLogo  span{
      font-size: 18px;
    color: #FFFFFF;
    font-weight: bold;
    width: 110px;
    text-align: center;
    display: inline-block;
     }
    ul.sidebar-el-menu.el-menu{
         background: #373E58!important;
         /* width: 200px; */
         border-right: none;
    }
       .el-menu li.el-menu-item{
        position: relative;
        background: #373E58!important;
        height: 44px;
        line-height: 44px;
        /* width: 200px; */
        border-bottom: 0.5px solid rgba(255, 255, 255,0.2);
        padding: 0px 24px!important;
    }
    .el-menu.el-menu--collapse li.el-menu-item{
      padding-left: 20px!important;
    }
       .el-menu li.el-menu-item:hover{
           background: #1B2131!important;
       }
       .LeftBorder::before{
          content: "";
           height: 100%;
           width: 2px;
           position: absolute;
           left: 0px;
           top: 0px;
           background-color: #0B74B9;
       }
      .el-menu li.el-menu-item img.leftIcon{
          display: inline-block;
          width: 18px;
          height: 18px;
          margin-right: 16px;
      }
      .el-menu li.el-menu-item .navTitle{
            font-size: 16px;
             color: #FFFFFF;
             height: 20px;
            line-height: 20px;
            display: inline-block;
      }
      .el-menu li.el-menu-item  .rightArrow{
                position: absolute;
                width: 8px;
                height: 14px;
                right: 23px;
                top: 15px;
      }
 .box{
        background: #1B2131;
         position: absolute;
         left: 200px;
         width: 160px;
         top: 0px;
         z-index: 9999;
      }
       .box a{
        width: 100%;
        display: inline-block;
      }
      .el-menu--collapse .box{
          left: 58px;
      }
      .el-menu li.el-menu-item.is-active{
          background-color:#1B2131!important;
      }
      .el-menu li.el-menu-item.is-active.notActive{
          background-color: #373E58!important;
      }
      .box div{
        padding-left: 24px;
        border-bottom: 0.5px solid rgba(255, 255, 255,0.1);
        height: 43.5px;
        line-height: 43.5px;
        font-size: 14px;
      }
       .box div:hover{
           background-color: #0B74B9;
       }
</style>
