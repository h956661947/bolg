<template>
<div class="box">
    <div class="search" :class="{search_hover:search.searchOpen || SearchInputing}" @mouseover="SearchHover" @mouseout="SearchHoverOut">
        <div :class="{search_value_box:true,search_value_box_hover:search.searchOpen ||  SearchInputing}">
            <AutoComplete
            v-model="search.searchValue"
            :data="search.searchData"
            @on-search="handleSearch"
            placeholder="input here"
            style="width: 410px;background-color: rgb(245,245,245);"></AutoComplete>
        </div>
        <Icon type="ios-search" size="25" color="rgb(150,150,150)" class="search_icon"/>
    </div>
    <transition-group 
    name="bolgList" 
    tag="ul" 
    class="bolg_list">
        <li
        v-for="(item,index) in BolgList" 
        :key="item.id" 
        :hid="item.id" 
        :class="{bolg_click:bolg.bolgListClick==item.id}" 
        @mousedown="BolgDown"
        @mouseup="BolgUp"
        :data-index="index"
        >
            <div class="list_img_shelter"></div>
            <div class="list_img_box">
                <img :src="item.imgUrl" alt="" class="list_img">
            </div>
            <div class="list_info">
                <div class="list_title_box">
                    <div class="list_title">{{item.title}}</div>
                    <div class="list_tag">
                        <Tag v-for="tag in item.tags" :color="$store.state.tag[tag]" :key="tag">{{tag}}</Tag>
                    </div>
                </div>
                <p class="list_content">{{text(item.content) | FontFilter}}</p>
                <div class="list_record">
                    <span style="margin-left: 0px;"><Icon type="md-eye" size="15"/>&nbsp;&nbsp;&nbsp;{{item.readNum}}</span>
                    <span><Icon type="md-heart" size="15"/>&nbsp;&nbsp;&nbsp;{{item.loveNum}}</span>
                    <span><Icon type="logo-foursquare" size="15"/>&nbsp;&nbsp;{{item.fontNum}}</span>
                    <span style="float:right;"><Icon type="ios-time" size="14"/>&nbsp;&nbsp;&nbsp;{{item.time}}</span>
                </div>
            </div>
        </li>
    </transition-group>
    <div class="page">
        <Page :total="page.dataNum" show-total :current="page.nowPage" :page-size="page.pageNum" @on-change="PageChange"/>
    </div>
    
</div>
</template>
<script>
import { GetArticle,GetArticleNum } from '@/api/articlelist'
export default {
    data(){
        return {
            search:{
                searchValue:'',
                searchOpen:false,
                searchData:[]
            },
            bolg:{
                bolgListClick:''
            },
            page:{
                dataNum:500,
                nowPage:1,
                pageNum:10
            }
        }
    },
    methods: {
        BolgDown(el){
            
            this.bolg.bolgListClick=el.currentTarget.getAttribute('hid');
            // this.$router.push('/Article/'+el.currentTarget.getAttribute('hid'));
        },
        BolgUp(el){
            this.$router.push('/Article/'+el.currentTarget.getAttribute('hid'));
            this.bolg.bolgListClick=''
        },
        SearchHover(){
            this.search.searchOpen=true;
        },
        SearchHoverOut(){
            this.search.searchOpen=false;
        },
        handleSearch(){

        },
        PageChange(index){
            GetArticle((index-1)*this.page.pageNum,this.page.pageNum).then((data)=>{
                window.scrollTo(0,0);
                this.$store.commit('bolgList',data.data);
                sessionStorage.setItem('nowPage',index);
            });
            
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
    computed:{
        SearchInputing(){
            if(this.search.searchValue!='')
            {
                return true;
            }else{
                return false;
            }
        },
        BolgList(){
            return this.$store.state.bolg.bolgList.filter((blog)=>{
                return blog.title.match(this.search.searchValue);
            });
        }
    },
    filters:{
        FontFilter(val){
            return val.substr(0,200)+'...'
        }
    },
    created() {
        //获取列表
        // GetArticle(0,10).then((data)=>{
        //     this.$store.commit('bolgList',data.data);
        // });
        GetArticleNum().then((data)=>{
            this.page.dataNum=data.data[0]['count(*)'];
        })
    },
}
</script>
<style>
    @import url('./blogmain.css');
</style>