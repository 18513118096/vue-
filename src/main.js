// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui' // 引入ElementUI组件
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
import 'babel-polyfill' // 用于实现浏览器不支持原生功能的代码
import './style/public.css' // 公共默认样式
import axios from 'axios' // 引用axios文件
Vue.prototype.$axios = axios;
Vue.use(ElementUI) 
Vue.config.productionTip = false// 去掉开发环境打印信息
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})