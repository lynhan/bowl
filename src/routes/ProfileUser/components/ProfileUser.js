import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import Auth from '../../../api/Auth.js'
import ReviewList from '../../../container/ReviewList'

class ProfileUser extends Component {
     constructor(props) {
        super(props)
        this.state = {
            user: firebase.auth().currentUser
        }
        this.listenForData = this.listenForData.bind(this)
    }

     componentDidMount() {
        let this_ = this
        firebase.auth().onAuthStateChanged(function (user) {
            console.log("user is now:", user)
            if (user != null) {
                this_.setState({
                    user: {
                        name: user.displayName,
                        email: user.email,
                        id: user.uid
                    }
                })
                this_.listenForData(user.uid)
            } else {
                this_.setState({
                    user: {},
                    reviews: [],
                })
            }
        });
    }

    listenForData(uid) {
        let this_ = this
        let dataRef = firebase
            .database()
            .ref('users/' + uid)
        dataRef.on('value', function (snapshot) {
            var data = snapshot.val()
            console.log('data', data)
            if (data != null) {
                var array = Object.keys(data)
                    .map(key => Object.assign({}, data[key], { 'id': key }))
                array.reverse()
                this_.setState({ data: array })
            } else {
                this_.setState({ data: [] })
            }
        })
    }

    render() {
        if (this.state.user) {
            return (
                <div className="profile-user">
                    <div className="profile-user-greet">
                        Hi, {this.state.user.name}!
                    </div>
                    <ReviewList />
                </div>
            )
        } else {
            return (
                <div className="login-btn">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={Auth.login}>
                        sign in
                    </button>
                </div>
            )
        }

    }
}

module.exports = ProfileUser