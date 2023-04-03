import Vue from 'vue'
import App from './App.vue'

//引入路由
import router from '@/router'
import store from './store'

//引入饿了么UI
import {MessageBox} from 'element-ui';

//三级联动组件  ---全局组件
import TypeNav from '@/components/TypeNav';
import Pagination from '@/components/Pagination';
//注册全局组件，1.全局组件名字 2.全局组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Pagination.name,Pagination);
//统一引入api
import * as api from '@/api';

//引入饿了么UI通过原型对象引入
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入图片懒加载
import VueLazyload from 'vue-lazyload';
import imgs_1 from '@/assets/1.gif';
import imgs_2 from '@/assets/2gif.gif';

Vue.use(VueLazyload, {
  // 图片加载失败的
  error: imgs_1,
  //懒加载默认的图片
  loading: imgs_2,
})

//引入自定义插件
import ade from '@/plugins';
Vue.use(ade,{
  name:'u_app'
})

//引入表单验证
import '@/plugins/validate';


//引入swiper样式
import 'swiper/css/swiper.css';
//引入mock模拟数据
import '@/mock/mockServer'
new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate(){
   Vue.prototype.$bus = this;
   Vue.prototype.$api = api;
  },
  //注册路由
  router,
  // 注册vuex
  store
}).$mount('#app')
