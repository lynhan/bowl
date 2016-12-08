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
            place_id: this.props.place_id
        }
        firebase
            .database()
            .ref('food/')
            .push()
            .set(food)
            .then(function() {
                console.log("added food")
            })
            .catch(function() {
                console.log("add food err :(")
            })
    }


    render() {
        return (
            <div className="add-food">
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
    } // end render
}

module.exports = AddFood