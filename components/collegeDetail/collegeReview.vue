<template>
  <div class='college-information__content-block'>
    <p class='txt-bold txt-xl no-margin'>타 학교 리뷰</p>

    <div class='college-review-wrapped'>
        <a :href='Object.values(apply)[index]' v-for='(apply, index) in _collegeDetailData.applyAvailable.applyCollegeSearchUrl' :key='"apply" + index'>
            <a-tag color="blue">{{Object.keys(apply)[index]}}학교 리뷰 보러가기</a-tag> 
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
    }
}
</script>

<style scoped>

.college-review-wrapped {
    padding:16px 0;
}

</style>