<template>

<div class='college-information__content-block'>
    <p class='txt-bold txt-xl no-margin'>유튜브 리뷰</p>
    <div class='youtube-link-wrapped'>
    

<a v-for='youtube in _youtubeData.social.youtube' :key='youtube.youtubeUrl' :href="+youtube.youtubeUrl">
<a-card hoverable style="width:240px; margin:0 8px;">
<img
alt="example"
style='max-height: 125px;'
:src="youtube.youtubeImage"
slot="cover"
/>
<a-card-meta class='ellipstis-text' :title="youtube.youtubeTitle" :description="youtube.youtubeDescription">
</a-card-meta>
</a-card>
</a>   
    </div>
    
</div>
</template>

<script>

import {mapState} from 'vuex'

export default {

    data() {
        return {

        }
    },

    computed : {
        ...mapState('search',[
            '_youtubeData'
        ])
    },
  
}
</script>

<style scoped>

.youtube-link-wrapped {
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