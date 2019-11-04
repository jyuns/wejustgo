<template>

<div class='college-information__content-block'>
  <span class='college-information__title flex-row' style='justify-content: space-between;'>
    <p class='txt-bold txt-xl no-margin'>상세 리뷰</p>
    <a-button type="primary" :disabled='_user==null' @click="onMoveReview()">
      <a-icon type="form" />리뷰 쓰기</a-button>
  </span>

  <a-list itemLayout="horizontal" :dataSource="reviewLimitList">
  <a-list-item slot="renderItem" slot-scope="item, index">
    <a-list-item-meta :description="item.reviewText">
      <a slot="title">
        {{item.reviewYear + ' 파견'}}
        <a-divider type='vertical' />
        <a-icon type="star" theme='filled' style='color:#2A7FF6'/>
        {{onSumRate(item)}}점
        <a-divider type='vertical' />
        {{onChangeTime(item.writeTime)}}
        </a>
    </a-list-item-meta>
  </a-list-item>
</a-list>

  <div style='display:flex; justify-content:center;'>
    <a-button style='margin:8px 0;' @click='onLoad()'
    v-if='_reviewList.length != reviewLimitList.length'>더 보기</a-button>
  </div>

</div>
</template>
<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      limit : 5,
    };
  },

  computed : {
    ...mapState('search', [
      '_collegeDetailData'
    ]),

    ...mapState('auth', [
      '_user'
    ]),

    ...mapState('review', [
      '_reviewList'
    ]),

    reviewLimitList() {
      return this._reviewList.slice(0, this.limit)
    }
  },
  mounted() {

  },
  methods: {
    onMoveReview() {
      this.$router.push('/review-form/'+this._collegeDetailData._id)
    },

    onChangeTime(value) {
      const diff = moment(Number(value)).diff(moment(new Date()), 'days')        
      if(diff == 0) return '오늘'
      else if(diff != 0) return diff + "일 전"
      
    },

    onSumRate(item) {
      let sum = 0
      for(var i = 0 ; i < 10; i++) {
        sum = Number(item['reviewRate'+i].value) + sum
      }
      return (sum/10).toFixed(1)
    },

    onLoad() {

      if(this.reviewLimitList.length == this._reviewList.length) return
      this.limit = this.limit + 5

    }
  },
};
</script>
<style>
.demo-loadmore-list {
  min-height: 350px;
}


.college-information__review-btn:hover {
  background-color : #2A7FF6;
  color:white;
}
</style>