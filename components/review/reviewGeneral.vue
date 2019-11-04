<template>

<div class='college-information__content-block'>
    <p class='txt-bold txt-xl no-margin'>종합 리뷰</p>
    <div class='review-general-wrapped'>
        <div class='review-general flex-row'>

            <div class='review-general__college'>
                <ul class='review-general__college-category'>
                    <li v-for='(college, index) in collegeCategory.slice(0,5)' :key='college.indicator'>
                        <a-tooltip placement="left" :title='college.description'>
                            <span class='no-margin txt-xs txt-bold pointer'>{{college.indicator}}</span>
                        </a-tooltip>
                        <div class='review-general__rate-wrapped'>
                        <span class='review-general__rate-bar-unit'>
                            <span class='review-general__rate-bar-value' :style="{'width':(_collegeDetailData.review['reviewRate'+index]*20)+'%'}"></span>
                        </span>
                        <span class='review-general__rate-txt txt-2xs'>{{(_collegeDetailData.review['reviewRate'+(index+5)]).toFixed(1)}}점</span>
                        </div>
                    </li>
                </ul>
            </div>

            <a-divider type='vertical' style='height:15em' />

            <div class='review-general__college'>
                <ul class='review-general__college-category'>
                    <li v-for='(college, index) in collegeCategory.slice(5,10)' :key='college.indicator'>
                        <a-tooltip placement="left" :title='college.description'>
                            <span class='no-margin txt-xs txt-bold pointer'>{{college.indicator}}</span>
                        </a-tooltip>
                        <div class='review-general__rate-wrapped'>
                        <span class='review-general__rate-bar-unit'>
                            <span class='review-general__rate-bar-value' :style="{'width':(_collegeDetailData.review['reviewRate'+(index+5)]*20)+'%'}"></span>
                        </span>
                        <span class='review-general__rate-txt txt-2xs'>{{(_collegeDetailData.review['reviewRate'+(index+5)]).toFixed(1)}}점</span>
                        </div>
                    </li>
                </ul>
            </div>

            <a-divider type='vertical' style='height:20em'/>

            <div class='review-general__wordcloud'>
                <img class='review-general__wordcloud-image' :src='require("../../static/image/college/wordcloud.png")'>
            </div>
        </div>
    </div>
</div>
</template>


<script>

import { mapState } from 'vuex'

export default {
    data() {
        return {
            collegeCategory : [
            {'indicator' : '학업', 'description': '강의의 질을 포함한 전반적 학업에 대한 평가'},
            {'indicator' : '학교생활',  'description': '유학생을 위한 교내 프로그램을 포함해 학교 생활에 대한 평가'},
            {'indicator' : '캠퍼스', 'description': '캠퍼스 내, 편의시설에 대한 평가'},
            {'indicator' : '숙소', 'description': '기숙사 시설에 대한 평가(기숙사가 없다면, 생활한 숙소)'},
            {'indicator' : '주변시설', 'description': '캠퍼스 밖, 편의시설에 대한 평가'},
            {'indicator' : '놀이문화', 'description': '파티 문화를 포함한 놀거리에 대한 평가'},
            {'indicator' : '여행', 'description': '해당 지역이 여행에 편리한 거점인지, 주변이 여행하기 좋은지에 대한 평가'},
            {'indicator' : '음식', 'description': '해당 지역의 음식의 맛이 입 맛에 맞는지에 대한 평가'},
            {'indicator' : '안전도', 'description': '해당 지역에 대한 안전도 평가'},
            {'indicator' : '물가', 'description': '국내와 비교하여 체감한 물가에 대한 평가'},
            ],
        }
    },

    computed : {
        ...mapState('search', [
            '_collegeDetailData'
        ]),
    },

    methods : {

    }
  
}
</script>

<style scoped>

.review-general-wrapped {
    padding: 16px 0;
}

.review-general__college {
    padding:8px;
}

.review-general {
    justify-content: space-between;
}

.review-general__wordcloud {
    padding:8px;
}

.review-general__college-category {
    margin:0;
    padding:0;
}


.review-general__rate-bar-unit {
    position: relative;
    width: 203px;
    height: 6px;
    background-color: #f3f3f4;
    border-radius: 3px;
    z-index: 1;
    display: flex;
    justify-content: space-between;
}

.review-general__rate-bar-value {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    height: 6px;
    background-color: #1890ff;
    border-radius: 3px;
}

.review-general__rate-wrapped {
    display: flex;
    margin-bottom: .8em;
    align-items: center;
    justify-content: space-college;
}

.review-general__rate-txt {
    margin-left: 8px;
}

.review-general__wordcloud {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.review-general__wordcloud-image {
    max-width: 200px;
    width: 100%;
}
</style>