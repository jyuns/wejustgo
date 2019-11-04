<template>
    <div class='summary-block-wrapped'>
        <div class='summary-block first'>
            <p class='txt-lg txt-bold no-margin'>날씨</p>
            <div class='summary-block-content'>
                <img class='summary-block-content__image' :src='require("../../static/icon/weather/" + _currentWeather.icon.icon + ".svg")'>
                <span class='summary-block-cotent__txt'>
                    <p class='txt-xl no-margin'>{{_currentWeather.icon.description}} {{_currentWeather.temp_current}}℃</p>
                    <p class='txt-2xs no-margin'>최저 {{_currentWeather.temp_min}}℃ / 최고 {{_currentWeather.temp_max}}℃</p>
                </span>
            </div>
        </div>

<!-- 
            <div class='summary-block'>
            <p class='txt-lg txt-bold no-margin'>환율</p>
            <div class='summary-block-content'>
                <span class='summary-block-cotent__txt' style='display: flex;align-items: center;'>
                    <p class='txt-xl no-margin'>1파운드 = {{addComma()}}원</p>
                </span>
            </div>
        </div>
-->


        <div class='summary-block'>
            <p class='txt-lg txt-bold no-margin'>안전도</p>
            <div class='summary-block-content'>
                <span class='summary-block-cotent__txt'>
                    <p class='txt-xl no-margin'>{{safety[_regionData.safety-1]}}</p>
                </span>
            </div>
        </div>

        <div class='summary-block last'>
            <p class='txt-lg txt-bold no-margin'>항공권</p>
            <div class='summary-block-content'>
                <span class='summary-block-cotent__txt'>
                    <p class='txt-xl no-margin'>편도 {{addComma(_skyscanner.MinPrice)}}원</p>
                </span>
            </div>
        </div>


    </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

export default {

    data() {
        return {
            safety : [
                '여행에 유의해요',
                '여행 자제해야 해요',
                '철수를 권고해요',
                '여행 금지 구역이에요!',
                '철수를 권고해요',
                '절대 가면 안돼요!'
            ]
        }
    },

    computed : {
        ...mapState('search', [
            '_regionData',
        ]),

        ...mapState('other', [
            '_skyscanner',
            '_currentWeather',
        ])
    },

    methods : {

        addComma(num) {
            var regexp = /\B(?=(\d{3})+(?!\d))/g;

            if(typeof num == 'string') {
                return num.replace(regexp, ',');
            } else if (typeof num == 'number') {
                return num.toString().replace(regexp, ',');
            }
        },
    },
}
</script>

<style>
.summary-block-wrapped {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 980px;
}

.summary-block {
    height:160px;
    box-shadow: rgba(0, 0, 0, 0.0980392) 0px 1px 4px, rgba(0, 0, 0, 0.0980392) 0px 0px 2px;
    border-radius: 4px;
    padding:16px;   

    display:flex;
    flex-direction: column;
    justify-content: space-between;
    width:100%;
    margin : 0 8px;
}

.summary-block.first {
    margin-left : 0px;
}

.summary-block.last {
    margin-right: 0px;
}

.summary-block-content {
    display:flex;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.summary-block-content__image {
    width: 100%;
    max-width: 80px;
    height: 80px;
}

.summary-block-content__txt {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
} 
</style>