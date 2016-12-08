import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import Info from '../../../container/Info'
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

        firebase
        .database()
        .ref('/place/' + this_.props.params.id)
        .once('value').then(function(snapshot) {
            let data = snapshot.val()
            if (data === null) {
                let url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + place_id + "&key=" + mapApiKey
                
                axios
                .get(url)
                .then(function (response) {
                    let place = response.data.result
                    this_.setState({
                        place: {
                            name: place.name,
                            summary: place.vicinity
                        }
                    })
                })
                .catch(function (error) {
                    console.log("place info fetch error", error);
                })
            } else {

            }
        });
    }


    render() {
        return (
            <div className="profile-place">
               { /* data expects name, summary, picture /> */}
               <Info data={this.state.place} />
               { /* <Infolist data={this.state.food} /> */}
            </div>
        )
    }
}

module.exports = ProfilePlace