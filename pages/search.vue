<template>
<div>

  <div style='display:flex; height:70px; justify-content:center; align-items:center;'>
    <div style='width:100%; max-width:1280px;'>
      <a-input-search :defaultValue='_searchKeyword' placeholder="검색어를 입력해 주세요" style="max-width:320px; margin-left: 200px; z-index:1000;" @search="onSearch" />
    </div>
  </div>


<div style='display:flex; justify-content:center;padding:16px;'>

<div v-if='_searchResult != null' class='search-condition'>
  <div>
    <p style='margin-bottom:.5em;'>대학별 지원가능 필터</p>
    <a-select
    mode="multiple"
    style="width: 100%;"
    @change="handleChange"
    placeholder="지원가능 학교를 선택해 주세요.">
    <a-select-option v-for="college in applyAvailableList" :key="college">{{college}}</a-select-option>
    </a-select>
  </div>
</div>

<div v-if='_searchResult != null' style='box-shadow: rgba(0, 0, 0, 0.0980392) 0px 1px 4px, rgba(0, 0, 0, 0.0980392) 0px 0px 2px; padding: 0 16px 16px 16px;
    max-width: 1012px;
    width: 100%;'>
  <div style='display:flex; justify-content:center'>
  <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="searchResultFiltered" style='width:100%; max-width:980px;'>
  <a-list-item slot="renderItem" slot-scope="item" key="item._id">

    <div style='margin-bottom:16px;'>
      <a-tag v-for='tag in item.applyAvailable.applyCollege' :key='tag + item.collegeEng'>{{tag}}</a-tag>
    </div>

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
  :src='"https://wejustgos3.s3.ap-northeast-2.amazonaws.com/background/"+ onReplaceSpace(item.collegeEng) +".jpg"'
  style='object-fit: cover; width: 280px; height: 200px;'
  />
  <a-list-item-meta :description="item.info">
  <a slot="title" :href="'/college/'+item._id">{{item.collegeKor + "(" +item.collegeEng + ")"}} </a>
  </a-list-item-meta>
  {{item.content}}
  </a-list-item>
  </a-list>
  </div>
</div>
<div class='search__empty-wrapped' v-else>
</div>

</div>

</div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
export default {
    data() {
      return {
        filter : null,
        pagination: {
          pageSize: 10,
          current : 1,
          onChange : (page) => {
            this.pagination.current = page
          }
        },

        searchKeyword : '',

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
      ]),

      searchResultFiltered() {

        let filter = this.filter

        if(!filter || filter.length == 0) {
          return this._searchResult
        } else {
          return this._searchResult.filter( (value) => {
            return value.applyAvailable.applyCollege.some( (deepValue) => {
              return this.filter.indexOf(deepValue) >= 0
            })
          })
        }
      },
    },

    methods : {

      ...mapActions('search', [
        'ON_SEARCH'
      ]),

      handleChange(filterValue) {
        this.filter = filterValue
      },

      onReplaceSpace(value) {
          return value.split(" ").join("+")
      },
    
      async onSearch(value) {
        const result = await this.ON_SEARCH({
          type : '',
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

.search-condition {
  max-width: 240px;
  width: 100%;
  padding: 16px;
  height: 100%;
  max-height: 600px;
  min-height: 100px;
  position: sticky;
  top: 80px;
  margin-right: 32px;
  box-shadow: rgba(0, 0, 0, 0.0980392) 0px 1px 4px, rgba(0, 0, 0, 0.0980392) 0px 0px 2px;
}
</style>