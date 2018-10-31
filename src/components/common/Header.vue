<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div @click="collapseChage" :class="['collapse-btn',collapse?'left58':'left199']">
            <img class="changeBut" src="@/assets/change.svg" alt="">
        </div>
        <div class="header-right">
              <img  class="userHearder" src="@/assets/userHearder.svg" alt="">
              <span>欢迎您：小阳</span>
              <span class="ruleLine"></span>
              <img  src="@/assets/outLoginBut.svg" class="outLoginBut" alt="">
               <span>退出</span>
        </div>
    </div>
</template>
<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'linxin',
                message: 0
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
        },
        mounted(){
            // if(document.body.clientWidth < 1500){
            //     this.collapseChage();
            // }
        }
    }
</script>
<style scoped>
    .header {
           position: fixed;
            width: 100%;
            height: 60px;
            left: 0px;
            background: #FFFFFF;
            -webkit-box-shadow: 0 0 4px 1px #DDDDDD;
            box-shadow: 0 0 4px 1px #DDDDDD;
            z-index: 99;
    }
    .header .collapse-btn{
        /* float: left; */
        padding: 0 20px;
        cursor: pointer;
        line-height: 60px;
        position: absolute;
    }
    .left199{
        left: 199px;
    }
    .left58{
        left: 58px;
    }
    .header .header-right{
        float: right;
        padding-right: 20px;
        line-height: 60px;
    }
    .header-right span{
        font-size: 16px;
        color: #333333;
    }
     .header-right span.ruleLine{
        width: 1px;
        height: 16px;
        background: rgba(187,187,187,0.70);
        display: inline-block;
        margin: -2px 18px;
    }
    .header-right .userHearder,.header-right .outLoginBut{
            height: 18px;
            width: 18px;
            margin-top: -3px;
    }
</style>
