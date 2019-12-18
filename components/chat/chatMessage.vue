<template>
    <div class='chat-message' :class='onTypeClass()'>
        <a-divider style='font-size:12px!important;' v-show='onDiffDate(chat.id) + (index == 0)'>{{ changeDateFormat }}</a-divider>
        <p class='chat-user-name txt-xs no-margin'>{{chat.from}}</p>
        <div class='chat-message-wrapped txt-xs'>
            <p v-if='onTypeBoolean()' class='chat-message-timestamp no-margin txt-xs'
            :class='onTypeClass()'>{{changeTimeFormat}}</p>
            <span class='chat-message__content txt-xs' :class='onTypeClass()'>{{chat.msg}}</span>
            <p v-if='!onTypeBoolean()' class='chat-message-timestamp no-margin txt-xs'
            :class='onTypeClass()'>{{changeTimeFormat}}</p>
        </div>
    </div>
</template>

<script>

import moment from 'moment'

export default {
    props : ['chat', 'index', 'diff', 'user'],

    computed : {
        changeTimeFormat() {
            return moment(this.chat.timeStamp).format('HH:mm')
        },

        changeDateFormat() {
            return moment(this.chat.timeStamp).format('YYYY-MM-DD')
        }
    }, 

    mouted() {
    },

    methods : {
        onDiffDate(value) {
            
            let temp = null
            
            this.diff.forEach( (e) => {
                if( e == value) {
                    temp = true
                }
            })

            return temp
        },

        onTypeClass() {
            if(this.user == null) return "other"
            return this.user.email == this.chat.from ? "own" : "other"
        },

        onTypeBoolean() {
            if(this.user == null) return false
            return this.user.email == this.chat.from? true:false
        },
    },
}
</script>

<style scoped>
.chat-user-name {
    padding-bottom:4px;
}  

.chat-message.own {
    padding-bottom: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.chat-message.other {
    padding-bottom: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.chat-message-wrapped {
    display: flex;
    align-items: flex-end;
    max-width: 270px;
    justify-content: flex-end;
}

.chat-message__content.own {
    max-width: 270px;
    padding : 6px;
    border-radius: 4px;
    background: #2A7FF6;
    overflow-wrap: break-word;
    color:white;
}

.chat-message__content.other {
    max-width: 270px;
    padding : 6px;
    border-radius: 4px;
    background: #D1D1D1;
    overflow-wrap: break-word;
    color:black;
}

.chat-message-timestamp.own {
    padding-right: 8px;
    color:#D1D1D1;
    font-size: 8px!important;
    letter-spacing: .5px
}

.chat-message-timestamp.other {
    padding-left: 8px;
    color:#D1D1D1;
    font-size: 8px!important;
    letter-spacing: .5px
}
</style>