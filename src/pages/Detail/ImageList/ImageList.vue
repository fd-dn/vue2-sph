<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(ban,index) in skuInfoImgList" :key="ban.id">
        <img :src="ban.imgUrl" :class="{active:showIndex == index}" @click="setIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props:['skuInfoImgList'],
    data(){
      return{
        showIndex:0
      } 
    },
    watch:{
      skuInfoImgList(newValue,oldValue){
         this.$nextTick(()=>{
                new Swiper (this.$refs.cur, {
                // 如果需要前进后退按钮
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
                //同时显示4个
                slidesPerView:4,
                //切换几个图片
                slidesPerGroup:1
              }
           )        
         })
      }
    },
    methods:{
      setIndex(index){
         this.showIndex = index;
         this.$bus.$emit('setIndex',index);
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 400px;
    box-sizing: border-box;
    padding: 0 12px;
    background-color: rgb(234, 232, 232);
    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>