import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import { mapApiKey } from '../../../config'
var axios = require('axios')
var $ = require('jquery')
var mapsapi = require('google-maps-api')(mapApiKey);

import FoodList from '../../../container/FoodList'
import AddFood from './AddFood'
import './style.css'


/*
props: id (google place id)
*/
class ProfilePlace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: {},
            food: [],
        }
        this.observePlace = this.observePlace.bind(this)
        this.submitPlace = this.submitPlace.bind(this)
        this.fetchFood = this.fetchFood.bind(this)
    }


    componentDidMount() {
        this.observePlace()
    }


    submitPlace() {
        // TODO validation
        let place = {
            name: this.props.params.name,
            placeId: this.props.params.id,
        }

        // save to google place id
        firebase
            .database()
            .ref('place/' + place.placeId)
            .set(place)
            .then(function () {
                console.log("add place success!")
            })
            .catch(function () {
                console.log("add food err :(")
            })
    }


    fetchFood(data) {
        let this_ = this
        let placeId = this.props.params.id
        let newPlace = {
            name: data.name,
            summary: data.summary
        }
        this_.setState({
            place: newPlace
        })
        let ref = firebase
            .database()
            .ref('food/')
        ref.on('value', function (snapshot) {
            var data = snapshot.val()
            if (data === null) {
                this_.setState({ food: [] })
            } else {
                var array = Object.keys(data)
                    .map(key => Object.assign({}, data[key], { 'id': key }))
                array = array.filter(function (item) {
                    return item.placeId === placeId
                })
                array.reverse()
                this_.setState({
                    food: array
                })
            } // end else
        })  // end value observer
    }


    observePlace() {
        let this_ = this
        let placeId = this.props.params.id
        let placeName = this.props.params.Name
        firebase
            .database()
            .ref('/place/' + placeId)
            .once('value').then(function (snapshot) {
                let data = snapshot.val()
                if (data === null) {
                    this_.submitPlace()
                } else {
                    this_.fetchFood(data)
                }
            });
    }


    render() {
        return (
            <div className="profile-place">

                { /* about place /> */}
                <div className="profile-place-about">
                    <div className="profile-place-name">
                        {this.props.params.name}
                    </div>
                </div>

                { /* data expects name, summary, picture /> */}
                <AddFood
                    placeId={this.props.params.id}
                    placeName={this.props.params.name} />

                <FoodList data={this.state.food} />
            </div>
        )
    }
}

module.exports = ProfilePlace