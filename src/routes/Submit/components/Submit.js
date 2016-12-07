import React, { Component } from 'react'
import { mapApiKey } from '../../../config'
import * as firebase from 'firebase/firebase-browser'

// my stuff
// import AddPlace from './AddPlace'
// import AddFood from './AddFood'
// import AddReview from './AddReview'

class Submit extends Component {
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
        this.submit = this.submit.bind(this)
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


    submit() {
        var user = firebase.auth().currentUser;
        if (!user) {
            alert('please sign in first :)')
            return
        }
        // TODO validation
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
    // }  <AddPlace setPlace={this.setPlace} />


    render() {
        return (
            <div className="add">
                SUBMIT
                <button onClick={this.submit}> submit </button>
            </div>
        )
    }
}

module.exports = Submit