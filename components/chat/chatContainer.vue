<template>
  <div class='chat-container' :style='{"right":(-320*_chatDisplay)+"px"}'>
      <div class='chat__title'>
          <a-icon class='pointer' type="arrow-left" 
          @click='OPEN_CHAT_CONTAINER()'/>
          <p class='chat__title-txt txt-lg' style="margin-bottom:0;">채팅</p>
      </div>
    
    <a-divider />

    <component :is='chatStep'/>

  </div>

</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {

    computed : {
        ...mapState('chat', [
            '_chatDisplay',
            '_chatCurrentRoom',
        ]),

        chatStep() {
            switch (this._chatCurrentRoom != null) {
                case false:
                    return 'chatEntrance'
            
                case true:
                    return 'chatRoom'
            }
        }
    },

    methods : {
        ...mapMutations('chat', [
            'OPEN_CHAT_CONTAINER',
        ])
    },

    components : {
        chatEntrance() {
            return import('./chatEntrance.vue')
        },

        chatRoom() {
            return import ('./chatRoom.vue')
        },
    },
}
</script>

<style>

.chat-container {
    box-shadow: 0 2px 4px rgba(0,0,0,.5);
    max-width:320px;
    width:100%;

    /* 최대 높이로 설정 */
    height: 100%;
    background :white;
    position: fixed;
    z-index: 1001;
}

.chat__title {
    display: flex;
    align-items: center;
    padding:16px 16px 0 16px;
}

.chat__title-txt {
    margin-left: 8px;
}
</style>