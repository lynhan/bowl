import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import AddReview from './AddReview'
import ReviewList from './ReviewList'
import { Link } from 'react-router'
var axios = require('axios')

class ProfileFood extends Component {
     constructor(props) {
        super(props)
        this.state = {}
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
                this_.setState({
                    name: data.name,
                    placeUrl: "/place/" + data.placeId,
                    placeName: data.placeName,
                    percent: (parseFloat(data.love) / (parseFloat(data.love) + parseFloat(data.hate) ) * 100 ).toFixed(2)
                 })
            }
        });
    } 


    render() {
        let love
        if (!isNaN(this.state.percent)) {
            love = (
                <div>{this.state.percent} loved it </div>
            )
        }
        return (
            <div className="profile-food">
                <div className="profile-food-about section">
                    <div className="profile-food-name">
                        {this.state.name}
                    </div>
                    <div className="profile-food-place-link">
                        <Link to={this.state.placeUrl}
                            className="nav-link"
                            activeClassName="active">{this.state.placeName}</Link>
                    </div>
                    <div className="profile-food-love">
                        {love}
                    </div>
                </div>

                <AddReview foodId={this.props.params.id}/>
                <ReviewList foodId={this.props.params.id} />
            </div>
        )
    }
}

module.exports = ProfileFood