<template>
<div> 
        <div class='random-recommend-container' :style="{'background' : 'url(' + require('../static/image/background/' + currentBackground.countryCode + 'Background.jpg') + ')'}">
            <div class='random-recommend'>
                
                <div class='random-recommend__content-wrapped'>

                    <div class='random-recommend__content'>
                        <!-- 나라명 변경에 따라 사진, 국가명, 기타정보 등 변경되도록 정의 -->
                        <p class='txt-2xl txt-bolder txt-shadow' style="margin-bottom: 0;">교환학생, {{currentBackground.countryKor}}으로 가볼까?</p>
                        <p class='random-recommend__more-btn pointer txt-xs' style='margin-bottom:0;' @click='onSearchBtn()'>더 알아보기</p>

                    </div>

                </div>


                <div class='random-recommend__summary-wrapped txt-shadow'>

                    <a-icon type="clock-circle"/>
                    <span class='random-recommend__summary-txt'>{{currentTime}}</span>

                    <a-divider type="vertical" />
                    <img class='random-recommend__summary-icon pointer' :src='planeIcon'/>
                    <a-tooltip placement="left" title="스카이스캐너 현재 날짜 기준, 국내에서 해당국가까지의 최저 편도 요금입니다." :getPopupContainer="getPopupContainer">
                      <span class='random-recommend__summary pointer'>편도 {{addComma(skyscanner.MinPrice)}}원</span>
                    </a-tooltip>

                </div>
                <a-input-search style="max-width:600px; width:100%; margin-top:16px;" @search="onSearchInput" size=large />
        
        <div class='continent-quick__info no-margin txt-sm'>

          <div class='continent-quick__list-wrapped' :class='{"show":quickDisplay}'>
            <span class='continent-quick__list txt-2xs pointer' v-for='continent in continentList' :key='continent.nameEng'
            @click='onSearchQuick(continent.searchValue)'>
              <img class='continent-quick__icon' :src="require('../static/icon/continent/' + continent.nameEng + '.svg')" >
              {{continent.nameKor}}
            </span>
          </div>
          
          <p class='no-margin pointer' @click='quickDisplay = !quickDisplay'>
            대륙별 모아보기&nbsp;&nbsp;<a-icon class='txt-xs' :type=" (quickDisplay ? 'left' : 'right' ) + '-square'" />          
          </p>

        </div>

            </div>
        </div>

        <p class='random-recommend__info no-margin'>
            <a-icon type="caret-down" /> {{currentBackground.description}}
        </p>

<!--
        <div class='quick__continent-wrapped'>
        <div class='quick__continent'>

            <p class='quick__continent-title txt-lg txt-bold'>대륙별 학교 보기</p>

                <div class='quick__continent-list-wrapped'>
                    <div class='quick__continent-list' v-for='continent in continentList.slice(0, 3)' :key='continent.nameEng' :id='continent.nameEng'
                        z
                        <p class='quick__continent-txt  txt-bold txt-md'>{{continent.nameKor}}</p>
                        <div class='quick__continent-white'></div>
                    </div>
                </div>

                <div class='quick__continent-list-wrapped'>
                    <div class='quick__continent-list' v-for='continent in continentList.slice(4, 6)' :key='continent.nameEng' :id='continent.nameEng'
                        :style="{'background' : 'url(' + require('/image/continent/' + continent.nameEng + '.jpg') + ')'}">
                        <p class='quick__continent-txt  txt-bold txt-md'>{{continent.nameKor}}</p>
                        <div class='quick__continent-white'></div>
                    </div>
                </div>

        </div>
        </div>

-->

</div>
</template>


<script>
import moment from 'moment'
import {mapActions} from 'vuex'

export default {
  data() {
      return {
          // * 총 5개의 background
          backgroundList : [
            { 'timezone' : 'Europe/London', 'countryCode' : 'UK', 'countryKor': '영국', 'countryEng':'United Kingdom',  'description' : '영국에서 축구 직관하기' },
            { 'timezone' : 'Australia/Sydney', 'countryCode' : 'AU', 'countryKor': '호주', 'countryEng':'Australia', 'description' : '호주 오페라 하우스 앞에서 인생사진 찍기' },
            { 'timezone' : 'Europe/Berlin', 'countryCode' : 'DE', 'countryKor': '독일', 'countryEng':'Germany', 'description' : '독일 옥토페스트에서 진탕 맥주 마시기' },
            { 'timezone' : 'Asia/Ho_Chi_Minh', 'countryCode' : 'VN', 'countryKor': '베트남', 'countryEng':'Vietnam', 'description' : '베트남에서 배터지게 쌀국수 먹기' },
            { 'timezone' : 'America/Mexico_City', 'countryCode' : 'MX', 'countryKor': '멕시코', 'countryEng':'Mexico', 'description' : '멕시코 거대 그리스도 상 한 화면에 담아보기' },
            { 'timezone' : 'America/Toronto', 'countryCode' : 'CA', 'countryKor': '캐나다', 'countryEng':'Canada', 'description' : '캐나다 나이아가라 폭포에서 배 타보기' },
          ],

            continentList : [
                {'nameKor':'아시아', 'nameEng':'asia', 'searchValue':'아시아'},
                {'nameKor':'동남아', 'nameEng':'east-asia', 'searchValue':'동남아'},
                {'nameKor':'유럽', 'nameEng':'europe', 'searchValue':'유럽'},
                {'nameKor':'대양주', 'nameEng':'oceania', 'searchValue':'오세아니아'},
                {'nameKor':'북미', 'nameEng':'north-america', 'searchValue':'북아메리카'},
                {'nameKor':'남미', 'nameEng':'south-america', 'searchValue':'남아메리카'},
                {'nameKor':'아프리카', 'nameEng':'africa', 'searchValue':'아프리카'},
            ],


          autoSearchResult : [],
          skyscanner : '',
          currentTime : '',
          countdown : '',

          currentBackground : '',
          quickDisplay:false,
      }
  },

  methods : {

      ...mapActions('other', [
          'SKYSCANNER',
          'TIMEZONE',
      ]),

      ...mapActions('search', [
        'ON_SEARCH'
      ]),

      async onSearchInput(value) {
        const result = await this.ON_SEARCH({type : "전체", keyword : String(value)})
        if(result) this.$router.push('/search')
      },

      addComma(num) {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;

        if(typeof num == 'string') {
            return num.replace(regexp, ',');
        } else if (typeof num == 'number') {
            return num.toString().replace(regexp, ',');
        }
      }, 

      async onSearchQuick(e) {
        const result = await this.ON_SEARCH({type : "대륙", keyword : e})
        if(result) this.$router.push('/search')
      },

      async onSearchBtn() {
        const result = await this.ON_SEARCH({type : "국가", keyword : this.currentBackground.countryKor})
        if(result) this.$router.push('/search')
      },

      getPopupContainer(trigger) {
        return trigger.parentElement;
      },
  },

  created() {
    this.currentBackground = this.backgroundList[Math.abs(Math.floor(Math.random() * 10) - 4)]
  },


  // ! 추후 asyncData로 변경할 것
  async mounted() {

    this.skyscanner = await this.SKYSCANNER({
        countryCode : await this.currentBackground.countryCode
    })
 
    const timezoneResult = await this.TIMEZONE({
        timezone : await this.currentBackground.timezone
    })

    this.countdown = setInterval(async ()=> {
        this.currentTime = await timezoneResult.add(1, 'seconds')
    },1000)

      // ! free api 찾아서 연동시키기
      //this.currency = await this.CURRENCY()
  },

  computed : {
      currencyIcon() {
        return require('../static/icon/currency-icon.svg')
      },

      planeIcon() {
        return require('../static/icon/plane-icon.svg')
      }
  },

  destroyed() {
    clearInterval(this.countdown)   
  }
}
</script>

<style scoped>

.random-recommend-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover!important;
  background-position: 50% 35%!important;

  height: 100vh;
}

.random-recommend {
    max-width:980px;
    width : 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding:16px;
    color:white;

    position:relative;
}

.random-recommend__content {
    display:flex;
    align-items: flex-end;
    justify-content: space-between;
    width:100%;
}

.random-recommend__content-wrapped {
    display:flex;
    max-width:600px;
    width:100%;
}

.random-recommend__more-btn {
  background:transparent;
  border: 1px solid white;
  padding: 4px;
  border-radius: 4px;
}
.random-recommend__more-btn:hover {
  background: rgba(0,0,0,.5);
}

.random-recommend__info {
  bottom: 2em;
  right: 2em;
  display: flex;
  position: absolute;
  color: white;
  align-items: center
}

.continent-quick__info {
  margin-top: 16px;
  max-width:600px;
  height:50px;
  width:100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
}


.random-recommend__summary-icon {
    width:20px;
    height:20px;
    margin-right:4px;
}

input {
    border:0;
}


  .ant-carousel >>> .slick-slide {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }

  .ant-carousel >>> .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
  }
  .ant-carousel >>> .custom-slick-arrow:before {
    display: none;
  }
  .ant-carousel >>> .custom-slick-arrow:hover {
    opacity: 0.5;
  }

  .ant-carousel >>> .slick-slide h3 {
    color: #fff;
  }

.random-recommend__summary-wrapped {
  width: 100%;
  max-width: 600px;
}

.continent-quick__icon {
  width:25px;
  height: 25px;
}

.continent-quick__list {
  background: rgba(0,0,0,.5);
  border-radius: 4px;
  height: 50px;
  width: 50px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items:center;
  margin: 0 6px;
}


.continent-quick__list:hover {
  background: rgba(0,0,0,.3);
}

.continent-quick__list-wrapped {

  opacity: 0;
  display: none;
  transform: translateX(-300px);
  scroll-behavior: smooth;
  transition: .4s cubic-bezier(.22,.61,.36,1);
}

.continent-quick__list-wrapped.show {
  opacity:1!important;
  display:flex!important;
  transform: translateX(0px)!important;
  scroll-behavior: smooth;
  transition: .4s cubic-bezier(.22,.61,.36,1);
}
</style>