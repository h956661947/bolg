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
        <p class="article_title">{{ThisArticle.title}}</p>
        <div class="article_record">
            <span style="margin-left: 0px;">日期：&nbsp;{{ThisArticle.time}}</span>
            <span>阅读数：&nbsp;{{ThisArticle.readNum}}</span>
            <span>喜爱：&nbsp;{{ThisArticle.loveNum}}</span>
            <span>字数：&nbsp;{{ThisArticle.fontNum}}</span>
        </div>
        <div class="tags">
            <Tag v-for="tag in ThisArticle.tags" :color="$store.state.tag[tag]" :key="tag">{{tag}}</Tag>
        </div>
        <Divider/>
        <div class="article_content" v-html="ThisArticle.content"></div>
    </div>
    <div class="bottom">
        <div class="bottom_box">
            <div class="last" v-if="LastArticle">
                <div class="bottom_title_box">
                    <div class="last_title" @click="Last">上一篇</div>
                    <div class="bottom_title">{{LastArticle.title}}</div>
                </div>                
                <div class="bottom_hr"></div>
                <p class="bottom_content">{{text(LastArticle.content) | FontFilter}}</p>
                <img :src="LastArticle.imgUrl" alt="" class="bottom_img">

            </div>
            <div class="next" v-if="NextArticle">
                <div class="bottom_title_box">
                    <div class="last_title" @click="Next">下一篇</div>
                    <div class="bottom_title">{{NextArticle.title}}</div>
                </div>                
                <div class="bottom_hr"></div>
                <p class="bottom_content">{{text(NextArticle.content) | FontFilter}}</p>
                <img :src="NextArticle.imgUrl" alt="" class="bottom_img">
            </div>
        </div>
    </div>
</div>
</template>
<script>
import 'highlight.js/styles/atom-one-dark.css'
import { AddReadNum,AddLoveNum } from '@/api/articlelist'
export default {
    data(){
        return {
            // thisArticle:'',
            // lastArticle:'',
            // nextArticle:'',
        }
    },
    computed: {
        ArticleInfo(){
        }
    },
    created() {
            // if(!sessionStorage.getItem('nowPage'))
            // {
            //     sessionStorage.setItem('nowPage',index);
            // }
    },
    computed:{
        ThisArticle(){
            if(this.$store.state.bolg.bolgList.length==0)
            {
                return {
                    id:0,
                    title:'',
                    content:'',
                    tags:[],
                    imgUrl:'',
                    time:'0-0-0',
                    readNum:0,
                    loveNum:0,
                    fontNum:0
                }
            }else{
                AddReadNum(this.$route.params.id);
                return this.$store.state.bolg.bolgList.filter((i)=>{
                    return i.id===parseInt(this.$route.params.id)
                })[0]
            }
        },
        LastArticle(){
            if(this.$store.state.bolg.bolgList.length==0)
            {
                return {
                    id:0,
                    title:'',
                    content:'',
                    tags:[],
                    imgUrl:'',
                    time:'0-0-0',
                    readNum:0,
                    loveNum:0,
                    fontNum:0
                }
            }else{
                return this.$store.state.bolg.bolgList.filter((i)=>{
                    return i.id===parseInt(this.$route.params.id)-1
                })[0]
            }
        },
        NextArticle(){
            if(this.$store.state.bolg.bolgList.length==0)
            {
                return {
                    id:0,
                    title:'',
                    content:'',
                    tags:[],
                    imgUrl:'',
                    time:'0-0-0',
                    readNum:0,
                    loveNum:0,
                    fontNum:0
                }
            }else{
                return this.$store.state.bolg.bolgList.filter((i)=>{
                    return i.id===parseInt(this.$route.params.id)+1
                })[0]
            }
        }
    },
    methods: {
        LoveOver(){
            this.loveHover=true;
        },
        LoveOut(){
            this.loveHover=false;
        },
        LoveClick(){
            AddLoveNum(this.$route.params.id).then((data)=>{
                if(data.status==200)
                {
                    this.$Message.success('感谢您点赞👍');
                }else{
                    this.$Message.error('点赞失败了');
                }
            })
        },
        Last(){
            this.$router.push({name:'Article',params:{id:parseInt(this.$route.params.id)-1}});
        },
        Next(){
            this.$router.push({name:'Article',params:{id:parseInt(this.$route.params.id)+1}});
        },
        Back(){
            // if(sessionStorage.getItem('nowPage'))
            // {
            //     sessionStorage.setItem('nowPage',1);
            // }
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
        // '$route'(to,from){
        //     //监听同级路由跳转(修复bug)
        //     this.thisArticle=this.$store.state.bolg.bolgList.filter((i)=>{
        //         return i.id===parseInt(this.$route.params.id)
        //     })[0]
        //     AddReadNum(this.thisArticle.id);
        //     this.lastArticle=this.$store.state.bolg.bolgList.filter((i)=>{
        //         return i.id===parseInt(this.$route.params.id)-1
        //     })[0]
        //     this.nextArticle=this.$store.state.bolg.bolgList.filter((i)=>{
        //         return i.id===parseInt(this.$route.params.id)+1
        //     })[0]
        // }
    },
}
</script>
<style scoped>
    @import url('./article.css');
</style>