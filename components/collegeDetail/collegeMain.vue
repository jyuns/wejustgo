<template>    
<div class='college-main-container'>
            <div class='college-background'
            :style='{"background-image":"url(" + "https://wejustgos3.s3.ap-northeast-2.amazonaws.com/background/"+ onReplaceSpace(_collegeDetailData.collegeEng) +".jpg" + ")"}'></div>

        <div class='college-information__main college__width'>

            <div class='default-padding flex-column'>
                <span class='flex-row margin-bottom'>
                    <p class='college__name-kor txt-lg txt-bold no-margin'>{{_collegeDetailData.collegeKor}}</p>
                    <a-divider type="vertical" />
                    <p class='college__name-eng txt-sm txt-bold no-margin'>{{_collegeDetailData.collegeEng}}</p>
                    <a-divider type="vertical" />
                    <p class='college__category no-margin txt-xs'>{{_collegeDetailData.address.continentKor}}
                        > {{_collegeDetailData.address.countryKor}}
                        > {{_collegeDetailData.address.regionKor}} </p>
                </span>

                <div class='flex-row'>
                    <span class='college__rate txt-sm no-margin'>
                        <a-icon type="star" theme='filled' style='color:#2A7FF6'/>
                        <span style='margin-left: 4px;'>{{(_collegeDetailData.review.reviewRateAll).toFixed(1)}}점</span>
                        <a-divider type='vertical'/>
                        <span>총 {{_collegeDetailData.review.reviewCount}} 건의 평가가 있습니다</span>
                    </span>
                </div>
            </div>

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
.college-background {
    background-size: cover;
    background-position: 50% 50%;
    height:400px
}

.college-main-container {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.college-information__main {
    max-width: 1280px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.0980392) 0px 1px 4px, rgba(0, 0, 0, 0.0980392) 0px 0px 2px;
    position: relative;
    bottom: 48px;
    background: white;
    margin: auto;
}

.college__rate {
    align-items: center;
    display: flex
}
</style>