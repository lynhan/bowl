import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'

class AddFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foodName: "",
        }
        this.submit = this.submit.bind(this)
        this.setFoodName = this.setFoodName.bind(this)
    }


    setFoodName(event) {
        this.setState({ foodName: event.target.value })
    }


    submit() {
        // TODO validation
        let food = {
            name: this.state.foodName,
            placeId: this.props.placeId,
            placeName: this.props.placeName
        }
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
                    ADD FOOD

                <div className="add-food-name">
                        <input type="text"
                            className=""
                            id="foodName"
                            onChange={this.setFoodName} />
                        <label htmlFor="foodName">food name</label>
                    </div>
                    <button onClick={this.submit}> submit </button>
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