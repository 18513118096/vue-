import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
        path: '/',
        redirect: '/comManage'
    }, 
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        name:"系统管理",
        children: [{
                path: 'comManage',
                component: resolve => require(['../components/page/system/Index.vue'], resolve),
                meta: { title: '公司管理' },
                name:"comManage"
            },
            {
                path: '/commitLog',
                component: resolve => require(['../components/page/system/commitLog.vue'], resolve),
                meta: { title: '操作日志' },
                name:"commitLog"
            },
            {
                path: 'accoutManager',
                component: resolve => require(['../components/page/system/accoutManager.vue'], resolve),
                meta: { title: '公司账户管理' },
                name:"accountManage"
            },
            {
                path: 'modifyPw',
                component: resolve => require(['../components/page/system/modifyPw.vue'], resolve),
                meta: { title: '修改密码' },
                name:"modifyPw"
            },
            {
                path: 'storeManager',
                component: resolve => require(['../components/page/system/storeManager.vue'], resolve),
                meta: { title: '公司门店管理' },
                name:"storeManager"
            },
        ]
    },
    {
        path: 'carMange',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        name:"车辆管理",
        children:[
            {
                path: 'carsEntering',
                component: resolve => require(['../components/page/system/VueEditor.vue'], resolve),
                meta: { title: '车辆录入' },
                name:"carsEntering"
            },
    
        ]
    }
]
})