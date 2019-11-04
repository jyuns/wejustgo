<template>
  <div class='review-form-container'>

    <a-alert v-if='_reviewError.length' :message="_reviewError" type="error" showIcon closable @close="REVIEW_ERROR('')" 
    style="position:absolute; top:120px; max-width:450px; width:100%; z-index:1;"/>


    <div class='review-form-wrapped'>

    <form @submit='onSubmitReview' class='review-form'>

      <div class='review-form__title' style='display:flex; justify-content:space-between;'>
        <p class='txt-lg txt-bold no-margin'>{{_collegeDetailData.collegeKor}}에 언제 방문하셨나요?</p>
        <a-select v-decorator="['reviewYear']" :defaultValue="yearList" @change='handleReviewYear' style="width: 120px">
          <a-select-option v-for='year in yearList' :key='year' :value='year'>{{year}}</a-select-option>
        </a-select>
      </div>


      <div class='review-form__title' style='display: flex; align-items: center; justify-content: space-between;'>
        <p class='txt-lg txt-bold no-margin'>{{_collegeDetailData.collegeKor}}에 대한 리뷰를 남겨주세요</p>
        <p class='txt-xs no-margin'>{{ maxReviewText() }}/100</p>
      </div>

      <div>
        <textarea v-model='reviewText' class='review-form__textarea' placeholder="100자 이상의 리뷰를 남겨주세요" :rows="4"
        autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
      </div>
      
      <div class='review-form__title'>
        <p class='txt-lg txt-bold no-margin'>{{_collegeDetailData.collegeKor}}에 대한 별점을 평가해 주세요</p>
        <p class='no-margin txt-2xs' style='color:#d1d1d1; margin-top:.5em;'>
          <a-icon type="question-circle" style='margin-right:8px; color:#d1d1d1;'/>마우스를 대면 지표에 대한 설명이 보여요!</p>
      </div>
  
        <div class='review-form__rate-list-wrapped'>
            <div class='review-form__rate-list'>
                <div class='review-form__rate' v-for='(rate, index) in reviewRate.slice(0,5)' :key='rate["review"+index].indicator'>
                  <a-tooltip placement="left" :title='rate["review"+index].description'>
                    <span class='no-margin review-form__rate-description txt-md txt-bold pointer'>{{rate["review"+index].indicator}}</span>
                  </a-tooltip>
                  
                  <div>
                    <a-rate v-model='rate["review"+index].value' style='fontSize:24px;'/>
                    <div class="ant-rate-text txt-xs">{{desc[rate["review"+index].value]}}</div>
                  </div>

                </div>
            </div>

            <a-divider type="vertical" style="height:24em;"/>

            <div class='review-form__rate-list'>
                <div class='review-form__rate' v-for='(rate, index) in reviewRate.slice(5,10)' :key='rate["review"+(index+5)].indicator'>
                  
                  <a-tooltip placement="left" :title='rate["review"+(index+5)].description'>
                    <span class='no-margin review-form__rate-description txt-md txt-bold pointer'>{{rate["review"+(index+5)].indicator}}</span>
                  </a-tooltip>
                  
                  <div>
                    <a-rate v-model='rate["review"+(index+5)].value' style='fontSize:24px;'/>
                    <div class="ant-rate-text txt-xs">{{desc[rate["review"+(index+5)].value]}}</div>
                  </div>
                  
                </div>
            </div>
        </div>

        <div class='review-form__submit'>
          <a-button type="primary" @click='onSubmitReview'>작성완료</a-button>
        </div>
    </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  validate({params}) {
    return /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(params.id)
  },

  async asyncData(context) {
    await context.store.dispatch('search/GET_COLLEGE_DATA', {
      id : context.route.params.id
    })
  },

  data() {
    return {
        desc: ['선택해 주세요', '최악이에요!', '나빠요!', '그냥 그래요', '좋아요!', '환상이에요!'],

        reviewRate : [
          { 'review0' : {'indicator' : '학업', 'value' : 0, 'description': '강의의 질을 포함한 전반적 학업에 대한 평가'}},
          { 'review1' : {'indicator' : '학교생활', 'value' : 0, 'description': '유학생을 위한 교내 프로그램을 포함해 학교 생활에 대한 평가'}},
          { 'review2' : {'indicator' : '캠퍼스', 'value' : 0, 'description': '캠퍼스 내, 편의시설에 대한 평가'}},
          { 'review3' : {'indicator' : '숙소', 'value' : 0, 'description': '기숙사 시설에 대한 평가(기숙사가 없다면, 생활한 숙소)'}},
          { 'review4' : {'indicator' : '주변시설', 'value' : 0, 'description': '캠퍼스 밖, 편의시설에 대한 평가'}},
          { 'review5' : {'indicator' : '놀이문화', 'value' : 0, 'description': '파티 문화를 포함한 놀거리에 대한 평가'}},
          { 'review6' : {'indicator' : '여행', 'value' : 0, 'description': '해당 지역이 여행에 편리한 거점인지, 주변이 여행하기 좋은지에 대한 평가'}},
          { 'review7' : {'indicator' : '음식', 'value' : 0, 'description': '해당 지역의 음식의 맛이 입 맛에 맞는지에 대한 평가'}},
          { 'review8' : {'indicator' : '안전도', 'value' : 0, 'description': '해당 지역에 대한 안전도 평가'}},
          { 'review9' : {'indicator' : '물가', 'value' : 0, 'description': '국내와 비교하여 체감한 물가에 대한 평가'}},
        ],

        reviewText : '',
        reviewYear : '',

        yearList : []
      };

  },

  mounted() {

    //? create 파견년도 select option

    var current = new Date()
    this.reviewYear = moment(current).format('YYYY') + "년도"

    for( var i = 0; i < 10; i ++) {
      this.yearList.push(moment(current).subtract(i, 'year').format('YYYY') + '년도')
    }
  },

  computed : {
    ...mapState('search', [
      '_collegeDetailData'
    ]),

    ...mapState('review', [
      '_reviewError'
    ]),

    ...mapState('auth', [
      '_user'
    ])
  },

  methods: {
    ...mapMutations('review', [
      'REVIEW_ERROR'
    ]),
    ...mapActions('review', [
      'SUBMIT_REVIEW'
    ]),

    handleReviewYear(value) {
      this.reviewYear = value
    },

    async onSubmitReview() {

      var textResult = await this.reviewText.length >= 100
    
      var rateResult = await this.reviewRate.every( n => {
        return n.value != 0
      })

      if(!textResult && !rateResult) {
        this.REVIEW_ERROR('리뷰와 별점을 작성해 주세요')
      } else if (!textResult && rateResult) {
        this.REVIEW_ERROR('리뷰를 작성해 주세요')
      } else if (textResult && !rateResult) {
        this.REVIEW_ERROR('별점을 작성해 주세요')
      } else {
        
        // ? 로딩 시작
        this.$nuxt.$loading.start

/**     const reviewRate = this.reviewRate
       ? description 제거
        for( var i in reviewRate) {
            reviewRate[i].description = undefined
            delete reviewRate[i].description
        }
 */
        const result = await this.SUBMIT_REVIEW({
          reviewText : this.reviewText,
          reviewRate : this.reviewRate,
          reviewYear : this.reviewYear,

          writer : this._user.uid,
          writeTime : moment().valueOf(),

          collegeId : this._collegeDetailData._id
        })

        if(result) {

          // ? 로딩 종료
          this.$nuxt.$loading.finish

          return this.$router.back()
        }
      }
    },

    maxReviewText() {
      return this.reviewText.length <= 100 ? this.reviewText.length : 100 
    }
  },
}
</script>

<style>
.review-form-container {
  display:flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 70px);
}

.review-form__title {
  width:100%;
  padding :18px 0px;
  max-width:600px;
}

.review-form-wrapped {
  width:100%;
  border: 1px solid #e8e8e8;
  padding : 18px;
  max-width:600px;
}

.review-form__submit {
  display: flex;
  justify-content: flex-end;
  margin: 16px 0 8px 0;
}

.review-form__rate{
  margin-bottom:1em;
  max-width: 250px;
  min-width:250px;
  width: 100%;
}

.review-form__rate-list-wrapped {
  display:flex;
  justify-content:space-between;
  align-items: center;
}

.review-form__textarea {
  height: auto;
  margin-bottom: 4px;
  overflow: auto;
  resize: vertical;
  touch-action: manipulation;
  max-width: 100%;
  height: auto;
  min-height: 32px;
  vertical-align: bottom;
  -webkit-transition: all 0.3s, height 0s;
  transition: all 0.3s, height 0s;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum', "tnum";
  position: relative;
  display: inline-block;
  width: 100%;
  height:140px;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

textarea::placeholder  {
  color:#d1d1d1;
}
</style>
