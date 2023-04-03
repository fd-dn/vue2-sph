<template>
  <div id="app">
     <Header/>
     <router-view></router-view>
     <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
      //通知Vuex发请求，存储于仓库之中  发送到actions
      this.$store.dispatch('home/categoryList');
  },
 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
