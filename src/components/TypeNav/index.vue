<template>
   <div class="type-nav">
            <div class="container">
                <!-- 事件委派 -->
                <div @mouseleave="remIndex" @mouseenter="is">
                    <h2 class="all">全部商品分类</h2>
                    <transition name="sort">
                        <div class="sort" v-show="isShow">
                        <div class="all-sort-list2" @click="goSearch">
                        <div class="item bo"  v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:showIndex == index}">
                            <h3 @mouseenter="addIndex(index)">
                                <a :data-goSearchName="c1.categoryName" :data-goSearch1Id="c1.categoryId">{{c1.categoryName}}</a>
                            </h3>
                            <div class="item-list clearfix" :style="{display:showIndex == index ? 'block' : 'none'}">
                                <div class="subitem"  v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-goSearchName="c2.categoryName" :data-goSearch2Id="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em class="fore"  v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-goSearchName="c3.categoryName" :data-goSearch3Id="c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
   </div>
</template>

<script>
import { mapState } from 'vuex';
import throttle from 'lodash/throttle';

export default {
  name:'TypeNav',
  data(){
    return{
       showIndex:-1,
       isShow:true
    }
  },
  mounted(){
     if (this.$route.path != '/home') {
         this.isShow = false
     }else{
        this.isShow = true
     }
  },
  computed:{
    // ...mapState({
    //     categoryList:state =>state.home.categoryList
    // }),
    //需要开启命名模块空间才能使用
    ...mapState('home',['categoryList'])
  },
  methods:{
    // addIndex(index){
    //     this.showIndex = index;
    // },
    //lodash节流函数
    addIndex:throttle(function(index){
        this.showIndex = index;
    },50),
    remIndex(){
       this.showIndex = -1;
       if(this.$route.path != '/home'){
          this.isShow = false;        
       }
    },
    goSearch(event){
       //target 可以获取到触发事件的节点
       let element = event.target;
       //节点的dataset可以获取自定义属性，但是自定义属性前面必须加data-开头
       let {gosearchname,gosearch1id,gosearch2id,gosearch3id} = element.dataset;   //结构赋值

       let loath = {name:'Search'};
       let query = {gosearchname:gosearchname}
       if(gosearchname){
            if(gosearch1id){
                query.gosearch1id = gosearch1id;
            }else if(gosearch2id){
                query.gosearch2id = gosearch2id;
            }else{
                query.gosearch3id = gosearch3id;
            }
       }
       if(this.$route.params){
          loath.params = this.$route.params;
          loath.query = query;
          this.$router.push(loath);
        }else{
          loath.query = query;
          this.$router.push(loath);
        }
    },
    is(){
        this.isShow = true;
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
        border-bottom: 2px solid #e1251b;
        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;
                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }
                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .cur{
                            background-color: skyblue;
                        }
                }
            }
        }
    }
    .sort-enter{
        opacity: 0;
    }
    .sort-enter-to{
        opacity: 1;
    }
    .sort-enter-active{
    transition: all 0.5s linear;
    }

</style>
