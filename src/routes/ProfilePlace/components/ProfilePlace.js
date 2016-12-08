import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
// import Info from '../../../container/Info'
// import InfoList from '../../../container/InfoList'
import { mapApiKey } from '../../../config'
var axios = require('axios')


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
        console.log('observePlaceid', place_id)
        // first fetch and save latest data about place
        firebase
        .database()
        .ref('/place/' + this_.props.params.id)
        .once('value').then(function(snapshot) {
            let data = snapshot.val()
            if (data === null) {
                console.log("NULL PLACE OOP")
                let url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + place_id + "&key=" + mapApiKey
                // query map api
                // TODO save findPlace query results in localStorage
                // and look up here
                // Make a request for a user with a given ID
                axios.get(url)
                .then(function (response) {
                    console.log("RES", response);
                    let place = response.data.result
                    let address = place.vicinity
                    let website = place.website
                    let phone = place.formatted_phone_number
                })
                .catch(function (error) {
                    console.log("ERR", error);
                });
            } else {
                console.log("WOW PLACE", data)
            }
        });
    }


    render() {
        return (
            <div className="profile-place">
               { /* <Info data={this.state.place} /> */}
               { /* <Infolist data={this.state.food} /> */}
            </div>
        )
    }
}

module.exports = ProfilePlace