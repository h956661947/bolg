<template>
  <div id="app">
    <!-- 导航栏 -->
    <transition name="loading">
      <div v-if="IsLoading" class="loading">
        <div class="spin">
          <Spin size="large" fix></Spin>
        </div>
      </div>
    </transition>
      <div class="guide">
        <div class="head">
          <img src="" alt="" class="head_img">
          <p class="head_name">MONTAGNE 的博客</p>
        </div> 
        <ul class="guide_list">
          <li v-for="item in guide.guideList" :key="item" :class="{guide_hover:guide.guideIndex==item,guide_active:guide.guideActiveIndex==item}" @mouseover="GuideHover" @click="GuideActive" @mouseout="GuideHoverOut">{{item}}</li>
        </ul>
      </div>
        <transition name="router" class="router" >
          <keep-alive>
              <router-view v-if="$route.meta.keepAlive"/>
          </keep-alive>
        </transition>
        <transition name="router" class="router" >
              <router-view v-if="!$route.meta.keepAlive"/>
          </transition>
        
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      guide:{
        guideList:['文章'],
        guideIndex:'',
        guideActiveIndex:'文章'
      }
      
    }
  },
  methods: {
    GuideHover(el){
      this.guide.guideIndex=el.currentTarget.innerText;
    },
    GuideHoverOut(el){
      this.guide.guideIndex='';
    },
    GuideActive(el){
      this.guide.guideActiveIndex=el.currentTarget.innerText;
    },
  },
  computed: {
    IsLoading(){
      return this.$store.state.isloading;
    }
  },
}
</script>

<style>
  @import url('./App.css');
</style>
