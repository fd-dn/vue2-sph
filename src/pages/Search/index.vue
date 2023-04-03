<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="deleteData">x</i></li>
            <!-- 搜索的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="deleteDatakey">x</i></li>
            <!-- 品牌 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="deleteTrademark">x</i></li>
            <!-- 售卖属性 -->
            <li class="with-x" v-for="(attr,index) in  searchParams.props" :key="index">{{attr.split(":")[1]}}<i @click="deleteAttr(index)">x</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrIofo="attrIofo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active : searchParams.order.indexOf('1') != -1}" @click="isAscZ">
                  <a >综合
                    <span 
                    class="iconfont" 
                    v-if="searchParams.order.indexOf('1') != -1" 
                    :class="{'icon-jiantou_xiangxia' : searchParams.order.indexOf('asc') !=-1,'icon-jiantou_xiangshang' : searchParams.order.indexOf('desc') != -1}"
                    >
                  </span>
                </a>
                </li>
                <li :class="{active : searchParams.order.indexOf('2') != -1}" @click="isAscX">
                  <a >价格
                     <span 
                     class="iconfont" 
                     v-if="searchParams.order.indexOf('2') != -1" 
                     :class="{'icon-jiantou_xiangxia' : searchParams.order.indexOf('asc') !=-1,'icon-jiantou_xiangshang' : searchParams.order.indexOf('desc') != -1}"
                     >
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods,index) in goodsList" :key="goods.id" >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/Detail/${goods.id}`"><img v-lazy="goods.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="reqSearchList.total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector';
  import {mapGetters,mapState} from 'vuex';
  export default {
    name: 'Search',
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
        "pageNo": 1,
        //每一页展示多少数据
        "pageSize": 10,
        //平台售卖属性操作带的属性
        "props": [],
        //品牌
        "trademark": ""
       }
       }
    },
    
    components: {
      SearchSelector
    },
    //在组件挂载完毕之前执行一次[在mounted之前]
    beforeMount(){
      //这种方法很复杂，但是因为我们参数名不一样没办法，一样的话可以用object.assign合并参数Object.assign()
      console.log(this.$route.query.gosearch1id,this.searchParams.category1Id)
     this.searchParams.category1Id = this.$route.query.gosearch1id;
     this.searchParams.category2Id = this.$route.query.gosearch2id;
     this.searchParams.category3Id = this.$route.query.gosearch3id;
     this.searchParams.categoryName = this.$route.query.gosearchname;
     this.searchParams.keyword = this.$route.params.text;
    },
    mounted(){
      this.getData()
    },
    computed:{
      ...mapGetters('search',['goodsList']),
      ...mapState('search',['reqSearchList'])
    },
    methods:{
      getData(){
        this.$store.dispatch('search/searchList',this.searchParams)
      },
      deleteData(){
        // 值为undefined 在提交的时候会对性能优化，不会提交到服务器(前提是值不是必须的)
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        this.searchParams.categoryName = undefined;
        this.getData();
        if(this.$route.params){
          this.$router.push({name:'Search',params:this.$route.params});
       }
      },
      deleteDatakey(){
        this.searchParams.keyword = undefined;
        this.getData();
        if(this.$route.query){
          this.$router.push({name:'Search',query:this.$route.query});
       }
      //  通知兄弟组件清除header搜索关键字
      this.$bus.$emit("clear");
      },
      trademarkInfo(trademark){
        let trIdName = `${trademark.tmId}:${trademark.tmName}`;
        this.searchParams.trademark = trIdName;
        this.getData();
      },
      deleteTrademark(){
        this.searchParams.trademark = undefined;
        this.getData();
      },
      attrIofo(attr,a){
          let can = `${attr.attrId}:${a}:${attr.attrName}`;
          if(this.searchParams.props.indexOf(can) == -1)  this.searchParams.props.push(can);
          this.getData();
      },
      deleteAttr(index){
          this.searchParams.props.splice(index,1);
          this.getData();
      },
      isAscZ(){
          if(this.searchParams.order.indexOf('asc') !=-1){
             let can = `1:desc`;
             this.searchParams.order = can;
             this.getData();
          }else{
            let can = `1:asc`;
            this.searchParams.order = can;
            this.getData();
          }
      },
      isAscX(){
        if(this.searchParams.order.indexOf('asc') !=-1){
             let can = `2:desc`;
             this.searchParams.order = can;
             this.getData();
          }else{
            let can = `2:asc`;
            this.searchParams.order = can;
            this.getData();
          }
      },
      getPageNo(pageNo){
          this.searchParams.pageNo = pageNo;
          this.getData();
      }
    },
    watch:{
      $route(newValue,oldValue){
          console.log(this.searchParams);
          this.searchParams.category1Id = this.$route.query.gosearch1id;
          this.searchParams.category2Id = this.$route.query.gosearch2id;
          this.searchParams.category3Id = this.$route.query.gosearch3id;
          this.searchParams.categoryName = this.$route.query.gosearchname;
          this.searchParams.keyword = this.$route.params.text;
          this.getData();
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }


      }
    }
  }
</style>