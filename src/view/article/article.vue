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
    <div class="back">
        <Icon type="md-arrow-round-back" size="40" @click="Back"/>
    </div>
    <div class="love" @mouseover="LoveOver" @mouseout="LoveOut" @click="LoveClick">
        <Icon type="md-heart" size="40" class="love_ico" />
    </div>
    <div class="article">
        <p class="article_title">{{thisArticle.title}}</p>
        <div class="article_record">
            <span style="margin-left: 0px;">日期：&nbsp;{{thisArticle.time}}</span>
            <span>阅读数：&nbsp;{{thisArticle.readNum}}</span>
            <span>喜爱：&nbsp;{{thisArticle.loveNum}}</span>
            <span>字数：&nbsp;{{thisArticle.fontNum}}</span>
        </div>
        <div class="tags">
            <Tag v-for="tag in thisArticle.tags" :color="$store.state.tag[tag]" :key="tag">{{tag}}</Tag>
        </div>
        <Divider/>
        <div class="article_content" v-html="thisArticle.content"></div>
    </div>
    <div class="bottom">
        <div class="bottom_box">
            <div class="last" v-if="lastArticle">
                <div class="bottom_title_box">
                    <div class="last_title" @click="Last">上一篇</div>
                    <div class="bottom_title">{{lastArticle.title}}</div>
                </div>                
                <div class="bottom_hr"></div>
                <p class="bottom_content">{{text(lastArticle.content) | FontFilter}}</p>
                <img :src="lastArticle.imgUrl" alt="" class="bottom_img">

            </div>
            <div class="next" v-if="nextArticle">
                <div class="bottom_title_box">
                    <div class="last_title" @click="Next">下一篇</div>
                    <div class="bottom_title">{{nextArticle.title}}</div>
                </div>                
                <div class="bottom_hr"></div>
                <p class="bottom_content">{{text(nextArticle.content) | FontFilter}}</p>
                <img :src="nextArticle.imgUrl" alt="" class="bottom_img">
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { AddReadNum,AddLoveNum } from '@/api/articlelist'
export default {
    data(){
        return {
            thisArticle:'',
            lastArticle:'',
            nextArticle:'',
        }
    },
    computed: {
        ArticleInfo(){
        }
    },
    created() {
        this.thisArticle=this.$store.state.bolg.bolgList.filter((i)=>{
                return i.id===parseInt(this.$route.params.id)
            })[0]
            AddReadNum(this.thisArticle.id);
            this.lastArticle=this.$store.state.bolg.bolgList.filter((i)=>{
                return i.id===parseInt(this.$route.params.id)-1
            })[0]
            this.nextArticle=this.$store.state.bolg.bolgList.filter((i)=>{
                return i.id===parseInt(this.$route.params.id)+1
            })[0]
    },
    methods: {
        LoveOver(){
            this.loveHover=true;
        },
        LoveOut(){
            this.loveHover=false;
        },
        LoveClick(){
            AddLoveNum(this.thisArticle.id).then((data)=>{
                if(data.status==200)
                {
                    this.$Message.success('感谢您点赞👍');
                }else{
                    this.$Message.error('点赞失败了');
                }
            })
        },
        Last(){
            this.$router.push({name:'Article',params:{id:this.lastArticle.id}});
        },
        Next(){
            this.$router.push({name:'Article',params:{id:this.nextArticle.id}});
        },
        Back(){
            this.$router.push('/');
        },
        text(str){
            str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
            str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
            str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
            str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;
            str = str.replace(/\s/g, ''); //将空格去掉
            return str;
        }
    },
    filters:{
        FontFilter(val){
            return val.substr(0,200)+'...'
        }
    },
    watch: {
        '$route'(to,from){
            //监听同级路由跳转(修复bug)
            this.thisArticle=this.$store.state.bolg.bolgList.filter((i)=>{
                return i.id===parseInt(this.$route.params.id)
            })[0]
            AddReadNum(this.thisArticle.id);
            this.lastArticle=this.$store.state.bolg.bolgList.filter((i)=>{
                return i.id===parseInt(this.$route.params.id)-1
            })[0]
            this.nextArticle=this.$store.state.bolg.bolgList.filter((i)=>{
                return i.id===parseInt(this.$route.params.id)+1
            })[0]
        }
    },
}
</script>
<style scoped>
    @import url('./article.css');
</style>