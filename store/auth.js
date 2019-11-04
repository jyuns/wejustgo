export const state = () => ({
    _user : null,
    _authError : '',

    // * 이메일 기억 변수
    _remember : '',
})

export const mutations = {
    AUTH_ERROR(state, payload) {
        state._authError = payload
    },

    SET_USER(state, payload) {
        state._user = payload
    },

    REMEMBER_USER(state, payload) {
        state._remember = payload
    },
}

export const actions = {

    async LOGIN({commit, state}, payload) {
        const loginResult = await this.$axios.post('/user/login', {
            param : {
                email : payload.email,
                password : payload.password,
            }
        })

        // * 이메일을 기억하기 위한 기능
        if(payload.remember) {
            commit('REMEMBER_USER', payload.email)
        } else {
            // * false 선택 시, 기억된 이메일 삭제
            commit('REMEMBER_USER', '')
        }
        
        if(loginResult.data == 'auth/user-not-found') {
            commit('AUTH_ERROR', 'WEJUSTGO에 등록되지 않은 계정입니다')

        } else if(loginResult.data == 'auth/wrong-password') {
            commit('AUTH_ERROR', '비밀번호가 틀렸습니다')

        } else if (loginResult.data == 'auth/invalid-email') {
            commit('AUTH_ERROR', '이메일 형식이 아닙니다')
            
        } else {
            commit('SET_USER', loginResult.data)
        }

        // state에 user 정보 저장
        state._user = await loginResult.data
        
        return loginResult.data.email? true : false
    },

    async LOGOUT({commit, state}, payload) {
        const logoutResult = await this.$axios.post('/user/logout')
        
        if(logoutResult.data == true) {
            commit('SET_USER', null)
            return true
        }
    },


    async REGISTER({commit, state}, payload) {
        const registerResult = await this.$axios.post('/user/register', {
            param : {
                email : payload.email,
                password : payload.password,
            }
        })
    },

    async DUPLICAT_CHECK({commit, state}, payload) {

        var duplicateResult = await this.$axios.post('user/duplicate', {
            param : {
                email : payload.email
            }
        })

        if(!duplicateResult.data) {
            commit('AUTH_ERROR', '이미 존재하는 이메일입니다')

            // ! 사용자가 error msg 닫지 않을 경우, 3초 후 자동으로 닫힘
            setTimeout( () => {
                if(state._authError.length) {
                    commit('AUTH_ERROR', '')
                }
            }, 3000)
        }

        return duplicateResult.data
    }

}

export const strict = false