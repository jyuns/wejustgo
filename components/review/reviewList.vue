<template>

<div class='college-information__content-block'>
  <span class='college-information__title flex-row' style='justify-content: space-between;'>
    <p class='txt-bold txt-xl no-margin'>상세 리뷰</p>
  </span>

  <a-list itemLayout="horizontal" :dataSource="reviewLimitList">
  <a-list-item slot="renderItem" slot-scope="item, index">
    <a-list-item-meta :description="item.reviewText">
      <a slot="title" style='display:flex;justify-content:space-between;'>
        <div>
          <a-avatar shape="square" :size="32" icon="user" style='margin-right:4px;' />
          {{item.reviewYear + ' 파견'}}
          <a-divider type='vertical' />
          {{onChangeTime(item.writeTime)}}
        </div>

        <div class='txt-md'>
          <a-icon type="star" theme='filled' style='color:#2A7FF6'/>
          {{onSumRate(item)}}점
        </div>
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
      return this._reviewList.reverse().slice(0, this.limit)
    }
  },
  mounted() {

  },
  methods: {

    onChangeTime(value) {
      const diff = moment(Number(value)).diff(moment(new Date()), 'days')        
      if(diff == 0) return '오늘'
      else if(diff != 0) return Math.abs(diff) + " 일 전"
      
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