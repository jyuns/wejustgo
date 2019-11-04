module.exports = {
 
    sendMessage : async (firebase, chatCurrentRoom, msg, timeStamp, from) => {
        console.log(chatCurrentRoom + 'sendMessage')
        let ref = firebase.database().ref('chatRooms/' + chatCurrentRoom + '/chatMsg')
        
        return await ref.push({
            msg : msg,
            timeStamp : timeStamp,
            from : from,
        })
    },
}