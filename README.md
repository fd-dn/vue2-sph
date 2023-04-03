[TOC]



尚品汇项目总结：

# 01.nprogress 进度条插件安装

npm install nprogress --save

# 02.路由
$router:进行编程式导航的路由

跳转$route:可以获取路由的信息|参数

传递参数有 query 和 params

params参数：路由需要占位，程序就崩了，属于URL当中一部分
query参数：路由不需要占位，写法类似于ajax当中query参数
路由传

1)递参数先关面试题
     1:路由传递参数（对象写法）path是否可以结合params参数一起使用?
     不可以：不能这样书写，程序会崩掉
     2:如何指定params参数可传可不传? 
     3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
     4:如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题
     5: 路由组件能不能传递props数据?

2)编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
这种异常，对于程序没有任何影响的。
为什么会出现这种现象:
由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,
第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调
第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；

3)push与replace区别?
编程式导航：push 与 replace
能不能记录历史记录：push（能记住历史记录）  replace（不能记住历史记录）
目前项目当中：进行路由跳转（编程式导航）基础都是push
push与replace是有区别的

4)重写push与replace方法
工作的时候想处理掉，不想处理对于你的程序没有任何影响

```vue
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
```



**注意：传递params参数的时候需要在路由中占位**

# 03.vuex
action:处理action,可以书写自己的业务逻辑，也可以处理异步
mutations:修改state的唯一手段
State:仓库存储数据的地方
getter:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据

1)组件化仓库开启命名空间：namespaced:true,
2)提交到vuex中的home小仓库中的actions中的函数bannerList进行操作 this.$store.dispatch('home/bannerList');
3)bannerList函数通过commit方法提交到mutations中的BANNERLIST进行操作数据
   async bannerList({commit}){
   	let banner = await reqBannerList();
   	console.log('接受到模拟数据(首页轮播图)',banner);
   	if(banner.code === 200){
   	    commit("BANNERLIST",banner.data);
   	}
   }
4)在组件中使用  ...mapState('home',['bannerList']) 拿到vuex中的数据

# 04.lodash之节流函数
1) 按需引入 import throttle from 'lodash/throttle';
2）正常： addIndex(index){
			this.showIndex = index;
         },
   节流： addIndex:throttle(function(index){                     
			this.showIndex = index;
		 },50), 



3)函数防抖与节流*******面试题

正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿）

防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发,只会执行最后一次

节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

# 05.mock.js模拟数据
npm i mockjs
使用顺序：
1)npm i mockjs
2)src文件下创建mock文件夹
3)准备json数据
4)把需要的图片放到public文件夹下-----打包的时候会原封不动的打包到dist文件中
5)创建mockServer.js文件，通过mock插件模拟数据(webpack中 json,图片 默认暴露)
6)入口文件中引入

# 06.swiper插件实现轮播图
 npm i swiper@5
1)引包(引入相应的css和js文件)
2)页面结构必须要有
3)new swiper实例[轮播图添加动态效果]

在入口文件引入css样式可以在任何组件下都使用，然后在使用的组件下引入js文件

# 07.watch +  $nextTick 最完美解决轮播图问题
单独使用swatch，虽然能保证服务器的数据回来了数据发生改变，但是v-for渲染DOM节点不能保证已经完了。
## $nextTick：在下次DOM更新循环结束之后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的DOM。
它可以保准页面中的结构是一定有的，经常和很多插件一起使用[都需要DOM已经存在了]

# 08.组件通信方法
组件中通信方法有那些(可能有十几种)
1):   props:用于父子间通信
2):   自定义事件: @on @emit 可以实现子给父通信
3):   全局事件总线: $bus 全能
4):   pubsub-js:vue中几乎不用 全能
5):   插槽
6):   vuex

7)：$ref:父子通信

# 09.首页与后面的轮播图由于功能类似，建议拆分组件
切记：以后再开发项目的时候，如果看到某一个组件在很多地方使用，建议把他变成全局组件，注册一次可以在任何地方使用，共用的组件|非路由组件放到components
这里我未拆分。

# 10.search 模块开发
1):先静态页面+静态组件拆分出来
2):发请求(API)
3):vuex(三连环)
4):组件获取仓库数据,动态展示数据

# 11.vuex中的getters(简化数据而生)
计算属性
项目中的getters主要作用是：简化仓库中的数据(简化数据而生)，组件在将来获取数据就方便了

# 12.object.assign ES6新增 
合并参数Object.assign(参数1，参数2)


# 13.全局事件总线(全能通信)
//通知兄弟组件清除header搜索关键字
this.$bus.$emit("clear");
//做的事情
this.$bus.$on("clear",()=>{

})

# 14.自定义事件(子给父)
子组件：绑定点击事件触发自定义事件
 chuanPing(trademark){
	//触发自定义事件
    this.$emit('trademarkInfo',trademark);
}
父组件：绑定自定义事件
@trademarkInfo="trademarkInfo"
 trademarkInfo(trademark){
        
}

# 15.分页器开发(重点之一)

需要知道当前是第几页：pageNo字段代表当前页数
需要知道每一个展示多少数据：pagSize表示
需要知道每一个分页器一共有多少条数据：total字段进行表示
需要知道分页器连续页面个数：5|7(奇数，对称)：continues

//子组件明确5 个值 当前第几页， 每页展示多少数据，总共多少数据，连续的分页数多少，还有计算出的总页数



父组件：

```vue
 <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="reqSearchList.total" :continues="5" @getPageNo="getPageNo"/>
//传递给服务器的数据
  data(){
       return {
       searchParams:{
         //1-3级分类的ID
         "category1Id": "",
        "category2Id": "",
        "category3Id": "",
        //分类名字
        "categoryName": "",
        //搜索关键字
        "keyword": "",
        //排序
        "order": "1:asc",
        //分页器第一页
        "pageNo": 8,
        //每一页展示多少数据
        "pageSize": 10,
        //平台售卖属性操作带的属性
        "props": [],
        //品牌
        "trademark": ""
       }
       }
    },
```

子组件：

```vue
<template>
    <div>
        <div class="pagination">
        <button :disabled="jisuan.start == 1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="jisuan.start>1" @click="$emit('getPageNo',1)" :cliss="{active : pageNo == 1}">1</button>
        <button v-if="jisuan.start>2">···</button>
        <button v-for="(page,index) in jisuan.end" :key="index" v-if="page>=jisuan.start"  @click="$emit('getPageNo',page)" :class="{active : pageNo == page}">{{page}}</button>
        <button v-if="jisuan.end < totalSum-1">···</button>
        <button v-if="jisuan.end < totalSum"  @click="$emit('getPageNo',totalSum)" :class="{active : pageNo == totalSum}">{{totalSum}}</button>
        <button :disabled="totalSum == pageNo" @click="$emit('getPageNo',pageNo+1)">下一页</button>
        <button style="margin-left: 30px">共 {{total}} 条</button>
        </div>
    </div>
</template>

<script>
export default {
 name:'Pagination',
 //子组件明确5 个值 当前第几页， 每页展示多少数据，总共多少数据，连续的分页数多少，还有计算出的总页数
 props:['pageNo','pageSize','total','continues'],
 computed:{
    totalSum(){
        return Math.ceil(this.total / this.pageSize);
    },
    jisuan(){
        //当前用户第几页，分页器连续几页，计算出的总共多少页
        let {pageNo,continues,totalSum} = this;
        // 先定义两个变量储存 起始数字 和 结束数字
        let start=0,end=0;
        //如果总页数小于连续页面
        if(continues > totalSum){
            start = 1;
            end = totalSum;
        }else{
            //总页数大于连续页面
            start = pageNo - parseInt(continues/2);
            end = pageNo + parseInt(continues/2);
            // 起始位置出现0或者负数纠正
            if(start<1){
                start = 1;
                end = continues;
            }
            // 结束位置超出纠正
            if(end>totalSum){
                start = totalSum-continues+1;
                end =  totalSum;
            }
        }
        return{start,end};
    }
 }
}
</script>

<style scoped lang="less">
    .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }

</style>
```



# 16.axios二次封装

AJAX:客户端可以'敲敲的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
XMLHttpRequest、$、fetch、axios
跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
JSONP、CROS、代理
2.1:工作的时候src目录下的API文件夹，一般关于axios二次封装的文件
2.2进度条：nprogress模块实现进度条功能
工作的时候，修改进度条的颜色，修改源码样式.bar类名的



面试题：GET与POST
相同点：都是HTTP协议。
不同点:
1:GET请求携带参数是有上限的 post请求携带的参数是没有'上限的'
2:GET请求相对而言不安全，POST安全



#  17.伪报错问题
skuInfo : { }
例如：当skuInfo.skuImageList是一个空数组的时候传递给子组件，当服务器的数据还未返回的时候，空对象skuInfo的属性值skuImageList就会是一个undefined，当undefined被子组件拿到后使用就会出现假报错

skuInfo.skuImageList || [ ]



# 18.放大镜组件开发

<template>
  <div class="spec-preview">
    <img :src="imgLsit.imgUrl" />
    <div class="event" @mousemove="handler" ></div>
    <div class="big">
      <img :src="imgLsit.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>
<script>  export default {
    name: "Zoom",
    props:['skuInfoImgList'],
    data(){
        return{
          curindexs:0
        }
    }, 
    computed:{
      imgLsit(){
        return this.skuInfoImgList[this.curindexs] || {};
      },
    },
    mounted(){
        this.$bus.$on('setIndex',(index)=>{

​          

```vue
       this.curindexs = index;
    })
  },
methods:{
  handler(event){
     let mask = this.$refs.mask;
     let big = this.$refs.big;
    //  1. offsetWidth = 内容 + 左右内边距 + 左右边框 
    //     offsetHeight = 内容 + 上下内边距 + 上下边框
    // 2. offsetLeft offsetTop 距离第一个有定位的父级盒子左边和上边的距离。
   //     父盒子必须要有定位，如果没有，则以最终body为准
    // 注：
    // event.clientX, event.clientY : 鼠标点击的位置距离 body 的大小
    // event.screenX, event.screenY : 鼠标点击的位置距离 屏幕 的大小
    // event.offsetX, event.offsetY 鼠标点击的位置距离 div盒子 需要定位 的大小
     let left = event.offsetX - mask.offsetWidth/2;
     let top = event.offsetY - mask.offsetHeight/2;
      
     if(left<=0) left = 0;
     if(left>= mask.offsetWidth) left = mask.offsetWidth;
     if(top<=0) top = 0;
     if(top>= mask.offsetHeight) top = mask.offsetHeight;
     mask.style.left = left + 'px';
     mask.style.top = top + 'px';
     big.style.left = -2 * left+'px';
     big.style.top = -2 * top+'px';
  }
}
```
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

```css
img {
  width: 100%;
  height: 100%;
}

.event {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 998;
}

.mask {
  width: 50%;
  height: 50%;
  background-color: rgba(0, 255, 0, 0.3);
  position: absolute;
  left: 0;
  top: 0;
  display: none;
}

.big {
  width: 100%;
  height: 100%;
  position: absolute;
  top: -1px;
  left: 100%;
  border: 1px solid #aaa;
  overflow: hidden;
  z-index: 998;
  display: none;
  background: white;

  img {
    width: 200%;
    //非常特定的方式(例如调整宽度)来设置元素样式时
    max-width: 200%;
    height: 200%;
    position: absolute;
    left: 0;
    top: 0;
  }
}

.event:hover~.mask,
.event:hover~.big {
  display: block;
}
```
  }
</style>

# 19.商品加入购物车的问题

vuex 发送请求

```vue
 *// async 函数调用会返回一个promise对象会返回一个成功和失败*

​    async reqAddToCart({commit},{skuId,skuNum}){

​         let result = await reqAddToCart(skuId,skuNum)

​        *//判断是否成功*

​        if(result.code ==200){

​            return 'OK';

​        }else{

​            return Promise.reject(new Error('faile'))

​        }

​    }
```

组件内执行回调

```
 async  addToCart(){

​          *//try 成功会做什么*

​          try{

​             *// reqAddToCart是一个async函数返回的一定是一个promise对象  用 await 等待返回的结*

​            let result =  await  *this*.$store.dispatch('detail/reqAddToCart',                                     {skuId:*this*.$route.params.skuid,skuNum:*this*.skuNum})

​          }

​          *//失败会做什么*

​          catch(err){

​           alert(err.message);

​          }

​      }
```

