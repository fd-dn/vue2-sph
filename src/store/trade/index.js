import {addressList,trade} from '@/api'

const actions = {
    async getAddressList({commit}){
        let req =  await addressList();
        console.log(req);
        if(req.code == 200){
           commit('ADDRESSLIST',req.data)
        }else{
           return Promise.reject(new Error('flieck'));
        }
    },
    async getTrade({commit}){
        let req =  await trade();
        console.log(req);

        if(req.code == 200){
           commit('TRADE',req.data)
        }else{
           return Promise.reject(new Error('flieck'));
        }
    },
};

const mutations ={
    ADDRESSLIST(state,addressList){
       state.addressList = addressList;
    },
    TRADE(state,trade){
       state.trade = trade;
    }
};

const state = {
    addressList:[],
    trade:{}
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