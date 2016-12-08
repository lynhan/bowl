import React, { Component } from 'react'
import { mapApiKey } from '../../../config'

class FindPlace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            food: {},
            place: {},
            review: {},
        }
        this.setFood = this.setFood.bind(this)
        this.setPlace = this.setPlace.bind(this)
        this.setReview = this.setReview.bind(this)
    }


    componentDidMount() {
        const script = document.createElement("script")
        script.src = "https://maps.googleapis.com/maps/api/js?key=" + mapApiKey + "&libraries=places&callback=initAutoComplete"
        script.async = false
        document.body.appendChild(script)
    }


    setFood(foodName) {
        this.setState({ foodName: foodName })
    }


    setPlace(placeName, googlePlaceId) {
        this.setState({
            placeName: placeName,
            googlePlaceId: googlePlaceId
        })
    }


    setReview(picFile, bool) {
        this.setState({
            picFile: picFile,
            bool: bool
        })
    }

    // addPlace() {
    //     let place = {
    //         name: PLACE_NAME,
    //         place_id: GOOGLE_PLACE_ID
    //     }
    //     firebase
    //         .database()
    //         .ref('place/' + GOOGLE_PLACE_ID)
    //         .set(place)
    //         .then(function () {
    //             console.log("added review")
    //         })
    // }  

    render() {
        return (
            <div className="add">
                <input id="pac-input" className="controls" type="text" placeholder="Search Box" />
                <div id="map"></div>
            </div>
        )
    }
}

module.exports = FindPlace