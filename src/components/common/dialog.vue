<template>
    <div class="dialog" v-show="showMask">
        <div class="dialog-container"  :style="{ 'width': selfWidth }">
            <div class="dialog-title">{{title}}</div>
            <div class="content">
                 <slot></slot>
            </div>
            <div class="btns">
                <span v-if="type1=='cancel'" class="default-btn" @click="closeBtn">
                    {{cancelText}}
                </span>
                <span v-if="type2 == 'sure'" class="danger-btn" @click="confirmBtn">
                    {{confirmText}}
                </span>
                <span v-if="type2 == 'save'" class="confirm-btn" @click="saveBtn">
                    {{saveText}}
                </span>
            </div>
            <div class="close-btn" @click="closeMask"><i class="el-icon-close"></i></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: {},//此处获取的value对应的就是组件标签中的v-model
        type1:{//取消
            type: String,
            default: ''
        },
        selfWidth:{
             type: String,
            default: ''
        },
         type2:{// 确定， 保存 
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        saveText: {
            type: String,
            default: '保存'
        },
    },
    data(){
        return{
            showMask: false,
        }
    },
    methods:{
        closeMask(){
            this.showMask = false;
        },
        closeBtn(){
            this.$emit('cancel');
            this.closeMask();
        },
        confirmBtn(){
            this.$emit('confirm');
            this.closeMask();
        },
        saveBtn(){
            this.$emit('save');
            this.closeMask();
        }
    },
    mounted(){
        this.showMask = this.value;
    },
    watch:{
        value(newVal, oldVal){
            this.showMask = newVal;
        },
        showMask(val) {
            this.$emit('input', val);
        }
    },
}
</script>
<style scoped>
    .dialog{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;
        }
              .dialog-container{
            background: #ffffff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 8px;
            position: relative;
            }
               
            .content{
                color: #797979;
                line-height: 26px;
                padding: 0 20px;
                box-sizing: border-box;
            }
             .inp{
                margin: 10px 0 0 20px;
                width: 200px;
                height: 40px;
                padding-left: 4px;
                border-radius: 4px;
                border: none;
                background: #efefef;
                outline: none;
             }
             .dialog-title[data-v-466febce] {
    width: 100%;
    height: 51px;
    font-size: 16px;
    color: #696969;
    /* font-weight: 600; */
    padding: 16px 50px 0 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
}
            .btns{
              width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    padding: 0 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
            }
            .btns span{
              padding: 3px 15px;
          border-radius: 2px;
          font-size: 12px;
            }
            .btns span:hover{
            cursor: pointer
            }
             
                .default-btn{
                   padding: 5px 10px;
                    color: #787878;
                    display: inline-block;
                }
                    
                .danger-btn{
                    background: #EF8C8C;
                       /* padding: 5px 10px; */
                    color: #787878;
                    /* display: inline-block; */
              
                }
                .confirm-btn{
                    color: #ffffff;
                    background: #509EE3;
                  
                }
            
            .close-btn{
                position: absolute;
                top: 16px;
                right: 16px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 18px;
                cursor: pointer;}
              
            
        
    
</style>
