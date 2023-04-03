import axios from 'axios';
//引入进度条      start:进度条开始   done:进度条结束
import nProgress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";

import store from '@/store';

//1.利用axios对象的方法create,上创建一个axios实例
//2.request就是axios，只不过稍微配置一个
const request = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径中会出现api
    baseURL: '/api',
    //代表请求超时的时间
    timeout: 5000,
})

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在发请求前做一些事情
request.interceptors.request.use((config)=>{
 
  if(store.state.detail.uuid_token){
  // config 是一个请求头
  //给请求头带一个参数(userTempId)：和后台老师沟通好的
  config.headers.userTempId = store.state.detail.uuid_token;
  }
  if(store.state.user.token){
    config.headers.token = store.state.user.token;
  }
  nProgress.start();
  //config：配置对象，配置对象里面有一个属性很重要，headers请求
  return config;
  
})

//响应拦截器
request.interceptors.response.use((res)=>{
    nProgress.done();
   //成功的回调函数，服务器响应数据回来以后，响应拦截器可以检测到
   return res.data;
},
(error)=>{
   //响应失败的回调函数
   return Promise.reject(new Error('faile'));
})

export default request;