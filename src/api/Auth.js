import * as firebase from 'firebase/firebase-browser'

class Auth {

    static login() {
        var provider = new firebase.auth.GoogleAuthProvider()
        return firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                let user = {
                    name: result.user.displayName,
                    email: result.user.email,
                    id: result.user.uid,
                    token: result.credential.accessToken
                }
                console.log('omg logged in!!! user: ', user)
            })
            .catch(function (error) {
                var errorCode = error.code
                var errorMessage = error.message
                var email = error.email
                var credential = error.credential
                console.log(errorCode, errorMessage, email, credential)
            })
    }


    static logout() {
        firebase.auth()
            .signOut()
            .then(function () {
                console.log('log out success!!!')
            })
            .catch(function (error) {
                console.log('log out error: ', error)
            })
    }
}

module.exports = Auth