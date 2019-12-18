export const state = () => ({
    _reviewError : '',
    _reviewList : null,
})

export const mutations = {
    REVIEW_ERROR(state, payload) {
        state._reviewError = payload
    },

    SET_REVIEW_LIST(state, payload) {
        state._reviewList = payload
    }
}

export const actions = {
    async SUBMIT_REVIEW({commit, state}, payload) {
        commit('REVIEW_ERROR', '')
         const reviewSubmitResult = await this.$axios.post('/review/add', {
            param : {
                reviewYear : payload.reviewYear,
                reviewText : payload.reviewText,
                reviewRate : payload.reviewRate,

                writer : payload.writer,
                writeTime : payload.writeTime,

                collegeId : payload.collegeId,
            }
        })

        return reviewSubmitResult


    },


    async FETCH_REVIEW({commit, state} , payload) {
        const reviewFetchResult = await this.$axios.post('/review/fetch', {
            param : {
                collegeId : payload.collegeId
            }
        })

        commit('SET_REVIEW_LIST', reviewFetchResult.data)

        return reviewFetchResult.data
    }
}

export const strict = false