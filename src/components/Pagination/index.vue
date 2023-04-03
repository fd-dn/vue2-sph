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
 //子组件明确5 个值 
 //当前第几页， 每页展示多少数据，总共多少数据，连续的分页数多少，还有计算出的总页数
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