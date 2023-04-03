import {reqCarList,deleteCart,checkCart} from '@/api';
const actions={
   async getCarList({commit}){
      let req = await reqCarList();
      if(req.code === 200){
        commit('CARLIST',req.data);
        return 'ok'
      }else{
        return Promise.reject(new Error('faile'))
      }
   },
   //删除商品
  async deleteCartList({commit},skuId){
      let req = await deleteCart(skuId);
      if(req.code === 200){
         return 'ok'
       }else{
         return Promise.reject(new Error('faile'))
       }
   },
   //选中or未选中
   async ischeckCart({commit},{skuId,isChecked}){
      let req = await checkCart(skuId,isChecked);
      if(req.code === 200){
         return 'ok'
       }else{
         return Promise.reject(new Error('faile'))
       }
   },
   //删除选中的商品
   deleteCheckCart({getters,dispatch}){
      let primeAll = [];
      getters.cartInfoLists.cartInfoList.forEach(item=>{
       let prime =   item.isChecked == 1 ? dispatch('deleteCartList',item.skuId) : '';
       primeAll.push(prime);
      })
      //all方法可以检测数组是否都是成功的值，一个失败则为失败
      return Promise.all(primeAll);
   },
   //全选or全部选
   checkCartList({getters,dispatch}){
     let isCheck =  getters.cartInfoLists.cartInfoList.every(item=>item.isChecked == 1);
     let isChecked = null;
     isCheck ? isChecked = 0 : isChecked = 1;
     let primeAll = [];
     getters.cartInfoLists.cartInfoList.forEach(item =>{
      //当为0时候 所以未选中的发送请求改为选中，而不是所以的商品统一发送()
      if(!isChecked){
         if(item.isChecked){
            let prime =  dispatch('ischeckCart',{skuId:item.skuId,isChecked});
            primeAll.push(prime);
         }
      }else{
         if(!item.isChecked){
            let prime =  dispatch('ischeckCart',{skuId:item.skuId,isChecked});
            primeAll.push(prime);
         }
      }
     })
     return Promise.all(primeAll);
   }
};

const mutations={
   CARLIST(state,carlist){
      state.carlist = carlist
   }
};

const state={
   carlist:[]
};

const getters={
   cartInfoLists(state){
      return state.carlist[0] || {};
   }
};

export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}