import {sendCode,userTem,userLogin,login,logout} from '@/api';
import { setToken,getToken } from '@/utils/user';
const actions = {
   async getCode({commit},phone){
     let sql =  await sendCode(phone);
     if(sql.code == 200){
        commit('GETCODE',sql.data);
        return 'ok'
     }else{
        return Promise.reject(new Error('flik'))
     }
   },
   //注册
  async  users({commit},data){
     let sql = await userTem(data);
     console.log(sql)
     if(sql.code == 200){
      return 'ok'
      }else{
         return Promise.reject(new Error('flik'))
      }
   },
   //登录
   async getUserLogin({commit},data){
     let sql = await userLogin(data);
     if(sql.code == 200){       
      commit('SETTOKEN',sql.data.token);
      setToken(sql.data.token);
       return 'ok'
     }else{
      return Promise.reject(new Error('flik'))
     }
   },
   //获取登录信息
    async getlogin({commit}){
      let sql =   await login();
      if(sql.code == 200){
         commit('GETLOGIN',sql.data);
          return 'ok';
        }else{
         return Promise.reject(new Error('flik'))
        }
    },
    //退出登录
   async  removLogout({commit}){
       let req =  await logout();
       if(req.code == 200){
         commit('REMO');
          return 'ok';
        }else{
         return Promise.reject(new Error('flik'))
        }

    }
};

const mutations ={
   GETCODE(state,phone){
      state.code = phone;
   },
   SETTOKEN(state,token){
      state.token = token;
   },
   GETLOGIN(state,data){
      state.UserInfo = data;
   },
   REMO(state){
      localStorage.removeItem('TOKEN');
      state.token='';
      state.UserInfo='';
   }
};

const state = {
 code:'',
 token:getToken(),
 UserInfo:''

};

const getters = {

};

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}