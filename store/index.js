export const state = () => ({
  _headerStyle : true,
})

export const mutations = {
  SET_HEADER_STYLE(state, payload) {
    state._headerStyle = payload
  }
}


export const actions = {
    nuxtServerInit({ commit }, { req }) {
      //자동으로 시작되는 함수로, 로그인된 경우 사용자 정보를 불러 옴.
      if(req.session.auth != null) {
          return commit('auth/SET_USER', req.session.auth.user)
      }
    }
  }
  
export const strict = false