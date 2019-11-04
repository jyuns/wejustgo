module.exports = {
    firebaseLogin : async (auth, email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
            .then( () => {
                console.log('login success')
            }).catch( (error) => {
                //* error에 대한 코드를 Return
                return error.code
            } )
    },
    
    fetchIdToken : async (auth) => {
//        return await auth.currentUser.getIdToken()
    },
    
    firebaseRegister : async (auth, email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
            .then( (success) => {
                return success
            }).catch( (error) => {
                return error
            })
    },

    firebaseDuplicate : async (auth, email) => {
        var duplicateResult = await auth.fetchSignInMethodsForEmail(email)

        return duplicateResult.length? false : true
    }
}