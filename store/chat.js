const firebase = require( '../plugins/firebase.js')
const database = firebase.database()

export const state = () => ({
    _chatDisplay : false,
    _chatCurrentRoom : null,
    //_chatCurrentMember : 0,

    _chatMessageList : [],
    _chatLastIndex : null,
    _chatMoreAvailable : true,
   
    //_chatBookMarked : false,
            
    _chatTrigger : null,
    _chatTriggerRef : null,
})

export const mutations = {
    OPEN_CHAT_CONTAINER(state) {
        state._chatDisplay = !state._chatDisplay 
    },

    SET_CHAT_ENTER(state, payload) {
        state._chatCurrentRoom = payload
        
        // ? 들어가기 전 초기화 하기
        state._chatMessageList = []
        state._chatLastIndex = null
        state._chatMoreAvailable = true
    },

    SET_CHAT_EXIT(state, payload) {
        state._chatCurrentRoom = null
        //state._chatCurrentMember = 0
        //state._chatBookMarked = false

        state._chatMessageList = []

        state._chatLastIndex = null

        state._chatMoreAvailable = false

        // ! 채팅방 종료 및 사이트 종료 시, 이벤트 리스너 분리
        // ? 추후 어떤 방식이 있을 진 모르지만, 이벤트 분리 유즈케이스 분석, 과금!
    
        if(!state._chatTriggerRef) return

        state._chatTriggerRef.off("child_added", state._chatTrigger)
        
        state._chatTrigger = null
        state._chatTriggerRef = null
    },

    SET_CHAT_DATA(state, payload) {
        state._chatMessageList = payload
    },

/**
    SET_BOOK_MARKED(state, payload) {
        const user = payload.user

        const chatRef = database.ref('chatRooms/' + state._chatCurrentRoom.chatRoomId + '/chatMember/' + user)
        const userRef = database.ref('users/' + user + "/" + state._chatCurrentRoom.chatRoomId)

        state._chatBookMarked = !state._chatBookMarked

        state._chatBookMarked == true ? chatRef.set({in:true}) : chatRef.remove()
        state._chatBookMarked == true ? userRef.set({in:true}) : userRef.remove()
    } */
}

export const actions = {
    async FETCH_AUTO_COLLEGE_LIST({commit, state}, payload) {
        const dataRaw = await this.$axios.post('/search/chats', {
            param : {
                value : payload.value
            }
        })  

        const dataList = await dataRaw.data.reduce( (acc, cur) => {
            acc.push(cur.collegeKor + "(" + cur.collegeEng + ")")
            return acc
        }, [])

        const result = {
            dataList : dataList,
            dataRaw : dataRaw.data
        }

        return result
    },

    async CHAT_ENTER({commit, dispatch}, payload) {
        commit('SET_CHAT_ENTER', payload)
        dispatch('CHAT_LOAD', payload.chatRoomId)
    },

    async CHAT_EXIT({commit, state}, payload) {
        commit('SET_CHAT_EXIT')
    },

    async CHAT_SUBMIT({commit, state}, payload) {

        const result = await this.$axios.post('/chat/send', {
            param : {
                chatCurrentRoom : state._chatCurrentRoom.chatRoomId,
                msg : payload.msg,
                timeStamp : payload.timeStamp,
                from : payload.from,
            }
        })

        return result.data
    },


    // ? 채팅 처음에 5개 불러오기
    async CHAT_LOAD({commit, state}, payload) {
        
        state._chatTriggerRef = await database.ref('chatRooms/' + payload + '/chatMsg').limitToLast(5)
        
        state._chatTrigger = state._chatTriggerRef.on('child_added', async (snapshot) => {
            let message = await snapshot.val()
            message.id = await snapshot.key

            state._chatMessageList.push(message)
        })


/**
        const memberCount = await database.ref('chatRooms/' + payload + '/chatMember').once('value', async (snapshot) => {
            return await snapshot.numChildren()
        })

        state._chatCurrentMember = await Object.keys(memberCount.val()).length */
    },

    // ? 채팅 더 불러오기

    async CHAT_MORE_LOAD({commit, state}, payload) {
        
        // ! 채팅방 입장 안 했을 경우, 종료
        if(state._chatCurrentRoom == null) return

        // ! 더 이상 불러 올 채팅이 없을 경우, 종료
        if(!state._chatMoreAvailable) return

        state._chatLastIndex = state._chatMessageList[0]
        console.log(state._chatCurrentRoom.chatRoomId + 'chatmoreload')
        const result = await database.ref('chatRooms/' + state._chatCurrentRoom.chatRoomId + '/chatMsg')
                        .orderByKey().endAt(state._chatLastIndex.id).limitToLast(20).once('value').then( (snapshot) => {
                            const tempArray = []
                            snapshot.forEach( (e) => {

                                let message = e.val()
                                message.id = e.key
                                
                                tempArray.push(message)
                            })

                            return tempArray
                        })

        // ! 더 이상 채팅이 없을 경우, 종료
        if( result[0].id == state._chatLastIndex.id ) {
            state._chatMoreAvailable = false
            return
        }

        const resultReverse = await result.reverse()

        resultReverse.forEach( (e) => {
            state._chatMessageList.unshift(e)
        })
    }
}

export const strict = false