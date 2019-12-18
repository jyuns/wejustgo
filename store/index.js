export const state = () => ({
  _randomRecommend : '',
  _randomSkyscanner : '',
})

export const actions = {

  async RANDOM_RECOMMEND({commit, state, dispatch}) {
    const backgroundList = [
      { 'timezone' : 'Europe/London', 'countryCode' : 'UK', 'countryKor': '영국', 'countryEng':'United Kingdom',  'description' : '영국에서 축구 직관하기', 'rgb': '57,51,43' },
      { 'timezone' : 'Australia/Sydney', 'countryCode' : 'AU', 'countryKor': '호주', 'countryEng':'Australia', 'description' : '서퍼의 나라 호주에서 서퍼처럼 살아보기', 'rgb': '69,119,156' },
      { 'timezone' : 'Europe/Zurich', 'countryCode' : 'CH', 'countryKor': '스위스', 'countryEng':'Switzerland', 'description' : '넋 놓고 스위스의 자연을 바라보며 살아보기', 'rgb': '83,90,79' },
      { 'timezone' : 'Asia/Ho_Chi_Minh', 'countryCode' : 'VN', 'countryKor': '베트남', 'countryEng':'Vietnam', 'description' : '베트남에서 배터지게 쌀국수 먹기', 'rgb': '127,116,83' },
      { 'timezone' : 'America/Mexico_City', 'countryCode' : 'MX', 'countryKor': '멕시코', 'countryEng':'Mexico', 'description' : '멕시코에서 데낄라 마시면서 파티 즐기기','rgb': '42,28,32' },
      { 'timezone' : 'America/Toronto', 'countryCode' : 'CA', 'countryKor': '캐나다', 'countryEng':'Canada', 'description' : '캐나다에서 오로라 보기', 'rgb': '6,28,40' },
    ]

    const random = await backgroundList[Math.abs(Math.floor(Math.random() * 10) - 4)]

    state._randomSkyscanner = await dispatch('other/SKYSCANNER', {
      countryCode : random.countryCode
    })

    state._randomRecommend = random
  },

  nuxtServerInit({ commit }, { req }) {
    
    //자동으로 시작되는 함수로, 로그인된 경우 사용자 정보를 불러 옴.
    if(req.session.auth != null) {
        return commit('auth/SET_USER', req.session.auth.user)
    }
  }
  }
  
export const strict = false