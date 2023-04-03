import request from './request';
import requestMcok from './requestMock';

export const reqCategoryList = ()=> request({url:'/product/getBaseCategoryList',method:'get'});

export const reqBannerList = ()=> requestMcok({url:'/banners',method:'get'});

export const reqFloorList = ()=> requestMcok({url:'/floors',method:'get'});

export const reqSearchList = (params)=> request({url:'/list',method:'post',data:params});

///获取商品api/item/{ skuId }
export const reqItem = (skuid)=> request({url:`/item/${skuid}`,method:'get'});

//添加商品到购物车(或者修改)/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddToCart = (skuId,skuNum)=> request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});

//获取购物车数据/api/cart/cartList
export const reqCarList = () => request({url:'/cart/cartList',method:'get'});

//删除商品/api/cart/deleteCart/{skuId}
export const deleteCart = (skuId) => request({url:`/cart/deleteCart/${skuId}`,method:'delete'});

//切换商品选中状态/api/cart/checkCart/{skuId}/{isChecked}
export const checkCart = (skuId,isChecked) => request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

//获取验证码 /api/user/passport/sendCode/{phone}
export const sendCode = (phone) => request({url:`/user/passport/sendCode/${phone}`,method:'get'});

//注册  /api/user/passport/register
export const userTem = (data) => request({url:`/user/passport/register`,data,method:'post'});

//登录 /api/user/passport/login
export const userLogin = (data) => request({url:'/user/passport/login',data,method:'post'});

//获取用户信息  /api/user/passport/auth/getUserInfo
export const login = () => request({url:'/user/passport/auth/getUserInfo',method:"get"});

//推出登录/api/user/passport/logout
export const logout = () => request({url:'/user/passport/logout',method:'get'})

//获取用户收获地址/api/user/userAddress/auth/findUserAddressList
export const addressList = () => request({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

//获取订单详细页信息 /api/order/auth/trade
export const trade = () => request({url:'/order/auth/trade',method:'get'});

//提交订单/api/order/auth/submitOrder?tradeNo={tradeNo}
export const auth = (data,tradeNo) => request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})

//获取订单信息 /api/payment/weixin/createNative/{orderId}
export const careate = (orderId) => request({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

// 查询支付订单状态 /api/payment/weixin/queryPayStatus/{orderId}
export const payStatus = (orderId) => request({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//获取订单列表/api/order/auth/{page}/{limit}
export const orderAuth = (page,limit) => request({url:`/order/auth/${page}/${limit}`,method:'get'});