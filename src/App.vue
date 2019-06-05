<template>
  <div id="app">
    <!-- 导航栏 -->
      <div class="guide">
        <ul class="guide_list">
          <li v-for="item in guide.guideList" :key="item" :class="{guide_hover:guide.guideIndex==item,guide_active:guide.guideActiveIndex==item}" @mouseover="GuideHover" @click="GuideActive" @mouseout="GuideHoverOut">{{item}}</li>
        </ul>
      </div>
      <div class="box">
          <router-view/>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      guide:{
        guideList:['文章','关于','作品'],
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
}
</script>

<style>
  @import url('./App.css');
</style>
