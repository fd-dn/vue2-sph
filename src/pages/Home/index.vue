<template>
  <div>
     <TypeNav/>
     <List/>
     <Recom/>
     <Rank/>
     <Like/>
     <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
     <Brand/>
  </div>
</template>

<script>
import List from './List';
import Recom from './Recom';
import Rank  from './Rank';
import Like from './Like';
import Floor from './Floor';
import Brand from './Brand';
import {mapState} from 'vuex';
export default {
  name:"Home",
  components:{
    List,
    Recom,
    Rank,
    Like,
    Floor,
    Brand,
 },
 mounted() {
 	  this.$store.dispatch('home/FloorList');
 },
 computed:{
	 ...mapState('home',['floorList'])
 }
}
</script>