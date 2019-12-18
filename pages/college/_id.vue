<template>
<div class='college-container'>
<div class='college-information__main-wrapped'>
        <college-main/>
    </div>

    <div class='college-information__summary-wrapped'>
        <summary-info/>
    </div>


    <div class='college-information__content-wrapped'>
        <div class='college-information__content college__width'>

            <div class='college__navigation-list-wrapped'>
                <a-anchor class='txt-bold txt-sm'>
                    <a-anchor-link href="#college-info" title="대학정보" />
                    <a-anchor-link v-if='_collegeDetailData.social.blog.length != 0' href="#blog-info" title="블로그 리뷰" />
                    <a-anchor-link v-if='_youtubeData.social.youtube.length != 0' href="#youtube-info" title="유튜브 리뷰"/>
                    <a-anchor-link v-if='_collegeDetailData.applyAvailable.applyCollegeSearchUrl.length &&  _collegeDetailData.applyAvailable.applyCollegeSearchUrl[0] != 0'
                    href="#college-review" title="더 많은 리뷰 보기" />
                    <a-anchor-link href="#review-general" title="종합 리뷰" />
                    <a-anchor-link href="#review-list" title="상세 리뷰" />
                </a-anchor>
            </div>

            <div class='college-information__content-block-wrapped'>
                <college-info id='college-info'/>
                <blog-info id='blog-info' />
                <youtube-info id='youtube-info' />
                <college-review v-if='_collegeDetailData.applyAvailable.applyCollegeSearchUrl.length &&  _collegeDetailData.applyAvailable.applyCollegeSearchUrl[0] != 0' id='college-review' />
                <review-general id='review-general' />

                <reviewEncourage/>

                <review-list id='review-list' />
            </div>

        </div>
    </div>
</div>
  
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  async asyncData(context) {
    // ? 초기 대학 디테일 정보 Fetch
    const collegeId = context.route.params.id

    const result = await context.store.dispatch('search/GET_COLLEGE_DATA', {id : collegeId })

    if(result) {
    await context.store.dispatch('review/FETCH_REVIEW', { collegeId : collegeId} )

    await context.store.dispatch('search/GET_YOUTUBE_DATA', 
        {code : await context.store.state.search._collegeDetailData.address.countryCode})

    await context.store.dispatch('search/GET_REGION_DATA', 
        {code : await context.store.state.search._collegeDetailData.address.regionCode})

    await context.store.dispatch('other/SKYSCANNER', 
        {countryCode : await context.store.state.search._collegeDetailData.address.countryCode})

    await context.store.dispatch('other/WEATHER', 
        {lat : await context.store.state.search._collegeDetailData.address.Latitude,
            lon : await context.store.state.search._collegeDetailData.address.Longitude})    
    }
  },


  computed:{
      ...mapState('search', [
          '_collegeDetailData',
          '_youtubeData'
      ])
  },

    methods : {
        ...mapActions('search', [
            "GET_COLLEGE_DATA"
        ])
    },

    components : {
        summaryInfo() {
            return import('../../components/collegeDetail/summaryInfo.vue')
        },

        collegeMain() {
            return import('../../components/collegeDetail/collegeMain.vue')
        },

        collegeInfo() {
            return import('../../components/collegeDetail/collegeInfo.vue')
        },

        blogInfo() {
            return import('../../components/collegeDetail/blogInfo.vue')
        },

        youtubeInfo() {
            return import('../../components/collegeDetail/youtubeInfo.vue')
        },

        collegeReview() {
            return import('../../components/collegeDetail/collegeReview.vue')
        },

        reviewGeneral() {
            return import('../../components/review/reviewGeneral.vue')
        },

        reviewEncourage() {
            return import('../../components/collegeDetail/reviewEncourage.vue')
        },

        reviewList() {
            return import('../../components/review/reviewList.vue')
        },
    }
}
</script>

<style scoped>

.college-conatiner {
    padding-bottom: 5em;
}

.college-detail-width {
    max-width: 1280px;
    width: 100%;
}


.college-information__main-wrapped {
    display:flex;
    justify-content: center;
}

.college-information__summary-wrapped {
    display:flex;
    justify-content: center;
    margin-bottom:32px;
}

.college-information__content-wrapped {
    display: flex;
    justify-content: center;
}

.college-information__content {
    justify-content: space-between;
    display: flex;

    width:100%;
    max-width:1280px;
}


.college__navigation-list-wrapped {
    position: sticky;
    z-index: 500;
    top: 80px;
    height:100px;
}

.college__navigation-list {
    padding : 0px;
    margin:0px;
}

.college__navigation {
    line-height: 25px;
    cursor: pointer;
}

.college__navigator {
    left: -15px;
    width: 6px;
    height: 6px;
    background: #2A7FF6;
    border-radius: 50%;
    position: absolute;
    top: 10px;
}

.college-information__content-block {
    box-shadow: rgba(0, 0, 0, 0.0980392) 0px 1px 4px, rgba(0, 0, 0, 0.0980392) 0px 0px 2px;
    max-width: 1080px;
    width: 100%;
    padding: 16px;
    margin-bottom: 32px;
}

.college__name-kor {
    margin-right: 8px;
}

.college__name-eng {
    margin-right: 16px;
}

.college__description {
    margin-right : 16px;
}

.college__rate {
    display: flex;
    align-items: center;
}

.college__review-num {
    color : #D1D1D1;
}

.ant-anchor-ink::before {
    background-color :white!important;
}
</style>