<template>
<div>
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
    <transition-group name="bolgList" tag="ul" class="bolg_list">
        <li 
        v-for="item in BolgList" 
        :key="item.id" 
        :hid="item.id" 
        :class="{animated:true,bolg_hover:bolg.bolgListHover==item.id}" 
        @mouseover="BolgHover" 
        @mouseout="BoldHoverOut">
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
                <p class="list_content" v-html="item.content"></p>
                <div class="list_record">
                    <span style="margin-left: 0px;"><Icon type="md-eye" size="15"/>&nbsp;&nbsp;&nbsp;{{item.readNum}}</span>
                    <span><Icon type="md-heart" size="15"/>&nbsp;&nbsp;&nbsp;{{item.loveNum}}</span>
                    <span><Icon type="logo-foursquare" size="15"/>&nbsp;&nbsp;{{item.fontNum}}</span>
                    <span style="float:right;"><Icon type="ios-time" size="14"/>&nbsp;&nbsp;&nbsp;{{item.time}}</span>
                </div>
            </div>
        </li>
    </transition-group>
</div>
</template>
<script>
import jpg1 from '@/assets/1.jpg'
import jpg2 from '@/assets/2.jpg'
import jpg3 from '@/assets/3.jpg'
export default {
    data(){
        return {
            search:{
                searchValue:'',
                searchOpen:false,
                searchData:[]
            },
            bolg:{
                bolgList:[
                    {id:1,imgUrl:jpg1,title:'关于Vue钩子函数的简述',content:`
                        <p>这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。</p>
                        这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。
                        这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。
                        <p>这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。</p>
                    `,tags:['HTML','CSS','JS'],readNum:20,loveNum:100,fontNum:3201,time:'2019-10-21'},
                    {id:2,imgUrl:jpg2,title:'Vue爬坑之旅(十七)：关于vue路由守卫的一些用法',content:`
                        <p>这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。</p>
                        这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。
                        这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。
                        <p>这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。</p>
                    `,tags:['HTML'],readNum:20,loveNum:100,fontNum:3201,time:'2019-10-21'},
                    {id:3,imgUrl:jpg3,title:'vue method 方法中获取dom元素',content:`
                        <p>这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。</p>
                        这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。
                        这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。
                        <p>这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。</p>
                    `,tags:['NODEJS'],readNum:20,loveNum:100,fontNum:3201,time:'2019-10-21'},
                    {id:4,imgUrl:jpg1,title:'关于Vue钩子函数的简述',content:`
                        <p>这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。</p>
                        这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。
                        这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。
                        <p>这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。</p>
                    `,tags:['HTML','VUE','NODEJS'],readNum:20,loveNum:100,fontNum:3201,time:'2019-10-21'},
                    {id:5,imgUrl:jpg2,title:'将原生事件绑定到组件',content:`
                        <p>这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。</p>
                        这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。
                        这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。
                        <p>这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。</p>
                    `,tags:['VUE','NODEJS'],readNum:20,loveNum:100,fontNum:3201,time:'2019-10-21'},
                    {id:6,imgUrl:jpg3,title:'webpack相关配置',content:`
                        <p>这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。</p>
                        这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。
                        这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。
                        <p>这是我的第一个博客，里面将记录我前端学习中的心路历程，和一些自己总结的知识点。</p>
                    `,tags:['VUE'],readNum:20,loveNum:100,fontNum:3201,time:'2019-10-21'},
                ],
                bolgListHover:''
            },
        }
    },
    methods: {
        BolgHover(el){
            this.bolg.bolgListHover=el.currentTarget.getAttribute('hid');
        },
        BoldHoverOut(){
            this.bolg.bolgListHover='';
        },
        SearchHover(){
            this.search.searchOpen=true;
        },
        SearchHoverOut(){
            this.search.searchOpen=false;
        },
        handleSearch(){

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
            return this.bolg.bolgList.filter((blog)=>{
                return blog.title.match(this.search.searchValue);
            });
        }
    },
}
</script>
<style>
    @import url('./blogmain.css');
</style>