<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(car,index) in cartInfoList" :key="car.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="car.isChecked" @change="isChecked(car.skuId,car.isChecked)">
          </li>
          <li class="cart-list-con2">
            <img :src="car.imgUrl">
            <div class="item-msg">{{car.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{car.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="setNum('dele',-1,car,index)">-</a>
            <input autocomplete="off" type="text"  minnum="1" class="itxt" :value="car.skuNum"  @blur="setNum('set',$event.target.value * 1,car,index)">
            <a href="javascript:void(0)" class="plus"  @click="setNum('add',1,car,index)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{car.skuPrice * car.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(car.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isTrue && cartInfoList.length>0" @click="checkCartList">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteCheckCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{zongPrect}}</i>
        </div>
        <div class="sumbtn">
         <router-link class="sum-btn" to='/trade'>结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import throttle from 'lodash/throttle';
  export default {
    name: 'ShopCart',
    mounted(){
       this.$store.dispatch('carlist/getCarList');
    },
    computed:{
      ...mapGetters('carlist',['cartInfoLists']),
      cartInfoList(){
        return this.cartInfoLists.cartInfoList || [];
      },
      //全选
      isTrue(){
        //遍历全部数据，只要item属性全部 === 1 就返回为真
        return this.cartInfoList.every((item)=> item.isChecked === 1);
      },
      //总价
      zongPrect(){
        //过滤符合条件的数据
       let zong = this.cartInfoList.filter(item=>item.isChecked == 1);
       let num = 0;
       zong.forEach(element => {
         num +=  element.skuNum * element.skuPrice;
       });
      return num
      }
    },
    methods:{
      // 修改产品数量(节流函数)
      setNum:throttle(async function(xiu,num,car){
        if(xiu == 'set'){
          if(!isNaN(num) && num>0){
            try {
            let nums = parseInt(num)  - car.skuNum;
            console.log(car.skuNum)
            let req =  await this.$store.dispatch('detail/reqAddToCart',{skuId:car.skuId,skuNum: nums});
            this.getData();
          } catch (error) {
            alert(error.message);
          }
          }else{
            this.getData();
          }

        }else if(xiu == 'add'){
          try {
              let req = await this.$store.dispatch('detail/reqAddToCart',{skuId:car.skuId,skuNum: num});
              this.getData();
          } catch (error) {
            alert(error.message);
          }
        }else{
          try {
              if(car.skuNum <= 1){
                return;
              }
              let req = await this.$store.dispatch('detail/reqAddToCart',{skuId:car.skuId,skuNum: num});
              this.getData();
          } catch (error) {
            alert(error.message);
          }
        }
     },1000)
      ,
      // 删除商品
     async deleteCartById(skuId){
      try {
        let req = await  this.$store.dispatch('carlist/deleteCartList',skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
      
      },
      //选中
     async isChecked(skuId,isChecked){
        try {
          if(isChecked){
            let req =   await this.$store.dispatch('carlist/ischeckCart',{skuId:skuId,isChecked:0});
            this.getData();
          }else{
            let req =   await this.$store.dispatch('carlist/ischeckCart',{skuId:skuId,isChecked:1});
            this.getData();
          }
      
        } catch (error) {
          
        }
      },
      //删除选中的商品
     async  deleteCheckCart(){
        try {
          let dele =   await this.$store.dispatch('carlist/deleteCheckCart');
          this.getData();
        } catch (error) {
          alert('删除失败',error);
        }
      },
      //全选or不全选
      async  checkCartList(){
       try {
          let ors = await  this.$store.dispatch('carlist/checkCartList');
          console.log(ors);
          this.getData();
       } catch (error) {
          alert('勾选失败',error);
       }
      },
      //获取商品数据
      getData(){
        this.$store.dispatch('carlist/getCarList');
      }
    }
  }
</script>

<style lang="less" scoped>


  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 15%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 26%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;
            
          }

          .cart-list-con5 {
            width: 10%;
            margin-left: 52px;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 17%;
            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>