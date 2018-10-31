<template>
    <section class="main" :style="{height:screenHeight+'px'}" style="height:500px">
       <div class="topNav">
           <div class="titleBar">修改密码</div>
           <div class="pswordBox">
               <div class="pswordContent">
                   <div class="centerTitle">修改密码</div>
                   <div class="modifyDetail">
                       <div class="everyPart">
                           <div class="modifyName">当前密码：</div>
                            <input type="password" :class="[{errorTip:curruntPwError}]">
                            <p class="errorTipWord" v-show="curruntPwError">当前密码输入错误</p>
                            <img src="@/assets/errorTip.svg" alt=""  v-show="curruntPwError">
                       </div>
                      <div class="everyPart">
                            <div class="modifyName" >新密码：</div>
                            <input type="password"  :class="[{errorTip:UnSame}]">
                            <img src="@/assets/errorTip.svg" alt=""  v-show="UnSame">
                      </div>
                      <div class="everyPart">
                                <div class="modifyName">确认密码：</div>
                                <input type="password"  :class="[{errorTip:UnSame}]">
                                <img src="@/assets/errorTip.svg" alt=""  v-show="UnSame">
                                 <p class="errorTipWord mb36" v-show="UnSame">两次输入密码不一致</p>
                      </div>
                       <div class="savebut">
                           <span :class="[!curruntPwError&&!UnSame? 'correct':'error']">保存</span>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    </section>
</template>
<script>
    export default({
        name:"modifyPw",
        data(){
            return{
                    screenHeight:document.documentElement.clientHeight-384,//屏幕高度
                    curruntPwError:false,//当前密码输入错误
                    UnSame:false,//两次输入密码不相同
            }
        },
        mounted() {
   
             }
    })
</script>
<style scoped>
.pswordBox{
       text-align: center;
       margin-top: 84px;
}
.pswordBox .pswordContent{
    width: 420px;
    display: inline-block;
}
.pswordBox .pswordContent .centerTitle{
    text-align: center;
    font-size: 16px;
    font-weight: bold;
}
.pswordBox .pswordContent  .modifyDetail{
    border: 1px solid #DDDDDD;
    border-radius: 2px;
    margin-top: 24px;
    padding:  44px 90px 60px 90px;
    text-align: left;
    font-size: 16px;
}
.pswordBox .pswordContent  .modifyDetail .everyPart{
    position: relative;
}
.pswordBox .pswordContent  .modifyDetail input{
        width: 230px;
        height: 26px;
        border: 1px solid #dddddd;
        margin: 6px 0px 11px 0px;
        padding-left: 8px;
        border-radius: 2px;
}
.pswordBox .pswordContent  .modifyDetail  img{
      position: absolute;
    right: -29px;
    top: 33px;
    width: 18px;
    height: 18px
}
.pswordBox .pswordContent  .modifyDetail .savebut{
    text-align: center;
    margin-top: 24px;
}
.pswordBox .pswordContent  .modifyDetail .savebut span{
     font-size: 14px;
     width: 96px;
     height: 30px;
     line-height: 30px;
     border-radius: 3px;
     color: #ffffff;
}
.correct{
    background-color: #0b74b9;
}
.error{
    background-color: #cccccc;
}
.errorTip{
    border: 1px solid #ff4100!important;
}
.errorTipWord{
     font-size: 12px;
     text-align: right;
     color: #ff4100;
     margin-top: -8px;
    margin-bottom: 8px
}
</style>

