import {reqSearchList} from '@/api';
const actions = {
    async searchList({commit},params={}){
        //当函数调用的时候至少传递一个数据(空数据) 
        // params形参当用户派发actions的时候，第二个参数传递过来至少是一个空对象
        let SearchList = await reqSearchList(params);
        if(SearchList.code === 200){
            commit('SEARCHLIST',SearchList.data);
        }
    }
};

const mutations ={
    SEARCHLIST(state,reqSearchList){
        state.reqSearchList = reqSearchList;
    }
};

const state = {
    reqSearchList:{},
};

const getters = {
    goodsList(state){
        return state.reqSearchList.goodsList;
    },
    attrsList(state){
        return state.reqSearchList.attrsList;
    },
    trademarkList(state){
        return state.reqSearchList.trademarkList;
    }
};

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}