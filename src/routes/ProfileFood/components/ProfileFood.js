import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import AddReview from './AddReview'
import ReviewList from './ReviewList'
var axios = require('axios')

class ProfileFood extends Component {
     constructor(props) {
        super(props)
        this.state = {
            name: ""

        }
        this.observeFood = this.observeFood.bind(this)
    }


    componentDidMount() {
        this.observeFood()
    }


    observeFood() {
        let this_ = this
        let food_id = this.props.params.id

        firebase
        .database()
        .ref('/food/' + food_id)
        .once('value').then(function(snapshot) {
            let data = snapshot.val()
            if (data === null) {
                console.log("food not found in db. so sad")
            } else {
                this_.setState({ name: data.name })
            }
        });
    } 


    render() {
        return (
            <div className="profile-food">
                <div className="profile-food-name">
                    {this.state.name}
                </div>
                <AddReview food_id={this.props.params.id}/>
                <ReviewList food_id={this.props.params.id} />
            </div>
        )
    }
}

module.exports = ProfileFood