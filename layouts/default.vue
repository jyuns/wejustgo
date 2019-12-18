<template>
  <div>

    <ClientOnly>

    <chat-container/>

    <div class='header-container'>
    <header>
      <a href="/">
        <p class='header__logo pointer txt-logo'>WEJUSTGO</p>
      </a>
      
      <div class='navigation-container'>

        <!-- 로그아웃 상태 -->
        <div class='navigation' v-if="_user == null">
          <a class='navigation__link' href="/login">
          <span class='navigation__login-btn pointer navigation__hover'>
            로그인
          </span>
          </a>
            <a-divider type="vertical" />
          <a class='navigation__link' href="/register">
          <span class='navigation__register-btn pointer navigation__hover'>
          회원가입
          </span>
          </a>
        </div>

        <div class='navigation' v-if="_user != null">
          <span v-if='_user != null' class='navigation-user-name pointer navigation__hover'>{{_user.email}}</span>
          <a-divider type="vertical" />
          <span class='navigation-logout-btn pointer navigation__hover' @click='onLogout'>로그아웃</span>
          </div>

          <a-divider type="vertical" />
        <img id='chat__icon' class='pointer navigation__hover' :src='chatIcon' @click='OPEN_CHAT_CONTAINER()'/>
        
      </div> 

    </header>
    </div>
    </ClientOnly>

    <nuxt />
  </div>
</template>

<script>

import chatContainer from '../components/chat/chatContainer.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {

  computed : {
    ...mapState('auth', [
      '_user'
    ]),

    chatIcon() {
      return require('../static/icon/chat-icon.svg')
    },
  },

  methods: {
    ...mapMutations('chat', [
      'OPEN_CHAT_CONTAINER',
    ]),

    ...mapActions('auth', [
      'LOGOUT',
    ]),

    async onLogout() {
      const logoutResult = await this.LOGOUT()
      if( logoutResult ) this.$router.push('/')
    }
  },

  components : {
    chatContainer,
  },
}
</script>

<style>
.header-container {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content :center;
  width:100%;
  position:absolute;
  background-color:transparent;
  z-index: 1000;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, .5));
}

.header-container__search {
  background:linear-gradient(to top, rgba(24, 144, 255, 0.01), rgba(24, 144, 255, .9))!important;
}

header {
    display: flex;
    align-items: center;
    max-width: 1280px;
    width: 100%;

    justify-content: space-between;
}

.header__logo {
  color:white;
  padding : 0 16px;
  font-size:28px;
  margin:0!important;
}

.navigation-container {
  display:flex;
  align-items: center;
  padding:0 16px;
  color:white;
}

.navigation {
  display:flex;
  align-items: center;

}

#chat__icon {
  width: 40px;
  height: 40px;
  padding: 8px;
}

.navigation__login-btn {
  padding:8px;
  color: white;
}

.navigation__register-btn {
  padding:8px;
  color: white;
}

.navigation-logout-btn {
  padding:8px;
  color: white;
}

.navigation-user-name {
  padding:8px;
}

.navigation__hover:hover{
  background: rgba( 255, 255, 255, 0.2 );
  border-radius: 8px;
}

.navigation__link {
  color: white;
}
</style>
