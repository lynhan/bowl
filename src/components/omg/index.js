import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import './style.css'

import * as firebase from 'firebase/firebase-browser'
import { firebaseConfig } from '../../config'
import Nav from './Nav'


export default class App extends Component {

    constructor(props) {
        super(props)
        firebase.initializeApp(firebaseConfig)
        this.state = {
            searchStr: "",
            data: [],
            user: {}
        }
        this.observeAuth = this.observeAuth.bind(this)
    }


    componentDidMount() {
        this.observeAuth()
    }


    observeAuth() {
        let this_ = this
        // update user state on auth change
        firebase.auth().onAuthStateChanged(function (user) {
            console.log("User:", user)
            if (user != null) {
                this_.setState({
                    user: {
                        name: user.displayName,
                        email: user.email,
                        id: user.uid
                    }
                })
            } else {
                this_.setState({
                    data: [],
                    user: {}
                })
            }
        });
    }


    login() {
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


    logout() {
        firebase.auth()
            .signOut()
            .then(function () {
                console.log('log out success!!!')
            })
            .catch(function (error) {
                console.log('log out error: ', error)
            })
    }


    render() {
        // var user = firebase.auth().currentUser
        return (
            <div className="app">
                <Nav />
                {this.props.children}
            </div>
        )
    } // end render
}
