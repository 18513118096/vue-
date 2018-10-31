<template>
    <div class="tags" v-if="showTags">
        <img src="@/assets/noLeftTags.svg" class="leftTag" alt="" @click="leftTransilate" v-show="leftTagsArrow">
        <img src="@/assets/leftTags.svg" class="leftTag" alt="" @click="leftTransilate" v-show="!leftTagsArrow">
        <div class="tagsBox" ref="tagsBox_width">
            <ul ref="ul_width">
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.name)}" :key="index">
                <router-link :to="{name:item.name}" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index,$event)" v-show="item.title!=='公司管理'"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        </div>
        <img src="@/assets/norightTags.svg" class="rightTag" alt="" @click="rightTransilate" v-show="rightTagsArrow">
        <img src="@/assets/rightTags.svg" class="rightTag" alt="" @click="rightTransilate" v-show="!rightTagsArrow">
    </div>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                tagsList: [],
                sumLiWidth:0,
                leftTagsArrow:true,//标签页左箭头是否可点击
                rightTagsArrow:true,//标签页右箭头是否可点击
            }
        },
        methods: {
            isActive(path) {
                return path === this.$route.name;
            },
            // 关闭单个标签
            closeTags(index,event) {
                const clostBeforeLeft=Number(this.$refs.ul_width.style.left.substring(0,this.$refs.ul_width.style.left.length-2));//点击关闭之前的left值
                const closeTagsWidth=event.target.parentNode.parentNode.clientWidth;//关闭当前标签的宽度
                if(clostBeforeLeft<0){//如果定位小于0，则每关闭一个，像右移动关闭的距离
                    this.$refs.ul_width.style.left=(clostBeforeLeft+closeTagsWidth)+"px";
                }else if(clostBeforeLeft==1){
                    this.$refs.ul_width.style.left=0+"px"
                }
                 const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/');
                }
            },
            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {//判断顶部标签是否已经包含当前点击此项
                    return item.name === route.name;
                })
                if( !isExist){//没有重复的，则追加，追加的时候判断标签有没有超出屏幕的宽度，如果超出自动隐藏
                    this.tagsList.push({//没有则追加
                        title: route.meta.title,
                        path: route.fullPath,
                        name: route.matched[1].components.default.name,
                     })
                         bus.$emit('tags', this.tagsList);
                    this.$nextTick(function(){
                        if(this.$refs.ul_width.clientWidth>=this.$refs.tagsBox_width.clientWidth){//超出则追加到最后，然后左移最后追加元素的宽度
                               const domLeft=(this.$refs.ul_width.style.left).substring(0,this.$refs.ul_width.style.left.length-2);
                               const  appendRoute=-this.$refs.ul_width.children[this.$refs.ul_width.children.length-1].clientWidth;
                               const appendedLeft=Number(domLeft)+Number(appendRoute);         
                               this.$refs.ul_width.style.left=appendedLeft+"px";
                        }
                        if(this.$refs.ul_width.style.left.substring(0,this.$refs.ul_width.style.left.length-2)<0){
                            this.rightTagsArrow=false;
                        }
                    })
                }else{//有重复的，并且当重复的这个元素距离左侧的距离小于.tagsBox距离左侧的距离，说明已经隐藏，则将这个被隐藏的点击元素定位到首位
                        // 后期处理
                        }
            },
        //    右点击，标签右移动
            rightTransilate(){
                if(this.$refs.ul_width.style.left.substring(0,this.$refs.ul_width.style.left.length-2)<0){//如果定位<0，说明左侧有隐藏的，可以右移动
                    this.$refs.ul_width.style.left=(Number(this.$refs.ul_width.style.left.substring(0,this.$refs.ul_width.style.left.length-2))+80)+"px";//移动距离自定义80，可修改
                    if(Math.abs(Number(this.$refs.ul_width.style.left.substring(0,this.$refs.ul_width.style.left.length-2)))<this.$refs.ul_width.children[0].clientWidth){//如果定位<0，并且绝对值小于第一个元素的宽度时，则定位到0，不然最后一次右移之后，左侧有一定的空白
                            this.$refs.ul_width.style.left=0+"px";
                    }
                    this.leftTagsArrow=false;
                }else{
                    this.rightTagsArrow=true;
                    // this.leftTagsArrow=false;
                }
            },
            // 点击左移,当li的总长度大于固定盒子的宽度，并且超出部分的值小于当前已经存在的left值，则可以左移动
            leftTransilate(){
                const tagsBoxWidth=this.$refs.tagsBox_width.clientWidth;//固定容器的宽度
                for(var i=0;i<this.$refs.ul_width.children.length;i++){
                    this.sumLiWidth=this.sumLiWidth+this.$refs.ul_width.children[i].clientWidth+16;
                }
                const currentLeft=(this.$refs.ul_width.style.left).substring(0,this.$refs.ul_width.style.left.length-2);
                  const  minus=tagsBoxWidth-this.sumLiWidth;//超出的差值
                if((this.sumLiWidth>tagsBoxWidth)&&(currentLeft>minus)){
                         this.$refs.ul_width.style.left=(Number(this.$refs.ul_width.style.left.substring(0,this.$refs.ul_width.style.left.length-2))-80)+"px";//移动距离自定义80，可修改
                          this.rightTagsArrow=false;
                         this.sumLiWidth=this.$refs.ul_width.style.left;
                        this.sumLiWidth=0;
                }else if((currentLeft<=minus)){
                    this.leftTagsArrow=true;
                    // this.rightTagsArrow=false;
                    this.sumLiWidth=0;
                    return false;
                }
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{//监听路由变化
            $route(newValue, oldValue){
                this.setTags(newValue);
                   bus.$emit('routeName', this.$route.matched[0].name);
            }
        },
        created(){//在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
            this.setTags(this.$route);
                bus.$emit('routeName', this.$route.matched[0].name);
        },
        // mounted(){
        //          this.sumLiWidth=this.sumLiWidth+$(".tagsBox ul").width();
        // }
    }

</script>

<style>
    .tags { 
        position: fixed;
        padding: 12px 19px;
        width: 100%;
        top: 60px;
        z-index: 99;
        background-color: #F4F4F4;
            border-bottom: 1px solid #dddddd;
    }
    .tags img{
        width: 20px;
        height: 22px;
        position: fixed;
        top: 79px;
    }
    
    .tags img.rightTag{
          right: 20px;
    }
    .tagsBox{
        margin-left: 40px;
       margin-right: 40px;
       height: 32px;
         overflow: hidden;
         position: relative;
             top: 1px;
    }
    .tags ul {
        height: 32px;
        position: absolute;
        left: 0px;
    }
    .tags-li {
        float: left;
        margin-right: 16px;
        border-radius: 3px;
        font-size: 14px;
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        background: #666;
        padding: 0 8px;
        vertical-align: middle;
        color: #ffffff;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }
    .tags-li-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 4px;
        color: #ffffff;
    }
    li.tags-li.active {
    background: #0b74b9;
}
</style>
