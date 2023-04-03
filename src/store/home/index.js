import {reqCategoryList,reqBannerList,reqFloorList} from '@/api';

const actions = {
    //发送网络请求
    async categoryList({commit}){
      let result =  await reqCategoryList();
      console.log('接受到服务器响应数据(三级菜单)',result);
      if(result.code === 200){
          commit("CATE",result.data);
      } 
    },
	async bannerList({commit}){
		let banner = await reqBannerList();
		console.log('接受到模拟数据(首页轮播图)',banner);
		if(banner.code === 200){
		    commit("BANNERLIST",banner.data);
		}
	},
	async FloorList({commit}){
		let floorList = await reqFloorList();
		console.log('接受到模拟数据(商品推荐)',floorList);
		if(floorList.code === 200){
		    commit("FLOORLIST",floorList.data);
		}

	}
};

const mutations ={
    CATE(state,categoryList){
       state.categoryList = categoryList;
    },
	BANNERLIST(state,bannerList){
		 state.bannerList = bannerList;
	},
	FLOORLIST(state,floorList){
		 state.floorList = floorList;
	}
};

const state = {
    categoryList:[],
	bannerList:[],
	floorList:[],
};

const getters = {};

export default {
    //开启名字注册
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}