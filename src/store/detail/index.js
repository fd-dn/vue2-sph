import {reqItem,reqAddToCart} from '@/api';
import { uuid_token } from '@/utils/uuid_token';
const actions={
    async getDetail({commit},skuid){
         let result = await reqItem(skuid);
         if(result.code ==200){
            commit("ITEM",result.data);
         }
    },
    // async 函数调用会返回一个promise对象会返回一个成功和失败
    async reqAddToCart({commit},{skuId,skuNum}){
         let result = await reqAddToCart(skuId,skuNum)
        //判断是否成功
        if(result.code ==200){
            return 'OK';
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
};

const mutations={
   ITEM(state,item){
       state.item = item;
   }
};

const state={
   item:{},
   uuid_token:uuid_token(),
};

const getters={
    categoryView(state){
        //在服务器数据没回来之前汇报错，state.item.categoryView 会返回undefined会报错，最少需要返回一个空对象
        return state.item.categoryView || {} ;
    },
    skuInfo(state){
        return state.item.skuInfo || {} ;
    },
    spuSaleAttrList(state){
        return state.item.spuSaleAttrList || [] ;
    }
};

export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}