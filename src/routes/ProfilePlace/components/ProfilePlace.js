import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import { mapApiKey } from '../../../config'
var axios = require('axios')

import Info from '../../../container/Info'
import InfoList from '../../../container/InfoList'
import AddFood from './AddFood'


class ProfilePlace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: {},
            food: [],
        }
        this.observePlace = this.observePlace.bind(this)
    }

    
    componentDidMount() {
        this.observePlace()
    }


    observePlace() {
        let this_ = this
        let place_id = this.props.params.id

        firebase
        .database()
        .ref('/place/' + place_id)
        .once('value').then(function(snapshot) {
            let data = snapshot.val()
            if (data === null) {
                let url = (
                    "https://maps.googleapis.com/maps/api/place/details/json?placeid=" 
                    + place_id + "&key=" + mapApiKey
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
                        .ref('place/' + place_id)
                        .set(newPlace)
                        .then(function() {
                            console.log("added place")
                        })
                        .catch(function() {
                            console.log("add place err :(")
                        })
                })
            } else {
                let ref = firebase
                    .database()
                    .ref('food/')
                ref.on('value', function (snapshot) {
                    var data = snapshot.val()
                    if (data !== null) {
                        var array = Object.keys(data)
                            .map(key => Object.assign({}, data[key], { 'id': key }))
                        console.log("prev food", array)
                        array = array.filter(function(item) {
                            return item.place_id === place_id
                        })
                        array.reverse()
                        this_.setState({
                            food: array
                        })
                    } else {
                        this_.setState({ food: [] })
                    }
                })
            }
        });
    }


    render() {
        return (
            <div className="profile-place">
                { /* data expects name, summary, picture /> */}
                <AddFood place_id={this.props.params.id} />
                <Info data={this.state.place} />
                <InfoList data={this.state.food} />
            </div>
        )
    }
}

module.exports = ProfilePlace