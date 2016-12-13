import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import { mapApiKey } from '../../../config'
var axios = require('axios')

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
        this.askGoogleAndSavePlace = this.askGoogleAndSavePlace.bind(this)
        this.fetchFood = this.fetchFood.bind(this)
    }

    
    componentDidMount() {
        this.observePlace()
    }


    askGoogleAndSavePlace() {
        let this_ = this
        let placeId = this.props.params.id
        let url = (
            "https://maps.googleapis.com/maps/api/place/details/json?placeid=" 
            + placeId + "&key=" + mapApiKey
        )
        axios
        .get(url)
        .then(function (response) {
            console.log('place info fetch success')
            let place = response.data.result
            let newPlace = {
                name: place.name,
                summary: place.vicinity
            }
            this_.setState({
                place: newPlace
            })
            firebase
                .database()
                .ref('place/' + placeId)
                .set(newPlace)
                .then(function() {
                    console.log("added place")
                })
                .catch(function() {
                    console.log("add place err :(")
                })
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
                array = array.filter(function(item) {
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

        firebase
        .database()
        .ref('/place/' + placeId)
        .once('value').then(function(snapshot) {
            let data = snapshot.val()
            if (data === null) {
                this_.askGoogleAndSavePlace()
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
                        {this.state.place.name}
                    </div>
                    <div className="profile-place-address">
                        {this.state.place.summary}
                    </div>          
                </div>
                
                { /* data expects name, summary, picture /> */}
                <AddFood
                    placeId={this.props.params.id}
                    placeName={this.state.place.name} />

                <FoodList data={this.state.food} />
            </div>
        )
    }
}

module.exports = ProfilePlace