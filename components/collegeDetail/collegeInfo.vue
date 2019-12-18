<template>

<div class='college-information__content-block'>
        <p class='txt-bold txt-xl no-margin'>대학정보</p>

        <div>
        <p class='college-content-block-sub-content txt-xs no-margin'>
            {{_collegeDetailData.info}}
        </p>
        
    <div>
        <p class='college-content-block-sub-title txt-sm txt-bold no-margin'>
            {{_collegeDetailData.address.location}}
            <a :href="_collegeDetailData.url.interUrl">
            <button class='college-website-btn txt-xs'>웹사이트 바로가기</button>
            </a>
        </p>

    <div id="map-wrap" style="height: 250px; width: 100%;">
      <no-ssr>
        <l-map :zoom="13" :center="[_collegeDetailData.address.Latitude, _collegeDetailData.address.Longitude]">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
          <l-marker :lat-lng="[_collegeDetailData.address.Latitude, _collegeDetailData.address.Longitude]"></l-marker>
        </l-map>
      </no-ssr>
    </div>

    </div>

        <p class='college-content-block-sub-title txt-sm txt-bold no-margin'>지원가능학교</p>
        <div class='college-possible-list-wrpped'>
            <span class='college-possible-list txt-xs'
            v-for='(apply, index) in _collegeDetailData.applyAvailable.applyCollege' :key='"apply" + index'>
            {{apply}}</span>
        </div>
    </div>

</div>
</template>

<script>
import {mapState, mapGetter} from 'vuex'

export default {

    data() {
        return {

        }
    },

    computed: {
        ...mapState('search',[
            '_collegeDetailData'
        ])
    },

    method: {
        onLocation() {

        }
    },

}
</script>

<style>

.college-content-block-sub-content {
    padding :16px 0 8px 0px;
    color: #464646;
}

.college-content-block-sub-title {
    padding : 8px 0px;
    display: flex;
    justify-content: space-between;
    color: #464646;
}

.college-website-btn {
    background: white;
    width: 140px;
    height: 25px;
    border: 2px solid #2A7FF6;
    border-radius: 4px;
    color: #2A7FF6;
    font-weight: 700;
    cursor: pointer;
    margin-left: 16px;
}

.college-website-btn:hover {
    background-color : #2A7FF6;
    color:white;
}  

.college-possible-list {
    background: white;
    border-radius: 500rem;
    padding: 0px 8px;
    display: inline-block;
    margin-right: 8px;
    text-align: center;
    cursor:pointer;
    border: 1px solid #bbc5d8;
    color: #28323c;
}

.college-possible-list:hover {
    color : #2A7FF6;
    border-color : #2A7FF6;
}


</style>