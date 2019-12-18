export const state = () => ({
    _searchKeyword : '',
    _searchResult : null,
    _collegeDetailData : null,
    _youtubeData : null,
    _regionData : null,
})

export const mutations = {
    SET_SEARCH(state, payload) {
        state._searchResult = payload
    },

    SET_KEYWORD(state, payload) {
        state._searchKeyword = payload
    },
    SET_COLLEGE_DATA(state, payload) {
        state._collegeDetailData = payload
    },
    SET_YOUTUBE_DATA(state, payload) {
        state._youtubeData = payload
    },
    SET_REGION_DATA(state, payload) {
        state._regionData = payload
    }
}

export const actions = {
    async ON_SEARCH({commit, state}, payload) {

        commit('SET_KEYWORD', payload.keyword)

        const dataRaw = await this.$axios.post('/search/colleges', {
            param : {
                type : payload.type,
                keyword : payload.keyword
            }
        })

        if(dataRaw) {
            commit('SET_SEARCH', dataRaw.data)
            return true
        }
    },

    async GET_COLLEGE_DATA({commit, state}, payload) {
        const dataRaw = await this.$axios.post('/search/college_data', {
            param : {
                id : payload.id
            }
        })
        
        commit('SET_COLLEGE_DATA', dataRaw.data)

        return dataRaw? true : false
    },

    async GET_YOUTUBE_DATA({commit, state}, payload) {

        const code = payload.code

        const dataRaw = await this.$axios.post('/search/youtube_data', {
            param : {
                code : code
            }
        })

        commit('SET_YOUTUBE_DATA', dataRaw.data)
        
        return dataRaw? true : false
    },

    async GET_REGION_DATA({commit, state}, payload) {
        const code = payload.code

        const dataRaw = await this.$axios.post('/search/region_data', {
            param : {
                code : code
            }
        })

        commit('SET_REGION_DATA', dataRaw.data)
        
        return dataRaw? true : false   
    }
}
  
export const strict = false
