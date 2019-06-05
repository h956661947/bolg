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
        :class="{bolg_hover:bolg.bolgListHover==item.id,bolg_click:bolg.bolgListClick==item.id}" 
        @mouseover="BolgHover" 
        @mouseout="BolgHoverOut"
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
                <p class="list_content" v-html="$options.filters.FontFilter(item.content)"></p>
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
export default {
    data(){
        return {
            search:{
                searchValue:'',
                searchOpen:false,
                searchData:[]
            },
            bolg:{
                bolgListHover:'',
                bolgListClick:''
            },
        }
    },
    methods: {
        BolgHover(el){
            this.bolg.bolgListHover=el.currentTarget.getAttribute('hid');
        },
        BolgHoverOut(){
            this.bolg.bolgListHover='';
        },
        BolgDown(el){
            
            this.bolg.bolgListClick=el.currentTarget.getAttribute('hid');
            console.log(this.bolg.bolgListClick);
            // this.$router.push('/Article/'+el.currentTarget.getAttribute('hid'));
        },
        BolgUp(el){
            this.$router.push('/Article/'+el.currentTarget.getAttribute('hid'));
        },
        SearchHover(){
            this.search.searchOpen=true;
        },
        SearchHoverOut(){
            this.search.searchOpen=false;
        },
        handleSearch(){

        },

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
            return val.substr(1,220)+'...'
        }
    }
}
</script>
<style>
    @import url('./blogmain.css');
</style>