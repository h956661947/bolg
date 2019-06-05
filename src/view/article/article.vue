<template>
<div class="box">
    <!-- <div class="box_img_box1">
        <div class="box_img_shelter1"></div>
        <img :src="ArticleInfo.imgUrl" alt="" class="box_img1">
    </div>
    <div class="box_img_box2">
            <div class="box_img_shelter2"></div>
            <img :src="ArticleInfo.imgUrl" alt="" class="box_img2">
        </div> -->
    
    <div class="article">
        <p class="article_title">{{ArticleInfo.title}}</p>
        <div class="article_record">
            <span style="margin-left: 0px;">日期：&nbsp;{{ArticleInfo.time}}</span>
            <span>阅读数：&nbsp;{{ArticleInfo.readNum}}</span>
            <span>喜爱：&nbsp;{{ArticleInfo.loveNum}}</span>
            <span>字数：&nbsp;{{ArticleInfo.fontNum}}</span>
        </div>
        <div class="tags">
            <Tag v-for="tag in ArticleInfo.tags" :color="$store.state.tag[tag]" :key="tag">{{tag}}</Tag>
        </div>
        <Divider/>
        <div class="article_content" v-html="ArticleInfo.content"></div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    computed: {
        ArticleInfo(){
            return this.$store.state.bolg.bolgList[this.$route.params.id-1]
        }
    },
}
</script>
<style scoped>
    @import url('./article.css');
</style>