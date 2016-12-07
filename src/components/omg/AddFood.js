import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'

export default class AddFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foodName: "",
        }
    }


    setFood(event) {
        this.props.setFood(event.target.value)
    }

    // addFood() {
    //     let food = {
    //         name: PLACE_NAME,
    //         place_id: GOOGLE_PLACE_ID
    //     }
    //     firebase
    //         .database()
    //         .ref('food' + GOOGLE_PLACE_ID)
    //         .set(food)
    //         .then(function() {
    //             console.log("added food")
    //         })
    // }


    render() {
        return (
            <div className="add-food">
                <div className="add-food-name">
                    <input type="text"
                        className=""
                        id="foodName"
                        value={this.state.foodName}
                        onChange={this.setFood} />
                    <label htmlFor="foodName">food name</label>
                </div>
            </div>
        )  // end return
    } // end render
}
