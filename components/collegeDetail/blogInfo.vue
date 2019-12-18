<template>

<div v-if='_collegeDetailData.social.blog.length != 0' class='college-information__content-block'>
    <p class='txt-bold txt-xl no-margin'>블로그 리뷰</p>
    <div class='blog-link-wrapped'>
    

  <a v-for='(blog, index) in _collegeDetailData.social.blog' :key='blog.blogUrl' :href="blog.blogUrl">
  <a-card hoverable style="width:240px; margin:0 8px;">
    <img 
      style='max-height: 125px; object-fit: cover; min-height: 125px;'
      alt="example"
      :src="'https://wejustgos3.s3.ap-northeast-2.amazonaws.com/blogImage/' + onReplaceSpace(_collegeDetailData.collegeEng) + (index+1) + '_image.jpg'"
     slot="cover"
    />
    <a-card-meta class='ellipstis-text' :title="blog.blogTitle" :description="blog.blogDescription">
    </a-card-meta>
  </a-card>
  </a>
   
    </div>
    
</div>
</template>

<script>

import {mapState} from 'vuex'

export default {

    computed : {
        ...mapState('search',[
            '_collegeDetailData'
        ])
    },


    methods : {
        onReplaceSpace(value) {
            return value.split(" ").join("+")
        },
    }
}
</script>

<style scoped>

.blog-link-wrapped {
    display: flex;
    padding: 16px 0px;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    overflow-x: scroll;
}

.ellipstis-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
}

</style>