import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'

class AddFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            foodName: "",
        }
        this.submit = this.submit.bind(this)
        this.setFoodName = this.setFoodName.bind(this)
    }


    componentDidMount() {
        let this_ = this
        firebase.auth().onAuthStateChanged(function (user) {
            console.log("AddFood user is now:", user)
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


    setFoodName(event) {
        this.setState({ foodName: event.target.value })
    }


    submit() {
        // TODO validation
        let food = {
            name: this.state.foodName,
            placeId: this.props.placeId,
            placeName: this.props.placeName,
        }
        console.log("new food", food)
        firebase
            .database()
            .ref('food/')
            .push()
            .set(food)
            .then(function () {
                console.log("added food")
            })
            .catch(function () {
                console.log("add food err :(")
            })
    }


    render() {
        var user = firebase.auth().currentUser;

        if (user) {
            // User is signed in.
            return (
                <div className="add-food">
                
                <div className='add-food-header'>
                    Add menu item
                </div>

                <div className="add-food-name">
                        <input type="text"
                            className=""
                            id="foodName"
                            onChange={this.setFoodName} />
                        <label htmlFor="foodName"></label>
                    </div>
                    <button
                    className='btn btn-default'
                    onClick={this.submit}> submit </button>
                </div>
            )  // end return
        } else {
            // No user is signed in.
            return (
                <div className="login-btn">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.props.handleLogin}>
                        sign in with google to add to menu
                    </button>
                </div>
            )
        } // end else
    } // end render
}

module.exports = AddFood