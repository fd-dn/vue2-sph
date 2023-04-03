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

<script>

  export default {
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
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

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
  }
</style>