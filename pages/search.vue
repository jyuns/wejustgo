<template>
  <div>

      <div>
        <div style='display:flex; padding:18px; justify-content:center;'>
            <a-select defaultValue="전체" style="width: 100%; max-width:80px; margin-right:16px" @change="handleChange">
            <a-select-option value="대륙">대륙</a-select-option>
            <a-select-option value="국가">국가</a-select-option>
            <a-select-option value="학교">학교</a-select-option>
            </a-select>
            <a-input-search :defaultValue='_searchKeyword' placeholder="검색어를 입력해 주세요" style="width:100%; max-width:884px;" @search="onSearch" />
        </div>
      
      <div style='padding: 0 18px; display:flex; justify-content:center'>
        <a-select
            mode="multiple"
            style="max-width: 980px;
                   width: 100%;"
            @change="handleChange"
            placeholder="지원가능 학교를 선택해 주세요.">
            <a-select-option v-for="college in applyAvailableList" :key="college">{{college}}</a-select-option>
        </a-select>
      </div>

      </div>

  <div v-if='_searchResult != null' style='padding: 36px; display:flex; justify-content:center'>
  <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="_searchResult" style='width:100%; max-width:980px;'>
    <a-list-item slot="renderItem" slot-scope="item" key="item._id">
      
      <div style='color:rgba(0, 0, 0, 0.45);'>
      <a-icon type="star" style='margin-right: 8px;' />
        {{item.review.reviewRateAll}}점
      <a-divider type='vertical'/>
      <a-icon type="message" style='margin-right: 8px;' />
        {{item.review.reviewCount}}건
      </div>
      <img
        slot="extra"
        width="272"
        alt="logo"
        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
      />
      <a-list-item-meta :description="item.info">
        <a slot="title" :href="'/college/'+item._id">{{item.collegeKor + "(" +item.collegeEng + ")"}} </a>
      </a-list-item-meta>
      {{item.content}}
    </a-list-item>
  </a-list>
      </div>

      <div class='search__empty-wrapped' v-else>
          
      </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
      return {
        pagination: {
          pageSize: 10,
          current : 1,
          onChange : (page) => {
            this.pagination.current = page
          }
        },
        actions: [
          { type: 'star-o', text: '156' },
          { type: 'message', text: '2' },
        ],

        searchKeyword : '',
        searchType : '전체',

        applyAvailableList : [
          '중앙대', '아주대', '성균관대', '경희대', '고려대',
          '연세대', '경기대', '인하대', '숭실대'
        ]
      };
    },

    computed: {
      ...mapState('search', [
        '_searchKeyword',
        '_searchResult',
      ])
    },

    methods : {

      ...mapActions('search', [
        'ON_SEARCH'
      ]),

      handleChange(value) {
        this.searchType = value
      },

      async onSearch(value) {
        const result = await this.ON_SEARCH({
          type : this.searchType,
          keyword : value
        })
        if(result) this.pagination.current = 1
      },
    }
}
</script>

<style>
.ant-list-item-meta-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}

.search__empty-wrapped {
    height: calc(100vh - 169.98px)!important;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
</style>