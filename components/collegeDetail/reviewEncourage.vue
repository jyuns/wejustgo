<template>


<div class='college-information__content-block'>

    <div style='display:flex;flex-direction:column;align-items:center;padding:18px'>
    <p class='txt-bold txt-md' style='margin-bottom:.5em;'>{{_collegeDetailData.collegeKor}}에 대한 이야기를 나누어주세요</p>
    <a-rate
    style='font-size: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;'
    :defaultValue="3"
    @change="onMoveReview()" />
    </div>

</div>

</template>

<script>
import { mapState } from 'vuex'

export default {

    computed : {
        ...mapState('search', [
            '_collegeDetailData'
        ])
    },
    
    methods : {
        onMoveReview() {
            this.$router.push('/review-form/'+this._collegeDetailData._id)
        },
    }

}
</script>

<style>

</style>