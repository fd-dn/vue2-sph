import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './routers';
import store from '@/store';

//重写push和replace方法:解决路由点击多次控制台报错问题
let push = VueRouter.prototype.push;
VueRouter.prototype.push = function(location,resolye,reject){
  if(resolye && reject){
   push.call(this,location,resolye,reject)
  }else{
   push.call(this,location,()=>{},()=>{})
  }
}

let reso = VueRouter.prototype.replace;
VueRouter.prototype.replace = function(location,resolye,reject){
   if(resolye && reject){
      reso.call(this,location,resolye,reject)
     }else{
      reso.call(this,location,()=>{},()=>{})
     }
}

let router =  new VueRouter({
    routes,
    //滚动行为，跳转路由的时候滚动条自动回到最顶部
    scrollBehavior(to, from, savedPosition) {
      // 始终滚动到顶部
      return { y: 0 }
    },
})
//全局守卫（前置路由）
router.beforeEach(async (to,from,next)=>{
  //to：可以获取你要跳转到那个路由信息
  //from：可以获取到你从那个路由而来的信息
  //next：路游函数 next()放行  next('')方向到指定路由   next(false)
  let token = store.state.user.token;
  let name = store.state.user.UserInfo.name;
  //用户已经登录
   if(token){
    //用户已经登录不允许跳转到登录页面
    if(to.path== '/login'){
       next('/home');
    }else{          //跳转其他页面
      //判断是否携带用户信息
       if(name){
         next();
       }else{
        //通知发送用户信息
        try {
          await  store.dispatch('user/getlogin');
          next();
        } catch (error) {
          //token失效重新获取
          await  store.dispatch('user/removLogout');
          next('/login');
          alert('token已经过期');
        }
       }
    }
   }else{
    //未登录
    let tos = to.path;
    if(tos.indexOf('/trade') != -1 || tos.indexOf('/center') != -1 || tos.indexOf('/pay') != -1 || tos.indexOf('/shopcart') != -1){
        next('/login?to='+tos);
    }else{
        next();
    }
    
   }

})


export default router