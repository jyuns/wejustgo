<template>
    <div class='chat-room__container'>
        <div class='chat-room__title'>
            <div class='chat-room__content'>

                <a-badge  :dot="true" style='margin-right:8px;'>
                <div class="chat-room__logo"
                :style='{"background-image":"url(" + "https://wejustgos3.s3.ap-northeast-2.amazonaws.com/logo/"+ onReplaceSpace(_chatCurrentRoom.chatRoomNameEng) +"logo.jpg" + ")"}' />
                </a-badge>

                <p class='no-margin'>{{_chatCurrentRoom.chatRoomName}}</p>
<!-- 
                <p class='no-margin'>({{_chatCurrentMember}})</p>
                <div class='pointer' v-if='_user' @click='SET_BOOK_MARKED({user : _user.uid})'>
                    <a-icon type="star" v-if='_chatBookMarked' theme="filled" :style="{ fontSize: '14px', color: '#2a7ff6'}" style='margin-left:8px;'/>
                    <a-icon type="star" v-else :style="{ fontSize: '14px', color: '#2a7ff6'}" style='margin-left:8px;'/>
                </div>
-->
            </div>
            <a-button style='height:25px; padding:0 8px' @click='CHAT_EXIT'>나가기</a-button>
        </div>

        <a-divider style='height: .5px;'/>

        <div class='chat-room__message-container' :class='{"message-empty" : !_chatMessageList.length}'>
            <div class='chat__end'>
                <p v-if='!_chatMoreAvailable'>앗! 더 이상 메시지가 없어요!</p>
                <a-button v-else-if='_chatMoreAvailable * _chatMessageList.length' @click='CHAT_MORE_LOAD'>메시지 더 보기</a-button>
            </div>

            <div v-if='_chatMessageList.length'>
                <chat-message v-for='(chat, index) in _chatMessageList' :key='chat.id + index' :chat='chat' :diff='diff' :index='index' :user='_user'/>
            </div>

            <a-empty v-else>
                <span slot="description">아직 채팅이 없어요</span>
            </a-empty>
            
        </div>

        <div class='chat-room__form'>
            <p class='chat-room__user'>
                {{ _user != null ? _user.email : '비로그인 상태입니다'}}
            </p>
            <form class='chat-room__textarea-wrapped'>
                <textarea v-model='msg' @keyup.enter='onSubmitChat' class='chat-room__textarea'
                :disabled='_user != null ? false : true'/>
            </form>
        </div>

    </div>
</template>

<script>
import chatMessage from './chatMessage.vue'

import {mapState, mapMutations, mapActions} from 'vuex'
import moment from 'moment'

export default {

    data() {
        return {
            msg : '',
        }
    },

    computed : {

        ...mapState('chat', [
            '_chatMessageList',
            '_chatMessageList',
            '_chatLastIndex',
            '_chatMoreAvailable',
            '_chatTrigger',
            '_chatCurrentRoom',
            //'_chatBookMarked',
            //'_chatCurrentMember',
        ]),

        ...mapState('auth', [
            '_user',
        ]),

        diff() {
            
            if(this._chatMessageList.length > 0) {
                const tempArray = []

                // ! 날짜가 다른 구분자 추가
                this._chatMessageList.reduce( (n, o) => {
                    moment(n.timeStamp).format('YYYY-MM-DD') != moment(o.timeStamp).format('YYYY-MM-DD') ? tempArray.push(o.id) : null
                    return o
                })
            
                return tempArray
            }
        }
    },

    methods : {
        ...mapActions('chat', [
            'CHAT_EXIT',
            'CHAT_SUBMIT',
            'CHAT_MORE_LOAD',
        ]),

        ...mapMutations('chat', [
            //'SET_BOOK_MARKED'
        ]),

        async onSubmitChat() {
            
            if( this._user == null ) return
            
            const msg = this.msg
            this.msg = ''

            const result = await this.CHAT_SUBMIT({
                msg : msg,
                from : this._user.email,
                timeStamp : moment().valueOf()
            })

            // ? 자신이 채팅 입력하였을 때는, 아래로 Scroll Down
/**
 *             let height = document.querySelector('.chat-room__message-container').scrollHeight
            document.querySelector('.chat-room__message-container').scrollTop = height
 */
        },

        onReplaceSpace(value) {
            return value.split(" ").join("+")
        },
    },

    destroyed() {
        this.CHAT_EXIT()
    },

    components : {
        chatMessage,
    },
}
</script>

<style>
.chat-room__title {
    margin: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.chat-room__content {
    display:flex;
    align-items: center;
}

.chat-room__container {
    height: calc(100% - 95.9px);
}

.chat-room__message-container{    
    height: calc(100% - 201.5px);
    padding: 0 16px 16px 16px;
    overflow-y: scroll;
}

.chat__end {
    display:flex;
    flex-direction: column;
    align-items: center;

    margin:0 16px 16px 16px
}

.chat-room__form {
    position:absolute;
    bottom:0;
    width:100%;

    background: white;
    border-top: 1px solid #e8e8e8;
}

.chat-room__user {
    padding:0 16px;
    padding-top:16px;
}

.chat-room__textarea-wrapped {
    padding:0 16px;
    padding-bottom:16px;
}

.chat-room__textarea {
    background: #d1d1d1;
    resize: none;
    border: none;
    border-radius: 4px;
    outline: none;
    padding: 8px;
    width: 100%;
}

.message-empty {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>