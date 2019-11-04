<template>
    <div>

    <div class='chat__search'>
        <a-auto-complete
        :dataSource="dataSource"
        style="max-width: 300px; width:100%;"
        @select="onSelect"
        @search="handleSearch"
        placeholder="학교 검색하기"
        />
    </div>

    <a-divider/>

    <div class='chat__list'>

<!-- 
        <div class='chat__own-list' v-if='_user'>
            <span class='chat__list-txt-wrapped'>
                <p class='chat__list-txt txt-bold'>내 채팅 목록</p>
                <a-icon class='pointer' style="margin-left:8px;" :type='"caret-"+(ownChatDisplay ? "up" : "down")'
                @click='onChatDisplay("ownChatDisplay")'/>
            </span>

            <div class='chat__room-list-wrapped' v-show='ownChatDisplay'>

                    <div class='chat__room-list'>
                        <a-badge  :dot="true">
                            <span class="chat__room-logo" />
                        </a-badge>

                        <div class='chat__room-content'>
                            <div class='chat__room-title'>
                                <p class='no-margin txt-xs'>하버드대학교</p>
                                <p class='no-margin txt-2xs'>&nbsp; (99)</p>
                            </div>
                            <p class='no-margin txt-2xs'>
                                안녕하세요, 조윤성입니다.
                            </p>
                        </div>
                    </div>
                
            </div>

        </div>

        <a-divider v-if='_user'/>
-->

        <div class='chat__popular-list'>
            <span class='chat__list-txt-wrapped'>
                <p class='chat__list-txt txt-bold'>인기 채팅 목록</p>
                <a-icon class='pointer' style="margin-left:8px;" :type='"caret-"+(popularChatDisplay ? "up" : "down")'
                @click='onChatDisplay("popularChatDisplay")'/>
            </span>

            <div class='chat__room-list-wrapped' v-show='popularChatDisplay'>

                    <div class='chat__room-list'>
                        <a-badge  :dot="true">
                            <span class="chat__room-logo" />
                        </a-badge>

                        <div class='chat__room-content'>
                            <div class='chat__room-title'>
                                <p class='no-margin txt-xs'>하버드대학교</p>
                                <p class='no-margin txt-2xs'>&nbsp; (99)</p>
                            </div>
                            <p class='no-margin txt-2xs'>
                                안녕하세요, 조윤성입니다.
                            </p>
                        </div>
                    </div>

            </div>
        </div>

        <a-divider/>

    </div>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

  export default {
    data() {
      return {
        dataSource: [],
        dataRaw : [],
        ownChatDisplay : true,
        popularChatDisplay : true,
      };
    },

    computed : {
        ...mapState('auth', [
            '_user'
        ]),
    },
    
    methods: {

    ...mapActions('chat', [
        'FETCH_AUTO_COLLEGE_LIST',
        'CHAT_ENTER',
    ]),

    async handleSearch(value) {
        const result = await this.FETCH_AUTO_COLLEGE_LIST({
            value : value
        })

        this.dataSource = result.dataList
        this.dataRaw = result.dataRaw
    },

    async onSelect(value) {
        let temp = null

        this.dataRaw.reduce( (acc, cur) => {
            value == cur.collegeKor + "(" + cur.collegeEng + ")" ? (temp = cur) : null 
        }, value)

        this.CHAT_ENTER({
            chatRoomId : temp._id,
            chatRoomName : temp.collegeKor
        })
    },

    onChatDisplay(value) {
        if(value == 'ownChatDisplay') {
            this.ownChatDisplay = !this.ownChatDisplay
        } else {
            this.popularChatDisplay = !this.popularChatDisplay
        }
    }
    },
  };
</script>
<style>

.chat__search {
    display:flex;
    justify-content: center;
}

.chat__list-txt {
    margin-left : 16px;
    margin-bottom : 0;
}

.chat__list-txt-wrapped {
    display:flex;
    align-items: center;
    margin-bottom: 1em;
}

.chat__room-list {
    display:flex;
    padding: 8px 16px;
    align-items: center;
}

.chat__room-logo {
    width: 42px;
    height: 42px;
    border-radius: 4px;
    background: #eee;
    display: inline-block;
}

.chat__room-title {
    display: flex;
    align-items: center;
}

.chat__room-content {
    margin-left : 8px;
}

.ant-badge-dot {
background: #00B14A;
}

.chat__room-list-wrapped {
    max-height:600px;
    overflow-y: scroll;
}
</style>