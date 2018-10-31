<template>
    <div class="page"> 
       <div class="pagelist"> 
         <span class="total">共  {{totla}}  条</span>
        <span :class="['jump']" v-on:click="prvePage(currentPage)" v-show="currentPage>1">上一页</span> 
         <span v-for="indexs in pages"  :key="indexs"   :class="['jump',{ activePage: currentPage == indexs }]"  v-on:click="btnClick(indexs)">{{ indexs < 1   ? "..." : indexs }}</span>
       <span class="jump"  v-on:click="nextPage(currentPage)" v-show="currentPage<totalPages">下一页</span> 
       <span class="jumppoint">到第</span> 
        <span class="jumpinp"><input type="text" v-model="doPage">页</span> 
       <span class="gobtn" @click="pageDo(doPage)">确定</span> 
       <span>每页显示</span>
       <el-select v-model="limitPageSize">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :change="limitCountChange(limitPageSize)"
      >
    </el-option>
  </el-select>
       <span>条</span>
     </div> 
     </div> 
</template>
<script>
  export default {
    name : 'pagation',
    data(){
      return{
            options: [//下拉列表模拟数据
                {value: '5',label: '5'},
                 {value: '10',label: '10'}, 
                 {value: '15',label: '15'}, 
                 {value: '20',label: '20'}
                 ],
                  limitPageSize : 5, //每页显示条数
                  currentPage:1,//初始化默认当前页为1
                  doPage:"",//跳转页码输入的值
                  }
       },
    //通过props来接受从父组件传递过来的值
    props: ['totla'],
    computed : {
             totalPages: function(){//总页数=总条数/每页显示的条数
                    return Math.ceil(this.totla / this.limitPageSize) || 0
                  },
              pages:function(){
                  var lowPage = 1;//第一条
                  var highPage = this.totalPages;//最后一条
                  var pageArr = [];//存放分页中的每个页码按钮上面的数值
                  if(this.totalPages>=11){
                        if (this.currentPage > 5 && this.currentPage < this.totalPages - 4) {
                        lowPage = this.currentPage - 5
                        highPage = this.currentPage + 4
                        }else{
                            if(this.currentPage <= 5){
                                  lowPage = 1
                                  highPage = 10
                            }else{
                                  highPage = this.totalPages
                                  lowPage = this.totalPages - 9
                            }
                        }
                  }
                   while (lowPage <=highPage) {
                         pageArr.push(lowPage)
                         lowPage++
                }
                   if (pageArr[0] > 1) {
                    pageArr[0] = 1;
                    pageArr[1] = -1;
                }
                if (pageArr[pageArr.length - 1] < this.totalPages) {
                    pageArr[pageArr.length - 1] = this.totalPages;
                    pageArr[pageArr.length - 2] = 0;
                }
                return pageArr
              

              }    
    },
      methods : {
          btnClick: function (data) {
                if (data < 1) return;
                if (data != this.currentPage) {
                    this.currentPage = data
                   this.$emit('btnClick', data);
                   this.doPage=""
                }
            },
                nextPage: function (data) {
                if (this.currentPage >= this.totalPages) return;
                this.btnClick(this.currentPage + 1);
                this.doPage=""
            },
              prvePage: function (data) {
                if (this.currentPage <= 1) return;
                this.btnClick(this.currentPage - 1);
                this.doPage=""
            },
            pageDo:function(data){2
              data=Number(data);
                if(data<1||data>this.totalPages) return;
                  this.btnClick(data);
                  this.doPage=this.currentPage
            },
            limitCountChange:function(data){
               this.$emit('limitPageSize', data);
            }
    },
    watch:{
      totalPages(newValue, oldValue){
            this.doPage=""
      }
    },
    created(){
        this.$emit('limitPageSize', this.limitPageSize)
    },
}
</script>
<style>
.page { 
  color: #666666; 
  margin-top: 16px;
  float:right;
} 
.pagelist { 
  height: 26px; 
  line-height: 26px; 
  font-size: 12px;
} 
.pagelist .total{
  margin-right: 6px;
}
.pagelist .jump { 
  border: 1px solid #dddddd; 
  -webkit-border-radius: 2px; 
  -moz-border-radius: 2px; 
  border-radius: 2px; 
  cursor: pointer; 
  padding: 0px 10px;
  margin-right: 4px;
} 
 .jumppoint { 
      margin-left: 14px;
    margin-right: 4px;
} 
.jumpinp input { 
  border-radius: 2px;
  text-align: center; 
    color: #666666; 
  width: 28px;
  height: 26px;
  line-height: 26px;
  border: 1px solid #dddddd; 
  margin-right: 8px;
  position: relative;
    top: -2px;
    font-size: 12px;
} 
.pagelist .gobtn {
  background: #0B74B9;
  border-radius: 3px;
  height: 28px;
  text-align: center;
  color: #fff;
  width: 48px;
  margin-left: 4px;
  margin-right: 14px;
} 
.pagelist .gobtn:hover{
  cursor: pointer;
}
 .page .el-input__inner{
 border: 1px solid #DDDDDD;
border-radius: 2px;
width: 50px;
height: 26px;
margin-left: 4px;
margin-right: 4px;
font-size: 12px;
 }
 .el-icon-arrow-up:before {
    content: url("../../assets/selectDown.svg");
    position: relative;
    top: 4px;
    left: 6px;
}
  .el-icon-arrow-up.is-reverse:before {
    top: -8px;
      left: -4px;
}
.el-input__suffix{
  right: 8px;
}
.el-select-dropdown__item{
  font-size: 12px;
  height: 28px;
  line-height: 28px;
}
.el-select-dropdown__list{
  padding: 0px;
}
.el-select .el-input.is-focus .el-input__inner,.el-select .el-input__inner:focus{
  border: 1px solid #dddddd;
}
.el-input__icon{
    width: 10px;
}
.el-input--suffix .el-input__inner{
    padding-left: 8px!important;
    padding-right: 5px;
    border-radius: 2px;
}
.paging-item--disabled{
    cursor: not-allowed;
     opacity: .75;
}
.paging-item--current {
            background-color: #0275d8;
            color:#fff;
            position: relative;
            z-index: 1;
            border-color: #0275d8;
        }
        .activePage{
            color: #0B74B9;
            border: 1px solid #0B74B9!important;
        }
</style>
