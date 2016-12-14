import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import Auth from '../../../api/Auth.js'
import ReviewList from './ReviewList'

class ProfileUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: firebase.auth().currentUser
        }
        this.logout = this.logout.bind(this)
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
            } else {
                this_.setState({
                    user: {},
                    reviews: [],
                })
            }
        });
    }


    logout() {
        Auth.logout()
        this.setState({ user: {} })
    }


    render() {
        if (firebase.auth().currentUser) {
            return (
                <div className="profile-user section">
                    <div className="profile-user-greet">
                        Hi, {this.state.user.name}!
                    </div>
                    <button
                        className="btn btn-default"
                        onClick={this.logout}> logout </button>
                    <ReviewList userId={this.state.user.id} />
                </div>
            )
        } else {
            return (
                <div className="login-btn">
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={Auth.login}>
                        sign in
                    </button>
                </div>
            )
        }

    }
}

module.exports = ProfileUser